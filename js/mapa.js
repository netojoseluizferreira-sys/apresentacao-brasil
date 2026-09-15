/* ============================================
   MAPA SVG INTERATIVO DAS 5 REGIÕES
   Usa o SVG oficial do Simplemaps
   ============================================ */

/**
 * Carrega o SVG do Brasil, colore os estados por região
 * e adiciona os eventos de clique/hover.
 */
async function criarMapa() {
    const container = document.getElementById("mapa-brasil");
    if (!container) return;

    try {
        const resposta = await fetch("assets/brasil.svg");
        const svgTexto = await resposta.text();
        container.innerHTML = svgTexto;
    } catch (erro) {
        console.error("Erro ao carregar o SVG:", erro);
        container.innerHTML = "<p>Erro ao carregar o mapa.</p>";
        return;
    }

    const svg = container.querySelector("svg");
    if (!svg) return;

    // Ajustes visuais no SVG inteiro
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("class", "mapa-svg");
    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.maxHeight = "600px";

    // Remove os círculos de "points" e "label_points" (não precisamos)
    svg.querySelectorAll("#points, #label_points").forEach(el => el.remove());

    // Itera sobre cada estado
    const estados = svg.querySelectorAll("#features path");
    estados.forEach(path => {
        const idEstado = path.id; // Ex: "BRSP"
        const regiao = ESTADO_PARA_REGIAO[idEstado];

        if (!regiao) return;

        const dadosRegiao = REGIOES[regiao];

        // Guarda a região em data attribute
        path.dataset.regiao = regiao;
        path.dataset.estado = idEstado;
        path.dataset.nome = path.getAttribute("name") || "";

        // Aplica a cor da região
        path.setAttribute("fill", dadosRegiao.cor);
        path.setAttribute("stroke", "#ffffff");
        path.setAttribute("stroke-width", "0.8");
        path.style.cursor = "pointer";
        path.style.transition = "all 0.2s ease";

    // Hover — destaca o estado + mostra tooltip
    path.addEventListener("mouseenter", (e) => {
        path.style.filter = "brightness(1.3)";
        path.setAttribute("stroke", "#ffdf00");
        path.setAttribute("stroke-width", "1.5");

        const nomeEstado = path.getAttribute("name") || "Unknown";
        const dadosRegiao = REGIOES[regiao];
        mostrarTooltip(e, nomeEstado, dadosRegiao.nome);
    });

    path.addEventListener("mousemove", (e) => {
        moverTooltip(e);
    });

    path.addEventListener("mouseleave", () => {
        if (!path.classList.contains("ativo")) {
            path.style.filter = "";
            path.setAttribute("stroke", "#ffffff");
            path.setAttribute("stroke-width", "0.8");
        }
        esconderTooltip();
    });

        // Clique
        path.addEventListener("click", () => {
            selecionarRegiao(regiao);
        });
    });
}


/**
 * Marca a região como ativa e mostra os detalhes.
 * @param {string} nomeRegiao - chave da região (ex: "Norte")
 */
function selecionarRegiao(nomeRegiao) {
    // Remove destaque de todos os estados
    document.querySelectorAll("#features path").forEach(el => {
        el.classList.remove("ativo");
        el.style.filter = "";
        el.setAttribute("stroke", "#ffffff");
        el.setAttribute("stroke-width", "0.8");
    });

    document.querySelectorAll(".btn-regiao").forEach(el => {
        el.classList.remove("ativo");
    });

    // Destaca todos os estados da região clicada
    document.querySelectorAll(`#features path[data-regiao="${nomeRegiao}"]`).forEach(el => {
        el.classList.add("ativo");
        el.style.filter = "brightness(1.4)";
        el.setAttribute("stroke", "#ffdf00");
        el.setAttribute("stroke-width", "2");
    });

    // Destaca o botão correspondente
    const btnEl = document.querySelector(`.btn-regiao[data-regiao="${nomeRegiao}"]`);
    if (btnEl) btnEl.classList.add("ativo");

    mostrarDetalhes(nomeRegiao);
}


