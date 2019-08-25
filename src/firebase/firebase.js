import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwu3Mdl6FJBx9zxuZhwtGtSu7J-UZtwpY",
  authDomain: "resident51-7df51.firebaseapp.com",
  databaseURL: "https://resident51-7df51.firebaseio.com",
  projectId: "resident51-7df51",
  storageBucket: "",
  messagingSenderId: "627021015998",
  appId: "1:627021015998:web:addfb2db732f443f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database.ref("").set({
  name: "Camel",
  firstHall: "Watkins",
  halls: ["Stephenson", "Maggie"],
  events: ["Neanderthall Ball", "Neanderthall Ball 2"]
});

database.ref("app").set("Resident 69");
