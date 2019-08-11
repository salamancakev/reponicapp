import React, { Component } from 'react'
import { Text, View, Picker, StyleSheet, DatePickerAndroid, Alert } from 'react-native'
import {Input, Button, CheckBox} from 'react-native-elements'
import { firestore } from 'react-native-firebase'
import { connect } from 'react-redux'

 class RequestWebDesignForm extends Component {

    constructor(){
        super()
        this.state = {
            level : 'Beginner',
            service : 'Web Design',
            topic : '',
            topicError : '',
            details : '',
            detailsError : '',
            name : '',
            nameError : '',
            hasDomain : false,
            domain : '',
            hasHosting : false,
            hosting : '',
            date : null,
            loading : false
        }
    }

    onRequestService(){
      let dueDate = this.state.date
      if(this.state.details == '' || this.state.topic == '' || this.state.name == ''){
        if(this.state.details == ''){
        this.setState({detailsError : 'Please fill in this field'})
       }

       if(this.state.topic == ''){
        this.setState({topicError : 'Please fill in this field'})
       }

       if(this.state.name == ''){
        this.setState({nameError : 'Please fill in this field'})
       }
       return false 
      }
      

       if(dueDate == ''){
        let date = new Date()
        date.setDate(date.getDate() + 7)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        dueDate = day+'/'+month+'/'+year
      }

        this.setState({loading : true})
        firestore().collection('services').add({
          clientID : this.props.userAuth.uid,
          type : 'Web Design',
          level : this.state.level,
          service : this.state.service,
          topic : this.state.topic,
          details : this.state.details,
          name : this.state.name,
          domain : this.state.domain,
          hosting : this.state.hosting,
          dueDate : dueDate,
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
<Input containerStyle={styles.inputBox} placeholder="Website Topic" onChangeText={topic=>{this.setState({topic})}} errorStyle={{color : 'red'}} errorMessage={this.state.topicError}/>
<Input containerStyle={styles.inputBox} placeholder="Relevant Details" onChangeText={details=>{this.setState({details})}} errorStyle={{color : 'red'}} errorMessage={this.state.detailsError}/>
<Input containerStyle={styles.inputBox} placeholder="Brand Name" onChangeText={name=>{this.setState({name})}} errorStyle={{color : 'red'}} errorMessage={this.state.nameError}/>

<CheckBox title="Do you have a domain?" center checked={this.state.hasDomain} onPress={()=>{this.setState({hasDomain : !this.state.hasDomain})}} />

{this.state.hasDomain ? <Input containerStyle={styles.inputBox} placeholder="Domain" onChangeText={domain=>{this.setState({domain})}} /> : null}

<CheckBox title="Do you have hosting?" center checked={this.state.hasHosting} onPress={()=>{this.setState({hasHosting : !this.state.hasHosting})}} />

{this.state.hasHosting ? <Input containerStyle={styles.inputBox} placeholder="Hosting" onChangeText={hosting=>{this.setState({hosting})}} /> : null}

<View style={styles.dateContainer}>
  <Text style={{fontSize:16}} > {!this.state.date ? 'Select due date' : 'Due date: '+this.state.date} </Text>
  <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
title="Due Date"  raised={true} onPress={()=>this.openDatePicker()} />
</View>

<Button containerStyle={{marginVertical:10}} buttonStyle={styles.submitBtn} titleStyle={{fontSize:20}} title='Request Service' raised={true} loading={this.state.loading} onPress={()=>{this.onRequestService()}} />
        </View>
        )
    }
}

export default connect(mapStateToProps) (RequestWebDesignForm)

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