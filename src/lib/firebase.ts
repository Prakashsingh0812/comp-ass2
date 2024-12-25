// firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrAfMQMr4VZn7BXilDfeWPtEGbHk-lf6M",
  authDomain: "company-assignments.firebaseapp.com",
  projectId: "company-assignments",
  storageBucket: "company-assignments.appspot.com", 
  messagingSenderId: "689053147634",
  appId: "1:689053147634:web:abc6005d058d85f27d4b6b",
};

// Initialize Firebase app if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
