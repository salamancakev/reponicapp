import React, { Component } from 'react'
import { Text, View, Picker, StyleSheet, DatePickerAndroid, Alert } from 'react-native'
import {Input, Button} from 'react-native-elements'
import { firestore } from 'react-native-firebase'
import { connect } from 'react-redux'
import { SQIPCardEntry } from "react-native-square-in-app-payments";

class RequestGraphicDesignForm extends Component {

    constructor(){
        super()
        this.state = {
            level : 'Beginner',
            service : 'Logo',
            details : '',
            detailsError : '',
            colors : '',
            colorsError : '',
            date : '',
            loading : false
        }
        this.onStartCardEntry = this.onStartCardEntry.bind(this);
        this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
    }
    onRequestService(){
      this.setState({loading : true})
      let dueDate =  this.state.date

      if(this.state.details == '' || this.state.colors == ''){
       if(this.state.details == ''){
       this.setState({detailsError : 'Please fill in this field'})

      }
      if(this.state.colors == ''){
        this.setState({colorsError : 'Please fill in this field'})
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
      
      this.onStartCardEntry()
    }


    /**
   * Callback when the card entry is closed after call 'SQIPCardEntry.completeCardEntry'
   */
  onCardEntryComplete() {
    // Update UI to notify user that the payment flow is completed
    firestore().collection('services').add({
        clientID : this.props.userAuth.uid,
        type : 'Graphic Design',
        level : this.state.level,
        service : this.state.service,
        details : this.state.details,
        colors : this.state.colors,
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

  /**
   * Callback when successfully get the card nonce details for processig
   * card entry is still open and waiting for processing card nonce details
   * @param {*} cardDetails
   */
  async onCardNonceRequestSuccess(cardDetails) {
    try {
      // take payment with the card details
      // await chargeCard(cardDetails);

      // payment finished successfully
      // you must call this method to close card entry
      await SQIPCardEntry.completeCardEntry(
        this.onCardEntryComplete(),
      );
    } catch (ex) {
      // payment failed to complete due to error
      // notify card entry to show processing error
      await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    }
  }

  /**
   * Callback when card entry is cancelled and UI is closed
   */
  onCardEntryCancel() {
    // Handle the cancel callback
  }

  /**
   * An event listener to start card entry flow
   */
  async onStartCardEntry() {
    const cardEntryConfig = {
      collectPostalCode: false,
    };
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      (cardDetails)=>{this.onCardNonceRequestSuccess(cardDetails)},
      this.onCardEntryCancel,
    );
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
                <View style={styles.pickerContainer}>
    <Text style={{fontSize: 16}}>Type of service</Text>
    <Picker selectedValue={this.state.service} style={styles.pickerStyle}
    onValueChange={(itemValue, itemIndex) => this.setState({service: itemValue}) }>
    <Picker.Item label="Logo" value="Logo" />
    <Picker.Item label="Letterhead" value="Letterhead" />
    <Picker.Item label="Business Card" value="Business Card" />
    <Picker.Item label="Flyer" value="Flyer" />
    <Picker.Item label="Birthday Card" value="Birthday Card" />
    <Picker.Item label="Invitation" value="Invitation" />
    <Picker.Item label="Card" value="Card" />
    <Picker.Item label="Other" value="Other" />
    </Picker>
    </View>
    {this.state.service == 'Other' ? <Input containerStyle={styles.inputBox} placeholder="Specify type of service"/> : null}
    <Input containerStyle={styles.inputBox} placeholder="Relevant Details" onChangeText={details=>{this.setState({details})}} errorStyle={{color : 'red'}} errorMessage={this.state.detailsError}/>
    <Input containerStyle={styles.inputBox} placeholder="Possible Colors" onChangeText={colors=>{this.setState({colors})}} errorStyle={{color : 'red'}} errorMessage={this.state.colorsError}/>
    <View style={styles.dateContainer}>
      <Text style={{fontSize:16}} > {this.state.date =='' ? 'Select due date' : 'Due date: '+this.state.date} </Text>
      <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
    title="Due Date"  raised={true} onPress={()=>this.openDatePicker()} />
    </View>

    <Button containerStyle={{marginVertical:10}} buttonStyle={styles.submitBtn} titleStyle={{fontSize:20}} title='Request Service' raised={true} loading={this.state.loading} onPress={()=>{this.onRequestService()}} />
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


export default connect(mapStateToProps) (RequestGraphicDesignForm)


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