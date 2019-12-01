import { auth } from '../Firebase/firebase';

const userReducer = (currentUser, action) => {
  switch (action.type) {
    case "LOGGED_OUT":
      return {};
    case "LOGGED_IN":
      const { authUser } = action;
      const nextUser = {
        displayName: authUser.displayName,
        email: authUser.email,
        photoURL: authUser.photoURL,
        isAnonymous: authUser.isAnonymous,
        uid: authUser.uid,
        providerData: authUser.providerData,
      }
      // Merge in Firebase auth user properties
      return { ...currentUser, ...nextUser };
    case "USER_FOUND":
      const { hall, permissions, verified } = action.R51User;
      return { ...currentUser, hall, permissions, verified };
    case "NEW_USER":
      return currentUser;
    case "LOGOUT":
      auth.signOut();
      return currentUser;
    default:
      return currentUser;
  }
};

export default userReducer;