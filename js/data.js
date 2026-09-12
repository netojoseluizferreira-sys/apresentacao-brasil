/* ============================================
   DADOS DAS 5 REGIÕES DO BRASIL (em inglês)
   ============================================ */

const REGIOES = {
    "Norte": {
        nome: "North",
        capitais: [
            "Rio Branco (AC)",
            "Macapá (AP)",
            "Manaus (AM)",
            "Belém (PA)",
            "Porto Velho (RO)",
            "Boa Vista (RR)",
            "Palmas (TO)"
        ],
        estados: 7,
        cultura: "Strong indigenous influence, Parintins Festival, Carimbó dance",
        historia: "Rubber boom, native peoples and the Manaus Free Trade Zone.",
        culinaria: "Tacacá, Açaí, Duck in Tucupi, Maniçoba",
        turismo: "Amazon Theatre, Meeting of the Waters, Marajó Island",
        clima: "Equatorial humid",
        curiosidade: "Home to the largest tropical rainforest in the world",
        cor: "#2E8B57"
    },
    "Nordeste": {
        nome: "Northeast",
        capitais: [
            "Maceió (AL)",
            "Salvador (BA)",
            "Fortaleza (CE)",
            "São Luís (MA)",
            "João Pessoa (PB)",
            "Recife (PE)",
            "Teresina (PI)",
            "Natal (RN)",
            "Aracaju (SE)"
        ],
        estados: 9,
        cultura: "Forró, Frevo, Maracatu, June Festivals, Salvador Carnival",
        historia: "First colonized region, sugar mills and quilombos.",
        culinaria: "Acarajé, Baião de Dois, Sun-dried Beef, Buchada",
        turismo: "Pelourinho, Lençóis Maranhenses, Porto de Galinhas, Jericoacoara",
        clima: "Semi-arid inland, tropical on the coast",
        curiosidade: "Has the largest number of states in Brazil",
        cor: "#FF8C00"
    },
    "Centro-Oeste": {
        nome: "Central-West",
        capitais: [
            "Brasília (DF)",
            "Goiânia (GO)",
            "Cuiabá (MT)",
            "Campo Grande (MS)"
        ],
        estados: 4,
        cultura: "Country music, Festa do Divino, Cururu dance",
        historia: "Bandeirantes, construction of Brasília and settlement of the Pantanal.",
        culinaria: "Rice with Pequi, Paraguayan Soup, Grilled Pintado Fish",
        turismo: "National Congress, Bonito, Chapada dos Veadeiros, Pantanal",
        clima: "Tropical seasonal",
        curiosidade: "Home to the Pantanal, the largest wetland in the world",
        cor: "#8B4513"
    },
    "Sudeste": {
        nome: "Southeast",
        capitais: [
            "Vitória (ES)",
            "Belo Horizonte (MG)",
            "Rio de Janeiro (RJ)",
            "São Paulo (SP)"
        ],
        estados: 4,
        cultura: "Samba, Funk, Folia de Reis, Rodeo Festival",
        historia: "Gold rush, industrialization and major immigration waves.",
        culinaria: "Feijoada, Cheese Bread, Capixaba Moqueca, Virado à Paulista",
        turismo: "Christ the Redeemer, Sugarloaf Mountain, MASP, Inhotim",
        clima: "Tropical highland",
        curiosidade: "Most populous and economically developed region",
        cor: "#4169E1"
    },
    "Sul": {
        nome: "South",
        capitais: [
            "Curitiba (PR)",
            "Florianópolis (SC)",
            "Porto Alegre (RS)"
        ],
        estados: 3,
        cultura: "Gaucho traditions, Oktoberfest, folk dances",
        historia: "European immigration, Farroupilha Revolution and cattle driving.",
        culinaria: "Gaucho Barbecue, Barreado, Pierogi, Chimarrão",
        turismo: "Iguazu Falls, Beto Carrero World, Serra Gaúcha, Curitiba",
        clima: "Subtropical with 4 seasons",
        curiosidade: "The only region in Brazil where it snows",
        cor: "#DC143C"
    }
};


/* ============================================
   QUIZZES POR REGIÃO
   Cada região tem 3 perguntas
   ============================================ */

