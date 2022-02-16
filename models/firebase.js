const admin = require('firebase-admin');
const serviceAcc = require('../secret.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAcc),
});
const db = admin.firestore();
const docref = db.collection('blogData');

module.exports = docref;
