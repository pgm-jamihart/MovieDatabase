import { createContext, useContext, useEffect, useState } from 'react';
import 'firebase/auth';
import { useFirebase } from './firebase.context';

const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('react-firebase-pgm-4:currentUser')));
  const { app } = useFirebase();
  const auth = app.auth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      localStorage.setItem('react-firebase-pgm-4:currentUser', JSON.stringify(user));
      //localStorage.setItem('userId', JSON.stringify(user.uid));
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    }
  }, [auth]);

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      return await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
      window.location.reload();
    }    
  };

  const signOut = async () => {
    localStorage.setItem('react-firebase-pgm-4:currentUser', null);
    //localStorage.setItem('userId', null);
    return await auth.signOut();
  };

  const createUserWithEmailAndPassword = async (email, password) => {
    try {
      return await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    } 
  }

  const sendPasswordResetEmail = async (email) => {
    try {
      return await auth.sendPasswordResetEmail(email)
    } catch (error) {
      alert(error);
      window.location.reload();
    }
  }

  return (
    <AuthContext.Provider value={{currentUser,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword, sendPasswordResetEmail}}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider,
  useAuth,
};