import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class JobDetailsScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
        headerTitle : 'Job Details',
        headerStyle : {
          backgroundColor : '#42a5f5'
        },
        headerTintColor : '#fff',
        headerTitleStyle : {
          fontWeight : 'bold'
        }
      } 
    }

    constructor(){
        super()
        this.state = {
            
        }
    }

    render() {
        return (
            <View>
                <Text> </Text>
            </View>
        )
    }
}

export default JobDetailsScreen
