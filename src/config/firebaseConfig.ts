import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCQ5wsn5e196kq0rpz7Fj1irPyp04QKCuE",
  authDomain: "healthtrack2025.firebaseapp.com",
  projectId: "healthtrack2025",
  storageBucket: "healthtrack2025.appspot.com",
  messagingSenderId: "1029684986367",
  appId: "1:1029684986367:web:4b2d54b6923042c2cae7ca"
};

// Inicialize o app Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Firestore e Auth com tipagem explícita
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };