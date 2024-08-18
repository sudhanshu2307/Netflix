// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-Tt3N4N5Sg-M_OrZbBcvWppWqheCDxbc",
  authDomain: "netflixg-c29f4.firebaseapp.com",
  projectId: "netflixg-c29f4",
  storageBucket: "netflixg-c29f4.appspot.com",
  messagingSenderId: "988246467292",
  appId: "1:988246467292:web:dab9afdf57dee3a1574a19",
  measurementId: "G-ZH4XMD6CKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();
