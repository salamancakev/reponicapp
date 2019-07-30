/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { auth, firestore } from "react-native-firebase";
import {connect} from 'react-redux'
import { LoginScreen } from "./pages/Login";
import { ClientHomeScreen } from "./pages/ClientHome";
import {SignUpScreen} from './pages/SignUp';
import { RequestServiceScreen } from "./pages/RequestService";
import { MemberHomeScreen } from "./pages/MemberHome";

const AuthStack =  createStackNavigator({
  Login : LoginScreen,
  SignUp : SignUpScreen
},
{
  initialRouteName : "Login",
  }
);

const AuthContainer = createAppContainer(AuthStack);

const ClientAppStack = createDrawerNavigator({
  ClientHome : ClientHomeScreen,
  RequestService : RequestServiceScreen
})

const ClientAppContainer = createAppContainer(ClientAppStack)

const MemberAppStack = createDrawerNavigator({
    MemberHome : MemberHomeScreen,
  })
  
  const MemberAppContainer = createAppContainer(MemberAppStack)


class ReponicApp extends Component {
  constructor(){
    super()
    this.unsubscriber = null
  }


      
  

  componentDidMount(){
    this.unsubscriber = auth().onAuthStateChanged((user)=>{
      console.log(this.props)
      this.props.updateUserAuth(user)
      if(this.props.userAuth){
        firestore().collection('users').where('email', '==', user.email).get().then(snapshot=>{
        let doc = snapshot.docs[0]
        this.props.updateUserInfo(doc.data())
    })
      }
      
    })
  }
  

  componentWillUnmount(){
    if (this.unsubscriber){
      this.unsubscriber();
    }
  }

  render(){
    if(!this.props.userAuth){
      return <AuthContainer />
    }

    else if(this.props.userInfo.type == 'member'){
        return <MemberAppContainer />
    }
    else {
        return <ClientAppContainer />
    }
    
  }

  
}

function mapStateToProps(state){
    return{
        userAuth : state.userAuth,
        userInfo : state.userInfo
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateUserAuth : (userAuth) => dispatch({type : 'UPDATE_AUTH', userAuth}),
        updateUserInfo : (userInfo) => dispatch({type : 'UPDATE_INFO', userInfo})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReponicApp) 