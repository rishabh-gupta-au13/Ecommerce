// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIAFazrpzRfoal8E3q4OS45ipvaSXZcAQ",
  authDomain: "portfolio-4ab58.firebaseapp.com",
  projectId: "portfolio-4ab58",
  storageBucket: "portfolio-4ab58.appspot.com",
  messagingSenderId: "382202501808",
  appId: "1:382202501808:web:43b07de89c23fb6f3eb975",
  measurementId: "G-R4ECEFQXT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
// const analytics = getAnalytics(app);