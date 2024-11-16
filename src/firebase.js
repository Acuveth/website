// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDCro8yXOWzR_-CgGzVleN-LecyBCo-ng",
  authDomain: "studentski-dogodki.firebaseapp.com",
  projectId: "studentski-dogodki",
  storageBucket: "studentski-dogodki.firebasestorage.app",
  messagingSenderId: "835239593044",
  appId: "1:835239593044:web:55ac138ac63d773232d9c1",
  measurementId: "G-VVD04WRBKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, analytics };
