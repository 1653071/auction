import firebase from 'firebase/app';
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDVVAMOVpZs5zhyG9Zx-bQjIzQk8QZ1dak",
    authDomain: "be-group10.firebaseapp.com",
    databaseURL: "https://be-group10-default-rtdb.firebaseio.com",
    projectId: "be-group10",
    storageBucket: "be-group10.appspot.com",
    messagingSenderId: "43756435650",
    appId: "1:43756435650:web:02d562bb7f31c04fb9e35b",
    measurementId: "G-4ZB6MZG88G"
  };
  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };