import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBerb3PosxMuZP_GmR3CrBdXRrsTu21-6M",
    authDomain: "gamespot-vue-b5283.firebaseapp.com",
    projectId: "gamespot-vue-b5283",
    storageBucket: "gamespot-vue-b5283.appspot.com",
    messagingSenderId: "857786316870",
    appId: "1:857786316870:web:e3688290aab55c7791b247",
    measurementId: "G-9E2Y1J1FTB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
    firebaseApp,
    auth,
    db
}