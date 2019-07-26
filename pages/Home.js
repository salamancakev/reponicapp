import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { Button } from "react-native-elements";
import { auth } from "react-native-firebase";

export class HomeScreen extends Component {

  static navigationOptions = {
    title : 'Home',
    headerStyle : {
      backgroundColor : '#42a5f5'
    },
    headerTintColor : '#fff',
    headerTitleStyle : {
      fontWeight : 'bold'
    }
  }

  onLogout(){
    auth().signOut()
  }
  
  render() {
    return (
      <View style={{flex :1,justifyContent : 'center', alignItems : 'center'}}>
        <StatusBar backgroundColor='#0077c2' barStyle='light-content' />
        <Button title='Request Service' buttonStyle={{width: 200, borderRadius : 20, marginBottom: 10}} onPress={()=> this.props.navigation.navigate('RequestService')} />
        <Button title='Logout' buttonStyle={{width: 200, borderRadius : 20}} onPress={()=> this.onLogout()} />
      </View>
        
    )
  }
}

export default HomeScreen
