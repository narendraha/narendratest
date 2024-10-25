// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs8Xijf_nOu3LnNsd8QQYP0IX9lQbdOPo",
  authDomain: "hello-alfred-7d84d.firebaseapp.com",
  projectId: "hello-alfred-7d84d",
  storageBucket: "hello-alfred-7d84d.appspot.com",
  messagingSenderId: "295744047256",
  appId: "1:295744047256:web:fdb2e6acaa302e49c768ed",
  measurementId: "G-8HDDDZ5P1N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const googleAuth = getAuth(app);
const googleAuthprovider = new GoogleAuthProvider();

export { googleAuth, googleAuthprovider };
