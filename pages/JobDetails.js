import React, { Component } from 'react'
import { Text, ScrollView, ActivityIndicator, StyleSheet, Alert, ToastAndroid } from 'react-native'
import { ListItem, Icon, Button } from "react-native-elements";
import { firestore } from "react-native-firebase";
import { connect } from "react-redux";

 class JobDetailsScreen extends Component {

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
          data : null,
          id : null,
          clientName : '',
          loading : false,
          disabled : false
        }
    }


    componentDidMount(){
      let data = this.props.navigation.getParam('jobDetails', null)
      let id = this.props.navigation.getParam('jobID', null)
      console.log(this.state) 
      firestore().collection('users').doc(data.clientID).get().then(doc=>{
        console.log(doc.data())
        let firstName = doc.data().firstName
        let lastName = doc.data().lastName

        let name = firstName+' '+lastName
        this.setState({
          data : data,
          id :id,
          clientName : name
        })

      })
    }

    onConfirm(){
      Alert.alert(
        'Accept Job',
        'Do you want to accept this job? A notification will be sent to the client and a chat will be created',
        [
          {text : 'Yes', onPress: ()=> this.onAcceptJob()},
          {text : 'No', style : 'cancel'}
        ]
        
      )
    }

    onAcceptJob(){
      let memberName = this.props.userInfo.firstName+' '+this.props.userInfo.lastName
      this.setState({loading : true})
      firestore().collection('services').doc(this.state.id).set({
        status : 'In Progress',
        memberID : this.props.userAuth.uid
      },
      {merge : true}).then(success=>{
        firestore().collection('chats').add({
          clientID : this.state.data.clientID,
          clientName : this.state.clientName,
          clientFcmToken : this.state.data.clientFcmToken,
          memberID : this.props.userAuth.uid,
          memberName : memberName,
          memberFcmToken : this.props.userInfo.fcmToken,
          messages : []
        }).then(success2=>{
          this.setState({loading:false, disabled :true})
        ToastAndroid.show(
          'You have accepted the job',
          ToastAndroid.LONG
        )
        })
      }).catch(error=>{
        console.log(error)
        this.setState({loading :false})
        ToastAndroid.show(
          'Something went wrong',
          ToastAndroid.LONG
        )
      })
    }

    showSocialMediaDetails(){
        return (
          <ScrollView >
           <ListItem leftIcon={ <Icon name='share-alt' type='font-awesome' />} 
          title='Type of Job' 
          subtitle={this.state.data.type}
          />
          <ListItem leftIcon={ <Icon name='user' type='font-awesome' />} 
          title='Client' 
          subtitle={this.state.clientName}
          />
          <ListItem leftIcon={ <Icon name='edit' type='font-awesome' />} 
          title='Description' 
          subtitle={this.state.data.description}
          />
          <ListItem leftIcon={ <Icon name='clipboard' type='font-awesome' />} 
          title='Details' 
          subtitle={this.state.data.details}
          />
          <ListItem leftIcon={ <Icon name='star' type='font-awesome' />} 
          title='Level' 
          subtitle={this.state.data.level}
          />
          <ListItem leftIcon={ <Icon name='thumbs-up' type='font-awesome' />} 
          title='Platforms' 
          subtitle={this.state.data.platforms}
          /> 
          <ListItem leftIcon={ <Icon name='user-circle' type='font-awesome' />} 
          title='Account Username' 
          subtitle={this.state.data.username}
          /> 
          <ListItem leftIcon={ <Icon name='calendar' type='font-awesome' />} 
          title='Due Date' 
          subtitle={this.state.data.dueDate}
          />
          <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Accept Job"  raised={true} loading={this.state.loading} onPress={()=>this.onConfirm()} />
          </ScrollView>
          
        )

    }

    showGraphicDesignDetails(){
        return (
          <ScrollView>
           <ListItem leftIcon={ <Icon name='share-alt' type='font-awesome' />} 
          title='Type of Job' 
          subtitle={this.state.data.type}
          />
          <ListItem leftIcon={ <Icon name='user' type='font-awesome' />} 
          title='Client' 
          subtitle={this.state.clientName}
          />
          <ListItem leftIcon={ <Icon name='paint-brush' type='font-awesome' />} 
          title='Type of Service' 
          subtitle={this.state.data.service}
          />
          <ListItem leftIcon={ <Icon name='clipboard' type='font-awesome' />} 
          title='Details' 
          subtitle={this.state.data.details}
          />
          <ListItem leftIcon={ <Icon name='star' type='font-awesome' />} 
          title='Level' 
          subtitle={this.state.data.level}
          />
          <ListItem leftIcon={ <Icon name='tint' type='font-awesome' />} 
          title='Possible Colors' 
          subtitle={this.state.data.colors}
          />
          <ListItem leftIcon={ <Icon name='calendar' type='font-awesome' />} 
          title='Due Date' 
          subtitle={this.state.data.dueDate}
          /> 
          <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Accept Job"  raised={true} loading={this.state.loading} onPress={()=>this.onConfirm()} />
          </ScrollView>
        )

    }
    showWebDesignDetails(){
        return (
          <ScrollView>
           <ListItem leftIcon={ <Icon name='code' type='font-awesome' />} 
          title='Type of Job' 
          subtitle={this.state.data.type}
          />
          <ListItem leftIcon={ <Icon name='user' type='font-awesome' />} 
          title='Client' 
          subtitle={this.state.clientName}
          />
          <ListItem leftIcon={ <Icon name='clipboard' type='font-awesome' />} 
          title='Details' 
          subtitle={this.state.data.details}
          />
          <ListItem leftIcon={ <Icon name='star' type='font-awesome' />} 
          title='Level' 
          subtitle={this.state.data.level}
          />
          <ListItem leftIcon={ <Icon name='copyright' type='font-awesome' />} 
          title='Brand Name' 
          subtitle={this.state.data.name}
          />
          <ListItem leftIcon={ <Icon name='window-maximize' type='font-awesome' />} 
          title='Topic' 
          subtitle={this.state.data.topic}
          />
          <ListItem leftIcon={ <Icon name='globe' type='font-awesome' />} 
          title='Domain' 
          subtitle={this.state.data.domain}
          />
          <ListItem leftIcon={ <Icon name='server' type='font-awesome' />} 
          title='Hosting' 
          subtitle={this.state.data.hosting}
          />
          <ListItem leftIcon={ <Icon name='calendar' type='font-awesome' />} 
          title='Due Date' 
          subtitle={this.state.data.dueDate}
          /> 
          <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Accept Job"  raised={true} loading={this.state.loading} onPress={()=>this.onConfirm()} />
          </ScrollView>
        )

    }

    showSoftwareDevelopmentDetails(){
        return (
          <ScrollView >
           <ListItem leftIcon={ <Icon name='share-alt' type='font-awesome' />} 
          title='Type of Job' 
          subtitle={this.state.data.type}
          />
          <ListItem leftIcon={ <Icon name='user' type='font-awesome' />} 
          title='Client' 
          subtitle={this.state.clientName}
          />
          <ListItem leftIcon={ <Icon name='clipboard' type='font-awesome' />} 
          title='Details' 
          subtitle={this.state.data.details}
          />
          <ListItem leftIcon={ <Icon name='star' type='font-awesome' />} 
          title='Level' 
          subtitle={this.state.data.level}
          />
          <ListItem leftIcon={ <Icon name='copyright' type='font-awesome' />} 
          title='Brand Name' 
          subtitle={this.state.data.name}
          />
          <ListItem leftIcon={ <Icon name='window-maximize' type='font-awesome' />} 
          title='Topic' 
          subtitle={this.state.data.topic}
          />
          <ListItem leftIcon={ <Icon name='globe' type='font-awesome' />} 
          title='Domain' 
          subtitle={this.state.data.domain}
          />
          <ListItem leftIcon={ <Icon name='server' type='font-awesome' />} 
          title='Hosting' 
          subtitle={this.state.data.hosting}
          />
          <ListItem leftIcon={ <Icon name='calendar' type='font-awesome' />} 
          title='Due Date' 
          subtitle={this.state.data.dueDate}
          /> 
          <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Accept Job"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm()} />
          </ScrollView>
        )

    }

    render() {
      if(this.state.data == null){
        return <ActivityIndicator />
      }
      else{
        switch (this.state.data.type) {
          case 'Social Media':
            return this.showSocialMediaDetails()
          case 'Graphic Design':
            return this.showGraphicDesignDetails()
          case 'Web Design':
            return this.showWebDesignDetails()
          case 'Software Development':
            return this.showSoftwareDevelopmentDetails()
          default:
            break;
        }
      }
        
    }
}

export default connect(mapStateToProps)(JobDetailsScreen)

function mapStateToProps(state){
  return{
      userAuth : state.userAuth,
      userInfo : state.userInfo
  }
}

const styles = StyleSheet.create({
  container : {
    justifyContent : 'center',
    alignItems : 'center'

  }
})