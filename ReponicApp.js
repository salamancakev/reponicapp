/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Alert, ToastAndroid } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { auth, firestore, messaging, notifications } from "react-native-firebase";
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
        firestore().collection('users').doc(this.props.userAuth.uid).get().then(doc=>{
          if(doc.exists){
        this.props.updateUserInfo(doc.data())
        this.checkPermission()
        this.createNotificationListeners()
        console.log(doc.data())
        if(doc.data().type == 'member' && doc.data().status == 'Active'){
          this.subscribeToTopics(doc.data().service)
        }
        else{
          messaging().unsubscribeFromTopic('graphic_design_notifications')
          messaging().unsubscribeFromTopic('social_media_notifications')
          messaging().unsubscribeFromTopic('web_design_notifications')
          messaging().unsubscribeFromTopic('software_development_notifications')
        }
          }
    })
      }
      
    })
  }
  

  componentWillUnmount(){
    if (this.unsubscriber){
      this.unsubscriber();
    }
    this.notificationListener();
    this.notificationOpenedListener();
  }


  subscribeToTopics(type){
    switch (type) {
      case 'Graphic Design':
        messaging().subscribeToTopic('graphic_design_notifications')
        messaging().unsubscribeFromTopic('social_media_notifications')
        messaging().unsubscribeFromTopic('web_design_notifications')
        messaging().unsubscribeFromTopic('software_development_notifications')
        break;
      case 'Social Media':
        messaging().subscribeToTopic('social_media_notifications')
        messaging().unsubscribeFromTopic('graphic_design_notifications')
        messaging().unsubscribeFromTopic('web_design_notifications')
        messaging().unsubscribeFromTopic('software_development_notifications')
        break;
      case 'Web Design':
        messaging().subscribeToTopic('web_design_notifications')
        messaging().unsubscribeFromTopic('graphic_design_notifications')
        messaging().unsubscribeFromTopic('social_media_notifications')
        messaging().unsubscribeFromTopic('software_development_notifications')
        break;
      case 'Software Development':
        messaging().subscribeToTopic('software_development_notifications')
        messaging().unsubscribeFromTopic('graphic_design_notifications')
        messaging().unsubscribeFromTopic('social_media_notifications')
        messaging().unsubscribeFromTopic('web_design_notifications')
        break;
    
      default:
        break;
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showToast(body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = notifications().onNotificationOpened((notificationOpen) => {
        const { title, body, data } = notificationOpen.notification;
        this.showToast('You have new jobs waiting for you!');
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showToast('You have new jobs waiting for you!');
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showToast(message) {
   ToastAndroid.show(message, ToastAndroid.LONG)
  }

  checkPermission(){
    messaging().hasPermission().then(enabled=>{
      if(enabled){
        this.getToken()
      }
      else{
        this.requestPermission()
      }
    })
  }

  getToken() {
    if(!this.props.fcmToken){
      messaging().getToken().then(token=>{
        if(token){
          this.props.updateToken(token)
          console.log(this.props.fcmToken)
        }
      })
    }
  }

  requestPermission(){

      messaging().requestPermission().then(permission=>{
        this.getToken()
      }).catch(error=>{
        console.log('Permission rejected')
      })
  
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
        userInfo : state.userInfo,
        fcmToken : state.fcmToken
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateUserAuth : (userAuth) => dispatch({type : 'UPDATE_AUTH', userAuth}),
        updateUserInfo : (userInfo) => dispatch({type : 'UPDATE_INFO', userInfo}),
        updateToken : (fcmToken) => dispatch({type : 'UPDATE_TOKEN', fcmToken})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReponicApp) 