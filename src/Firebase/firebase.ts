import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import * as firebaseui from 'firebaseui';

// Initialize Firebase with R51 Firebase configuration
firebase.initializeApp({
  apiKey: 'AIzaSyDwu3Mdl6FJBx9zxuZhwtGtSu7J-UZtwpY',
  authDomain: 'resident51-7df51.firebaseapp.com',
  databaseURL: 'https://resident51-7df51.firebaseio.com',
  projectId: 'resident51-7df51',
  storageBucket: 'resident51-7df51.appspot.com',
  messagingSenderId: '627021015998',
  appId: '1:627021015998:web:addfb2db732f443f',
});

// Database objects
export const store = firebase.firestore();
export const usersCollection = store.collection('users');
export const eventsCollection = store.collection('events');
export const currentEvents = eventsCollection
  .where('dateTime', '>', new Date())
  .orderBy('dateTime');
export const feedbackCollection = store.collection('feedback');

// Authentication objects
export const auth = firebase.auth();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
export const FacebookAuthProvider = firebase.auth.FacebookAuthProvider.PROVIDER_ID;
export const ui = new firebaseui.auth.AuthUI(auth);

// Function objects
export const functions = firebase.functions();
export const requestVerification = functions.httpsCallable('requestVerification');
export const verifyUserAsResident = functions.httpsCallable('verifyUserAsResident');
export const verifyUserAsEditor = functions.httpsCallable('verifyUserAsEditor');
export const verifyUserAsAdmin = functions.httpsCallable('verifyUserAsAdmin');
