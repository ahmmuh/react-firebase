import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDQIj0bFxIYnu9cBNRcdJ6mII8qWaXkZyU",
    authDomain: "website-ccbc0.firebaseapp.com",
    databaseURL: "https://website-ccbc0.firebaseio.com",
    projectId: "website-ccbc0",
    storageBucket: "website-ccbc0.appspot.com",
    messagingSenderId: "73865911907"
  };
  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;