// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"; // Import signInWithPopup here

const firebaseConfig = {
  apiKey: "AIzaSyDr1jdhyAW-GC2WuhnSSqkbZBhFutfYlRM",
  authDomain: "edu-bridge-d3bc1.firebaseapp.com",
  projectId: "edu-bridge-d3bc1",
  storageBucket: "edu-bridge-d3bc1.appspot.com",
  messagingSenderId: "904508027403",
  appId: "1:904508027403:web:31778cb7d6d7eaf67ccd0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Auth instance
const googleProvider = new GoogleAuthProvider(); // Create Google Provider instance

export { auth, googleProvider, signInWithPopup, signOut }; // Export signInWithPopup
