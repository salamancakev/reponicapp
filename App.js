/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import {createStore} from 'redux'
import { Provider } from "react-redux";
import ReponicApp from './ReponicApp'


const initialState = {
  userAuth : null,
  userInfo : null
}

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case 'UPDATE_AUTH':
      return {userAuth : action.userAuth}
    case 'UPDATE_INFO':
      return {userAuth : state.userAuth, userInfo : action.userInfo}
    default:
  }
  return state
}

const store = createStore(reducer)
export default class App extends Component {
  render(){
    return (
    <Provider store = {store}>
      <ReponicApp />
    </Provider>
    )
  }
}