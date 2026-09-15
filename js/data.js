/* ============================================
   DADOS DAS 5 REGIÕES DO BRASIL
   Baseado 100% nas pesquisas da turma
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
        cultura: "Strong indigenous influence. Parintins Festival (Amazonas), Carimbó dance (Pará), Círio de Nazaré procession (Belém), Bumba Meu Boi / Boi-Bumbá in Amazonas.",
        historia: "Rubber boom, native peoples and the Manaus Free Trade Zone.",
        culinaria: "Tacacá, Açaí, Duck in Tucupi, Maniçoba.",
        turismo: "Amazon Theatre (Manaus), Meeting of the Waters, Marajó Island, Círio de Nazaré in Belém.",
        clima: "Equatorial: hot and humid year-round with high rainfall. Averages 25°C to 27°C with little seasonal variation. Covers the Amazon basin; heavy rains occur during the wet season.",
        curiosidade: "Home to the Amazon Rainforest, the largest tropical rainforest in the world. Covers the Amazon basin.",
        personalidades: "",
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
        cultura: "Forró, Frevo (Pernambuco), Axé (Bahia), Maracatu, June Festivals (Festas Juninas) with forró music and corn-based foods. Bumba Meu Boi in Maranhão. Salvador Carnival.",
        historia: "First colonized region. Sugar mills during the colonial period. Quilombos. Lacerda Elevator in Salvador, built in 1873 — once the world's tallest, connecting Upper and Lower City.",
        culinaria: "Acarajé, Baião de Dois, Sun-dried Beef, Buchada.",
        turismo: "Pelourinho (Salvador), Lençóis Maranhenses, Porto de Galinhas, Jericoacoara, Barra de São Miguel (Alagoas) — calm waters, natural pools, beautiful beaches. Lacerda Elevator (Salvador).",
        clima: "Semi-arid inland: hot and dry with very low, irregular rainfall. Frequently exceeds 38°C during dry periods. The interior 'drought polygon' suffers from prolonged dry seasons, contrasting with the humid Atlantic coast.",
        curiosidade: "Has the largest number of states in Brazil (9). The Atlantic coast is humid, while the interior is semi-arid.",
        personalidades: "",
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
        cultura: "Country music, Festa do Divino, Cururu dance, Cavalhadas in Goiás.",
        historia: "Bandeirantes, construction of Brasília and settlement of the Pantanal.",
        culinaria: "Rice with Pequi, Paraguayan Soup, Grilled Pintado Fish.",
        turismo: "National Congress (Brasília), Bonito, Chapada dos Veadeiros, Pantanal.",
        clima: "Tropical with seasons: rainy summer and dry winter. Hot most of the year. Rainy season from October to April; dry season from May to September.",
        curiosidade: "Two clear seasons: rainy summer and dry winter. Hot most of the year. Home to the Pantanal, the world's largest wetland.",
        personalidades: "",
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
        cultura: "Samba (Rio de Janeiro and São Paulo), Funk, Folia de Reis, Festa do Peão. Carnival with samba schools.",
        historia: "Gold rush in Minas Gerais during the colonial period. Coffee economy. Industrialization and major immigration waves.",
        culinaria: "Feijoada, Cheese Bread, Capixaba Moqueca, Virado à Paulista. Popular foods: brigadeiro, coxinha.",
        turismo: "Christ the Redeemer (Rio, built 1926–1931), Sugarloaf Mountain (Rio), Ibirapuera Park (São Paulo), Museum of Tomorrow (Rio) with interactive exhibitions, MASP, Inhotim.",
        clima: "Tropical highland: hot and wet summers, mild winters. Rain in summer, dry in winter. The coast is hotter and wetter than the interior.",
        curiosidade: "Most populous and economically developed region. Christ the Redeemer was built between 1926 and 1931 in Rio de Janeiro. Ibirapuera Park (São Paulo) and the Museum of Tomorrow (Rio) are great places to explore, relax, and have fun.",
        personalidades: "Alberto Santos-Dumont (1873–1932), the Father of Aviation — flew the 14-bis in Paris in 1906 and helped popularize the modern wristwatch. Erika Hilton, Black transgender politician and human rights activist from São Paulo. Mauricio de Sousa, creator of Monica's Gang (Turma da Mônica). Chico Buarque, singer who wrote 'Apesar de Você' against the dictatorship. Giba and Serginho, volleyball legends.",
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
        cultura: "Gaucho traditions (CTGs), Oktoberfest, folk dances from European immigrants.",
        historia: "European immigration (German, Italian, etc.), Farroupilha Revolution and cattle driving.",
        culinaria: "Gaucho Barbecue, Barreado, Pierogi, Chimarrão.",
        turismo: "Iguazu Falls (275 waterfalls on the Brazil-Argentina border), Beto Carrero World, Serra Gaúcha, Curitiba.",
        clima: "Subtropical with four clear seasons. Winter is not too cold and not too hot. Summer is warm. The only region in Brazil with snow.",
        curiosidade: "The only region in Brazil where it snows. Four clear seasons. Has 3 states only.",
        personalidades: "",
        cor: "#DC143C"
    }
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
   Usadas para buscar o clima em tempo real
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


/* ============================================
   QUIZ DO BRASIL — 20 perguntas
   Estrutura: Clima, História, Cultura, Culinária,
   Turismo, Personalidades, Esportes
   ============================================ */

