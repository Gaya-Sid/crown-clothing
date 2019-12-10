import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyB-3GV8CgTOtR5J0d4nAL1EeQKILKgMGCY",
    authDomain: "crown-db-20b25.firebaseapp.com",
    databaseURL: "https://crown-db-20b25.firebaseio.com",
    projectId: "crown-db-20b25",
    storageBucket: "crown-db-20b25.appspot.com",
    messagingSenderId: "200485668113",
    appId: "1:200485668113:web:bf05cfef4caba955bb78b0",
    measurementId: "G-XNS8NZS27C"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;