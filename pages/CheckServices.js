import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native'
import { Icon, ListItem } from "react-native-elements";
import { connect } from 'react-redux'
import { firestore } from 'react-native-firebase'

 class CheckServicesScreen extends Component {

  constructor(){
    super()
    this.state = {
        jobs : [],
        loading : true
    }
  }

    static navigationOptions = ({navigation}) => {
        return {
        headerTitle : 'Check Services',
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
    componentDidMount(){
      let service = this.props.userInfo.service
      let jobs = this.state.jobs
      console.log(service)
      
      firestore().collection('services').where('type', '==', service).where('clientID', '==', this.props.userAuth.uid).get().then(snapshot=>{
         if (snapshot.empty) {
             console.log('No matching documents.');
             this.setState({loading :false})
           }  
       
           snapshot.forEach(doc => {
             let job = {
                 id : doc.id,
                 data : doc.data()
             };
             jobs.push(job)
           }
           );
           this.setState({loading : false, jobs :jobs})
         })
         .catch(err => {
           console.log('Error getting documents', err);
         });
 
     }

     listJobs(){
      if(this.state.jobs.length == 0){
        return (<View>
          <Text>You have no requested services</Text>
        </View>
        )
      }
     return (<ScrollView>
        {this.state.jobs.map((value, key)=> {
            if(value.data.type == 'Social Media'){
              return (<ListItem key={key} 
            leftIcon={ <Icon name='share-alt' type='font-awesome' />} 
            title='Social Media' 
            subtitle={value.data.description}
            chevron
            onPress={()=>this.props.navigation.navigate('ServiceDetails',
            {
              jobDetails : value.data,
              jobID : value.id
            })}
             />)
            }

            else if(value.data.type == 'Web Design'){
              return (<ListItem key={key} 
                leftIcon={ <Icon name='window-maximize' type='font-awesome' />} 
                title='Web Design' 
                subtitle={value.data.name}
                chevron
                onPress={()=>this.props.navigation.navigate('ServiceDetails',
                {
                  jobDetails : value.data,
                  jobID : value.id
                })}
                 />)
            }

            else if(value.data.type == 'Software Development'){
              return (<ListItem key={key} 
                leftIcon={ <Icon name='database' type='font-awesome' />} 
                title='Software Development' 
                subtitle={value.data.description}
                chevron
                onPress={()=>this.props.navigation.navigate('ServiceDetails',
                {
                  jobDetails : value.data,
                  jobID : value.id
                })}
                 />)
            }
            else{
              return (<ListItem key={key} 
                leftIcon={ <Icon name='paint-brush' type='font-awesome' />} 
                title='Graphic Design' 
                subtitle={value.data.service}
                chevron
                onPress={()=>this.props.navigation.navigate('ServiceDetails',
                {
                  jobDetails : value.data,
                  jobID : value.id
                })}
                 />)
            }
            } )}
     </ScrollView>)   
        }

    render() {
      if(this.state.loading){
        return <ActivityIndicator/>
    }
    else{
     return this.listJobs() 
    }
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

function mapStateToProps(state){
  return{
      userAuth : state.userAuth,
      userInfo : state.userInfo
  }
}

export default connect(mapStateToProps)(CheckServicesScreen)
