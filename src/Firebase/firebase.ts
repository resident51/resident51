import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

// Initialize Firebase with R51 Firebase configuration
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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
export const logUser = functions.httpsCallable('logUser');
export const logError = functions.httpsCallable('logError');
