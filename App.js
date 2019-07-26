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
import { auth } from "react-native-firebase";
import { LoginScreen } from "./pages/Login";
import { HomeScreen } from "./pages/Home";
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
  Home : HomeScreen,
  RequestService : RequestServiceScreen
})

const AppContainer = createAppContainer(AppStack)


export default class App extends Component {
  constructor(){
    super()
    this.unsubscriber = null
    this.state = {
      user : null
    }
  }

  componentDidMount(){
    this.unsubscriber = auth().onAuthStateChanged((user)=>{
      this.setState({user})
    })
  }
  

  componentWillUnmount(){
    if (this.unsubscriber){
      this.unsubscriber();
    }
  }

  render(){
    if(!this.state.user){
      return <AuthContainer />
    }

    return <AppContainer />
  }
}