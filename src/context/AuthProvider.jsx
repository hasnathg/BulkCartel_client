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
import { a } from 'framer-motion/m';


const googleProvider = new GoogleAuthProvider();
const BACKEND_URL = 'https://bulk-cartel-server.vercel.app';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(null);


   const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
        // Get Firebase ID token
        const idToken = await result.user.getIdToken();

        // Send to backend to get JWT
        const res = await fetch(`${BACKEND_URL}/jwt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        const data = await res.json();
        if (data.token) {
          localStorage.setItem('bulkCartelToken', data.token);
          setToken(data.token);
        }

        return result;
      });
  };

   const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
    .then(async (result) => {
        const idToken = await result.user.getIdToken();

        const res = await fetch(`${BACKEND_URL}/jwt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        const data = await res.json();
        if (data.token) {
          localStorage.setItem('bulkCartelToken', data.token);
          setToken(data.token);
        }

        return result;
      });
  };

   const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

   const logout = () => {
    setLoading(true);
    localStorage.removeItem('bulkCartelToken');
    setToken(null);
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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const idToken = await currentUser.getIdToken();

        const res = await fetch(`${BACKEND_URL}/jwt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        const data = await res.json();
        if (data.token) {
          localStorage.setItem('bulkCartelToken', data.token);
          setToken(data.token);
        }
      } else {
        localStorage.removeItem('bulkCartelToken');
        setToken(null);
      }

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
        token,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
