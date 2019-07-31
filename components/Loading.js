import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import {createDrawerNavigator, createAppContainer } from "react-navigation";
import {connect} from 'react-redux'
import { ClientHomeScreen } from "../pages/ClientHome";
import { RequestServiceScreen } from "../pages/RequestService";
import { MemberHomeScreen } from "../pages/MemberHome";
import {ClientHomeStackNavigator, MemberHomeStackNavigator, RequestServiceStackNavigator} from '../navigator/AppStackNavigator'

  const ClientAppStack = createDrawerNavigator({
    ClientHome : ClientHomeStackNavigator,
    RequestService : RequestServiceStackNavigator
  })
  
  const ClientAppContainer = createAppContainer(ClientAppStack)
  
  const MemberAppStack = createDrawerNavigator({
      MemberHome : MemberHomeStackNavigator,
    })
    
    const MemberAppContainer = createAppContainer(MemberAppStack)


 class LoadingScreen extends Component {
    render() {
        
        if(!this.props.userInfo){
          return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="42a5f5" />
            </View>
        )  
        }

        else if(this.props.userInfo.type == 'member'){
            return <MemberAppContainer />
        }

        else{
            return <ClientAppContainer />
        }
    }
}

export default connect(mapStateToProps)(LoadingScreen)


function mapStateToProps(state){
    return{
        userAuth : state.userAuth,
        userInfo : state.userInfo
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})
