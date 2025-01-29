// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGQJjHktQ6SajrvA-xXzkRaTSE5v7QMd0",
  authDomain: "ak-secret-chat-app.firebaseapp.com",
  projectId: "ak-secret-chat-app",
  storageBucket: "ak-secret-chat-app.appspot.com",
  messagingSenderId: "95558268879",
  appId: "1:95558268879:web:22eb76b428d8c6850904ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
