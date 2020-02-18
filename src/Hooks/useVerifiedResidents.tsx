import { useEffect, useState } from 'react';

import { User, VisibleUser, ConfirmedVerificationRequest } from '../Types';
import { usersCollection } from '../Firebase/firebase';

const useVerifiedResidents = (user: User): VisibleUser[] => {
  const [verifiedResidents, setVerifiedResidents] = useState<VisibleUser[]>([]);

  // When the query for users requesting verification is set, we can try to send the query to Firebase.
  // So long as the user isn't being nefarious, and so long as there are users requesting verification,
  // we will get the list of users requesting verification from firebase.
  useEffect(() => {
    if (user.permissions && user.permissions >= 3) {
      const query = usersCollection.where('hall', '==', user.hall).where('permissions', '>=', 1);
      return query.onSnapshot(snapshot => {
        if (snapshot.empty) return setVerifiedResidents([]);

        snapshot.docChanges().forEach(change => {
          const userData = change.doc.data() as ConfirmedVerificationRequest;
          const userRequesting = { ...userData, uid: change.doc.id };
          if (change.type === 'added') {
            setVerifiedResidents(last => [...last, userRequesting]);
          } else if (change.type === 'modified') {
            setVerifiedResidents(last =>
              last.map(userRow => (userRow.uid === change.doc.id ? userRequesting : userRow)),
            );
          } else {
            setVerifiedResidents(last => last.filter(userRow => userRow.uid !== change.doc.id));
          }
        });
      });
    }
    setVerifiedResidents([]);
  }, [user, setVerifiedResidents]);

  return verifiedResidents;
};

export default useVerifiedResidents;
