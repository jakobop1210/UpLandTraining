// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDRl0a9ZB1GoKQytAlV8g7AiM05Z0OmlPI",
  authDomain: "upland-training.firebaseapp.com",
  projectId: "upland-training",
  storageBucket: "upland-training.appspot.com",
  messagingSenderId: "941529421481",
  appId: "1:941529421481:web:84daadc382f81dd3203bb8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);