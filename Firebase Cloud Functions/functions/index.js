const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {PaymentsApi, OrdersApi, LocationsApi} = require('square-connect')
const crypto = require('crypto')

admin.initializeApp();

const paymentsApi = new PaymentsApi()
const ordersApi = new OrdersApi()
const locationsApi =  new LocationsApi()


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

exports.send_message_notification = functions.https.onCall((data, context) =>{
    let fcmToken = data.fcmToken
    let senderName = data.name
    let payload = {
        notification : {
            title : 'New Message',
            body : 'You have a new message from '+senderName
        }
    }
    admin.messaging().sendToDevice(fcmToken, payload).then(result=>{
        return {sent : true}
    }).catch(error=>{
        return {sent : false, error : error}
    })
})


exports.charge_card = functions.https.onCall((data, context) =>{
try {

    const createOrderRequest = {
      idempotency_key: crypto.randomBytes(12).toString('hex'),
      order: {
        line_items: [
          {
            name: data.service,
            quantity: "1",
            base_price_money: {
              amount: data.price,
              currency: "USD"
            }
          }
        ]
      }
    }

    const order = await ordersApi.createOrder(createOrderRequest);

    const createPaymentRequest = {
        "idempotency_key": crypto.randomBytes(12).toString('hex'),
        "source_id": data.nonce,
        "amount_money": {
          ...order.order.total_money
        },
        "order_id": order.order.id,
        "autocomplete": true,
      };

      const createPaymentResponse = await paymentsApi.createPayment(createPaymentRequest);
      return {
          success : true,
          payment : createPaymentResponse.payment
      };

} catch (error) {
    
}
})


