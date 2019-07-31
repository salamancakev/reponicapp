import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { Button, Header, Icon } from "react-native-elements";
import { DrawerActions } from 'react-navigation'
import { auth } from "react-native-firebase";

export class ClientHomeScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
    headerTitle : 'Home',
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

export default ClientHomeScreen
