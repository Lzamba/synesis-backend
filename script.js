let idade;
let currentSlide = 0;
let timerInterval;
let questoes;
const tempoLeitura = 30;
const tempoResposta = 45;

async function carregarBancoDeQuestoes() {
    try {
        const response = await fetch("banco_questoes.json");
        if (!response.ok) throw new Error("Erro ao carregar JSON");
        const data = await response.json();
        questoes = data.memoria.facil;
    } catch (error) {
        console.error("Erro ao carregar banco de questões:", error);
        alert("Erro ao carregar as questões. Tente novamente.");
    }
}

function iniciarTriagem() {
    idade = parseInt(document.getElementById("idade").value);
    if (idade >= 5) {
        document.getElementById("telaInicial").classList.add("hidden");
        document.getElementById("telaTeste").classList.remove("hidden");
        iniciarTesteMemoria();
    } else {
        alert("A idade mínima para participar é 5 anos.");
    }
}

function iniciarTesteMemoria() {
    carregarSlide();
}

function iniciarTimer(duracao, callback) {
    let tempo = duracao;
    document.getElementById("timer").textContent = tempo;
    document.getElementById("semaforo").innerHTML = "🔴";

    timerInterval = setInterval(() => {
        tempo--;
        document.getElementById("timer").textContent = tempo;

        if (tempo <= 10 && tempo > 3) {
            document.getElementById("semaforo").innerHTML = "🟡";
        }
        if (tempo <= 3) {
            document.getElementById("semaforo").innerHTML = "🟢";
        }
        if (tempo <= 0) {
            clearInterval(timerInterval);
            callback();
        }
    }, 1000);
}

function avancarSlide() {
    clearInterval(timerInterval);
    currentSlide++;

    if (currentSlide >= questoes.length) {
        document.getElementById("telaTeste").classList.add("hidden");
        document.getElementById("telaFinal").classList.remove("hidden");
        document.getElementById("resultadoFinal").textContent = "Parabéns, você concluiu o teste!";
        return;
    }

    carregarSlide();
}

function carregarSlide() {
    let questao = questoes[currentSlide];
    document.getElementById("tituloTeste").textContent = "Teste de Memória";
    document.getElementById("enunciadoTeste").textContent = questao.enunciado;

    iniciarTimer(tempoLeitura, avancarSlide);
}