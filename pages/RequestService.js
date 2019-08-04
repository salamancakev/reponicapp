import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, Picker} from 'react-native'
import {Icon} from 'react-native-elements'
import  RequestGraphicDesignForm  from '../components/request/RequestGraphicDesignForm'

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
    }

    render() {
        return (
            <View style={styles.container}>
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
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1,
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