function mostrarDetalhes(nomeRegiao) {
    const painel = document.getElementById("painel-detalhes");
    const dados = REGIOES[nomeRegiao];

    if (!dados) return;

    // Personalidades: mostra o conteúdo ou uma mensagem padrão
    const personalidades = dados.personalidades && dados.personalidades.trim() !== ""
        ? dados.personalidades
        : "No personalities registered yet.";

    painel.innerHTML = `
        <h2>🌎 ${dados.nome}</h2>

        <div class="metricas">
            <div class="metrica">
                <span class="valor">${dados.estados}</span>
                <span class="rotulo">States</span>
            </div>
            <div class="metrica">
                <span class="valor">${dados.capitais.length}</span>
                <span class="rotulo">Capitals</span>
            </div>
            <div class="metrica">
                <span class="valor">${dados.clima.split(" ")[0]}</span>
                <span class="rotulo">Climate</span>
            </div>
        </div>

        <div class="info-bloco">
            <div class="titulo">🎭 Culture</div>
            <div class="conteudo">${dados.cultura}</div>
        </div>

        <div class="info-bloco">
            <div class="titulo">📜 History</div>
            <div class="conteudo">${dados.historia}</div>
        </div>

        <div class="info-bloco">
            <div class="titulo">🍽️ Cuisine</div>
            <div class="conteudo">${dados.culinaria}</div>
        </div>

        <div class="info-bloco">
            <div class="titulo">🏖️ Tourism</div>
            <div class="conteudo">${dados.turismo}</div>
        </div>

        <div class="info-bloco">
            <div class="titulo">🌤️ Climate</div>
            <div class="conteudo">${dados.clima}</div>
        </div>

        <div class="info-bloco">
            <div class="titulo">💡 Fun Fact</div>
            <div class="conteudo">${dados.curiosidade}</div>
        </div>

        <div class="info-bloco">
            <div class="titulo">👤 Personalities</div>
            <div class="conteudo">${personalidades}</div>
        </div>

        <div class="info-bloco">
            <div class="titulo">🏛️ Capitals</div>
            <div class="capitais-lista">
                ${dados.capitais.map(c => `
                    <span class="capital-tag" onclick="buscarClima('${c}')">
                        ${c}
                    </span>
                `).join("")}
            </div>
        </div>

        <div id="clima-container"></div>
    `;
}

/* ============================================
   CLIMA EM TEMPO REAL (Open-Meteo)
   ============================================ */

/**
 * Busca e exibe o clima atual de uma capital.
 * @param {string} nomeCapital - ex: "São Paulo (SP)"
 */
