// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDs8Xijf_nOu3LnNsd8QQYP0IX9lQbdOPo",
//   authDomain: "hello-alfred-7d84d.firebaseapp.com",
//   projectId: "hello-alfred-7d84d",
//   storageBucket: "hello-alfred-7d84d.appspot.com",
//   messagingSenderId: "295744047256",
//   appId: "1:295744047256:web:fdb2e6acaa302e49c768ed",
//   measurementId: "G-8HDDDZ5P1N",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firebase Authentication and get a reference to the service
// const googleAuth = getAuth(app);
// const googleAuthprovider = new GoogleAuthProvider();

// export { googleAuth, googleAuthprovider };


// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8zch6XsRgZc0aCj8aSoge1enaxnBOGCI",
  authDomain: "helloalfred-1a36d.firebaseapp.com",
  projectId: "helloalfred-1a36d",
  storageBucket: "helloalfred-1a36d.appspot.com",
  messagingSenderId: "367073344944",
  appId: "1:367073344944:web:a8bca45b4d359010172a75",
  measurementId: "G-B11N9QVW39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
