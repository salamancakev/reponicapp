import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Picker } from 'react-native'
import { Button, Input} from "react-native-elements";
import { auth, firestore } from "react-native-firebase";
export class SignUpForm extends Component {

  constructor(){
    super()
    this.state = {
      name : '',
      email : '',
      password : '',
      type : 'personal',
      nameError : '',
      emailError : '',
      passwordError : '',
      authError : ''
    }
  }

  validate(){
    console.log('Hey')
    this.setState({emailError : '', passwordError : '', nameError : ''})
   if(this.state.email == '' || this.state.password == '' || this.state.name == ''){
     if(this.state.email == ''){
      this.setState({emailError : 'Please fill in this field'})
    }
 
    if(this.state.password == ''){
      this.setState({passwordError : 'Please fill in this field'})
    }

    if(this.state.name == ''){
      this.setState({nameError : 'Please fill in this field'})
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


   onSignup(){
     if(!this.validate()){
       return false
     }

     else{
       auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(user=>{

        firestore().collection('users').add({
          name : this.state.name,
          email : this.state.email,
          type : this.state.type
        })
      
    }).catch(error=>{
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.setState({authError : 'Email address is already in use'})
          break;
        
        case 'auth/weak-password' :
          this.setState({authError : 'Password is not strong enough'})
          break;
        default:
          break;
      }
    })
    
    }
    
   }


  render() {
    const personalInput = <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.nameError}
    placeholder="Name" placeholderTextColor="#ffffff" onChangeText={name=>this.setState({name})} />
    
    const companyInput = <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.nameError}
        placeholder="Company Name" placeholderTextColor="#ffffff" onChangeText={name=>this.setState({name})}/>
    return (
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Type of account</Text>
        <Picker selectedValue={this.state.type} style={styles.pickerStyle}
        onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue}) }>
        <Picker.Item label="Personal" value="personal" />
        <Picker.Item label="Company" value="company" />
        </Picker>
        </View>
        {this.state.type == 'personal' ? personalInput : companyInput}
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.emailError}
        placeholder="Email" placeholderTextColor="#ffffff" onChangeText={email=>this.setState({email})}/>
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.passwordError}
        placeholder="Password" placeholderTextColor="#ffffff" secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
        <Button containerStyle={{marginVertical: 10}} buttonStyle={styles.signupBtn} titleStyle={{fontSize : 20}} 
        title="Sign Up" type="outline" raised={true} onPress={()=>this.onSignup()} />
          <Text style={{color : 'red'}}>{this.state.authError}</Text>
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

    pickerContainer : {
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-between',
      width : 300,
    },

    pickerLabel : {
      color : '#ffffff',
      fontSize : 16
    },

    pickerStyle : {
      height: 50, 
      width: 150,
      color : '#ffffff',
    },
    
    signupBtn : {
    width : 200,
    borderRadius : 20,
    }
    })

export default SignUpForm
