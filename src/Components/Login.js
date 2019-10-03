import React from 'react'

import { googleProvider, auth } from '../Firebase/firebase';

const Login = props => {
  auth.signInWithPopup(googleProvider).then(function (result) {
    console.log(result);
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  return (
    <div>
      <h1>Login Time</h1>
    </div>)
}

export default Login