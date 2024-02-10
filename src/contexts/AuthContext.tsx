import React, {useCallback, useEffect, useState} from 'react';
import {initContext} from '../utils/createContext.tsx';
import auth from '@react-native-firebase/auth';

interface AuthProviderContext {
  user?: any;
  login: (email: string, password: string) => Promise<{error: string | null}>;
  logout: () => Promise<{error: string | null}>;
  create: (email: string, password: string) => Promise<{error: string | null}>;
}

const [InternalAuthProvider, useAuthContext] = initContext<AuthProviderContext>(
  'AuthProviderContext',
);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = useCallback(
    (_user: any) => {
      setUser(_user);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );
  const createUser = useCallback(
    (email: string, password: string): Promise<{error: string | null}> => {
      return auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          return {error: null};
        })
        .catch(error => {
          return {error: error.code};
        });
    },
    [],
  );

  const login = useCallback(
    (email: string, password: string): Promise<{error: string | null}> => {
      return auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in!');
          return {error: null};
        })
        .catch(error => {
          return {error: error.code};
        });
    },
    [],
  );

  const logout = useCallback((): Promise<{error: string | null}> => {
    return auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        return {error: null};
      })
      .catch(error => {
        return {error: error.code};
      });
  }, []);

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, [onAuthStateChanged]);

  return (
    <InternalAuthProvider
      user={user}
      login={login}
      logout={logout}
      create={createUser}>
      {children}
    </InternalAuthProvider>
  );
};

export {AuthProvider, useAuthContext};
