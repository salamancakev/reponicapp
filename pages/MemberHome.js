import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { connect } from "react-redux";
import { auth, firestore } from "react-native-firebase";
class MemberHomeScreen extends Component {

      constructor(){
        super()
        this.state = {
          loading : false
        }
      }

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

    onChangeStatus(){
      this.setState({
        loading : true
      })
      if(this.props.userInfo.status == 'Active'){
        firestore().collection('users').doc(this.props.userAuth.uid).update({status : 'Inactive'}).then(success=>{
          let user = {
            email : this.props.userInfo.email,
            firstName : this.props.userInfo.firstName,
            id : this.props.userInfo.id,
            lastName : this.props.userInfo.lastName,
            status : 'Inactive',
            type : this.props.userInfo.type,
            username : this.props.userInfo.username
          }

          this.props.updateUserInfo(user)

          this.setState({
            loading : false
          })
        }).catch(error=>{
          console.error(error)
        })
      }

      else{
        firestore().collection('users').doc(this.props.userAuth.uid).update({status : 'Active'}).then(success=>{
          let user = {
            email : this.props.userInfo.email,
            firstName : this.props.userInfo.firstName,
            id : this.props.userInfo.id,
            lastName : this.props.userInfo.lastName,
            status : 'Active',
            type : this.props.userInfo.type,
            username : this.props.userInfo.username
          }

          this.props.updateUserInfo(user)

          this.setState({
            loading : false
          })
        }).catch(error=>{
          console.error(error);
          
        })
      }      
    }

    onLogout(){
      auth().signOut()
    }

    render() {
      let activeButton = <Button title='Change status to Active' containerStyle={{marginBottom : 10}} buttonStyle={{width: 200, borderRadius : 20,  backgroundColor: '#5cb85c'}} loading={this.state.loading} onPress={()=>{this.onChangeStatus()}} />
      let inactiveButton = <Button title='Change status to Inactive' containerStyle={{marginBottom : 10}} buttonStyle={{width: 200, borderRadius : 20,  backgroundColor: '#d9534f'}} loading={this.state.loading} onPress={()=>{this.onChangeStatus()}} />
      let inactiveText = <Text style={{fontSize:15, marginBottom:15}} >To start recieving jobs, change your status to Active</Text>
        return (
          <View style={{flex :1,justifyContent : 'center', alignItems : 'center'}}>
          <StatusBar backgroundColor='#0077c2' barStyle='light-content' />
          <Text style={{fontSize:20, marginBottom:15}} >Welcome {this.props.userInfo.username}!</Text>
          <Text style={{fontSize:20, marginBottom:15}} >Your status is: {this.props.userInfo.status}</Text>
          {this.props.userInfo.status == 'Inactive' ? inactiveText : null}
          {this.props.userInfo.status == 'Inactive' ? activeButton : inactiveButton}
          <Button title='Logout' buttonStyle={{width: 200, borderRadius : 20}} onPress={()=> this.onLogout()} />
        </View>
        )
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
      updateUserInfo : (userInfo) => dispatch({type : 'UPDATE_INFO', userInfo})
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (MemberHomeScreen)
