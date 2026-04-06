import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAOP1OU6_owph4nYIusHT8MGHFNWkIywE",
  authDomain: "the-aula.firebaseapp.com",
  projectId: "the-aula",
  storageBucket: "the-aula.firebasestorage.app",
  messagingSenderId: "1076962595712",
  appId: "1:1076962595712:web:51a3b546a1116b2820e765",
  measurementId: "G-LJ9EXX2Q7T",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
