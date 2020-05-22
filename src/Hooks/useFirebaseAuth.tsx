import { useEffect, useState } from 'react';

import { User, UserDocument } from '../Types';
import { UserAction } from '../Reducers/User.Reducer';
import { auth, usersCollection } from '../Firebase/firebase';

type useFirebaseAuthType = (
  user: User,
  userDispatch: (value: UserAction) => void,
) => [firebase.User | null, [boolean, React.Dispatch<React.SetStateAction<boolean>>]];

const useFirebaseAuth: useFirebaseAuthType = (user, userDispatch) => {
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  useEffect(
    () =>
      auth.onIdTokenChanged(authUserSnapshot => {
        if (authUserSnapshot && !userAuth) {
          setUserAuth(authUserSnapshot);
          userDispatch({ type: 'LOGGED_IN', data: authUserSnapshot });
        } else if (authUserSnapshot === null) {
          setUserAuth(null);
          userDispatch({ type: 'LOGGED_OUT' });
          setIsLoggingIn(false);
        }
      }),
    [userDispatch, userAuth],
  );

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
  }, [userAuth, user, isLoggingIn, userDispatch]);

  return [userAuth, [isLoggingIn, setIsLoggingIn]];
};

export default useFirebaseAuth;
