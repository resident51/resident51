import React, { useReducer, createContext, useEffect, useState } from "react";

import { UserInterface } from "../Types/";

import { auth, usersCollection } from "../Firebase/firebase";
import UserReducer, { User, UserAction } from "../Reducers/User.Reducer";

interface UserContextProps {
  user: User;
  userDispatch: React.Dispatch<UserAction>;
  usersRequestingVerification: UserInterface[];
}

export const UserContext = createContext({} as UserContextProps);

type UserProps = { children: React.ReactNode };
export const UserProvider: React.FC<UserProps> = props => {
  const [user, userDispatch] = useReducer(UserReducer, null);

  // Reference to user's document in Cloud Firestore.
  const [userQuery, setUserQuery] = useState<firebase.firestore.DocumentReference | null>(null);
  const [verificationRequests, setVerificationRequests] = useState<firebase.firestore.Query | null>(
    null
  );
  const [usersRequestingVerification, setUsersRequestingVerification] = useState<UserInterface[]>(
    []
  );

  // Check for auth token on client, use to sign user in.
  useEffect(
    () =>
      auth.onAuthStateChanged(authUser => {
        // Note that the callback passed to auth.onAuthStateChanged will fire
        // automatically  when a user logs in or logs out.
        if (authUser) {
          userDispatch({ type: "LOGGED_IN", data: authUser });
          setUserQuery(usersCollection.doc(authUser.uid));
        } else {
          userDispatch({ type: "LOGGED_OUT" });
          setUserQuery(null);
          setVerificationRequests(null);
          setUsersRequestingVerification([]);
        }
      }),
    []
  );

  // When the Firestore user document is found, set extra permissions/info
  // on the user context.
  useEffect(
    () =>
      !userQuery
        ? undefined
        : userQuery.onSnapshot(snapshot => {
            if (snapshot.exists) {
              const { hall, permissions, verified } = snapshot.data() as UserInterface;
              userDispatch({
                type: "USER_FOUND",
                data: { hall, permissions, verified }
              });

              // Set reference query for users requesting verification - will only succeed if user is an admin.
              // #TODO you know ..... this really should just be a cloud function.....
              const unverifiedUsersQuery = usersCollection
                .where("hall", "==", hall)
                .where("permissions", "==", 0)
                .where("verified", "==", false);
              setVerificationRequests(
                verified && permissions && permissions >= 3 ? unverifiedUsersQuery : null
              );
            } else {
              setVerificationRequests(null);
            }
          }),
    [userQuery]
  );

  // When the query for users requesting verification is set, we can try to send the query to Firebase.
  // So long as the user isn't being nefarious, and so long as there are users requesting verification,
  // we will get the list of users requesting verification from firebase.
  useEffect(() => {
    if (verificationRequests !== null) {
      return verificationRequests.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const userRequesting = {
            ...change.doc.data(),
            uid: change.doc.id
          } as UserInterface;
          if (change.type === "added") {
            setUsersRequestingVerification(last => [...last, userRequesting]);
          } else if (change.type === "modified") {
            setUsersRequestingVerification(last =>
              last.map(u => (u.uid === change.doc.id ? userRequesting : u))
            );
          } else {
            setUsersRequestingVerification(last => last.filter(u => u.uid !== change.doc.id));
          }
        });
      });
    }
  }, [verificationRequests]);

  return (
    <UserContext.Provider value={{ user, userDispatch, usersRequestingVerification }}>
      {props.children}
    </UserContext.Provider>
  );
};
