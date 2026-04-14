// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAOP1OU6_owph4nYIusHT8MGHFNWkIywE",
  authDomain: "the-aula.firebaseapp.com",
  projectId: "the-aula",
  storageBucket: "the-aula.firebasestorage.app",
  messagingSenderId: "1076962595712",
  appId: "1:1076962595712:web:51a3b546a1116b2820e765",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 🔥 BANCO CERTO (Firestore)
const db = getFirestore(app);

// exporta
export { db };