const QUIZZES = {
    "Norte": [
        {
            pergunta: "Which region has the Amazon Rainforest?",
            opcoes: ["North", "Northeast", "Southeast", "South"],
            resposta: "North",
            explicacao: "The Amazon Rainforest is in the North region."
        },
        {
            pergunta: "What is the typical dish from the North?",
            opcoes: ["Feijoada", "Tacacá", "Churrasco", "Pizza"],
            resposta: "Tacacá",
            explicacao: "Tacacá is a traditional soup from the North."
        },
        {
            pergunta: "Which city is the capital of Amazonas?",
            opcoes: ["Belém", "Manaus", "Macapá", "Palmas"],
            resposta: "Manaus",
            explicacao: "Manaus is the capital of Amazonas."
        }
    ],
    "Nordeste": [
        {
            pergunta: "What is the typical food from the Northeast?",
            opcoes: ["Feijoada", "Acarajé", "Churrasco", "Pizza"],
            resposta: "Acarajé",
            explicacao: "Acarajé is a traditional dish from Bahia."
        },
        {
            pergunta: "Which dance is typical from the Northeast?",
            opcoes: ["Samba", "Forró", "Funk", "Ballet"],
            resposta: "Forró",
            explicacao: "Forró is a traditional dance from the Northeast."
        },
        {
            pergunta: "Which region has the most states in Brazil?",
            opcoes: ["North", "Northeast", "Southeast", "South"],
            resposta: "Northeast",
            explicacao: "The Northeast has 9 states, the most of any region."
        }
    ],
    "Centro-Oeste": [
        {
            pergunta: "Which region is Brasília located in?",
            opcoes: ["Southeast", "North", "Central-West", "South"],
            resposta: "Central-West",
            explicacao: "Brasília, the capital of Brazil, is in the Central-West."
        },
        {
            pergunta: "What is the typical dish from the Central-West?",
            opcoes: ["Rice with Pequi", "Acarajé", "Tacacá", "Churrasco"],
            resposta: "Rice with Pequi",
            explicacao: "Rice with Pequi is very popular in the Central-West."
        },
        {
            pergunta: "Which biome is in the Central-West?",
            opcoes: ["Amazon", "Pantanal", "Atlantic Forest", "Caatinga"],
            resposta: "Pantanal",
            explicacao: "The Pantanal is the world's largest wetland."
        }
    ],
    "Sudeste": [
        {
            pergunta: "Where is Christ the Redeemer?",
            opcoes: ["São Paulo", "Rio de Janeiro", "Salvador", "Curitiba"],
            resposta: "Rio de Janeiro",
            explicacao: "Christ the Redeemer is in Rio de Janeiro."
        },
        {
            pergunta: "Which typical food is from the Southeast?",
            opcoes: ["Tacacá", "Feijoada", "Acarajé", "Barreado"],
            resposta: "Feijoada",
            explicacao: "Feijoada is a classic dish from the Southeast."
        },
        {
            pergunta: "Which is the most populous region?",
            opcoes: ["North", "Northeast", "Central-West", "Southeast"],
            resposta: "Southeast",
            explicacao: "The Southeast is the most populous region."
        }
    ],
    "Sul": [
        {
            pergunta: "Which region has the coldest climate in Brazil?",
            opcoes: ["North", "Northeast", "Central-West", "South"],
            resposta: "South",
            explicacao: "The South has a subtropical climate."
        },
        {
            pergunta: "Which typical drink is from the South?",
            opcoes: ["Caipirinha", "Chimarrão", "Guaraná", "Cachaça"],
            resposta: "Chimarrão",
            explicacao: "Chimarrão is a traditional tea from the South."
        },
        {
            pergunta: "Which famous waterfalls are in the South?",
            opcoes: ["Niagara", "Iguazu Falls", "Victoria Falls", "Angel Falls"],
            resposta: "Iguazu Falls",
            explicacao: "Iguazu Falls are in the South, on the border with Argentina."
        }
    ]
};

/* ============================================
   MAPEAMENTO: Estado (ID do SVG) → Região
   ============================================ */

const ESTADO_PARA_REGIAO = {
    // Norte
    "BRAC": "Norte", "BRAP": "Norte", "BRAM": "Norte", "BRPA": "Norte",
    "BRRO": "Norte", "BRRR": "Norte", "BRTO": "Norte",

    // Nordeste
    "BRAL": "Nordeste", "BRBA": "Nordeste", "BRCE": "Nordeste", "BRMA": "Nordeste",
    "BRPB": "Nordeste", "BRPE": "Nordeste", "BRPI": "Nordeste", "BRRN": "Nordeste",
    "BRSE": "Nordeste",

    // Centro-Oeste
    "BRDF": "Centro-Oeste", "BRGO": "Centro-Oeste",
    "BRMT": "Centro-Oeste", "BRMS": "Centro-Oeste",

    // Sudeste
    "BRES": "Sudeste", "BRMG": "Sudeste",
    "BRRJ": "Sudeste", "BRSP": "Sudeste",

    // Sul
    "BRPR": "Sul", "BRSC": "Sul", "BRRS": "Sul"
};

/* ============================================
   COORDENADAS DAS CAPITAIS
   (latitude, longitude) — usadas pra consultar o clima
   ============================================ */

const CAPITAIS_COORDS = {
    // Norte
    "Rio Branco (AC)": [-9.974, -67.807],
    "Macapá (AP)": [0.034, -51.069],
    "Manaus (AM)": [-3.101, -60.025],
    "Belém (PA)": [-1.456, -48.504],
    "Porto Velho (RO)": [-8.762, -63.904],
    "Boa Vista (RR)": [2.823, -60.675],
    "Palmas (TO)": [-10.184, -48.333],

    // Nordeste
    "Maceió (AL)": [-9.666, -35.735],
    "Salvador (BA)": [-12.971, -38.501],
    "Fortaleza (CE)": [-3.717, -38.543],
    "São Luís (MA)": [-2.530, -44.303],
    "João Pessoa (PB)": [-7.119, -34.845],
    "Recife (PE)": [-8.054, -34.881],
    "Teresina (PI)": [-5.089, -42.802],
    "Natal (RN)": [-5.795, -35.209],
    "Aracaju (SE)": [-10.911, -37.072],

    // Centro-Oeste
    "Brasília (DF)": [-15.793, -47.883],
    "Goiânia (GO)": [-16.686, -49.264],
    "Cuiabá (MT)": [-15.601, -56.097],
    "Campo Grande (MS)": [-20.443, -54.646],

    // Sudeste
    "Vitória (ES)": [-20.319, -40.338],
    "Belo Horizonte (MG)": [-19.917, -43.934],
    "Rio de Janeiro (RJ)": [-22.907, -43.173],
    "São Paulo (SP)": [-23.550, -46.633],

    // Sul
    "Curitiba (PR)": [-25.428, -49.273],
    "Florianópolis (SC)": [-27.595, -48.548],
    "Porto Alegre (RS)": [-30.035, -51.218]
};