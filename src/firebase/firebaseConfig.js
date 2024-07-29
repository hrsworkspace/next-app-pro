import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-app-74491.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "next-app-74491.appspot.com",
  messagingSenderId: "752090420541",
  appId: "1:752090420541:web:cca12a5dd425d7f4a36154",
  measurementId: "G-P9LQT3LBMH",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const database = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, firebaseAnalytics, database, auth };
