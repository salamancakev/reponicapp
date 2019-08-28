import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Picker } from 'react-native'
import { Button, Input, AirbnbRating, CheckBox} from "react-native-elements";
import { auth, firestore, messaging } from "react-native-firebase";
import { connect } from 'react-redux'


class SignUpForm extends Component {

  constructor(){
    super()
    this.state = {
      firstName : '',
      lastName : '',
      username : '',
      email : '',
      password : '',
      confirmPassword : '',
      type : '',
      service : '',
      level : '',
      id : '',
      firstNameError : '',
      lastNameError : '',
      usernameError : '',
      emailError : '',
      passwordError : '',
      idError : '',
      authError : '',
      checked : false,
      loading : false
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

    if(this.state.confirmPassword == ''){
      this.setState({confirmPasswordError : 'Please fill in this field'})
    }

    if(this.state.firstName == ''){
      this.setState({firstNameError : 'Please fill in this field'})
    }
    
    if(this.state.lastName == ''){
      this.setState({lastNameError : 'Please fill in this field'})
    }
    if(this.state.username == ''){
      this.setState({usernameError : 'Please fill in this field'})
    }
    if(this.state.id == ''){
      this.setState({idError : 'Please fill in this field'})
    }
    return false;
   }
 
    else if(!this.validateEmail(this.state.email)){
       this.setState({emailError : 'Please enter a valid email address'})
       return false
   }

   else if(this.state.password!=this.state.confirmPassword){
     this.setState({authError : 'Passwords do not match'})
     return false
   }

   else if(!this.state.checked){
     this.setState({authError : 'Please accept the terms and conditions'})
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
     this.setState({loading : true})
     if(!this.validate()){
       this.setState({loading : false})
       return false
     }

     else{
       auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(user=>{
        auth().currentUser.sendEmailVerification().then(email=>{
          if(this.state.type = 'client'){
          firestore().collection('users').doc(this.props.userAuth.uid).set({
          firstName : this.state.firstName,
          lastName : this.state.lastName,
          username : this.state.username,
          email : this.state.email,
          id : this.state.id,
          type : this.state.type,
          fcmToken : this.props.fcmToken
        })
      
        }

        else{
          firestore().collection('users').doc(this.props.userAuth.uid).set({
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            username : this.state.username,
            email : this.state.email,
            id : this.state.id,
            type : this.state.type,
            service : this.state.service,
            level : this.state.level,
            status : 'Inactive',
            fcmToken : this.props.fcmToken
          })
        }
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
    this.setState({loading:false})
    }
    
   }


  render() {
    let serviceInput =  <View style={styles.pickerContainer}>
    <Text style={styles.pickerLabel}>Type of Service</Text>
    <Picker selectedValue={this.state.service} style={styles.pickerStyle}
    onValueChange={(itemValue, itemIndex) => this.setState({service: itemValue}) }>
    <Picker.Item label="Social Media Manager" value="Social Media Manager" />
    <Picker.Item label="Graphic Design" value="Graphic Design" />
    <Picker.Item label="Web Development" value="Web Development" />
    <Picker.Item label="Software Development" value="Software Development" />
    </Picker>
    </View>

    let levelInput = <View style={styles.pickerContainer}>
    <Text style={styles.pickerLabel}>Level</Text>
    <Picker selectedValue={this.state.level} style={styles.pickerStyle}
    onValueChange={(itemValue, itemIndex) => this.setState({level: itemValue}) }>
    <Picker.Item label="Beginner" value="Beginner" />
    <Picker.Item label="Intermidiate" value="Intermidiate" />
    <Picker.Item label="Professional" value="Professional" />
    </Picker>
    </View>


    return (
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Type of account</Text>
        <Picker selectedValue={this.state.type} style={styles.pickerStyle}
        onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue}) }>
        <Picker.Item label="Client" value="client" />
        <Picker.Item label="Member" value="member" />
        </Picker>
        </View>
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.firstNameError}
        placeholder="First Name" placeholderTextColor="#ffffff" onChangeText={firstName=>this.setState({firstName})} />
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.lastNameError}
        placeholder="Last Name" placeholderTextColor="#ffffff" onChangeText={lastName=>this.setState({lastName})} />
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.usernameError}
        placeholder="Username" placeholderTextColor="#ffffff" onChangeText={username=>this.setState({username})} />
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.emailError}
        placeholder="Email" placeholderTextColor="#ffffff" onChangeText={email=>this.setState({email})}/>
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.passwordError}
        placeholder="Password" placeholderTextColor="#ffffff" secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.confirmPasswordError}
        placeholder="Confirm Password" placeholderTextColor="#ffffff" secureTextEntry={true} onChangeText={confirmPassword=>this.setState({confirmPassword})}/>
        <Input inputContainerStyle={styles.inputBox} inputStyle={styles.inputText} errorStyle={{color : 'red'}} errorMessage={this.state.idError}
        placeholder="ID" placeholderTextColor="#ffffff" onChangeText={id=>this.setState({id})} />
        {this.state.type == 'member' ? serviceInput : null}
        {this.state.type == 'member' ? levelInput : null}  
        <CheckBox
  title='I Accept The Terms And Conditions'
  checked={this.state.checked}
  onPress = {() =>{this.setState({checked : !this.state.checked})}}
/>
        <Button containerStyle={{marginVertical: 10}} buttonStyle={styles.signupBtn} titleStyle={{fontSize : 20}} 
        title="Sign Up" type="outline" raised={true} loading={this.state.loading} onPress={()=>this.onSignup()} />
          <Text style={{color : 'red'}}>{this.state.authError}</Text>
          </View>
        
    )
  }
}



export default connect(mapStateToProps)(SignUpForm)

function mapStateToProps(state){
  return{
      userAuth : state.userAuth,
      fcmToken : state.fcmToken
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
        paddingHorizontal : 10,
        marginVertical : 5
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