import React, { Component } from 'react'
import { Text, ScrollView, ActivityIndicator, StyleSheet, Alert, ToastAndroid, Modal, View } from 'react-native'
import { ListItem, Icon, Button, Input } from "react-native-elements";
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
          price : null,
          priceError : '',
          loading : false,
          disabled : false,
          modalVisible :false
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
      this.setState({modalVisible : false})
      Alert.alert(
        'Accept Job',
        'Do you want to accept this job under the following conditions? Due date: '+this.state.data.dueDate+', price: $'+this.state.price,
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
        status : 'Waiting confirmation',
        memberID : this.props.userAuth.uid,
        price : this.state.price
      },
      {merge : true}).then(success=>{
        
          this.setState({loading:false, disabled :true})
        ToastAndroid.show(
          "A request has been sent to your client. We'll let you know if your client accepts your request.",
          ToastAndroid.LONG
        )
        }
      ).catch(error=>{
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
          title="Accept Job"  raised={true} onPress={()=>this.setState({modalVisible : true})} />
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={()=> {this.setState({modalVisible : false} )}}
          >
            <View style={styles.container}>
              <Text>Enter the price of your service</Text>
            <Input containerStyle={styles.inputBox} keyboardType="number-pad" placeholder="Price ($)" onChangeText={price=>{this.setState({price})}} errorStyle={{color : 'red'}} errorMessage={this.state.priceError}/>
            <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
            title="Accept Job"  raised={true} loading={this.state.loading} onPress={()=>this.onConfirm()} />
            </View>
          </Modal>
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
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={()=> {this.setState({modalVisible : false} )}}
          >
            <View style={styles.container}>
              <Text>Enter the price of your service</Text>
            <Input containerStyle={styles.inputBox} keyboardType="number-pad" placeholder="Price ($)" onChangeText={price=>{this.setState({price})}} errorStyle={{color : 'red'}} errorMessage={this.state.priceError}/>
            <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
            title="Accept Job"  raised={true} loading={this.state.loading} onPress={()=>this.onConfirm()} />
            </View>
          </Modal> 
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
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={()=> {this.setState({modalVisible : false} )}}
          >
            <View style={styles.container}>
              <Text>Enter the price of your service</Text>
            <Input containerStyle={styles.inputBox} keyboardType="number-pad" placeholder="Price ($)" onChangeText={price=>{this.setState({price})}} errorStyle={{color : 'red'}} errorMessage={this.state.priceError}/>
            <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
            title="Accept Job"  raised={true} loading={this.state.loading} onPress={()=>this.onConfirm()} />
            </View>
          </Modal> 
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
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={()=> {this.setState({modalVisible : false} )}}
          >
            <View style={styles.container}>
              <Text>Enter the price of your service</Text>
            <Input containerStyle={styles.inputBox} keyboardType="number-pad" placeholder="Price ($)" onChangeText={price=>{this.setState({price})}} errorStyle={{color : 'red'}} errorMessage={this.state.priceError}/>
            <Button containerStyle={{marginVertical: 10}} titleStyle={{fontSize : 16}} 
            title="Accept Job"  raised={true} loading={this.state.loading} onPress={()=>this.onConfirm()} />
            </View>
          </Modal> 
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
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center'

  },
  inputBox : {
    width : 300,
    backgroundColor : 'rgba(255,255,255,0.3)',
    borderRadius : 20,
    paddingHorizontal : 10,
    marginVertical : 5
  },
})