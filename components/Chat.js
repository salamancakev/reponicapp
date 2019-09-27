import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { GiftedChat } from "react-native-gifted-chat";
import { Icon } from "react-native-elements";
import { firestore, functions } from "react-native-firebase";
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
            chatData : null,
            loading : true
        }
        this.unsubscriber = null
    }

    componentDidMount() {
      let chatID = this.props.navigation.getParam('chatID', null)
      let chatData =  this.props.navigation.getParam('chatData', null)
      this.setState({chatID : chatID, chatData : chatData})
      this.unsubscriber = firestore().collection('chats').doc(chatID).onSnapshot(doc=>{
        
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
            messages :  messages,
            loading : false
            })
        }

        else{
          console.log('Nothing found')
          return false
        }
        
      })
      
     
      }

      componentWillUnmount(){
        this.unsubscriber()
      }


      onSend(messages = []) {
        let message = messages[0]
        firestore().collection('chats').doc(this.state.chatID).update({
          messages : firestore.FieldValue.arrayUnion(message)
        }).then(success=>{
          let send_message_notification = functions().httpsCallable('send_message_notification')
          if(this.props.userInfo.type == 'member'){
            send_message_notification({fcmToken : this.state.chatData.clientFcmToken, name : this.state.chatData.memberName})
            .then(result=>{
              if(result.sent){
                return true
              }
              else{
                console.log(result.error)
                return false
              }
            })
          }
          else{
            send_message_notification({fcmToken : this.state.chatData.memberFcmToken, name : this.state.chatData.clientName})
            .then(result=>{
              if(result.sent){
                return true
              }
              else{
                console.log(result.error)
                return false
              }
            })
          }
        }).catch(error=>{
          console.log(error)
          return false
        })
        
      }


    render() {
      if(this.state.loading){
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
