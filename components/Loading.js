import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet, StatusBar } from 'react-native'
import {Icon} from 'react-native-elements'
import {createDrawerNavigator, createAppContainer } from "react-navigation";
import {connect} from 'react-redux'
import {
    ClientHomeStackNavigator, 
    MemberHomeStackNavigator, 
    RequestServiceStackNavigator,
    PaymentMethodStackNavigator,
    HistoryStackNavigator,
    CheckServiceStackNavigator,
    JobListStackNavigator,
    ChatStackNavigator,
    } from '../navigator/AppStackNavigator'

  const ClientAppStack = createDrawerNavigator({
    ClientHome : {
     screen : ClientHomeStackNavigator,
     navigationOptions :{
         title : 'Home',
         drawerIcon : (<Icon name="home" type="font-awesome" />)
     }
    } ,
    RequestService : {
        screen : RequestServiceStackNavigator,
        navigationOptions : {
            title : 'Request New Service',
            drawerIcon : (<Icon name="edit" type="font-awesome" />)
        }
    },
    CheckServices : {
        screen : CheckServiceStackNavigator,
        navigationOptions : {
            title : 'Check Services',
            drawerIcon : (<Icon name="list" type="font-awesome" />)
        }
    },
    
    Chat : {
        screen : ChatStackNavigator,
        navigationOptions : {
            title : 'Chats',
            drawerIcon : (<Icon name="comments" type="font-awesome" />)
        }
    },

    History : {
        screen : HistoryStackNavigator,
        navigationOptions : {
            title : 'History',
            drawerIcon : (<Icon name="history" type="font-awesome" />)
        }
    },

    PaymentMethod : {
        screen : PaymentMethodStackNavigator,
        navigationOptions : {
            title : 'Payment Method',
            drawerIcon : (<Icon name="credit-card" type="font-awesome" />)
        }
    }
  })
  
  const ClientAppContainer = createAppContainer(ClientAppStack)
  
  const MemberAppStack = createDrawerNavigator({
      MemberHome : {
          screen : MemberHomeStackNavigator,
          navigationOptions :{
            title : 'Home',
            drawerIcon : (<Icon name="home" type="font-awesome" />)
        }
      },
      JobList : {
          screen : JobListStackNavigator,
          navigationOptions : {
              title : 'Job List',
              drawerIcon : (<Icon name="suitcase" type="font-awesome" />)
          }
      },
      CheckServices: {
          screen : CheckServiceStackNavigator,
          navigationOptions : {
              title : 'Check Services',
              drawerIcon : (<Icon name="list" type="font-awesome" />)
          }
      },
      Chat : {
        screen : ChatStackNavigator,
        navigationOptions : {
            title : 'Chat',
            drawerIcon : (<Icon name="comments" type="font-awesome" />)
        }
      }
    })
    
    const MemberAppContainer = createAppContainer(MemberAppStack)


 class LoadingScreen extends Component {
    render() {
        
        if(!this.props.userInfo){
          return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#0077c2' barStyle='light-content' />
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
