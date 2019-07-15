import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAlf-0JHjdDV5QD-CwpSUbr1FwCE55fs8",
    authDomain: "resident-51.firebaseapp.com",
    databaseURL: "https://resident-51.firebaseio.com",
    projectId: "resident-51",
    storageBucket: "",
    messagingSenderId: "1080183361562",
    appId: "1:1080183361562:web:a59a4b81568f1ab4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// database.ref().set({
//     app: "Resident 51",
//     firstHall: "Watkins",
//     halls: ["Stephenson", "Maggie"],
//     events: ["Neanderthall Ball", "Neanderthall Ball 2"]
// });

database.ref('app').set("Resident 69");
