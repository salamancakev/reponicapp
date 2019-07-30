/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import { auth, firestore } from "react-native-firebase";
import {connect} from 'react-redux'
import { LoginScreen } from "./pages/Login";
import { ClientHomeScreen } from "./pages/ClientHome";
import {SignUpScreen} from './pages/SignUp';
import { RequestServiceScreen } from "./pages/RequestService";

const AuthStack =  createStackNavigator({
  Login : LoginScreen,
  SignUp : SignUpScreen
},
{
  initialRouteName : "Login",
  }
);

const AuthContainer = createAppContainer(AuthStack);

const AppStack = createStackNavigator({
  ClientHome : ClientHomeScreen,
  RequestService : RequestServiceScreen
})

const AppContainer = createAppContainer(AppStack)


class ReponicApp extends Component {
  constructor(){
    super()
    this.unsubscriber = null
  }


      
  

  componentDidMount(){
      console.log("Hello")
      console.log(this.props)
    this.unsubscriber = auth().onAuthStateChanged((user)=>{
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

    return <AppContainer />
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
        updateUserAuth : (user) => dispatch({type : 'UPDATE_AUTH', user}),
        updateUserInfo : (user) => dispatch({type : 'UPDATE_INFO', user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReponicApp) 