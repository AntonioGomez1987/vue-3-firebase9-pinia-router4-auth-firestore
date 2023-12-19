import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAhSWJIVVtQxJHK1KlPNQjn-0MJZaukNf8",
  authDomain: "vue-3-2023-66d92.firebaseapp.com",
  projectId: "vue-3-2023-66d92",
  storageBucket: "vue-3-2023-66d92.appspot.com",
  messagingSenderId: "175391391895",
  appId: "1:175391391895:web:4b0e4dc829c51d8adca9d2"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };