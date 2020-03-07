import { useEffect, useState } from 'react';

import { User, FetchedUser, QueriedUser } from '../Types';

const useUserCollection = (
  user: User,
  query: firebase.firestore.Query<firebase.firestore.DocumentData>,
): FetchedUser[] => {
  const [userList, setUserList] = useState<FetchedUser[]>([]);

  useEffect(() => {
    if (user.permissions && user.permissions >= 3) {
      return query.onSnapshot(snapshot => {
        if (snapshot.empty) return setUserList([]);

        snapshot.docChanges().forEach(change => {
          const userDocument = change.doc.data() as QueriedUser;
          const userData = { ...userDocument, uid: change.doc.id };
          if (change.type === 'added') {
            setUserList(users => [...users, userData]);
          } else if (change.type === 'modified') {
            setUserList(users => users.map(u => (u.uid === change.doc.id ? userData : u)));
          } else {
            setUserList(users => users.filter(u => u.uid !== change.doc.id));
          }
        });
      });
    } else {
      setUserList([]);
      return;
    }
  }, [user, query]);

  return userList;
};

export default useUserCollection;
