/* ============================================
   QUIZ POR REGIÃO — com trava de resposta
   ============================================ */

let regiaoAtualQuiz = null;

/**
 * Inicia o quiz de uma região específica.
 * @param {string} nomeRegiao - chave da região em REGIOES
 */
function iniciarQuizRegiao(nomeRegiao) {
    const container = document.getElementById("quiz-container");
    if (!container) return;

    regiaoAtualQuiz = nomeRegiao;
    const perguntas = QUIZZES[nomeRegiao];

    if (!perguntas) return;

    const dados = REGIOES[nomeRegiao];

    container.innerHTML = `
        <h2>🎯 Quiz: ${dados.nome}</h2>
        <p>Test your knowledge about the ${dados.nome} region!</p>

        <div id="quiz-perguntas"></div>

        <div class="resultado-final" id="resultado-final">
            <div class="pontuacao" id="pontuacao-valor">0/0</div>
            <div class="mensagem" id="pontuacao-mensagem"></div>
        </div>

        <div style="text-align:center; margin-top:1.5rem;">
            <button class="quiz-btn-resultado" id="btn-voltar">← Back to Map</button>
        </div>
    `;

    const quizPerguntas = document.getElementById("quiz-perguntas");

    perguntas.forEach((pergunta, index) => {
        const bloco = document.createElement("div");
        bloco.className = "pergunta";
        bloco.dataset.index = index;

        const opcoesHTML = pergunta.opcoes.map((opcao) => `
            <label class="opcao" data-opcao="${opcao}">
                <input type="radio" name="pergunta-${index}" value="${opcao}">
                <span>${opcao}</span>
            </label>
        `).join("");

        bloco.innerHTML = `
            <h3>Question ${index + 1}: ${pergunta.pergunta}</h3>
            <div class="opcoes">${opcoesHTML}</div>
            <div class="feedback" id="feedback-${index}"></div>
        `;

        quizPerguntas.appendChild(bloco);

        // Evento de clique em cada opção
        bloco.querySelectorAll(".opcao input").forEach(input => {
            input.addEventListener("change", () => verificarResposta(index));
        });
    });

    // Botão de voltar
    document.getElementById("btn-voltar").addEventListener("click", voltarAoMapa);

    // Scroll suave até o quiz
    container.scrollIntoView({ behavior: "smooth", block: "start" });
}


/**
 * Verifica a resposta de uma pergunta e TRAVA ela.
 * @param {number} index - índice da pergunta
 */
function verificarResposta(index) {
    const pergunta = QUIZZES[regiaoAtualQuiz][index];
    const bloco = document.querySelector(`.pergunta[data-index="${index}"]`);
    const feedback = document.getElementById(`feedback-${index}`);

    // Se já foi respondida, ignora
    if (bloco.dataset.respondida === "true") return;

    const selecionada = bloco.querySelector(`input[name="pergunta-${index}"]:checked`);
    if (!selecionada) return;

    const respostaUsuario = selecionada.value;
    const correto = respostaUsuario === pergunta.resposta;

    // Trava a pergunta
    bloco.dataset.respondida = "true";

    // Desabilita todos os inputs dessa pergunta
    bloco.querySelectorAll("input").forEach(input => {
        input.disabled = true;
    });

    // Remove classes antigas
    bloco.querySelectorAll(".opcao").forEach(opt => {
        opt.classList.remove("correta", "errada");
    });

    // Marca a opção escolhida
    const opcaoEscolhida = bloco.querySelector(`.opcao[data-opcao="${respostaUsuario}"]`);
    opcaoEscolhida.classList.add(correto ? "correta" : "errada");

    // Se errou, marca também a correta
    if (!correto) {
        const opcaoCorreta = bloco.querySelector(`.opcao[data-opcao="${pergunta.resposta}"]`);
        if (opcaoCorreta) opcaoCorreta.classList.add("correta");
    }

    // Feedback em texto
    if (correto) {
        feedback.className = "feedback correto";
        feedback.textContent = `✅ Correct! ${pergunta.explicacao}`;
    } else {
        feedback.className = "feedback incorreto";
        feedback.textContent = `❌ Incorrect! The correct answer is: ${pergunta.resposta}. ${pergunta.explicacao}`;
    }

    // Se todas as perguntas foram respondidas, mostra o resultado
    const totalRespondidas = document.querySelectorAll('.pergunta[data-respondida="true"]').length;
    if (totalRespondidas === QUIZZES[regiaoAtualQuiz].length) {
        setTimeout(mostrarResultado, 800);
    }
}


/**
 * Calcula a pontuação final e mostra o resultado.
 */
function mostrarResultado() {
    let pontuacao = 0;
    const perguntas = QUIZZES[regiaoAtualQuiz];

    perguntas.forEach((pergunta, index) => {
        const bloco = document.querySelector(`.pergunta[data-index="${index}"]`);
        const marcada = bloco.querySelector(".opcao.correta");

        // Verifica se a opção marcada como correta é a que o usuário escolheu
        const inputMarcado = bloco.querySelector("input:checked");
        if (inputMarcado && inputMarcado.value === pergunta.resposta) {
            pontuacao++;
        }
    });

    const resultadoFinal = document.getElementById("resultado-final");
    const valor = document.getElementById("pontuacao-valor");
    const mensagem = document.getElementById("pontuacao-mensagem");

    valor.textContent = `${pontuacao}/${perguntas.length}`;

    if (pontuacao === perguntas.length) {
        mensagem.textContent = "🏆 Perfect! You're a Brazil Expert!";
    } else if (pontuacao >= perguntas.length - 1) {
        mensagem.textContent = "🌟 Great job! You know Brazil very well!";
    } else if (pontuacao >= Math.ceil(perguntas.length / 2)) {
        mensagem.textContent = "👍 Not bad! Keep learning about Brazil!";
    } else {
        mensagem.textContent = "📚 Keep exploring! Brazil has so much to offer!";
    }

    resultadoFinal.classList.add("ativo");
    resultadoFinal.scrollIntoView({ behavior: "smooth", block: "center" });
}


/**
 * Volta para o mapa, limpando o quiz atual.
 */
function voltarAoMapa() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = `
        <h2>🎯 Brazil Regions Quiz</h2>
        <p>Click on a region on the map to start its quiz!</p>
    `;
    regiaoAtualQuiz = null;

    // Scroll suave até o mapa
    document.querySelector(".container").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ============================================
   INICIALIZAÇÃO
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    // Estado inicial do quiz
    const container = document.getElementById("quiz-container");
    if (container) {
        container.innerHTML = `
            <h2>🎯 Brazil Regions Quiz</h2>
            <p>Click on a region on the map to start its quiz!</p>
        `;
    }
});