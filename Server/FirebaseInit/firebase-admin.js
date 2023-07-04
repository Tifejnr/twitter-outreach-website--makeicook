const admin = require("firebase-admin");
const serviceAccountKey = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

module.exports = admin;
