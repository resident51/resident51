import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwu3Mdl6FJBx9zxuZhwtGtSu7J-UZtwpY",
  authDomain: "resident51-7df51.firebaseapp.com",
  databaseURL: "https://resident51-7df51.firebaseio.com",
  projectId: "resident51-7df51",
  storageBucket: "resident51-7df51.appspot.com",
  messagingSenderId: "627021015998",
  appId: "1:627021015998:web:addfb2db732f443f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const eventsCollection = db.collection('events');

export default db;
export { eventsCollection };
