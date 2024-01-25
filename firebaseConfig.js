// Importa o módulo Firebase Admin SDK, que fornece funcionalidades administrativas para interagir com os serviços do Firebase.
const admin = require('firebase-admin');
const serviceAccount = require('./sneaker-216ef-firebase-adminsdk-72g8g-a6ec8c2e3d.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
//exporta a instância do Firestore Database 
module.exports = db;





