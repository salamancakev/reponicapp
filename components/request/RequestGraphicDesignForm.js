import React, { Component } from 'react'
import { Text, View, Picker, StyleSheet, TextInput, DatePickerAndroid } from 'react-native'
import {Input, Button} from 'react-native-elements'

export class RequestGraphicDesignForm extends Component {

    constructor(){
        super()
        this.state = {
            level : '',
            service : '',
            date : null
        }
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
             this.setState({date : new Date(year, month, day)})
             console.log(this.state.date)
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
    <Text style={{fontSize: 16}}>Type of Service</Text>
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
    {this.state.service == 'Other' ? <TextInput placeholder="Specify type of service"/> : null}
    <TextInput placeholder="Relevant Details"/>
    <TextInput placeholder="Possible Colors"/>
    <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 20}} 
    title="Due Date"  raised={true} onPress={()=>this.openDatePicker()} />
            </View>
        )
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
      }
})

export default RequestGraphicDesignForm
