import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnJpGXTFFPb1Ydoqpyf0YsWRC4SiAasbE",
  authDomain: "cryptohub-4791a.firebaseapp.com",
  projectId: "cryptohub-4791a",
  storageBucket: "cryptohub-4791a.firebasestorage.app",
  messagingSenderId: "384442063065",
  appId: "1:384442063065:web:2035dc705a71a0ed7646c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);