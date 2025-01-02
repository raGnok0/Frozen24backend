const admin = require('firebase-admin')
require('dotenv').config()

const serviceString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

const service_account = JSON.parse(Buffer.from(serviceString,'base64').toString('utf-8'))


admin.initializeApp({
    credential:admin.credential.cert(service_account)
})

const db = admin.firestore()
const auth = admin.auth()


module.exports = {
    db,
    auth,
}