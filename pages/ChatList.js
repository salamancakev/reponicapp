import React, { Component } from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { ListItem, Icon } from "react-native-elements";
import { firestore } from "react-native-firebase";
import { connect } from "react-redux";

 class ChatListScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
        headerTitle : 'Chat List',
        headerLeft : (
          <Icon name='bars' type='font-awesome' color='#fff' underlayColor='#42a5f5' containerStyle={{marginLeft: 10}} onPress={()=>navigation.openDrawer()} />
        ),
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
            chats : [],
            loading : false
        }
    }

    

    componentDidMount(){
        this.setState({loading :true})
        let chats = []
        firestore().collection('chats').where('memberID', '==', this.props.userAuth.uid).get().then(snapshot=>{
            if(snapshot.empty){
                this.setState({loading:false})
                console.log('There are no chats')
                return false
            }
            else{
                snapshot.forEach(doc=>{
                    let chat = {
                        data : doc.data(),
                        id : doc.id
                    }
                    chats.push(chat)
                })
                this.setState({chats : chats, loading :false})
            }
        })
    }

    listChats(){
        let chats = this.state.chats
        if(chats.length == 0){
            return (<View>
                <Text>There are no available chats at the moment</Text>
            </View>)
        }
        else{
        return(
            <ScrollView>
                {this.state.chats.map((value, key)=>{
                    let subtitle = 'Start chatting with your client!'
                    let messages = value.data.messages
                    messages.reverse()
                    return (<ListItem key= {key}
                        leftIcon = {<Icon name='user' type='font-awesome' />}
                        title = {value.data.clientName}
                        subtitle = {subtitle}
                        chevron
                        onPress={()=>this.props.navigation.navigate('Chat', {chatID : value.id, chatData : value.data, messages : messages})} />)
                })}
            </ScrollView>
        )  
        }
        
    }

    render() {
        if(this.state.loading){
            return <ActivityIndicator />
        }
        else{
           return this.listChats()
        }
    }
}

function mapStateToProps(state){
    return{
        userAuth : state.userAuth,
        userInfo : state.userInfo
    }
  }

export default connect(mapStateToProps) (ChatListScreen)
