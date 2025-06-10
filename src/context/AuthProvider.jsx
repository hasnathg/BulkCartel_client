import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
 
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import AuthContext from './AuthContext';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

   const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

   const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

   const logout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        createUser,
        signIn,
        googleLogIn,
        resetPassword,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
