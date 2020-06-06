import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { User, UserCreationData } from '@app/types';

import { auth, createUserWithData, store } from '@app/firebase/firebase';

interface PromiseNotification {
  resolve?: (result?: AuthResult) => void;
  reject?: (err: AuthError) => void;
}

class AuthError extends Error {
  constructor(public readonly code: string | number, public readonly message: string) {
    super(message);
    this.name = 'R51AuthError';
  }
}

type AuthResult = { status?: 'SUCCESS' | 'PARTIAL_SUCCESS' } | undefined | void;

interface UserCtx {
  user: User | null | undefined;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  signUp: (userData: UserCreationData) => Promise<AuthResult>;
}

const UserContext = createContext({} as UserCtx);
export const useUser = (): UserCtx => useContext(UserContext);

const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>();
  const [watchUser, setWatchUser] = useState<boolean>(false);
  const userNotify = useRef<PromiseNotification>({});

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          userNotify.current = {
            resolve,
            reject,
          };
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            reject(new AuthError(err.code, 'Email or password are incorrect'));
          } else {
            reject(new AuthError(err.code, err.message));
          }
        });
    });
  }, []);

  const signUp = useCallback(
    async (data: UserCreationData): Promise<AuthResult> => {
      try {
        const result = await createUserWithData(data);
        await signIn(data.email, data.password);
        return result.data;
      } catch (e) {
        throw new AuthError(e.code ?? e.status, e.message);
      }
    },
    [signIn],
  );

  const signOut = useCallback(() => {
    setWatchUser(false);
    return auth().signOut();
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser: firebase.User | null) => {
      if (authUser) {
        setWatchUser(true);
      } else {
        setWatchUser(false);
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    let unsubscribe;
    const currentUser = auth().currentUser;
    if (watchUser && currentUser) {
      unsubscribe = store
        .collection('users')
        .doc(currentUser.uid)
        .onSnapshot({
          next: userSnapshot => {
            if (userSnapshot.exists) {
              setUser({
                ...userSnapshot.data(),
                emailVerified: currentUser.emailVerified,
              } as User);
              userNotify.current.resolve?.();
            } else {
              userNotify.current.reject?.(
                new AuthError(
                  'internal/no-user-record',
                  'User was authenticated but a corresponding record was not found in the store',
                ),
              );
            }
          },
          error: err => {
            userNotify.current.reject?.(new AuthError(err.code, err.message));
          },
        });
    }

    return unsubscribe;
  }, [watchUser]);

  const contextValue = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      signUp,
    }),
    [signIn, signOut, signUp, user],
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
