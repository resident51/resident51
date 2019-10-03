import { 
  auth, 
  facebookProvider, 
  twitterProvider, 
  googleProvider } from '../Firebase/firebase';

const userReducer = (user, action) => {

  switch (action.type) {
    case "LOGIN":
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      // ...
      return action.user;
    case "LOGOUT":
      return {};
    default:
      return user;
  }
};

export default userReducer;