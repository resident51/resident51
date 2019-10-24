import { auth } from '../Firebase/firebase';

const userReducer = (user, action) => {
  switch (action.type) {
    case "LOGGED_OUT":
      return {};
    case "LOGGED_IN":
      const nextUser = {
        ...user,
        displayName: action.user.displayName,
        email: action.user.email,
        emailVerified: action.user.emailVerified,
        photoURL: action.user.photoURL,
        isAnonymous: action.user.isAnonymous,
        uid: action.user.uid,
        providerData: action.user.providerData,
      };
      return nextUser;
    case "NEW_USER":
      return { ...user, }
    case "LOGOUT":
      auth.signOut();
      return user;
    default:
      return user;
  }
};

export default userReducer;