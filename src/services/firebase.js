import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaD-yDWyWczHN9kaHGGlUoe6_hVgOrMCw",
  authDomain: "linkhub-2.firebaseapp.com",
  databaseURL: "https://linkhub-2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "linkhub-2",
  storageBucket: "linkhub-2.appspot.com",
  messagingSenderId: "555063054094",
  appId: "1:555063054094:web:2fb507a0406da08591115f",
  measurementId: "G-VT2K7B8TJL"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export default firebase;