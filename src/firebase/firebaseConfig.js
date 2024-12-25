import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBO_rx8aYpgwmbste-oRtT7m86Yo5_P4GI",
  authDomain: "next-app-pro.firebaseapp.com",
  projectId: "next-app-pro",
  storageBucket: "next-app-pro.firebasestorage.app",
  messagingSenderId: "1013181536307",
  appId: "1:1013181536307:web:3d3e86b29b50ddf04aeb46",
  measurementId: "G-C6R3HKFT24"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const database = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, firebaseAnalytics, database, auth };
