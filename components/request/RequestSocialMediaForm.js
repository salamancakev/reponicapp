import React, { Component } from 'react'
import { Text, View, Picker, StyleSheet, DatePickerAndroid, Alert } from 'react-native'
import {Input, Button} from 'react-native-elements'
import { firestore, functions } from 'react-native-firebase'
import { connect } from 'react-redux'
import stripe from "tipsi-stripe";

stripe.setOptions({
  publishableKey: 'pk_test_E5F3R2AKL4rys1KjNHOdd1ek00WsTuJFZE',
});

 class RequestSocialMediaForm extends Component {

    constructor(){
        super()
        this.state = {
            level : 'Beginner',
            description : '',
            descriptionError : '',
            details : '',
            detailsError : '',
            username : '',
            usernameError : '',
            platforms : '',
            platformsError :'',
            date : '',
            loading : false
        }
    }

    onRequestService(){
      this.setState({loading : true})
      let dueDate = this.state.date
      if(this.state.details == '' || this.state.description == '' || this.state.username == '' || this.state.platforms == ''){
       if(this.state.details == ''){
        this.setState({detailsError : 'Please fill in this field'})
       }
      if(this.state.description == ''){
        this.setState({descriptionError : 'Please fill in this field'})
       }
      if(this.state.username == ''){
        this.setState({usernameError : 'Please fill in this field'})
       }
      if(this.state.platforms == ''){
        this.setState({platformsError : 'Please fill in this field'})
       } 
       this.setState({loading : false})
       return false 
      }
      

      if(dueDate == ''){
        let date = new Date()
        date.setDate(date.getDate() + 7)
        let day = date.getDate() 
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        dueDate = day+'/'+month+'/'+year
        this.setState({date : dueDate})
      }

      this.requestPayment()

        }
  
  requestPayment(){
    stripe.paymentRequestWithCardForm()
    .then(stripeTokenInfo =>{
      console.log('Token created');
      fetch('http://192.168.1.106:8080/charge-card', {
        method : 'POST',
        headers : {
        'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          amount : 100,
          tokenId: stripeTokenInfo.tokenId
        })
      })
      .then(response=>{
        console.log(response)
        if(response.status = 200){
          this.onSuccess()
        }
        else{
          Alert.alert(
            'Something went wrong',
            'Try again later.',
            [
              {text : 'OK', onPress: ()=>{console.log('OK pressed')}}
            ]
          )
          this.setState({loading:false})
          return false
        }
      })
    })
    .catch(error=>{
      console.log('Payment failed', { error });
      Alert.alert(
        'Something went wrong',
        'Try again later.',
        [
          {text : 'OK', onPress: ()=>{console.log('OK pressed')}}
        ]
      )
      this.setState({loading:false})
      return false
    })
  }



  onSuccess() {
      firestore().collection('services').add({
      clientID : this.props.userAuth.uid,
      type : 'Social Media',
      level : this.state.level,
      description : this.state.description,
      details : this.state.details,
      platforms : this.state.platforms,
      username : this.state.username,
      dueDate : this.state.date,
      status : 'Requested'
    }).then(service=>{
      this.setState({loading:false})
      Alert.alert(
        'Service Requested',
        'Your request has been sent. You will recieve a notification once one of our workers accepts the job.',
        [
          {text : 'OK', onPress: ()=>{console.log('OK pressed')}}
        ]
      )
    }).catch(error=>{
      this.setState({loading:false})
      })
    
  }



      async openDatePicker(){
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
             let dueMonth = month+1
             let dueDate = day+'/'+dueMonth+'/'+year
             this.setState({date : dueDate})
             
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.pickerContainer}>
    <Text style={{fontSize: 16}}>Level</Text>
    <Picker selectedValue={this.state.level} style={styles.pickerStyle}
    onValueChange={(itemValue, itemIndex) => this.setState({level: itemValue}) }>
    <Picker.Item label="Beginner" value="Beginner" />
    <Picker.Item label="Intermidiate" value="Intermidiate" />
    <Picker.Item label="Professional" value="Professional" />
    </Picker>
    </View>
    <Input containerStyle={styles.inputBox} placeholder="Short Description" onChangeText={description=>{this.setState({description})}} errorStyle={{color : 'red'}} errorMessage={this.state.descriptionError}/>
    <Input containerStyle={styles.inputBox} placeholder="Relevant Details" onChangeText={details=>{this.setState({details})}} errorStyle={{color : 'red'}} errorMessage={this.state.detailsError}/>
    <Input containerStyle={styles.inputBox} placeholder="Account Username" onChangeText={username=>{this.setState({username})}} errorStyle={{color : 'red'}} errorMessage={this.state.usernameError}/>
    <Input containerStyle={styles.inputBox} placeholder="Social Media Platforms" onChangeText={platforms=>{this.setState({platforms})}} errorStyle={{color : 'red'}} errorMessage={this.state.platformsError}/>
    
    <View style={styles.dateContainer}>
      <Text style={{fontSize:16}} > {this.state.date=='' ? 'Select due date' : 'Due date: '+this.state.date} </Text>
      <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
    title="Due Date"  raised={true} onPress={()=>this.openDatePicker()} />
    </View>

    <Button containerStyle={{marginVertical:10}} buttonStyle={styles.submitBtn} titleStyle={{fontSize:20}} title='Request Service' raised={true} loading={this.state.loading} onPress={()=>{this.onRequestService()}} />
            </View>
        )
    }
}

export default connect(mapStateToProps) (RequestSocialMediaForm)


function mapStateToProps(state){
    return{
        userAuth : state.userAuth,
        userInfo : state.userInfo
    }
  }


const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        justifyContent : 'center'
    },
    pickerContainer : {
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
        width : 300,
        marginVertical : 5
      },
      pickerStyle : {
        height : 50,
        width : 150,
        marginLeft: 10
      },
      inputBox : {
        width : 300,
        backgroundColor : 'rgba(255,255,255,0.3)',
        borderRadius : 20,
        paddingHorizontal : 10,
        marginVertical : 5
      },

      dateContainer :{
        width : 300,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
      },
      submitBtn : {
        width : 200,
        backgroundColor: '#5cb85c'
      }
})