import React, { Component } from 'react'
import { Text, View, Picker, StyleSheet, DatePickerAndroid, Alert } from 'react-native'
import {Input, Button} from 'react-native-elements'
import { firestore } from 'react-native-firebase'
import { connect } from 'react-redux'


export class RequestSoftwareDevelopmentForm extends Component {

    constructor(){
        super()
        this.state = {
            level : 'Beginner',
            service : 'Software Development',
            description : '',
            details : '',
            username : '',
            platforms : '',
            date : null,
            loading : false
        }
    }

    onRequestService(){
        this.setState({loading : true})
        firestore().collection('services').add({
          clientID : this.props.userAuth.uid,
          type : 'Social Media',
          level : this.state.level,
          service : this.state.service,
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
          console.error(error)
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
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}


export default RequestSoftwareDevelopmentForm
