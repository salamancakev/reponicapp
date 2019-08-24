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
            chatID : null,
            messages : [],
        }
    }

    componentDidMount() {
      let chatID = this.props.navigation.getParam('chatID', null)
      this.setState({chatID : chatID})
      firestore().collection('chats').doc(chatID).onSnapshot(doc=>{
        
        if(doc.exists){
          let messages = doc.data().messages
          messages = messages.reverse()
          if(messages.length != 0){
            messages.forEach((value, index)=>{
                let timestamp = value.createdAt
                if(timestamp instanceof firestore.Timestamp) {
                  messages[index].createdAt = timestamp.toDate()
                }
          })
          }
          console.log(messages)
          this.setState({
            messages :  messages
            })
        }

        else{
          console.log('Nothing found')
        }
        
      })
      
     
      }

      componentWillUnmount(){
        this.setState({
          messages : [],
          chatID : null
        })
      }

      onSend(messages = []) {
        let message = messages[0]
        firestore().collection('chats').doc(this.state.chatID).update({
          messages : firestore.FieldValue.arrayUnion(message)
        }).then(success=>{
          return true
        console.log(this.state.messages)
        }).catch(error=>{
          console.log(error)
          return false
        })
        
      }


    render() {
      if(this.state.messages.length == 0){
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
