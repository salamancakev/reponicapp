const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.send_job_notification = functions.firestore.document('services/{serviceId}').onCreate((snap, context)=>{

    let newJob = snap.data()

    let payload = {
        notification : {
            title : 'New Jobs',
            body : 'There are new jobs available for you'
        }
    }

    switch (newJob.type) {
        case 'Graphic Design':
            admin.messaging().sendToTopic('graphic_design_notifications', payload).then(response=>{
            console.log('Notification sent')
            return true
            }).catch(error=>{
            console.log(error)
            return false
            }) 
            break;
        case 'Social Media':
            admin.messaging().sendToTopic('social_media_notifications', payload).then(response=>{
            console.log('Notification sent')
            return true
            }).catch(error=>{
            console.log(error)
            return false
            }) 
            break;
        case 'Web Design':
            admin.messaging().sendToTopic('web_design_notifications', payload).then(response=>{
            console.log('Notification sent')
            return true
            }).catch(error=>{
            console.log(error)
            return false
            }) 
            break;
        case 'Software Development':
            admin.messaging().sendToTopic('software_development_notifications', payload).then(response=>{
            console.log('Notification sent')
            return true
            }).catch(error=>{
            console.log(error)
            return false
            }) 
            break;
      
        default:
            return false;
    }
       
    
    
})


