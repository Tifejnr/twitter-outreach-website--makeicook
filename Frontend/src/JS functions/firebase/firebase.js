// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDzslS4HdgPdscVWu1p1IVH-opi6J5wDk",
  authDomain: "collabfortrello.firebaseapp.com",
  projectId: "collabfortrello",
  storageBucket: "collabfortrello.appspot.com",
  messagingSenderId: "796468122541",
  appId: "1:796468122541:web:df5d2aabdf54e744084724",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
