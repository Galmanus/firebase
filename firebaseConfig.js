const admin = require('firebase-admin');
const serviceAccount = require('./sneaker-216ef-firebase-adminsdk-72g8g-a6ec8c2e3d.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
module.exports = db;
