import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDs8Xijf_nOu3LnNsd8QQYP0IX9lQbdOPo",
    authDomain: "hello-alfred-7d84d.firebaseapp.com",
    projectId: "hello-alfred-7d84d",
    storageBucket: "hello-alfred-7d84d.appspot.com",
    messagingSenderId: "295744047256",
    appId: "1:295744047256:web:fdb2e6acaa302e49c768ed",
    measurementId: "G-8HDDDZ5P1N"
};

const app = initializeApp(firebaseConfig);
const appleAuth = getAuth(app);
const appleAuthProvider = new OAuthProvider('apple.com');

export { appleAuth, appleAuthProvider };

