import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {Icon} from 'react-native-elements'

export class PaymentMethodScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
        headerTitle : 'Payment Method',
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
                <Text> Coming Soon </Text>
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

export default PaymentMethodScreen
