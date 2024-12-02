// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl2od2NHWnAu84fTH9sk7MxGkxzd0aeQ4",
  authDomain: "ellp-app.firebaseapp.com",
  databaseURL:
    "https://ellp-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ellp-app",
  storageBucket: "ellp-app.appspot.com",
  messagingSenderId: "491263380880",
  appId: "1:491263380880:web:2659998c11480840207715",
  measurementId: "G-Y13VT5G9N1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestoreDb = getFirestore(app);
const realtimeDb = getDatabase(app);
const auth = getAuth(app);

export { firestoreDb, realtimeDb, auth };