const PERGUNTAS_BRASIL = [
    // ============================================
    // CLIMA (4)
    // 1 Norte, 1 Nordeste, 1 Centro-Oeste, 1 Sul
    // ============================================
    {
        pergunta: "What is the climate of the North region?",
        opcoes: ["Semi-arid", "Subtropical", "Equatorial", "Tropical highland"],
        resposta: "Equatorial",
        explicacao: "The North is equatorial: hot and humid year-round, with heavy rainfall."
    },
    {
        pergunta: "What is the climate of the Northeast inland?",
        opcoes: ["Equatorial", "Semi-arid", "Subtropical", "Tropical highland"],
        resposta: "Semi-arid",
        explicacao: "The Northeast inland is semi-arid: hot and dry with very low, irregular rainfall."
    },
    {
        pergunta: "When is the rainy season in the Central-West?",
        opcoes: ["January to March", "October to April", "May to September", "June to August"],
        resposta: "October to April",
        explicacao: "The rainy season in the Central-West goes from October to April; the dry season is from May to September."
    },
    {
        pergunta: "Which region in Brazil has snow?",
        opcoes: ["North", "South", "Northeast", "Central-West"],
        resposta: "South",
        explicacao: "The South is the only region in Brazil where it snows. It has four clear seasons."
    },

    // ============================================
    // HISTÓRIA (5)
    // Colonial/Império, República Velha, Vargas,
    // Ditadura, Redemocratização
    // ============================================
    {
        pergunta: "When did Brazil become independent from Portugal?",
        opcoes: ["1500", "1822", "1889", "1930"],
        resposta: "1822",
        explicacao: "Brazil became independent in 1822, ending the colonial period."
    },
    {
        pergunta: "What was the main economic product during the Old Republic?",
        opcoes: ["Sugar", "Gold", "Coffee", "Rubber"],
        resposta: "Coffee",
        explicacao: "Coffee was the main product during the Old Republic (1889–1930)."
    },
    {
        pergunta: "Who took power in 1930, starting the Vargas Era?",
        opcoes: ["Dom Pedro II", "Getúlio Vargas", "Deodoro da Fonseca", "Juscelino Kubitschek"],
        resposta: "Getúlio Vargas",
        explicacao: "Getúlio Vargas took power in 1930, starting the Vargas Era (1930–1964)."
    },
    {
        pergunta: "When did the military dictatorship start in Brazil?",
        opcoes: ["1930", "1945", "1964", "1985"],
        resposta: "1964",
        explicacao: "The military dictatorship began in 1964 and lasted until 1985."
    },
    {
        pergunta: "When was the current Brazilian Constitution created?",
        opcoes: ["1964", "1979", "1988", "1994"],
        resposta: "1988",
        explicacao: "The 1988 Constitution was created during the Redemocratization period."
    },

    // ============================================
    // CULTURA (3)
    // Carnaval/Festas Juninas, Boi-Bumbá/Círio,
    // diversidade cultural
    // ============================================
    {
        pergunta: "Which festival has corn-based foods and forró music?",
        opcoes: ["Carnival", "Festas Juninas", "Círio de Nazaré", "Parintins Festival"],
        resposta: "Festas Juninas",
        explicacao: "Festas Juninas (June Festivals) have forró music and corn-based foods, especially in the Northeast."
    },
    {
        pergunta: "What is Bumba Meu Boi / Boi-Bumbá?",
        opcoes: ["A food", "A dance only", "A folk drama with dance, music and theater", "A sport"],
        resposta: "A folk drama with dance, music and theater",
        explicacao: "Bumba Meu Boi is a folk drama from Maranhão, and Boi-Bumbá is its Amazonas version at the Parintins Festival."
    },
    {
        pergunta: "Which cultures influenced Brazilian culture?",
        opcoes: ["Only Portuguese", "Only African", "Indigenous, African, Portuguese, Italian, Japanese and others", "Only Indigenous"],
        resposta: "Indigenous, African, Portuguese, Italian, Japanese and others",
        explicacao: "Brazilian culture is rich and diverse, influenced by many peoples from around the world."
    },

    // ============================================
    // CULINÁRIA (2)
    // diversidade/influências + comidas regionais
    // ============================================
    {
        pergunta: "Which cultures influenced Brazilian food?",
        opcoes: ["Only Portuguese", "Indigenous, African and European", "Only African", "Only Japanese"],
        resposta: "Indigenous, African and European",
        explicacao: "Brazilian food is influenced by Indigenous, African, and European cultures."
    },
    {
        pergunta: "Which of these is a typical Brazilian food?",
        opcoes: ["Sushi", "Feijoada", "Tacos", "Croissant"],
        resposta: "Feijoada",
        explicacao: "Feijoada is a classic Brazilian dish, along with pão de queijo, acarajé, brigadeiro and coxinha."
    },

    // ============================================
    // TURISMO (2)
    // atrações e localização
    // ============================================
    {
        pergunta: "Where is Ibirapuera Park?",
        opcoes: ["Rio de Janeiro", "São Paulo", "Salvador", "Brasília"],
        resposta: "São Paulo",
        explicacao: "Ibirapuera Park is in São Paulo — a great place for nature and outdoor activities."
    },
    {
        pergunta: "How many waterfalls does Iguazu Falls have?",
        opcoes: ["50", "100", "275", "500"],
        resposta: "275",
        explicacao: "Iguazu Falls has 275 waterfalls on the Brazil-Argentina border."
    },

    // ============================================
    // PERSONALIDADES (3)
    // Santos-Dumont, Erika Hilton, Mauricio de Sousa
    // ============================================
    {
        pergunta: "Who was Alberto Santos-Dumont?",
        opcoes: ["A politician", "A soccer player", "A pioneer of aviation", "A singer"],
        resposta: "A pioneer of aviation",
        explicacao: "Santos-Dumont was a Brazilian inventor and aviation pioneer. He flew the 14-bis in Paris in 1906."
    },
    {
        pergunta: "Who is Erika Hilton?",
        opcoes: ["A singer", "A politician and human rights activist", "A writer", "A scientist"],
        resposta: "A politician and human rights activist",
        explicacao: "Erika Hilton is a Black transgender woman and one of the first trans women elected to the Brazilian Congress."
    },
    {
        pergunta: "Who created Monica's Gang (Turma da Mônica)?",
        opcoes: ["Ziraldo", "Mauricio de Sousa", "Monteiro Lobato", "Chico Buarque"],
        resposta: "Mauricio de Sousa",
        explicacao: "Mauricio de Sousa created Monica, Cebolinha, Cascão, and Magali. He began as a police reporter in the 1950s."
    },

    // ============================================
    // ESPORTES (1)
    // vôlei / Giba / Serginho
    // ============================================
    {
        pergunta: "Which sport are Giba and Serginho famous for?",
        opcoes: ["Football", "Volleyball", "Basketball", "Tennis"],
        resposta: "Volleyball",
        explicacao: "Giba and Serginho are Brazilian volleyball legends. Brazil is a powerhouse in the sport."
    }
];