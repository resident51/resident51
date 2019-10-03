import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase with R51 Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyDwu3Mdl6FJBx9zxuZhwtGtSu7J-UZtwpY",
  authDomain: "resident51-7df51.firebaseapp.com",
  databaseURL: "https://resident51-7df51.firebaseio.com",
  projectId: "resident51-7df51",
  storageBucket: "resident51-7df51.appspot.com",
  messagingSenderId: "627021015998",
  appId: "1:627021015998:web:addfb2db732f443f"
});

const store = firebase.firestore();
const eventsCollection = store.collection('events');

const auth = firebase.auth();
// const facebookProvider = new firebase.auth.FacebookAuthProvider();
// const twitterProvider = new firebase.auth.TwitterAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default store;
export { 
  store, 
  eventsCollection, 
  auth, 
  // facebookProvider, 
  // twitterProvider, 
  googleProvider 
};