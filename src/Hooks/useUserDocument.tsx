import { useEffect } from 'react';

import { usersCollection } from '../Firebase/firebase';
import { User, UserDocument } from '../Types';
import { UserAction } from '../Reducers/User.Reducer';

const useUserDocument = (
  user: User,
  userDispatch: (value: UserAction) => void,
  userAuth: firebase.User | null,
  isLoggingIn: boolean,
  setIsLoggingIn: (state: boolean) => void,
): void => {
  // When the Firestore user document is found, set extra permissions/info
  // on the user context.
  useEffect(() => {
    if (!user.uid || userAuth === null) return;

    return usersCollection.doc(user.uid).onSnapshot(snapshot => {
      if (snapshot.exists) {
        const doc = snapshot.data() as UserDocument;
        userDispatch({ type: 'USER_FOUND', data: doc });

        const newHall = user.hall !== doc.hall;
        const newPerms = user.permissions !== doc.permissions;
        if (isLoggingIn || newHall || newPerms) {
          userAuth.getIdToken(true);
        }
      }
      setIsLoggingIn(false);
    });
  }, [userAuth, user, isLoggingIn, userDispatch, setIsLoggingIn]);
};

export default useUserDocument;
