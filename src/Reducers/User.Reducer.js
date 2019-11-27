import { auth } from '../Firebase/firebase';

const userReducer = (user, action) => {
  switch (action.type) {
    case "LOGGED_OUT":
      return {};
    case "LOGGED_IN":
      return {
        ...user,
        displayName: action.user.displayName,
        email: action.user.email,
        emailVerified: action.user.emailVerified,
        photoURL: action.user.photoURL,
        isAnonymous: action.user.isAnonymous,
        uid: action.user.uid,
        providerData: action.user.providerData,
      };
    case "USER_FOUND":
      const { hall, permissions } = action.R51User;
      return { ...user, hall, permissions };
    case "NEW_USER":
      console.log('new user i guess');
      return user;
    case "LOGOUT":
      auth.signOut();
      return user;
    default:
      return user;
  }
};

export default userReducer;