async function buscarClima(nomeCapital) {
    const container = document.getElementById("clima-container");
    if (!container) return;

    // Pega as coordenadas
    const coords = CAPITAIS_COORDS[nomeCapital];
    if (!coords) {
        container.innerHTML = `<p>Coordenadas não encontradas para ${nomeCapital}.</p>`;
        return;
    }

    const [lat, lon] = coords;

    // Mostra loading
    container.innerHTML = `
        <div class="clima-card">
            <div class="clima-loading">⏳ Loading weather for ${nomeCapital}...</div>
        </div>
    `;

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`;

        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Erro na API");

        const dados = await resposta.json();
        const atual = dados.current;

        const icone = traduzirWeatherCode(atual.weather_code);
        const descricao = descricaoWeatherCode(atual.weather_code);

        container.innerHTML = `
            <div class="clima-card">
                <div class="clima-header">
                    <span class="clima-cidade">📍 ${nomeCapital}</span>
                    <span class="clima-agora">now</span>
                </div>

                <div class="clima-principal">
                    <span class="clima-icone">${icone}</span>
                    <span class="clima-temp">${Math.round(atual.temperature_2m)}°C</span>
                </div>

                <div class="clima-descricao">${descricao}</div>

                <div class="clima-detalhes">
                    <div class="clima-item">
                        <span class="clima-label">Sensation</span>
                        <span class="clima-valor">${Math.round(atual.apparent_temperature)}°C</span>
                    </div>
                    <div class="clima-item">
                        <span class="clima-label">Humidity</span>
                        <span class="clima-valor">${atual.relative_humidity_2m}%</span>
                    </div>
                    <div class="clima-item">
                        <span class="clima-label">Wind</span>
                        <span class="clima-valor">${Math.round(atual.wind_speed_10m)} km/h</span>
                    </div>
                    <div class="clima-item">
                        <span class="clima-label">Rain</span>
                        <span class="clima-valor">${atual.precipitation} mm</span>
                    </div>
                </div>
            </div>
        `;
    } catch (erro) {
        console.error("Erro ao buscar clima:", erro);
        container.innerHTML = `
            <div class="clima-card">
                <div class="clima-erro">❌ Não foi possível carregar o clima. Tente novamente.</div>
            </div>
        `;
    }
}


/**
 * Traduz o weather_code da Open-Meteo em emoji.
 * Docs: https://open-meteo.com/en/docs
 */
function traduzirWeatherCode(codigo) {
    const mapa = {
        0: "☀️",   // Céu limpo
        1: "🌤️",   // Principalmente limpo
        2: "⛅",   // Parcialmente nublado
        3: "☁️",   // Nublado
        45: "🌫️",  // Neblina
        48: "🌫️",  // Neblina com geada
        51: "🌦️",  // Garoa leve
        53: "🌦️",  // Garoa moderada
        55: "🌧️",  // Garoa densa
        61: "🌧️",  // Chuva leve
        63: "🌧️",  // Chuva moderada
        65: "🌧️",  // Chuva forte
        71: "❄️",   // Neve leve
        73: "❄️",   // Neve moderada
        75: "❄️",   // Neve forte
        77: "❄️",   // Grãos de neve
        80: "🌧️",  // Pancadas leves
        81: "🌧️",  // Pancadas moderadas
        82: "⛈️",  // Pancadas violentas
        85: "❄️",   // Pancadas de neve leves
        86: "❄️",   // Pancadas de neve fortes
        95: "⛈️",  // Trovoada
        96: "⛈️",  // Trovoada com granizo leve
        99: "⛈️"   // Trovoada com granizo forte
    };
    return mapa[codigo] || "🌡️";
}


/**
 * Traduz o weather_code em descrição em inglês.
 */
function descricaoWeatherCode(codigo) {
    const mapa = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };
    return mapa[codigo] || "Unknown";
}


/**
 * Cria os botões de acesso rápido.
 */
function criarBotoesRegiao() {
    const container = document.getElementById("quick-access");
    if (!container) return;

    container.innerHTML = "";

    for (const nomeRegiao in REGIOES) {
        const dados = REGIOES[nomeRegiao];
        const btn = document.createElement("button");
        btn.className = "btn-regiao";
        btn.dataset.regiao = nomeRegiao;
        btn.textContent = dados.nome;
        btn.addEventListener("click", () => selecionarRegiao(nomeRegiao));
        container.appendChild(btn);
    }
}


/* ============================================
   INICIALIZAÇÃO
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    criarMapa();
    criarBotoesRegiao();
});

/* ============================================
   TOOLTIP
   ============================================ */

/**
 * Mostra o tooltip com o nome do estado e a região.
 * @param {MouseEvent} event
 * @param {string} nomeEstado
 * @param {string} nomeRegiao
 */
function mostrarTooltip(event, nomeEstado, nomeRegiao) {
    const tooltip = document.getElementById("tooltip-mapa");
    if (!tooltip) return;

    tooltip.innerHTML = `
        <span class="tt-estado">${nomeEstado}</span>
        <span class="tt-regiao">📍 ${nomeRegiao}</span>
    `;

    tooltip.classList.add("visivel");
    moverTooltip(event);
}


/**
 * Move o tooltip junto com o mouse.
 * @param {MouseEvent} event
 */
function moverTooltip(event) {
    const tooltip = document.getElementById("tooltip-mapa");
    if (!tooltip) return;

    // Offset pra não ficar embaixo do cursor
    const offsetX = 15;
    const offsetY = 15;

    // Pega o tamanho do tooltip
    const rect = tooltip.getBoundingClientRect();

    // Impede de sair da tela pela direita
    let x = event.clientX + offsetX;
    if (x + rect.width > window.innerWidth) {
        x = event.clientX - rect.width - offsetX;
    }

    // Impede de sair da tela por baixo
    let y = event.clientY + offsetY;
    if (y + rect.height > window.innerHeight) {
        y = event.clientY - rect.height - offsetY;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}


/**
 * Esconde o tooltip.
 */
function esconderTooltip() {
    const tooltip = document.getElementById("tooltip-mapa");
    if (!tooltip) return;
    tooltip.classList.remove("visivel");
}