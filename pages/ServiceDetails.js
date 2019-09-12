import React, { Component } from 'react'
import { Text, View, ScrollView, ActivityIndicator, StyleSheet, Alert, ToastAndroid} from 'react-native'
import { ListItem, Icon, Button } from "react-native-elements";
import firebase, { firestore } from "react-native-firebase";
import { connect } from "react-redux";
import { SQIPCardEntry } from "react-native-square-in-app-payments";

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
        this.onStartCardEntry = this.onStartCardEntry.bind(this);
        this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
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
        if(this.props.userInfo.type == 'client'){
          if(data.status != 'Requested'){
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
            this.setState({
              data : data,
              id :id,
  
            })
          }
          
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
          {this.state.data.status != "Requested"
          ? <ListItem leftIcon={ <Icon name='user' type='font-awesome' />} 
          title={this.state.nameTitle}
          subtitle={this.state.name}
          />
          : null}  
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
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("member")} />
          : null}
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Confirm Job Completion"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("client")} />
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
          {this.state.data.status != "Requested"
          ? <ListItem leftIcon={ <Icon name='user' type='font-awesome' />} 
          title={this.state.nameTitle}
          subtitle={this.state.name}
          />
          : null} 
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
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("member")} />
          : null}
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Confirm Job Completion"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("client")} />
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
          {this.state.data.status != "Requested"
          ? <ListItem leftIcon={ <Icon name='user' type='font-awesome' />} 
          title={this.state.nameTitle}
          subtitle={this.state.name}
          />
          : null} 
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
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("member")} />
          : null}
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Confirm Job Completion"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("client")} />
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
          {this.state.data.status != "Requested"
          ? <ListItem leftIcon={ <Icon name='user' type='font-awesome' />} 
          title={this.state.nameTitle}
          subtitle={this.state.name}
          />
          : null} 
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
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("member")} />
          : null} 
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Confirm Job Completion"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("client")} />
          : null}
          </ScrollView>
        )

    }


    onConfirm(type){
      if(type == 'member'){
       Alert.alert(
        'Finish Job',
        'Only mark a job as completed if your client already has the final product of your service. Our team will verify this with your client and process your payment. Are you sure you want to mark this job as completed?',
        [
          {text : 'Yes', onPress: ()=> this.onFinishJob(type)},
          {text : 'No', style : 'cancel'}
        ]
        
      ) 
      }

      else{
        Alert.alert(
          'Finish Job',
          'Only mark a job as completed if your worker has sent you the final product. Our team will verify this with your worker and will proceed to take your payment. Are you sure you want to mark this job as completed?',
          [
            {text : 'Yes', onPress: ()=> this.onFinishJob(type)},
            {text : 'No', style : 'cancel'}
          ]
          
        ) 
      }
      
    }

    onFinishJob(type){
      if(type == 'member'){
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

      else{
        this.onStartCardEntry()
      }
      
    }
/**
   * Callback when the card entry is closed after call 'SQIPCardEntry.completeCardEntry'
   */
  onCardEntryComplete() {
    // Update UI to notify user that the payment flow is completed
  }

  /**
   * Callback when successfully get the card nonce details for processig
   * card entry is still open and waiting for processing card nonce details
   * @param {*} cardDetails
   */
  async onCardNonceRequestSuccess(cardDetails) {
    try {
      // take payment with the card details
      // await chargeCard(cardDetails);

      // payment finished successfully
      // you must call this method to close card entry
      await SQIPCardEntry.completeCardEntry(
        this.onCardEntryComplete(),
      );
    } catch (ex) {
      // payment failed to complete due to error
      // notify card entry to show processing error
      await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    }
  }

  /**
   * Callback when card entry is cancelled and UI is closed
   */
  onCardEntryCancel() {
    // Handle the cancel callback
  }

  /**
   * An event listener to start card entry flow
   */
  async onStartCardEntry() {
    const cardEntryConfig = {
      collectPostalCode: false,
    };
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      this.onCardNonceRequestSuccess,
      this.onCardEntryCancel,
    );
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
