// app/hooks/AuthProvider.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, signInWithPopup, signOut } from "../firebase";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// Create a context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Persistence error:", error);
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth State Changed, User:", currentUser); // Debugging line
      setUser(currentUser); // Set user state
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleGoogleSignIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
