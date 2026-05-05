import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA8_kqZCEs4GYoZZ1iYJmCMkU3nOv_s-wY",
  authDomain: "formulario-crud-6eb00.firebaseapp.com",
  projectId: "formulario-crud-6eb00",
  storageBucket: "formulario-crud-6eb00.firebasestorage.app",
  messagingSenderId: "207250119704",
  appId: "1:207250119704:web:8813778323307f73b9376d",
  measurementId: "G-2FNLF2DD9V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportamos a referência da coleção para usar no script principal
export const usuariosRef = collection(db, "usuarios");
export { db };