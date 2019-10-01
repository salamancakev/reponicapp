import React, { Component } from 'react'
import { Text, View, ScrollView, ActivityIndicator, StyleSheet, Alert, ToastAndroid} from 'react-native'
import { ListItem, Icon, Button } from "react-native-elements";
import firebase, { firestore } from "react-native-firebase";
import { connect } from "react-redux";
import stripe from "tipsi-stripe";

stripe.setOptions({
  publishableKey: 'pk_test_E5F3R2AKL4rys1KjNHOdd1ek00WsTuJFZE',
});

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
            nameTitle : 'Worker Name',
            fcmToken : doc.data().fcmToken
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


    renderJobConfirmationDetails(){
      return (
      <View>
        <ListItem leftIcon={ <Icon name='credit-card' type='font-awesome' />} 
          title='Price' 
          subtitle={'$ '+this.state.data.price}
          />
          <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Accept/Decline Job"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onAcceptConfirm()} />
      </View>
        
      )
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
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Waiting confirmation' 
          ? this.renderJobConfirmationDetails()
          : null}
          {this.props.userInfo.type == 'member' && this.state.data.status != 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("member")} />
          : null}
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Waiting completion'
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
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Waiting confirmation' 
          ? this.renderJobConfirmationDetails()
          : null}
          {this.props.userInfo.type == 'member' && this.state.data.status != 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("member")} />
          : null}
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Waiting completion'
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
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Waiting confirmation' 
          ? this.renderJobConfirmationDetails()
          : null}
          {this.props.userInfo.type == 'member' && this.state.data.status != 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("member")} />
          : null}
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Waiting completion'
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
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Waiting confirmation' 
          ? this.renderJobConfirmationDetails()
          : null}
          {this.props.userInfo.type == 'member' && this.state.data.status != 'Completed'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Mark Job as Completed"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("member")} />
          : null} 
          {this.props.userInfo.type == 'client' && this.state.data.status == 'Waiting completion'
          ? <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
          title="Confirm Job Completion"  raised={true} loading={this.state.loading} disabled={this.state.disabled} onPress={()=>this.onConfirm("client")} />
          : null}
          </ScrollView>
        )

    }


    onAcceptConfirm(){
      Alert.alert(
        'Accept/Decline Job Request',
        'Do you want to accept this job under the following conditions? Due date: '+this.state.data.dueDate+', price: $'+this.state.data.price,
        [
          {text : 'Accept', onPress: ()=> this.requestPayment()},
          {text : 'Decline', style : 'cancel', onPress: ()=>this.onDeclineJob()}
        ]
        
      ) 
    }

    onDeclineJob(){
      this.setState({loading : true}) 
      firestore().collection('services').doc(this.state.id).update({
        status : 'Requested'
      }).then(success=>{
        this.setState({loading:false, disabled :true})
        ToastAndroid.show(
          'You have declined this request. You can still recieve future offers from our workers.',
          ToastAndroid.LONG
        )
      })
    }

    requestPayment(){
      stripe.paymentRequestWithCardForm()
      .then(stripeTokenInfo =>{
        console.log('Token created');
        fetch('https://reponic-app-payments-server.herokuapp.com/charge-card', {
          method : 'POST',
          headers : {
          'Content-Type': 'application/json',
          },
          body : JSON.stringify({
            amount : this.state.data.price,
            tokenId: stripeTokenInfo.tokenId
          })
        })
        .then(response=>{
          console.log(response)
          if(response.status = 200){
            this.onAcceptJob()
          }
          else{
            Alert.alert(
              'Something went wrong',
              'Try again later.',
              [
                {text : 'OK', onPress: ()=>{console.log('OK pressed')}}
              ]
            )
            this.setState({loading:false})
            return false
          }
        })
      })
      .catch(error=>{
        console.log('Payment failed', { error });
        Alert.alert(
          'Something went wrong',
          'Try again later.',
          [
            {text : 'OK', onPress: ()=>{console.log('OK pressed')}}
          ]
        )
        this.setState({loading:false})
        return false
      })
    }

    onAcceptJob(){
      let firstName = this.props.userInfo.firstName
      let lastName = this.props.userInfo.lastName
      let clientName = firstName+' '+lastName
      this.setState({loading : true})
      firestore().collection('services').doc(this.state.id).update({
        status : 'In Progress'
      }).then(success=>{
        firestore().collection('chats').add({
          clientID : this.state.data.clientID,
          clientName : clientName,
          clientFcmToken : this.props.userInfo.fcmToken,
          memberID : this.props.userAuth.uid,
          memberName : this.state.name,
          memberFcmToken : this.state.fcmToken,
          messages : []
        }).then(success2=>{
          this.setState({loading:false, disabled :true})
        ToastAndroid.show(
          'You have accepted the job. A chat has been created between you and your worker.',
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
          'Only mark a job as completed if your worker has sent you the final product. Our team will verify this with your worker. Are you sure you want to mark this job as completed?',
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
        status : 'Waiting completion'
      }).then(success=>{
        this.setState({
          loading : false,
          disabled : true
        })
        ToastAndroid.show("You marked this job as completed. We'll let you know as soon as your client confirms this.", ToastAndroid.LONG)
      }) 
      }

      else{
        this.setState({loading : true})
      firestore().collection('services').doc(this.state.id).update({
        status : 'Completed'
      }).then(success=>{
        this.setState({
          loading : false,
          disabled : true
        })
        ToastAndroid.show("You marked this job as completed. Thanks for using Reponic App!", ToastAndroid.LONG)
      }) 
      }
      
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
