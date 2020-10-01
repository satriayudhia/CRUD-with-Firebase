import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBo_YR7hBtDr1WQIWolmoACdnCDj_efsZ0",
    authDomain: "simple-notes-firebase-b5131.firebaseapp.com",
    databaseURL: "https://simple-notes-firebase-b5131.firebaseio.com",
    projectId: "simple-notes-firebase-b5131",
    storageBucket: "simple-notes-firebase-b5131.appspot.com",
    messagingSenderId: "447352465718",
    appId: "1:447352465718:web:86399d56ce5a58c1de2b97",
    measurementId: "G-W5XKNCD632"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database();

  export default firebase;