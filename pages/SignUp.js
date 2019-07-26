import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import {SignUpForm} from '../components/SignUpForm'

export class SignUpScreen extends Component {
  static navigationOptions = {
  title : 'Sign Up',
  headerStyle : {
    backgroundColor : '#42a5f5'
  },
  headerTintColor : '#fff',
  headerTitleStyle : {
    fontWeight : 'bold'
  }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#0077c2' barStyle='light-content' />
        <Text style={styles.logo}>Reponic</Text>
        <SignUpForm />
        <View style={styles.signUpTextContainer}>
        <Text style={styles.signUpText}>Already have an account? </Text>
        <Text style={styles.signUpBtn} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#4286f4'
  },

  logo : {
    fontSize : 40,
    textAlign : 'center',
    margin : 10,
    color : '#ffffff'
  },

  signUpTextContainer : {
    alignItems : 'center',
    justifyContent : 'center',
    paddingVertical : 16,
    flexDirection : 'row',
  },

  signUpText : {
    color : 'rgba(255,255,255,0.7)',
    fontSize : 16
  },

  signUpBtn : {
    color : '#ffffff',
    fontSize : 16,
    fontWeight : '500'
  }
})

export default SignUpScreen
