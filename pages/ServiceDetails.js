import React, { Component } from 'react'
import { Text, View, ScrollView, ActivityIndicator, StyleSheet, Alert, ToastAndroid} from 'react-native'
import { ListItem, Icon, Button } from "react-native-elements";
import firebase, { firestore } from "react-native-firebase";
import { connect } from "react-redux";

 class ServiceDetailsScreen extends Component {
    constructor(){
        super()
        this.state = {
            data : null,
            id : null,
            name : '',
            nameTitle : '',
            loading : false,
            disabled : false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
        headerTitle : 'Service Details',
        headerStyle : {
          backgroundColor : '#42a5f5'
        },
        headerTintColor : '#fff',
        headerTitleStyle : {
          fontWeight : 'bold'
        }
      } 
    }

    componentDidMount(){
        let data = this.props.navigation.getParam('jobDetails', null)
        let id = this.props.navigation.getParam('jobID', null)
        console.log(this.state) 
        if(this.props.userInfo.type == 'client'){
          firestore().collection('users').doc(data.memberID).get().then(doc=>{
          console.log(doc.data())
          let firstName = doc.data().firstName
          let lastName = doc.data().lastName
  
          let name = firstName+' '+lastName
          this.setState({
            data : data,
            id :id,
            name : name,
            nameTitle : 'Worker Name'
          })
  
        })
        }
        else{
          firestore().collection('users').doc(data.clientID).get().then(doc=>{
            console.log(doc.data())
            let firstName = doc.data().firstName
            let lastName = doc.data().lastName
    
            let name = firstName+' '+lastName
            this.setState({
              data : data,
              id :id,
              name : name,
              nameTitle : 'Client Name'
            })
    
          })
        }
        
      }

    showSocialMediaDetails(){
        return (
          <ScrollView >
           <ListItem leftIcon={ <Icon name='share-alt' type='font-awesome' />} 
          title='Type of Job' 
          subtitle={this.state.data.type}
          />
          <ListItem leftIcon={ <Icon name='user' type='font-awesome' />} 
          title={this.state.nameTitle}
          subtitle={this.state.name}
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
          <ListItem leftIcon={ <Icon name='check-circle' type='font-awesome' />} 
          title='Status' 
          subtitle={this.state.data.status}
          />
          {this.props.userInfo.type == 'member' && this.state.data.status != 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm()} />
          : null}
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
          title={this.state.nameTitle}
          subtitle={this.state.name}
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
          <ListItem leftIcon={ <Icon name='check-circle' type='font-awesome' />} 
          title='Status' 
          subtitle={this.state.data.status}
          />
          {this.props.userInfo.type == 'member' && this.state.data.status != 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm()} />
          : null}
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
          title={this.state.nameTitle}
          subtitle={this.state.name}
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
          <ListItem leftIcon={ <Icon name='check-circle' type='font-awesome' />} 
          title='Status' 
          subtitle={this.state.data.status}
          />
          {this.props.userInfo.type == 'member' && this.state.data.status != 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm()} />
          : null}
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
          title={this.state.nameTitle}
          subtitle={this.state.name}
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
          <ListItem leftIcon={ <Icon name='check-circle' type='font-awesome' />} 
          title='Status' 
          subtitle={this.state.data.status}
          />
          {this.props.userInfo.type == 'member' && this.state.data.status != 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm()} />
          : null} 
          </ScrollView>
        )

    }


    onConfirm(){
      Alert.alert(
        'Finish Job',
        'Only mark a job as completed if your client already has the final product of your service. Our team will verify this with your client and process your payment. Are you sure you want to mark this job as completed?',
        [
          {text : 'Yes', onPress: ()=> this.onFinishJob()},
          {text : 'No', style : 'cancel'}
        ]
        
      )
    }

    onFinishJob(){
      this.setState({loading : true})
      firestore().collection('services').doc(this.state.id).update({
        status : 'Completed'
      }).then(success=>{
        this.setState({
          loading : false,
          disabled : true
        })
        ToastAndroid.show("You marked this job as completed. We'll let you know as soon as your client confirms this.", ToastAndroid.LONG)
      })
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
function mapStateToProps(state){
  return{
      userAuth : state.userAuth,
      userInfo : state.userInfo
  }
}

export default connect(mapStateToProps)(ServiceDetailsScreen)
