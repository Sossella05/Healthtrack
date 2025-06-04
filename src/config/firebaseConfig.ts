import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC0swm5e196kQprzzFj1i1rPyp04QKCuE", // copie da sua foto
  authDomain: "healthtrack2025.firebaseapp.com",
  projectId: "healthtrack2025",
  storageBucket: "healthtrack2025.appspot.com",
  messagingSenderId: "10296489486367",
  appId: "1:10296489486367:web:4b2d54b6923042c2cae7ca"
  // Não precisa do measurementId para o Firestore
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };