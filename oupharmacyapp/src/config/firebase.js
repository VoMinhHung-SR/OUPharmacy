import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDI-WFb2Mn-JzHjHrBZNzBnv7FUfv8BFV4",
    authDomain: "oupharmacy-5ddaa.firebaseapp.com",
    databaseURL: "https://oupharmacy-5ddaa-default-rtdb.firebaseio.com",
    projectId: "oupharmacy-5ddaa",
    storageBucket: "oupharmacy-5ddaa.appspot.com",
    messagingSenderId: "999793746685",
    appId: "1:999793746685:web:311028632b737f551d5494",
    measurementId: "G-JB59G5JCQH"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  export {app, db}