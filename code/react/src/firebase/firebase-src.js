import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGiBVs5u3iteDbQW6DVR4Jok2hD1UNlxM",
  authDomain: "cs554-finalproject-f5ec7.firebaseapp.com",
  projectId: "cs554-finalproject-f5ec7",
  storageBucket: "cs554-finalproject-f5ec7.appspot.com",
  messagingSenderId: "1066024501369",
  appId: "1:1066024501369:web:1aafe34526851033bf54a8",
  measurementId: "G-7ZSQ91C9LM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Gets reference to auth
const auth = getAuth(app);

const signUpUser = async (email, password) => {
    const userInput = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User Created:', userInput.user);
    return userInput;
}

const signInUser = async (email, password) => {
    const userInput = await signInWithEmailAndPassword(auth, email, password);
    console.log('User Signed In:', userInput.user);
    return userInput;
}

const signOutUser = async () => {
    await signOut(auth);
    console.log('User Signed Out');
}

export { auth, signUpUser, signInUser, signOutUser };