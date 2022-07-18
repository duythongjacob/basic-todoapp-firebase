import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAaxCD4NKPVEHFCZHZkFT5l3H20vUAFoP8",
    authDomain: "todo-app-632c1.firebaseapp.com",
    projectId: "todo-app-632c1",
    storageBucket: "todo-app-632c1.appspot.com",
    messagingSenderId: "852084519830",
    appId: "1:852084519830:web:e3c2bd79058573cdb6e3b7",
    measurementId: "G-CQL6RE1RR0"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db