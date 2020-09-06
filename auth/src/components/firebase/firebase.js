import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB5ppRNnjUPOUW0TFKd_JSdMGVIqyJ8w4M',
  authDomain: 'whatsapp-clone-fbd8e.firebaseapp.com',
  databaseURL: 'https://whatsapp-clone-fbd8e.firebaseio.com',
  projectId: 'whatsapp-clone-fbd8e',
  storageBucket: 'whatsapp-clone-fbd8e.appspot.com',
  messagingSenderId: '1063225549181',
  appId: '1:1063225549181:web:df0ab40f4a924bf40c2c14',
  measurementId: 'G-JWL2F682JH',
});
const auth = firebaseApp.auth();
export {firebaseApp, auth};
