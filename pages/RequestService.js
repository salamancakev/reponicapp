import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, Picker, ScrollView} from 'react-native'
import {Icon} from 'react-native-elements'
import  RequestGraphicDesignForm  from '../components/request/RequestGraphicDesignForm'
import  RequestSocialMediaForm from "../components/request/RequestSocialMediaForm";
import  RequestWebDesignForm from "../components/request/RequestWebDesignForm";

export class RequestServiceScreen extends Component {

    constructor(){
      super()
      this.state = {
        type : 'Graphic Design'
      }
    }
    static navigationOptions = ({navigation}) => {
        return {
        headerTitle : 'Request Service',
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

    renderForm(){
      if(this.state.type == 'Graphic Design'){
        return <RequestGraphicDesignForm />
      }
      else if(this.state.type == 'Social Media'){
        return <RequestSocialMediaForm />
      }
      else if (this.state.type == 'Web Design'){
        return <RequestWebDesignForm />
      }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor='#0077c2' barStyle='light-content' />
                <View style={styles.pickerContainer}>
                  <Text style={{fontSize:16}}>Select type of service</Text>
                   <Picker selectedValue={this.state.type} style={styles.pickerStyle} 
                   onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue}) }>
                  <Picker.Item label="Graphic Design" value="Graphic Design" />
                  <Picker.Item label="Social Media" value="Social Media" />
                  <Picker.Item label="Web Design" value="Web Design" />
                  <Picker.Item label="Software Development" value="Software Development" />
                </Picker>
                </View>
                {this.renderForm()}
            </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        paddingVertical : 20
    },
    pickerContainer : {
      flexDirection : "row",
      justifyContent : 'space-between',
      alignItems : 'center',
      width : 300
    },
    pickerStyle : {
      height : 50,
      width : 150,
      marginLeft: 10
    },
    
})
export default RequestServiceScreen
