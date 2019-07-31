/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { auth, firestore } from "react-native-firebase";
import {connect} from 'react-redux'
import { LoginScreen } from "./pages/Login";
import {SignUpScreen} from './pages/SignUp';

import LoadingScreen from './components/Loading'

const AuthStack =  createStackNavigator({
  Login : LoginScreen,
  SignUp : SignUpScreen
},
{
  initialRouteName : "Login",
  }
);

const AuthContainer = createAppContainer(AuthStack);




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
          if(snapshot){
            let doc = snapshot.docs[0]
        this.props.updateUserInfo(doc.data())
          }
        
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

    return <LoadingScreen />
    
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