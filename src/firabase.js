import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
const firebase = require("firebase/app");
var firebaseConfig = {
  apiKey: "AIzaSyCA3xy3fYgHPs23sps2EVvg780BKampKRY",
  authDomain: "chatapp-2fee0.firebaseapp.com",
  projectId: "chatapp-2fee0",
  storageBucket: "chatapp-2fee0.appspot.com",
  messagingSenderId: "403828979621",
  appId: "1:403828979621:web:a0719c88f211641678da4c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
