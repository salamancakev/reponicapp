import React, { Component } from 'react'
import { Text, View, ScrollView, ActivityIndicator, StyleSheet} from 'react-native'
import { ListItem, Icon, Button } from "react-native-elements";
import { firestore } from "react-native-firebase";

export class ServiceDetailsScreen extends Component {
    constructor(){
        super()
        this.state = {
            data : null,
            id : null,
            memberName : '',
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
        firestore().collection('users').doc(data.memberID).get().then(doc=>{
          console.log(doc.data())
          let firstName = doc.data().firstName
          let lastName = doc.data().lastName
  
          let name = firstName+' '+lastName
          this.setState({
            data : data,
            id :id,
            memberName : name
          })
  
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
          title='Worker Name' 
          subtitle={this.state.memberName}
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
          title='Worker Name' 
          subtitle={this.state.memberName}
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
          title='Worker Name' 
          subtitle={this.state.memberName}
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
          title='Worker Name' 
          subtitle={this.state.memberName}
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

export default ServiceDetailsScreen
