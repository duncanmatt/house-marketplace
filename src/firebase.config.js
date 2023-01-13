import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOz2xTrOh_63dgjxicGiO9fLkKH7guJvQ",
  authDomain: "house-marketplace-app-59d89.firebaseapp.com",
  projectId: "house-marketplace-app-59d89",
  storageBucket: "house-marketplace-app-59d89.appspot.com",
  messagingSenderId: "92453346123",
  appId: "1:92453346123:web:52a973eeb9ff14e76a26ce",
  measurementId: "G-18V8X2SKK8"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();