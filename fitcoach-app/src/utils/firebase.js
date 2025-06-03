import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNHamB6EHC5uC1mGTu0j6I0tZvqH3eChg",
  authDomain: "fitcoach-ai-ea94c.firebaseapp.com",
  projectId: "fitcoach-ai-ea94c",
  storageBucket: "fitcoach-ai-ea94c.firebasestorage.app",
  messagingSenderId: "482867464874",
  appId: "1:482867464874:web:d8e6170d856f0af6d19ed3",
  measurementId: "G-R3KY3PKW2Z",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };


