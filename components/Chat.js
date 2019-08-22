import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { GiftedChat } from "react-native-gifted-chat";
import { Icon } from "react-native-elements";
import { firestore } from "react-native-firebase";
import { connect } from 'react-redux'

export class ChatScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
        headerTitle : 'Chat',
        headerStyle : {
          backgroundColor : '#42a5f5'
        },
        headerTintColor : '#fff',
        headerTitleStyle : {
          fontWeight : 'bold'
        }
      } 
    }
    
    constructor(){
        super()
        this.state = {
            chatData : null,
            chatID : null,
            messages : [],
            modified : false
        }
    }

    componentDidMount() {
      let chatID = this.props.navigation.getParam('chatID', null)
      let chatData = this.props.navigation.getParam('chatData', null)
      let messages = chatData.messages
      messages = messages.reverse()
      if(messages.length != 0){
        messages.forEach((value, index)=>{
            let timestamp = value.createdAt
        messages[index].createdAt = timestamp.toDate()
          
      })
      }
      
      this.setState({
        chatID : chatID,
        chatData : chatData,
        messages :  messages
        })
      }

      componentWillUnmount(){
        this.setState({
          messages : []
        })
      }

      onSend(messages = []) {
        let message = messages[0]
        firestore().collection('chats').doc(this.state.chatID).update({
          messages : firestore.FieldValue.arrayUnion(message)
        }).then(success=>{
          this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
        console.log(this.state.messages)
        }).catch(error=>{
          console.log(error)
          return false
        })
        
      }


    render() {
      if(this.state.chatData == null){
        return <ActivityIndicator />
      }
      else{
        return (
            <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.userAuth.uid,
        }}
        
      />
        )
      }
        
    }
}

function mapStateToProps(state){
  return{
      userAuth : state.userAuth,
      userInfo : state.userInfo
  }
   }

export default connect(mapStateToProps) (ChatScreen)
