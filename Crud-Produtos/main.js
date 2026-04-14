import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// INPUTS
const Prodt = document.querySelector("#Produto");
const Prc = document.querySelector("#Preco");
const Qnt = document.querySelector("#Qnt");
const vazio = document.querySelector(".vazio");

// BOTÃO CADASTRAR
const Button = document.querySelector(".Add");
Button.addEventListener("click", (e) => {
  e.preventDefault();
  adicionarProduto();
});

// ➕ ADICIONAR PRODUTO
async function adicionarProduto() {
  if (!Prodt.value || !Prc.value || !Qnt.value) {
    alert("INSIRA TODOS OS DADOS!");
    return;
  }

  try {
    await addDoc(collection(db, "produtos"), {
      Produto: Prodt.value.toUpperCase(),
      Preco: Number(Prc.value),
      Quantidade: Qnt.value,
    });

    limparInputs();
    carregarProdutos();
  } catch (error) {
    console.error("Erro ao adicionar:", error);
  }
}

// 📥 CARREGAR PRODUTOS
async function carregarProdutos() {
  const tbody = document.querySelector("#body");
  tbody.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "produtos"));

    if (querySnapshot.empty) {
      vazio.style.display = "block";
      return;
    }

    vazio.style.display = "none";

    querySnapshot.forEach((docItem) => {
      const data = docItem.data();
      criarLinha({ ...data, id: docItem.id });
    });
  } catch (error) {
    console.error("Erro ao carregar:", error);
  }
}

// 🧱 CRIAR LINHA
function criarLinha(dados) {
  const tbody = document.querySelector("#body");
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${dados.Produto}</td>
    <td>R$ ${Number(dados.Preco).toFixed(2).replace(".", ",")}</td>
    <td>${dados.Quantidade} UN</td>
    <td>
      <button class="delete">DELETE</button>
      <button class="update">UPDATE</button>
    </td>
  `;

  // DELETE
  tr.querySelector(".delete").addEventListener("click", () => {
    deletarProduto(dados.id);
  });

  // UPDATE
  tr.querySelector(".update").addEventListener("click", () => {
    abrirModal(dados);
  });

  tbody.appendChild(tr);
}

// ❌ DELETAR
async function deletarProduto(id) {
  try {
    await deleteDoc(doc(db, "produtos", id));
    carregarProdutos();
  } catch (error) {
    console.error("Erro ao deletar:", error);
  }
}

// ✏️ MODAL
const modal = document.querySelector(".modal");
const btnClose = document.getElementById("close");
const btnUpdate = document.getElementById("update");

function abrirModal(dados) {
  modal.classList.remove("none");

  document.getElementById("product").value = dados.Produto;
  document.getElementById("price").value = dados.Preco;
  document.getElementById("amount").value = dados.Quantidade;

  btnUpdate.onclick = () => atualizarProduto(dados.id);
}

btnClose.addEventListener("click", () => {
  modal.classList.add("none");
});

// 🔄 ATUALIZAR
async function atualizarProduto(id) {
  const nome = document.getElementById("product").value;
  const preco = document.getElementById("price").value;
  const quantidade = document.getElementById("amount").value;

  if (!nome || !preco || !quantidade) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    await updateDoc(doc(db, "produtos", id), {
      Produto: nome.toUpperCase(),
      Preco: Number(preco),
      Quantidade: quantidade,
    });

    modal.classList.add("none");
    carregarProdutos();
  } catch (error) {
    console.error("Erro ao atualizar:", error);
  }
}

// 🧹 LIMPAR INPUTS
function limparInputs() {
  Prodt.value = "";
  Prc.value = "";
  Qnt.value = "";
}

// 🚀 INICIAR
carregarProdutos();
