import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class MemberHomeScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
        headerTitle : 'Home',
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
            <View>
                <Text> Welcome Home </Text>
            </View>
        )
    }
}

export default MemberHomeScreen
