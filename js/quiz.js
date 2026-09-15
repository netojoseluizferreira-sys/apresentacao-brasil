/* ============================================
   QUIZ DO BRASIL — uma pergunta por vez
   Resposta travada + correção só no final
   ============================================ */

let indiceAtual = 0;
let respostasUsuario = [];
let respostasTravadas = []; // controla quais perguntas já foram respondidas


/**
 * Inicia o quiz do Brasil.
 */
function iniciarQuizBrasil() {
    const container = document.getElementById("quiz-container");
    if (!container) return;

    indiceAtual = 0;
    respostasUsuario = new Array(PERGUNTAS_BRASIL.length).fill(null);
    respostasTravadas = new Array(PERGUNTAS_BRASIL.length).fill(false);

    renderizarPergunta();
    container.scrollIntoView({ behavior: "smooth", block: "start" });
}


/**
 * Renderiza a pergunta atual.
 */
function renderizarPergunta() {
    const container = document.getElementById("quiz-container");
    const pergunta = PERGUNTAS_BRASIL[indiceAtual];
    const total = PERGUNTAS_BRASIL.length;
    const progresso = (indiceAtual / total) * 100;

    const respostaSalva = respostasUsuario[indiceAtual];
    const travada = respostasTravadas[indiceAtual];

    const opcoesHTML = pergunta.opcoes.map((opcao) => {
        let classe = "opcao";
        if (respostaSalva === opcao) classe += " selecionada";
        if (travada) classe += " travada";

        return `
            <label class="${classe}" data-opcao="${opcao}">
                <input type="radio" name="pergunta-atual" value="${opcao}"
                    ${respostaSalva === opcao ? "checked" : ""}
                    ${travada ? "disabled" : ""}>
                <span>${opcao}</span>
            </label>
        `;
    }).join("");

    const botaoTexto = indiceAtual === total - 1 ? "Finish Quiz" : "Next →";
    // Botão Back só aparece se a pergunta anterior não estiver travada
    const podeVoltar = indiceAtual > 0 && !respostasTravadas[indiceAtual - 1];
    const botaoAnterior = podeVoltar
        ? `<button class="quiz-btn-nav quiz-btn-prev" id="btn-prev">← Back</button>`
        : `<div></div>`;

    container.innerHTML = `
        <h2>🎯 Brazil Quiz</h2>

        <div class="quiz-progresso-wrapper">
            <div class="quiz-progresso-barra" style="width: ${progresso}%"></div>
        </div>
        <div class="quiz-progresso-texto">
            Question ${indiceAtual + 1} of ${total}
        </div>

        <div class="pergunta">
            <h3>${pergunta.pergunta}</h3>
            <div class="opcoes">${opcoesHTML}</div>
            ${travada ? `<div class="feedback travado">🔒 Answer locked</div>` : ""}
        </div>

        <div class="quiz-nav">
            ${botaoAnterior}
            <button class="quiz-btn-nav quiz-btn-next" id="btn-next" disabled>
                ${travada ? botaoTexto : "Confirm Answer"}
            </button>
        </div>
    `;

    const btnNext = document.getElementById("btn-next");

    // Se já está travada, o botão Next fica direto habilitado
    if (travada) {
        btnNext.disabled = false;
        btnNext.textContent = botaoTexto;
    }

    // Evento das opções
    container.querySelectorAll(".opcao input").forEach(input => {
        input.addEventListener("change", () => {
            if (respostasTravadas[indiceAtual]) return;

            respostasUsuario[indiceAtual] = input.value;

            container.querySelectorAll(".opcao").forEach(opt => opt.classList.remove("selecionada"));
            input.closest(".opcao").classList.add("selecionada");

            // Muda o texto do botão pra "Confirm Answer"
            btnNext.disabled = false;
            btnNext.textContent = "Confirm Answer";
        });
    });

    // Clique no botão Next / Confirm
    btnNext.addEventListener("click", () => {
        // Se ainda não travou, trava agora
        if (!respostasTravadas[indiceAtual]) {
            if (!respostasUsuario[indiceAtual]) return;

            // Trava
            respostasTravadas[indiceAtual] = true;

            // Desabilita inputs
            container.querySelectorAll(".opcao input").forEach(i => i.disabled = true);

            // Marca visualmente
            container.querySelectorAll(".opcao").forEach(opt => opt.classList.add("travada"));

            // Mostra feedback de travado
            const perguntaBox = container.querySelector(".pergunta");
            if (!perguntaBox.querySelector(".feedback")) {
                const aviso = document.createElement("div");
                aviso.className = "feedback travado";
                aviso.textContent = "🔒 Answer locked";
                perguntaBox.appendChild(aviso);
            }

            // Muda o botão pra Next/Finish
            btnNext.textContent = (indiceAtual === PERGUNTAS_BRASIL.length - 1)
                ? "Finish Quiz"
                : "Next →";

            return;
        }

        // Já está travada → avança
        if (indiceAtual === PERGUNTAS_BRASIL.length - 1) {
            mostrarResultadoFinal();
        } else {
            indiceAtual++;
            renderizarPergunta();
        }
    });

    // Botão Prev (só existe se a anterior não estiver travada)
    const btnPrev = document.getElementById("btn-prev");
    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (indiceAtual > 0 && !respostasTravadas[indiceAtual - 1]) {
                indiceAtual--;
                renderizarPergunta();
            }
        });
    }
}


