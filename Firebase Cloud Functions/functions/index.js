const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.send_job_notification = functions.firestore.document('services/{serviceId}').onCreate(()=>{
    let payload = {
        notification : {
            title : 'New Jobs',
            body : 'There are new jobs available for you'
        }
    }
    admin.messaging().sendToTopic('member_notifications', payload).then(response=>{
        console.log('Notification sent')
        return true
    }).catch(error=>{
        console.log(error)
        return false
    })
})


