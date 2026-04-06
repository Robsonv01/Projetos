import { db } from "./firebaseConfig.js";
import {
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const temperaturaRef = ref(db, "temperaturas");

const ctx = document.getElementById("grafico").getContext("2d");

let grafico = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Temperatura (°C)",
        data: [],
        tension: 0.3,
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    plugins: {
      legend: { labels: { color: "white" } },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } },
    },
  },
});

window.enviar = function () {
  const valor = document.getElementById("temp").value;
  if (!valor) return;

  push(temperaturaRef, {
    valor: Number(valor),
    hora: new Date().toLocaleTimeString(),
  });

  document.getElementById("temp").value = "";
};

function atualizarStatus(temp) {
  const status = document.getElementById("status");

  if (temp < 15) {
    status.innerText = "❄️ Frio";
  } else if (temp < 30) {
    status.innerText = "🌤️ Agradável";
  } else {
    status.innerText = "🔥 Quente";
  }
}

onValue(temperaturaRef, (snapshot) => {
  let dados = [];
  let labels = [];

  snapshot.forEach((child) => {
    const item = child.val();
    dados.push(item.valor);
    labels.push(item.hora);
  });

  grafico.data.labels = labels;
  grafico.data.datasets[0].data = dados;
  grafico.update();

  if (dados.length > 0) {
    atualizarStatus(dados[dados.length - 1]);
  }
});
// 5000 milissegundos = 5 segundos
let intervaloAuto = null;

// Função para gerar número aleatório
function gerarTemperaturaAleatoria(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

// Função para INICIAR o envio automático
window.iniciarAutomacao = function () {
  if (intervaloAuto) return; // Evita criar múltiplos intervalos

  // Atualiza os botões
  document.getElementById("btnIniciar").disabled = true;
  document.getElementById("btnParar").disabled = false;

  intervaloAuto = setInterval(() => {
    const tempAleatoria = gerarTemperaturaAleatoria(10, 40);

    push(temperaturaRef, {
      valor: Number(tempAleatoria),
      hora: new Date().toLocaleTimeString(),
    });
  }, 3000); // Envia a cada 3 segundos
};

// Função para PARAR o envio automático
window.pararAutomacao = function () {
  clearInterval(intervaloAuto);
  intervaloAuto = null;

  // Atualiza os botões
  document.getElementById("btnIniciar").disabled = false;
  document.getElementById("btnParar").disabled = true;
};