/**
 * Mostra o resultado final com todas as correções.
 */
function mostrarResultadoFinal() {
    const container = document.getElementById("quiz-container");
    const total = PERGUNTAS_BRASIL.length;

    let pontuacao = 0;

    const revisaoHTML = PERGUNTAS_BRASIL.map((pergunta, index) => {
        const respostaUsuario = respostasUsuario[index];
        const correto = respostaUsuario === pergunta.resposta;

        if (correto) pontuacao++;

        const opcoesRevisao = pergunta.opcoes.map((opcao) => {
            let classe = "opcao";

            if (opcao === pergunta.resposta) {
                classe += " correta";
            } else if (opcao === respostaUsuario && !correto) {
                classe += " errada";
            }

            return `
                <div class="${classe}" data-opcao="${opcao}">
                    <span>${opcao}</span>
                </div>
            `;
        }).join("");

        return `
            <div class="pergunta-revisao">
                <h3>
                    <span class="rev-numero">${index + 1}</span>
                    ${pergunta.pergunta}
                    <span class="rev-status">${correto ? "✅" : "❌"}</span>
                </h3>
                <div class="opcoes">${opcoesRevisao}</div>
                <div class="feedback ${correto ? "correto" : "incorreto"}">
                    ${correto
                        ? `✅ Correct! ${pergunta.explicacao}`
                        : `❌ You chose <strong>${respostaUsuario || "—"}</strong>. Correct answer: <strong>${pergunta.resposta}</strong>. ${pergunta.explicacao}`
                    }
                </div>
            </div>
        `;
    }).join("");

    let mensagemFinal;
    if (pontuacao === total) {
        mensagemFinal = "🏆 Perfect! You're a Brazil Expert!";
    } else if (pontuacao >= total * 0.8) {
        mensagemFinal = "🌟 Great job! You know Brazil very well!";
    } else if (pontuacao >= total * 0.5) {
        mensagemFinal = "👍 Not bad! Keep learning about Brazil!";
    } else {
        mensagemFinal = "📚 Keep exploring! Brazil has so much to offer!";
    }

    container.innerHTML = `
        <div class="resultado-final ativo">
            <div class="pontuacao">${pontuacao}/${total}</div>
            <div class="mensagem">${mensagemFinal}</div>
        </div>

        <h3 class="revisao-titulo">📋 Review your answers</h3>
        <div class="revisao-container">
            ${revisaoHTML}
        </div>
    `;

    // Depois de montar o resultado
    salvarResultado(nomeAluno, pontuacao);

    container.scrollIntoView({ behavior: "smooth", block: "start" });
}


/* ============================================
   INICIALIZAÇÃO
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("quiz-container");
    if (!container) return;

    container.innerHTML = `
        <h2>🎯 Brazil Quiz</h2>
        <p>Type your name to start the quiz!</p>

        <div class="quiz-nome-wrapper">
            <input type="text" id="input-nome" class="quiz-input-nome"
                placeholder="Your name" maxlength="30" autocomplete="off">
            <button class="quiz-btn-iniciar" id="btn-iniciar-quiz" disabled>
                Start Quiz
            </button>
        </div>
    `;

    const inputNome = document.getElementById("input-nome");
    const btnIniciar = document.getElementById("btn-iniciar-quiz");

    // Habilita o botão só quando tiver pelo menos 2 caracteres
    inputNome.addEventListener("input", () => {
        btnIniciar.disabled = inputNome.value.trim().length < 2;
    });

    // Enter no input = inicia o quiz
    inputNome.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !btnIniciar.disabled) {
            btnIniciar.click();
        }
    });

    btnIniciar.addEventListener("click", () => {
        const nome = inputNome.value.trim();
        if (nome.length < 2) return;

        nomeAluno = nome;
        iniciarQuizBrasil();
    });
});