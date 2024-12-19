// app/hooks/AuthProvider.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, signInWithPopup, signOut } from "../firebase";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import axios from "axios";

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

      // Get the Firebase ID token
      const token = await result.user.getIdToken();

      // Send Firebase ID token and user details to Django backend
      const response = await axios.post(
        "http://localhost:8000/auth_api/google-signin/",
        {
          id_token: token,
          google_id: result.user.uid,
          email: result.user.email,
          display_name: result.user.displayName,
          photo_url: result.user.photoURL,
        }
      );

      console.log("Response: ", response.data);
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
