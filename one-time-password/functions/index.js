const admin = require("firebase-admin");
const functions = require("firebase-functions");
const createUser = require("./create_user");
const serviceAccount = require("./service_account.json");
const requestOneTimePwd = require("./request_one_time_pwd");
const verifyOneTimePwd = require("./verify_one_time_pwd");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-904d2.firebaseio.com",
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePwd);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePwd);
