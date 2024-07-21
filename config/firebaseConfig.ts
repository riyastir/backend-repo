import * as admin from "firebase-admin"
import { ServiceAccount } from "firebase-admin"

const serviceAccount: ServiceAccount = require("./ebuddy-interview-2024-firebase-adminsdk-prpkb-d652dfbee7.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export default admin
