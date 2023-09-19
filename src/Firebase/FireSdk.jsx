// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP13eY8FRpRHOFRft3JAC0EWEl1JmMQq4",
  authDomain: "note-list-b10ad.firebaseapp.com",
  projectId: "note-list-b10ad",
  storageBucket: "note-list-b10ad.appspot.com",
  messagingSenderId: "31197818097",
  appId: "1:31197818097:web:bf8d34f1f864301dc18d50",
  measurementId: "G-JW398WGLXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);