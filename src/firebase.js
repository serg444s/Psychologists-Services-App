// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCdUj8puEDK2rJrF4bWiuZ5z9Jkc-y0SLc",
  authDomain: "psychologists-services-2e99e.firebaseapp.com",
  databaseURL:
    "https://psychologists-services-2e99e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "psychologists-services-2e99e",
  storageBucket: "psychologists-services-2e99e.appspot.com",
  messagingSenderId: "275061905720",
  appId: "1:275061905720:web:7a8756677ea0eff05409cd",
  measurementId: "G-N2Q50N158Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
