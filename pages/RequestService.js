import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar,  } from 'react-native'
import {Header, Icon} from 'react-native-elements'

export class RequestServiceScreen extends Component {
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
