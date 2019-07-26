import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet} from 'react-native'
import { Button, Input } from "react-native-elements";
import Icon  from "react-native-vector-icons/FontAwesome";
import { auth } from "react-native-firebase";
export class LoginForm extends Component {

  constructor(){
    super()
    this.state= {
      email : '',
      password : '',
      emailError : '',
      passwordError : '',
      authError : ''
    }
  }

  validate(){
   this.setState({emailError : '', passwordError : ''})
  if(this.state.email == '' || this.state.password == ''){
    if(this.state.email == ''){
     this.setState({emailError : 'Please fill in this field'})
   }

   if(this.state.password == ''){
     this.setState({passwordError : 'Please fill in this field'})
   }
   return false;
  }

  else if(!this.validateEmail(this.state.email)){
      this.setState({emailError : 'Please enter a valid email address'})
      return false
  }

  else{
    return true 
  }
  
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }



  onLogin(){
    if(!this.validate()){
      return false;
    }

    else{
      auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(response=>{
      console.log(response)
    }).catch(error=>{
      switch (error.code) {
        case 'auth/user-not-found':
        this.setState({authError : 'Invalid account. Please sign up first.'})
          break;
        case 'auth/user-not-found' :
        this.setState({authError : 'Email address not valid'})
        break;
        case 'auth/wrong-password' :
        this.setState({authError : 'Password is not valid'})
        break;
        default:
          break;
      }
    })
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.emailError}
        placeholder="Email" placeholderTextColor="#ffffff"
        onChangeText={email=> this.setState({email})} />
        <Input inputContainerStyle={styles.inputBox} inputStyle= {styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.passwordError} 
        placeholder="Password" placeholderTextColor="#ffffff" secureTextEntry={true}
        onChangeText={password=> this.setState({password})} />
        <Button containerStyle={{marginVertical: 10}} buttonStyle={styles.loginBtn} titleStyle={{fontSize : 20}} 
        title="Login" type="outline" raised={true} onPress={()=> this.onLogin()} />
        <Text style={{color: 'red'}}>{this.state.authError}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
container : {
    justifyContent : 'center',
    alignItems : 'center'
},

inputBox : {
    width : 300,
    backgroundColor : 'rgba(255,255,255,0.3)',
    borderRadius : 20,
    paddingHorizontal : 16,
    marginVertical : 10
},

inputText : {
  fontSize : 16,
  color : '#ffffff',
},

loginBtn : {
width : 200,
borderRadius : 20
}
})

export default LoginForm
