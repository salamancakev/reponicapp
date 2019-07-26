import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar,  } from 'react-native'

export class RequestServiceScreen extends Component {

    static navigationOptions = {
        title : 'Request Service',
        headerStyle : {
          backgroundColor : '#42a5f5'
        },
        headerTintColor : '#fff',
        headerTitleStyle : {
          fontWeight : 'bold'
        }
      }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#0077c2' barStyle='light-content' />
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})
export default RequestServiceScreen
