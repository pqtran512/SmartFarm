import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import * as firebase from 'firebase';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBAt2wK6GXk4RqaofW4Z2WU8kwMr70as1Q",
    authDomain: "multi-project-60298.firebaseapp.com",
    projectId: "multi-project-60298",
    storageBucket: "multi-project-60298.appspot.com",
    messagingSenderId: "673633016311",
    appId: "1:673633016311:web:83dcf391b18b56789236f2",
    measurementId: "G-3T49CEPFGZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const db = getFirestore(app);
