import { usuariosRef } from "./firebaseConfig.js";
import { addDoc, getDocs, doc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form = document.getElementById("camisaForm");
const listaAlunos = document.getElementById("listaAlunos");

// --- FUNÇÃO: SALVAR ---
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const nturma = document.getElementById("nturma").value;
    const tempo = document.getElementById("tempo").value;

    try {
        await addDoc(usuariosRef, {
            nome,
            nturma,
            tempo,
            dataCriacao: new Date()
        });
        form.reset();
        alert("Aluno salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
});

// --- FUNÇÃO: DELETAR ---
window.deletarAluno = async (id) => {
    if (confirm("Deseja realmente excluir este aluno?")) {
        try {
            await deleteDoc(doc(usuariosRef, id));
        } catch (error) {
            console.error("Erro ao deletar:", error);
        }
    }
};

// --- FUNÇÃO: LISTAR EM TEMPO REAL ---
onSnapshot(usuariosRef, (snapshot) => {
    listaAlunos.innerHTML = "";
    snapshot.forEach((doc) => {
        const aluno = doc.data();
        const li = document.createElement("li");
        
        li.innerHTML = `
            <div class="info-aluno">
                <strong>${aluno.nome}</strong> - ${aluno.nturma} (${aluno.tempo})
            </div>
            <button onclick="deletarAluno('${doc.id}')" style="background-color: #dc3545; color: white; padding: 5px 10px;">Excluir</button>
        `;
        listaAlunos.appendChild(li);
    });
});