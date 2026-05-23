import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRightCircle, ArrowLeftCircle, Menu, X, ArrowUp, CheckCircle2, Copy } from "lucide-react";

// --- DADOS DOS 11 CASES OFICIAIS COM NARRATIVA PROFUNDA E TAGS DE FILTRO ---
const casesData = [
  {
    id: "case-01",
    number: "01",
    title: "Val Fortunatto — Brand Transition",
    category: "Direção Criativa · Curadoria · Reposicionamento",
    filterTags: ["BRAND", "RETAIL"],
    shortTese: "Uma transição de marca construída pela curadoria, pela imagem e pela sofisticação do desejo.",
    client: "Val Fortunatto",
    role: "Direção Criativa",
    territory: "Brand Transition",
    deliverables: "Curadoria, Styling, Campanha",
    directorsNote: "Reposicionar exige precisão. Preservamos a alma da marca, mas alteramos a lente. O desafio não foi mudar o produto, foi reposicionar o desejo.",
    thumb: "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_01.png",
    blocks: [
      ["Abertura", "Este projeto marcou o início de uma transição estratégica de posicionamento para a Val Fortunatto — uma multimarca mineira consolidada no varejo feminino contemporâneo."],
      ["Contexto & Desafio", "O objetivo central foi reconstruir a percepção estética da marca, sofisticando sua comunicação visual e aproximando um público mais jovem, sem romper com a elegância e a maturidade já reconhecidas pela cliente tradicional da loja."],
      ["Estratégia & Execução", "A curadoria de produto (com marcas mineiras como Eminem, Victor Dzenk e Sara Santos) teve papel central. A direção visual foi construída sobre a tensão entre leveza e estrutura, fluidez e monumentalidade. Texturas densas e alfaiataria arquitetônica foram utilizadas para construir uma narrativa visual mais madura."],
      ["Impacto & Resultados", "Reposicionamento visual estratégico da marca, elevando sua percepção editorial. Fortalecimento da percepção premium e rejuvenescimento gradual da comunicação. Feedback: 'A campanha marcou claramente uma nova fase estética da marca sem perder sua identidade original.'"]
    ],
    gallery: [
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_01.png",
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_02.png",
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_03.png",
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_04.png",
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_05.png",
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_06.png",
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_07.png",
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_08.png",
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_09.png"
    ]
  },
  {
    id: "case-02",
    number: "02",
    title: "Val Fortunatto Linho — Produto Próprio",
    category: "Produto Próprio · Curadoria Comercial · Direção Criativa",
    filterTags: ["PRODUCT", "BRAND"],
    shortTese: "Quando uma multimarca transforma confiança em produto próprio.",
    client: "Val Fortunatto",
    role: "Direção Criativa",
    territory: "Desenvolvimento de Coleção",
    deliverables: "Design de Produto, Campanha, Styling",
    directorsNote: "A curadoria evoluiu para criação. A loja deixou de ser vitrine para ser assinatura. O linho cru foi nosso ponto de partida estrutural.",
    thumb: "/images/02_VAL_FORTUNATTO_LINHO/SP_CASE02_LINHO_01.png",
    blocks: [
      ["Abertura", "Este projeto nasceu de uma leitura estratégica sobre multimarcas contemporâneas: em muitos casos, o valor não está apenas nas marcas comercializadas, mas na confiança construída em torno do nome da própria loja."],
      ["Contexto & Desafio", "As clientes não buscavam apenas uma etiqueta — buscavam o olhar da marca. O desafio era criar uma cápsula de alto verão em linho que não competisse com as marcas de festa, ocupando uma lacuna estratégica: o casual sofisticado."],
      ["Estratégia & Execução", "Pesquisa de mercado, análise de comportamento e escolha do linho de alta qualidade. A campanha partiu da ideia de uma mulher que consome de forma consciente. O shooting em um casarão evocou memória, permanência e sofisticação natural."],
      ["Impacto & Resultados", "A inserção de produto próprio no mix fortaleceu a percepção da Val Fortunatto como marca com autoridade autoral, diferenciando-a no mercado. Feedback: 'A cápsula traduziu a essência da Val Fortunatto; a campanha conseguiu mostrar uma mulher sofisticada e atemporal.'"]
    ],
    gallery: [
      "/images/02_VAL_FORTUNATTO_LINHO/SP_CASE02_LINHO_01.png",
      "/images/02_VAL_FORTUNATTO_LINHO/SP_CASE02_LINHO_02.png",
      "/images/02_VAL_FORTUNATTO_LINHO/SP_CASE02_LINHO_03.png",
      "/images/02_VAL_FORTUNATTO_LINHO/SP_CASE02_LINHO_04.png",
      "/images/02_VAL_FORTUNATTO_LINHO/SP_CASE02_LINHO_05.png",
      "/images/02_VAL_FORTUNATTO_LINHO/SP_CASE02_LINHO_06.png"
    ]
  },
  {
    id: "case-03",
    number: "03",
    title: "Ateliê Bambini — Arquitetura de Marca Infantil",
    category: "Brand Architecture · Retail Strategy · Premium Positioning",
    filterTags: ["BRAND", "SPACE"],
    shortTese: "A construção de um novo universo para a infância contemporânea.",
    client: "Ateliê Bambini",
    role: "Consultoria Estratégica",
    territory: "Brand Creation",
    deliverables: "Identidade Visual, Narrativa Espacial",
    directorsNote: "Rejeitamos o plástico e o primário. Optamos pela subversão do silêncio. Palha, madeira e pedra elevaram a memória infantil ao status de design.",
    thumb: "/images/03_ATELIE_BAMBINI/SP_CASE03_ATELIEBAMBINI_01.png",
    blocks: [
      ["Abertura", "O Ateliê Bambini nasceu como desdobramento estratégico de um processo maior de consultoria realizado para a T Kids — uma multimarca infantil consolidada há mais de duas décadas."],
      ["Contexto & Desafio", "A T Kids reunia produtos populares e premium no mesmo espaço, gerando um conflito de percepção crítico. Além disso, a marca permanecia visualmente presa à lógica estética de vinte anos atrás num cenário onde o varejo físico se tornou aspiracional."],
      ["Estratégia & Execução", "Arquitetura estratégica: preservar a T Kids nas lojas de rua acessíveis e construir a Bambini para shopping, com experiência boutique. A identidade abandonou clichês plásticos e primários, baseando-se na materialidade poética da palha, madeira e pedra."],
      ["Impacto & Resultados", "Reorganização estratégica do posicionamento, criando clareza entre ticket popular e experiência premium. Consolidação de uma visão de expansão futura. Feedback: 'O projeto conseguiu transformar completamente a percepção do que poderia ser uma marca infantil.'"]
    ],
    gallery: [
      "/images/03_ATELIE_BAMBINI/SP_CASE03_ATELIEBAMBINI_01.png",
      "/images/03_ATELIE_BAMBINI/SP_CASE03_ATELIEBAMBINI_02.png",
      "/images/03_ATELIE_BAMBINI/SP_CASE03_ATELIEBAMBINI_03.png",
      "/images/03_ATELIE_BAMBINI/SP_CASE03_ATELIEBAMBINI_04.png",
      "/images/03_ATELIE_BAMBINI/SP_CASE03_ATELIEBAMBINI_05.png",
      "/images/03_ATELIE_BAMBINI/SP_CASE03_ATELIEBAMBINI_06.png"
    ]
  },
  {
    id: "case-04",
    number: "04",
    title: "R Lovers — Calendário Comercial",
    category: "Visual Merchandising · Calendário Comercial · Produto Hero",
    filterTags: ["RETAIL"],
    shortTese: "A arquitetura afetiva da conversão orientada por produtos-chave.",
    client: "Reserva",
    role: "Direção Criativa Aplicada",
    territory: "Retail Campaign",
    deliverables: "Vitrinismo, Styling, Exposição",
    directorsNote: "A emoção exige estética exata. Não vendemos peças de inverno, vendemos o cenário onde elas ganham vida. Afeto convertido em performance comercial.",
    thumb: "/images/04_R_LOVERS/SP_CASE04_RLOVERS_01.png",
    blocks: [
      ["Abertura", "O projeto R Lovers partiu de uma leitura estratégica do calendário comercial da Reserva, utilizando o Dia dos Namorados para fortalecer produtos de maior valor agregado da coleção de inverno."],
      ["Contexto & Desafio", "Transformar o discurso romântico em experiência física para gerar desejo e aumentar a percepção de valor. Produtos de maior ticket, como jaquetas e mochilas, precisavam de contexto de presenteabilidade num país tropical."],
      ["Estratégia & Execução", "Uso de 'produtos hero' como protagonistas da composição visual. A vitrine evitou a banalização e adotou uma atmosfera cinematográfica, afetiva e levemente nostálgica, trazendo um romantismo mais sensorial e conectado ao presente significativo."],
      ["Impacto & Resultados", "Transformou uma data afetiva em ferramenta estratégica de conversão. Maior destaque para itens de ticket mais alto sem perder sofisticação. Feedback: 'O Dia dos Namorados foi usado como oportunidade real de conversão, não apenas como tema visual.'"]
    ],
    gallery: [
      "/images/04_R_LOVERS/SP_CASE04_RLOVERS_01.png",
      "/images/04_R_LOVERS/SP_CASE04_RLOVERS_02.png",
      "/images/04_R_LOVERS/SP_CASE04_RLOVERS_03.png",
      "/images/04_R_LOVERS/SP_CASE04_RLOVERS_04.png",
      "/images/04_R_LOVERS/SP_CASE04_RLOVERS_05.png"
    ]
  },
  {
    id: "case-05",
    number: "05",
    title: "Porti — Expansão Física & Cenografia",
    category: "Retail Expansion · Visual Merchandising · Store Experience",
    filterTags: ["SPACE", "RETAIL"],
    shortTese: "A construção física, técnica e cenográfica de uma marca em expansão.",
    client: "Porti",
    role: "Direção Criativa",
    territory: "Store Experience",
    deliverables: "Layout, Cenografia, Implantação",
    directorsNote: "Expandir exige preservar a aura. A vitrine é nosso outdoor tridimensional. De geometrias orgânicas a cascatas metálicas, transformamos consumo em espetáculo.",
    thumb: "/images/05_PORTI_NATAL/SP_CASE05_PORTI_NATAL_01.png",
    blocks: [
      ["Abertura", "A atuação com a Porti aconteceu em um momento estratégico de expansão da marca, onde o desafio não era apenas criar vitrines, mas estruturar a presença física em diferentes praças comerciais."],
      ["Contexto & Desafio", "Aberturas simultâneas exigiam que a comunicação das redes sociais se traduzisse em loja. O desafio cobria coordenação visual de implantação, estoques, enxoval de manequins e soluções expositivas alinhadas à narrativa comercial."],
      ["Estratégia & Execução", "Desenvolvimento técnico e operacional ponta a ponta. As vitrines sazonais atuaram como exemplos dessa metodologia: o Verão trouxe cenografia leve com campanha integrada, enquanto o Natal implantou uma densa cascata de esferas metálicas reflexivas de alto impacto."],
      ["Impacto & Resultados", "Padronização visual nas lojas inauguradas e forte coerência entre redes sociais e ponto de venda. As vitrines deixaram de ser apenas sazonais. Feedback: 'A atuação ajudou a transformar a expansão em uma experiência visual mais profissional e coerente.'"]
    ],
    gallery: [
      // Natal: 0 a 3
      "/images/05_PORTI_NATAL/SP_CASE05_PORTI_NATAL_01.png",
      "/images/05_PORTI_NATAL/SP_CASE05_PORTI_NATAL_02.png",
      "/images/05_PORTI_NATAL/SP_CASE05_PORTI_NATAL_03.png",
      "/images/05_PORTI_NATAL/SP_CASE05_PORTI_NATAL_04.png",
      // Verão: 4 a 9
      "/images/05_PORTI_VERAO/SP_CASE05_PORTI_VERAO_01.png",
      "/images/05_PORTI_VERAO/SP_CASE05_PORTI_VERAO_02.png",
      "/images/05_PORTI_VERAO/SP_CASE05_PORTI_VERAO_03.png",
      "/images/05_PORTI_VERAO/SP_CASE05_PORTI_VERAO_04.png",
      "/images/05_PORTI_VERAO/SP_CASE05_PORTI_VERAO_05.png",
      "/images/05_PORTI_VERAO/SP_CASE05_PORTI_VERAO_06.png",
      // Primavera: 10 a 15
      "/images/05_PORTI_PRIMAVERA/SP_CASE05_PORTI_PRIMAVERA_01.png",
      "/images/05_PORTI_PRIMAVERA/SP_CASE05_PORTI_PRIMAVERA_02.png",
      "/images/05_PORTI_PRIMAVERA/SP_CASE05_PORTI_PRIMAVERA_03.png",
      "/images/05_PORTI_PRIMAVERA/SP_CASE05_PORTI_PRIMAVERA_04.png",
      "/images/05_PORTI_PRIMAVERA/SP_CASE05_PORTI_PRIMAVERA_05.png",
      "/images/05_PORTI_PRIMAVERA/SP_CASE05_PORTI_PRIMAVERA_06.png"
    ]
  },
  {
    id: "case-06",
    number: "06",
    title: "HEXA — Copa do Mundo · Reserva",
    category: "Campaign Translation · Retail Experience · Cultural Storytelling",
    filterTags: ["CULTURE", "RETAIL"],
    shortTese: "A tradução do imaginário do futebol brasileiro para o varejo contemporâneo.",
    client: "Reserva",
    role: "Estratégia Visual",
    territory: "Campanha Sazonal",
    deliverables: "Styling, Exposição de Produto",
    directorsNote: "O futebol é a nossa cultura pop. O desafio foi engarrafar essa euforia com rigor estético. O popular elevado ao premium. O óbvio transformado em desejo.",
    thumb: "/images/06_HEXA/SP_CASE06_HEXA_01.png",
    blocks: [
      ["Abertura", "O projeto HEXA nasceu da necessidade de transformar o universo emocional da Copa do Mundo em uma experiência comercial coerente com o DNA da Reserva."],
      ["Contexto & Desafio", "Traduzir o imaginário cultural do futebol sem cair no clichê visual, preservando a sofisticação masculina. O desafio era manter o cliente fiel que compra o básico, oferecendo-lhe uma atmosfera temática."],
      ["Estratégia & Execução", "A coleção foi estruturada em duas camadas (esportiva e urbana) reinterpretando polos rugby e jaquetas utilitárias. A cenografia de loja reproduziu os bastidores de um vestiário clássico com foco na assinatura tricolor do pássaro da marca."],
      ["Impacto & Resultados", "Fortalecimento da identidade temática, integração entre emoção e conversão e aumento de percepção de novidade na loja. Feedback: 'A coleção parecia participar culturalmente daquele momento, e não apenas utilizar o tema comercialmente.'"]
    ],
    gallery: [
      "/images/06_HEXA/SP_CASE06_HEXA_01.png",
      "/images/06_HEXA/SP_CASE06_HEXA_02.png",
      "/images/06_HEXA/SP_CASE06_HEXA_03.png"
    ]
  },
  {
    id: "case-07",
    number: "07",
    title: "Campanhas & Collabs",
    category: "Brand Collaboration · Visual Merchandising · Cultural Translation",
    filterTags: ["COLLAB", "CULTURE"],
    shortTese: "A complexa fusão de universos de marca, cultura e entretenimento no varejo físico.",
    client: "Múltiplos Clientes",
    role: "Direção Criativa",
    territory: "Brand Collaboration",
    deliverables: "Narrativa Espacial, Styling",
    directorsNote: "Colaborações exigem diplomacia visual. Basquiat, Mangueira e Netflix no mesmo espaço físico. A loja atua como tela em branco. Nunca como ruído.",
    thumb: "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_BASQUIAT_01.png",
    blocks: [
      ["Abertura", "Projetos envolvendo universos como Basquiat, Mangueira e Netflix exigiram comunicação constante com intermediadores, respeitando códigos e restrições de licenciamento pesado."],
      ["Contexto & Desafio", "A etapa final no ponto de venda é crítica: é onde a negociação institucional vira percepção para o consumidor. Cada collab precisava se impor no espaço da loja sem gerar entropia ou ruído visual confuso."],
      ["Estratégia & Execução", "Basquiat injetou neoexpressionismo no varejo. A Mangueira exaltou a rua, o samba e a ancestralidade carioca com matches de estampas, sem folclore óbvio. A Netflix (Tudum) transformou o conforto do streaming pós-pandemia em manifesto lifestyle fora de casa."],
      ["Impacto & Resultados", "Tradução de universos complexos, validação de diretrizes nacionais e consolidação de experiências físicas alinhadas. Feedback: 'As collabs foram apresentadas com força visual sem perder coerência de marca e aprovação institucional.'"]
    ],
    gallery: [
      "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_BASQUIAT_01.png",
      "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_BASQUIAT_02.png",
      "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_BASQUIAT_03.png",
      "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_MANGUEIRA_01.png",
      "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_MANGUEIRA_02.png",
      "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_MANGUEIRA_03.png",
      "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_NETFLIX_01.png",
      "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_NETFLIX_02.png",
      "/images/07_CAMPANHAS_COLLABS/SP_CASE07_COLLABS_NETFLIX_03.png"
    ]
  },
  {
    id: "case-08",
    number: "08",
    title: "Rouge & Gold — Exposição Premium",
    category: "Exposição Premium · Direção Criativa · Brand Experience",
    filterTags: ["SPACE", "RETAIL"],
    shortTese: "Reestruturação estratégica da leitura visual por meio de cor e cenografia de luz.",
    client: "Rouge & Gold",
    role: "Estratégia Visual",
    territory: "Retail Strategy",
    deliverables: "Color Blocking, Iluminação",
    directorsNote: "A arquitetura manipula o olhar. Cor e luz direcionam a atenção. Uma arara perfeitamente iluminada deixa de ser expositor e torna-se um pedestal.",
    thumb: "/images/08_ROUGE_GOLD/SP_CASE08_ROUGE_GOLD_01.png",
    blocks: [
      ["Abertura", "Um exercício de exposição premium em que produto, cor e luz funcionam como argumento puro e direto para gerar desejo."],
      ["Contexto & Desafio", "Organizar o olhar do cliente dentro da loja, criando hierarquia visual e a sensação luxuosa de uma galeria comercial de moda."],
      ["Estratégia & Execução", "Color blocking intenso, iluminação cenográfica pontual para escupir e valorizar detalhes de tecido, composição de manequins e leitura estruturada e editorial de cada peça."],
      ["Impacto & Resultados", "Reestruturação estratégica da leitura visual da loja. Aumento da percepção de organização premium. Feedback: 'A loja passou a parecer uma galeria de produto cuidadosamente curada, alterando completamente a percepção do ambiente.'"]
    ],
    gallery: [
      "/images/08_ROUGE_GOLD/SP_CASE08_ROUGE_GOLD_01.png",
      "/images/08_ROUGE_GOLD/SP_CASE08_ROUGE_GOLD_02.png",
      "/images/08_ROUGE_GOLD/SP_CASE08_ROUGE_GOLD_03.png",
      "/images/08_ROUGE_GOLD/SP_CASE08_ROUGE_GOLD_04.png",
      "/images/08_ROUGE_GOLD/SP_CASE08_ROUGE_GOLD_05.png"
    ]
  },
  {
    id: "case-09",
    number: "09",
    title: "Outerwear — Hotspots & Color Blocking",
    category: "Hotspots · Color Blocking · Estratégia Visual",
    filterTags: ["RETAIL", "PRODUCT"],
    shortTese: "Construir pontos de calor visual para fazer o cliente parar, olhar e desejar.",
    client: "Acervo Reserva",
    role: "Direção Criativa Aplicada",
    territory: "Comportamento de Consumo",
    deliverables: "Exposição de Varejo",
    directorsNote: "Inverno pede ruptura visual. O color blocking atua como choque na retina. Interrompemos o fluxo automático. A atenção é a nossa moeda mais cara.",
    thumb: "/images/09_OUTERWEAR/SP_CASE09_OUTERWEAR_01.png",
    blocks: [
      ["Abertura", "Em loja física, o cliente escaneia antes de decidir. Este projeto cria intencionalmente pontos de atração para interromper essa varredura rápida."],
      ["Contexto & Desafio", "Peças de inverno utilitárias e outerwear volumoso precisavam ganhar uma presença visual atraente em uma jornada de compra que é altamente competitiva."],
      ["Estratégia & Execução", "Implantação de 'hotspots', color blocking estruturado, tensão cromática entre primárias, uso de jaquetas puffer como ímãs visuais com iluminação focal dramática orientada ao olhar de conversão."],
      ["Impacto & Resultados", "Construção estratégica de atração visual. Melhoria dramática da navegação do cliente dentro do espaço escuro da arquitetura de madeira. Feedback: 'As cores passaram a conduzir naturalmente o olhar do cliente, dando mais força visual à coleção.'"]
    ],
    gallery: [
      "/images/09_OUTERWEAR/SP_CASE09_OUTERWEAR_01.png",
      "/images/09_OUTERWEAR/SP_CASE09_OUTERWEAR_02.png",
      "/images/09_OUTERWEAR/SP_CASE09_OUTERWEAR_03.png"
    ]
  },
  {
    id: "case-10",
    number: "10",
    title: "Vintage Denim — Cápsula Heritage",
    category: "Cápsula Heritage · Storytelling · Cenografia",
    filterTags: ["SPACE", "PRODUCT"],
    shortTese: "Uma cápsula de produto transformada em ambiente autêntico de memória e coleção.",
    client: "Reserva",
    role: "Direção Criativa",
    territory: "Cenografia de Produto",
    deliverables: "Atmosfera, Vitrine, Props",
    directorsNote: "O denim é a farda da cultura pop. O atrito com o maquinário industrial cria um curto-circuito temporal. Não desenhamos lojas, montamos arquivos vivos.",
    thumb: "/images/10_VINTAGE_DENIM/SP_CASE10_VINTAGE_DENIM_01.png",
    blocks: [
      ["Abertura", "Denim como memória, atitude e identidade cultural — e não apenas como exposição pragmática de tecido."],
      ["Contexto & Desafio", "O desafio era criar um universo inteiro que fizesse a cápsula de roupas de outono parecer rara, desejada, histórica e carregada de peso e narrativa visual forte."],
      ["Estratégia & Execução", "Concepção cenográfica rica inspirada no estilo de um loft de colecionador. Atmosfera 'heritage' forjada com composição cromática tensa, mistura de antiguidades rústicas reais (como polias e máquinas fotográficas antigas), denim pesado e narrativa tátil profunda."],
      ["Impacto & Resultados", "Criação de uma cenografia altamente narrativa. Aumento vertiginoso do storytelling visual e do impacto comercial da coleção no espaço físico. Feedback: 'A coleção passou a parecer uma experiência completa, criando desejo imediatamente.'"]
    ],
    gallery: [
      "/images/10_VINTAGE_DENIM/SP_CASE10_VINTAGE_DENIM_01.png",
      "/images/10_VINTAGE_DENIM/SP_CASE10_VINTAGE_DENIM_02.png",
      "/images/10_VINTAGE_DENIM/SP_CASE10_VINTAGE_DENIM_03.png"
    ]
  },
  {
    id: "case-11",
    number: "11",
    title: "Paraíso Tropical — Mata Atlântica",
    category: "Capsule Collection · Visual Merchandising · Summer Storytelling",
    filterTags: ["PRODUCT", "CULTURE"],
    shortTese: "A força gráfica da Mata Atlântica como contraponto inteligente ao verão óbvio.",
    client: "Reserva",
    role: "Estratégia Visual",
    territory: "Lançamento de Coleção",
    deliverables: "Styling, Vitrine 2D, Cenografia",
    directorsNote: "O verão tropical flerta com o clichê. Optamos pela sombra da floresta e pelo rigor da alfaiataria. Transformar escapismo em luxo absoluto é a nossa premissa.",
    thumb: "/images/11_PARAISO_TROPICAL/SP_CASE11_PARAISO_TROPICAL_01.png",
    blocks: [
      ["Abertura", "A cápsula Paraíso Tropical foi desenvolvida como entrada de verão, partindo de uma estampa exclusiva profundamente inspirada na densa força visual da Mata Atlântica brasileira."],
      ["Contexto & Desafio", "Evitar o clichê do paraíso tropical praiano solar simples. O desafio foi trazer a profundidade orgânica da flora e fauna misturadas aos tons clássicos, neutros e ao estilo 'navy' elegante da marca."],
      ["Estratégia & Execução", "A estampa funcionou como motor cenográfico. Em vitrines de lojas pequenas, aplicaram-se elementos bidimensionais focados na vegetação. Em flagships, recriou-se um imersivo e cenográfico fragmento selvagem florestal para envolver a coleção."],
      ["Impacto & Resultados", "Valorização absoluta da estampa exclusiva. Integração hábil do produto com uma forte cenografia de escapismo sem perda da leitura do clássico da marca. Feedback: 'O visual merchandising conseguiu conectar floresta, produto e verão de forma clara e comercial.'"]
    ],
    gallery: [
      "/images/11_PARAISO_TROPICAL/SP_CASE11_PARAISO_TROPICAL_01.png",
      "/images/11_PARAISO_TROPICAL/SP_CASE11_PARAISO_TROPICAL_02.png",
      "/images/11_PARAISO_TROPICAL/SP_CASE11_PARAISO_TROPICAL_03.png",
      "/images/11_PARAISO_TROPICAL/SP_CASE11_PARAISO_TROPICAL_04.png",
      "/images/11_PARAISO_TROPICAL/SP_CASE11_PARAISO_TROPICAL_05.png"
    ]
  }
];

const homePortrait = "/images/13_VISAO/about-transition.png";

// --- CURVAS DE TRANSIÇÃO PREMIUM ---
const PREMIUM_EASE = [0.22, 1, 0.36, 1];

// --- CUSTOM ROUTER HOOK FOR SEO & SHAREABILITY ---
function useRouter() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash || "inicio";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "inicio";
      setRoute(hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((newRoute) => {
    window.location.hash = newRoute;
  }, []);

  return { route, navigate };
}

// --- DYNAMIC SEO INJECTION ---
function DynamicSEO({ title, description, url, image }) {
  useEffect(() => {
    const pageTitle = title ? `${title} | Samuel Carrera Paes` : "Samuel Carrera Paes — Diretor Criativo";
    document.title = pageTitle;
    
    // Update or inject meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || "Construindo mundos visuais para marcas, produtos e espaços comerciais através de Direção Criativa e Retail Experience.";

    // Inject or update JSON-LD for rich snippets
    let script = document.getElementById("seo-json-ld");
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-json-ld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": pageTitle,
      "description": description || "Portfólio de Direção Criativa, Visual Merchandising e Retail Experience.",
      "image": image ? `https://samuelpaes.com${image}` : `https://samuelpaes.com${homePortrait}`,
      "creator": { "@type": "Person", "name": "Samuel Carrera Paes" },
      "url": `https://samuelpaes.com/#${url || ""}`
    };
    script.text = JSON.stringify(schemaData);
    
  }, [title, description, url, image]);

  return null;
}

// --- COMPONENTES DE ALTA PERFORMANCE & UX ---

function ImageWithFallback({ src, alt, imageClassName = "", fallbackLabel, loading = "lazy", mode = "natural" }) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isNatural = mode === "natural";

  return (
    <div 
      role="img" 
      aria-label={alt || fallbackLabel} 
      className={`w-full bg-stone-200/40 flex items-center justify-center ${isNatural ? 'h-auto relative' : 'h-full relative overflow-visible'}`}
    >
      {!error ? (
        <picture>
          <img
            src={src}
            alt={alt || fallbackLabel}
            loading={loading}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setError(true)}
            className={`w-full transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isNatural ? "h-auto block object-contain" : "h-full absolute inset-0 object-cover"
            } object-center ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } ${imageClassName}`}
          />
        </picture>
      ) : (
        <div className={`flex flex-col items-center justify-center p-6 text-center z-0 bg-stone-200/60 ${isNatural ? 'aspect-[4/5]' : 'absolute inset-0'}`}>
          <span className="text-[10px] text-stone-500 uppercase tracking-[0.25em] font-semibold">{fallbackLabel}</span>
        </div>
      )}
    </div>
  );
}

const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.6, ease: PREMIUM_EASE }}
      className={`min-h-screen pt-24 pb-32 ${className}`}
    >
      {children}
    </motion.div>
  );
};

function SectionLabel({ children }) {
  return (
    <div className="mb-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">
      <span className="h-px w-12 bg-stone-400" aria-hidden="true" />
      {children}
    </div>
  );
}

// --- PÁGINAS ---

function Inicio({ navigate }) {
  const stats = [
    { number: "09+", label: "Anos", text: "Construindo presença no varejo premium." },
    { number: "40+", label: "Projetos", text: "Campanhas e narrativas espaciais executadas." },
    { number: "10+", label: "Implantações", text: "Lojas e inaugurações acompanhadas." },
    { number: "11", label: "Cases", text: "Projetos estratégicos de referência." },
    { number: "100%", label: "Foco", text: "Construção tátil de percepção de valor." },
  ];

  return (
    <PageTransition>
      <DynamicSEO title="Início" />
      <section className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col justify-center min-h-[85vh] pt-10" aria-labelledby="home-title">
        
        {/* SELO LOGO + PORTFOLIO 2026 */}
        <header className="mb-12 flex items-center gap-4">
          <img 
            src="/images/00_LOGOS/symbol-black-transparent.png" 
            alt="Samuel Carrera Paes Logo" 
            className="h-20 md:h-24 lg:h-28 w-auto max-w-none object-contain opacity-100 bg-transparent"
            onError={(e) => e.target.style.display = 'none'}
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">
            PORTFÓLIO · 2026
          </span>
        </header>
        
        <motion.h1 
          id="home-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: PREMIUM_EASE }}
          className="mt-4 max-w-6xl font-serif text-[13vw] sm:text-[9vw] md:text-[8rem] lg:text-[10.5rem] leading-[0.85] tracking-[-0.02em] text-stone-950 text-balance"
        >
          Samuel Carrera Paes
          <br />
          <span className="italic text-stone-500 font-light pr-4">Diretor Criativo.</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: PREMIUM_EASE }}
          className="mt-16 md:mt-24 max-w-3xl"
        >
          <p className="text-xl md:text-3xl lg:text-4xl leading-relaxed tracking-tight text-stone-800 font-light border-l border-stone-900/20 pl-6 md:pl-10 text-balance">
            "Construo presença de marca no exato ponto em que a estética, a estratégia e o desejo se tornam uma experiência tangível."
          </p>
        </motion.div>

        {/* --- EDITORIAL STATS GRID --- */}
        <dl className="mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-16 gap-x-8 border-t border-stone-900/10 pt-16">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1), ease: PREMIUM_EASE }}
              key={i} 
              className="flex flex-col group"
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-3 block order-2">{stat.label}</dt>
              <dd className="font-serif text-5xl md:text-6xl text-stone-900 tracking-[-0.02em] mb-4 order-1">{stat.number}</dd>
              <p className="text-xs md:text-sm font-light text-stone-600 leading-relaxed pr-4 order-3">{stat.text}</p>
            </motion.div>
          ))}
        </dl>

        {/* FEATURED CASE BLOCK */}
        <motion.article 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: PREMIUM_EASE }}
          className="mt-32 border-t border-stone-900/10 pt-24"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="flex-1 flex flex-col justify-center">
              <header>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-6 block">FEATURED CASE</span>
                <h2 className="font-serif text-5xl md:text-7xl tracking-tight leading-[0.9] text-stone-900 mb-6 text-balance">
                  {casesData[0].title.split('—')[0].trim()}
                </h2>
                <p className="text-sm md:text-base font-light text-stone-600 mb-12 max-w-md leading-relaxed">
                  {casesData[0].category}
                </p>
                
                <button 
                  type="button"
                  aria-label={`Explorar o case em destaque: ${casesData[0].title}`}
                  onClick={() => {
                    navigate("cases");
                    setTimeout(() => {
                      const el = document.getElementById(casesData[0].id);
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }, 300);
                  }}
                  className="group flex w-max items-center gap-5 text-xs font-bold uppercase tracking-[0.25em] text-stone-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-full"
                >
                  <span className="border-b border-stone-900/20 pb-1 group-hover:text-stone-600 group-hover:border-stone-900 transition-colors duration-300">
                    Ver case em destaque
                  </span>
                  <div className="w-12 h-12 rounded-full border border-stone-900/10 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </button>
              </header>
            </div>

            <div className="flex-1 w-full aspect-[4/5] lg:aspect-[3/4] relative bg-stone-200/50 overflow-visible group rounded-sm mt-12 lg:mt-0">
               <ImageWithFallback src={casesData[0].thumb} mode="cover" alt={`Imagem de destaque do projeto ${casesData[0].title}`} fallbackLabel="Featured Work" imageClassName="group-hover:scale-[1.03] transition duration-[2s] ease-out" />
               
               {/* Tipografia como Textura */}
               <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-10 px-8 opacity-[0.03]" aria-hidden="true">
                 <span className="font-serif text-[10vw] leading-none tracking-tighter mix-blend-overlay">MARCA</span>
                 <span className="font-serif text-[10vw] leading-none tracking-tighter mix-blend-overlay text-right">PRODUTO</span>
                 <span className="font-serif text-[10vw] leading-none tracking-tighter mix-blend-overlay">ESPAÇO</span>
                 <span className="font-serif text-[10vw] leading-none tracking-tighter mix-blend-overlay text-right">DESEJO</span>
               </div>
            </div>
          </div>
        </motion.article>

        {/* --- MAGNETIC CALL TO ACTION --- */}
        <div className="mt-32 flex items-center justify-between border-t border-stone-900/10 pt-10 pb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400 hidden md:block">
            Explore a narrativa visual dos projetos
          </span>
          <button 
            type="button"
            aria-label="Acessar o portfólio completo de cases"
            onClick={() => navigate("cases")}
            className="group flex items-center gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-full"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-stone-900 group-hover:text-stone-500 transition-colors">
              Explorar Portfólio
            </span>
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-stone-900/10 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm">
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </div>
          </button>
        </div>
      </section>
    </PageTransition>
  );
}

function Visao() {
  return (
    <PageTransition>
      <DynamicSEO title="Visão Criativa" description="O espaço físico é onde a estratégia deixa de ser discurso e passa a ser experiência." />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col pt-12">
        <header>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">CREATIVE STATEMENT</span>
          <h1 className="font-serif text-6xl md:text-[8rem] leading-[0.85] tracking-tighter text-stone-950 max-w-5xl text-balance">
            Visão
            <br />
            <span className="text-stone-500 italic font-light">Criativa.</span>
          </h1>
          <p className="mt-16 text-xl md:text-3xl leading-relaxed tracking-tight text-stone-800 font-light border-l border-stone-900/20 pl-6 md:pl-10 max-w-4xl text-balance">
            "O espaço físico é onde a estratégia deixa de ser discurso e passa a ser experiência."
          </p>
        </header>

        <section aria-label="Pilares da Visão Criativa">
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-32 border-t border-stone-900/10 pt-16">
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">01</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Leitura de Marca</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Compreender os códigos visuais ocultos e traduzir o posicionamento intangível para o ambiente construído.</p>
            </li>
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">02</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Produto como Narrativa</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">A exposição deixa de ser armazenamento para se tornar uma edição curatorial que conta uma história.</p>
            </li>
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">03</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Espaço como Mídia</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Projetar a loja não como um canal logístico, mas como a principal mídia de imersão e contato físico.</p>
            </li>
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">04</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Percepção como Valor</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Manipular cor, luz, textura e layout para orquestrar a atenção e gerar desejo tangível.</p>
            </li>
          </ol>
        </section>

        {/* Retrato Cinemático na Visão - Layout Horizontal Aberto com Assinatura */}
        <figure className="mt-32 w-full flex justify-center m-0 p-0">
            <div className="w-full max-w-6xl relative overflow-visible bg-[#F4F0E9]">
               <ImageWithFallback 
                 src={homePortrait} 
                 mode="natural"
                 alt="Sequência Retrato de Samuel Carrera Paes com Assinatura Caligráfica" 
                 imageClassName="w-full h-auto object-contain mix-blend-multiply" 
                 fallbackLabel="Samuel Carrera Paes Signature" 
               />
            </div>
        </figure>

        <footer className="mt-32 md:mt-48 bg-stone-950 text-stone-50 px-8 py-24 md:py-32 rounded-sm text-center shadow-xl">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight max-w-5xl mx-auto font-light text-balance">
            "Marcas sem presença competem por atenção. Marcas com presença constroem memória."
          </h2>
        </footer>
      </article>
    </PageTransition>
  );
}

function Cases({ navigate }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const filters = ["ALL", "BRAND", "PRODUCT", "RETAIL", "CULTURE", "SPACE", "COLLAB"];

  const filteredCases = useMemo(() => {
    if (activeFilter === "ALL") return casesData;
    return casesData.filter(c => c.filterTags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <PageTransition>
      <DynamicSEO title="Curated Works" description="11 formas de construir presença por imagem, produto, espaço e experiência." />
      <section className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="cases-title">
        
        {/* --- CURATED WORKS INDEX --- */}
        <div id="cases-index" className="mb-40">
          <header>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">CURATED WORKS</span>
            <h1 id="cases-title" className="font-serif text-5xl md:text-[7rem] leading-[0.85] tracking-tighter text-stone-950 max-w-4xl mb-8 text-balance">
              Cases.
            </h1>
            <p className="text-lg md:text-2xl font-light text-stone-600 max-w-2xl mb-16 leading-relaxed">
              11 formas de construir presença por imagem, produto, espaço e experiência.
            </p>
          </header>

          <nav className="flex flex-wrap gap-3 mb-16" aria-label="Filtrar cases por território">
            {filters.map(chip => (
              <button 
                key={chip} 
                aria-pressed={activeFilter === chip}
                onClick={() => setActiveFilter(chip)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 border rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                  activeFilter === chip 
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md' 
                  : 'bg-transparent text-stone-500 border-stone-900/20 hover:border-stone-900/40 hover:text-stone-800'
                }`}
              >
                {chip}
              </button>
            ))}
          </nav>
          
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            <AnimatePresence mode="popLayout">
              {filteredCases.map((c) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                  key={c.id} 
                  className="group flex flex-col"
                >
                  <button 
                    type="button"
                    aria-label={`Abrir case ${c.number}: ${c.title}`}
                    className="aspect-[4/5] relative w-full mb-6 bg-stone-200/60 overflow-visible cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm block" 
                    onClick={() => navigate(`case/${c.id}`)}
                  >
                    <ImageWithFallback src={c.thumb} mode="cover" alt={`Imagem de capa do projeto ${c.title}`} imageClassName="group-hover:scale-105 transition-transform duration-[1.5s] ease-out" fallbackLabel={`Case ${c.number}`} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 shadow-sm rounded-sm">
                      {c.number}/11
                    </div>
                  </button>

                  <div className="flex flex-col flex-1">
                    <header className="flex justify-between items-start mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 w-2/3 leading-relaxed">{c.territory}</p>
                      <button 
                        type="button"
                        aria-hidden="true"
                        tabIndex="-1"
                        className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-900 border-b border-stone-900/20 pb-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        Explorar
                      </button>
                    </header>
                    <h2 className="font-serif text-2xl md:text-3xl leading-tight text-stone-900 mb-3 tracking-tight group-hover:text-stone-600 transition-colors duration-300 text-balance">{c.title}</h2>
                    <p className="text-sm text-stone-600 font-light mb-6 flex-1 leading-relaxed">{c.shortTese}</p>
                    
                    <footer className="border-t border-stone-900/10 pt-4 flex justify-between items-center text-[10px] uppercase tracking-[0.25em] text-stone-400">
                      <span>Papel: {c.role}</span>
                    </footer>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

function CaseDetail({ caseId, navigate }) {
  const caseIndex = casesData.findIndex(c => c.id === caseId);
  const c = casesData[caseIndex];

  if (!c) {
    return (
      <PageTransition>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-4xl mb-4">Case não encontrado.</h2>
          <button onClick={() => navigate("cases")} className="text-xs font-bold uppercase tracking-[0.2em] border-b border-stone-900 pb-1 hover:text-stone-600 transition-colors">Voltar aos Cases</button>
        </div>
      </PageTransition>
    );
  }

  const isLast = caseIndex === casesData.length - 1;
  const nextCaseId = !isLast ? casesData[caseIndex + 1].id : null;

  return (
    <PageTransition>
      <DynamicSEO 
        title={`${c.number}. ${c.title}`} 
        description={c.shortTese}
        image={c.thumb}
        url={`case/${c.id}`}
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12 relative pb-20 md:pb-0">
        
        {/* A. Case Hero */}
        <header className="flex flex-col mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-6 block">CASE {c.number}/11</span>
          <h1 className="font-serif text-5xl md:text-[6rem] leading-[0.9] text-stone-950 tracking-[-0.02em] mb-8 max-w-5xl text-balance">{c.title}</h1>
          <p className="text-xl md:text-2xl font-light text-stone-600 max-w-3xl mb-12 leading-relaxed text-balance">{c.shortTese}</p>
          
          {/* Metadata Grid */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-stone-900/10 py-10 mb-16">
            <div>
              <dt className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">Cliente / Marca</dt>
              <dd className="text-sm font-light text-stone-900">{c.client}</dd>
            </div>
            <div>
              <dt className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">Papel</dt>
              <dd className="text-sm font-light text-stone-900">{c.role}</dd>
            </div>
            <div>
              <dt className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">Território</dt>
              <dd className="text-sm font-light text-stone-900">{c.territory}</dd>
            </div>
            <div>
              <dt className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">Entregáveis</dt>
              <dd className="text-sm font-light text-stone-900 leading-relaxed">{c.deliverables}</dd>
            </div>
          </dl>

          <figure className="w-full bg-stone-200/50 relative overflow-visible mb-24 rounded-sm flex justify-center m-0 p-0 shadow-sm">
            <ImageWithFallback src={c.thumb} mode="natural" alt={`Fotografia de destaque do projeto ${c.title}`} imageClassName="max-h-[85vh]" />
          </figure>
        </header>

        {/* B. Director's Note */}
        <section aria-label="Nota do Diretor" className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-24 items-start">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Director's Note</h2>
          <blockquote className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight tracking-tight italic border-l-2 border-stone-900/10 pl-6 md:pl-10 text-balance">
            "{c.directorsNote}"
          </blockquote>
        </section>

        {/* C. Strategy Blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-32 border-t border-stone-900/10 pt-16">
          {c.blocks.map(([blockTitle, blockText], idx) => (
            <section key={idx} className="flex flex-col">
              <header className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-serif italic text-stone-400" aria-hidden="true">0{idx+1}</span>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900">{blockTitle}</h3>
              </header>
              <p className="text-sm leading-relaxed text-stone-600 font-light pr-4">{blockText}</p>
            </section>
          ))}
        </div>

        {/* D. Visual Reading */}
        <section aria-labelledby="visual-reading" className="mb-12">
          <h2 id="visual-reading" className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-10 block">Leitura visual do projeto</h2>
          
          {/* Tratamento Específico para Porti (Case 05) - SUBCURADORIA */}
          {c.id === "case-05" ? (
            <div className="flex flex-col gap-24">
              {["Natal", "Verão", "Primavera"].map((subTitle, sIdx) => {
                const sliceStart = sIdx === 0 ? 0 : sIdx === 1 ? 4 : 10;
                const sliceEnd = sIdx === 0 ? 4 : sIdx === 1 ? 10 : 16;
                const sliceImgs = c.gallery.slice(sliceStart, sliceEnd);
                return (
                  <section key={subTitle} aria-labelledby={`subtitle-${sIdx}`}>
                    <header className="flex items-center gap-4 mb-8">
                      <h3 id={`subtitle-${sIdx}`} className="font-serif text-3xl text-stone-900">{subTitle}</h3>
                      <span className="h-px w-full bg-stone-900/10 flex-1" aria-hidden="true"></span>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sliceImgs.map((img, i) => (
                        <figure key={i} className={`w-full bg-stone-200/50 group overflow-visible rounded-sm m-0 p-0 shadow-sm ${i === 0 || i % 3 === 0 ? 'md:col-span-2' : ''}`}>
                           <ImageWithFallback src={img} alt={`Exposição temática de ${subTitle} - detalhe fotográfico ${i+1}`} mode="natural" imageClassName="group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out" />
                        </figure>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          ) : (
            // Galeria Padrão (Fluid Masonry-like Layout)
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {c.gallery.map((img, idx) => {
                let spanClass = "md:col-span-1";
                if (c.gallery.length % 2 !== 0 && idx === 0) spanClass = "md:col-span-2";
                else if (c.gallery.length > 5 && idx % 3 === 0) spanClass = "md:col-span-2";

                return (
                  <figure key={idx} className={`${spanClass} w-full relative bg-stone-200/50 group overflow-visible rounded-sm m-0 p-0 shadow-sm`}>
                    <ImageWithFallback 
                      src={img} 
                      mode="natural" 
                      alt={`Detalhe curatorial do projeto ${c.title} - fotografia ${idx+1}`} 
                      imageClassName="group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out"
                    />
                  </figure>
                );
              })}
            </div>
          )}
        </section>

        {/* E. Navigation (Sticky Bottom on Mobile for better UX) */}
        <nav 
          aria-label="Paginação de Cases" 
          className="fixed bottom-0 left-0 w-full bg-[#F4F0E9]/95 backdrop-blur-xl border-t border-stone-900/10 p-4 z-40 md:static md:bg-transparent md:border-t md:border-stone-900/10 md:p-0 md:mt-24 md:pt-12 flex flex-row justify-between items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] md:shadow-none"
        >
          <button 
            type="button"
            onClick={() => navigate("cases")} 
            className="flex flex-1 md:flex-none items-center justify-center md:justify-start gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 py-4 md:py-0 border border-stone-900/20 md:border-transparent rounded-sm"
          >
            <ArrowLeftCircle className="w-5 h-5 hidden sm:block" aria-hidden="true" /> INÍCIO <span className="hidden sm:inline">de Cases</span>
          </button>
          
          {!isLast ? (
            <button 
              type="button"
              onClick={() => navigate(`case/${nextCaseId}`)} 
              className="flex flex-1 md:flex-none items-center justify-center md:justify-end gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-white md:text-stone-900 bg-stone-900 md:bg-transparent hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 py-4 md:py-0 rounded-sm shadow-sm md:shadow-none"
            >
              Próximo <span className="hidden sm:inline">Case</span> <ArrowRightCircle className="w-5 h-5 hidden md:block" aria-hidden="true" />
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => navigate("sistema")} 
              className="flex flex-1 md:flex-none items-center justify-center md:justify-end gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-white md:text-stone-900 bg-stone-900 md:bg-transparent hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 py-4 md:py-0 rounded-sm shadow-sm md:shadow-none"
            >
              Ver Sistema <ArrowRightCircle className="w-5 h-5 hidden md:block" aria-hidden="true" />
            </button>
          )}
        </nav>

        {/* Floating Back to Top */}
        <div className="hidden md:flex absolute right-6 lg:right-12 -bottom-20 justify-end">
          <button 
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo da página"
            className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm p-2"
          >
            Topo <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </article>
    </PageTransition>
  );
}

function Sistema() {
  const cards = [
    { num: "01", title: "Leitura de Marca", phrase: "Diagnóstico profundo", desc: "Decodificar o DNA e os códigos visuais ocultos da marca, traduzindo o posicionamento intangível para o ambiente construído." },
    { num: "02", title: "Curadoria de Produto", phrase: "Seleção intencional", desc: "Elevar o mix através de uma edição que conta uma história. O produto deixa de ser estocado para ser estrategicamente exibido." },
    { num: "03", title: "Narrativa Espacial", phrase: "O espaço como mídia", desc: "Projetar a loja não como um canal logístico, mas como um ambiente narrativo e imersivo que envolve e direciona o cliente." },
    { num: "04", title: "Construção de Percepção", phrase: "Posicionamento tátil", desc: "Manipular luz, cor e textura para orquestrar a atenção, gerar desejo palpável e aumentar a percepção de valor." },
    { num: "05", title: "Operação Criativa", phrase: "Da ideia à forma", desc: "Gestão ponta a ponta: fornecedores, equipe, enxoval técnico e excelência absoluta na implantação física do projeto." },
    { num: "06", title: "Experiência Física", phrase: "A jornada do desejo", desc: "Coreografar todos os pontos de contato para transformar o fluxo automatizado de compra em uma experiência memorável e rentável." }
  ];

  return (
    <PageTransition>
      <DynamicSEO title="Sistema de Direção Criativa" description="Um método rigoroso para transformar marca, produto e espaço em percepção de valor." />
      <section className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col pt-12" aria-labelledby="sistema-title">
        <header>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">CREATIVE SYSTEM</span>
          <h1 id="sistema-title" className="font-serif text-5xl md:text-[7rem] leading-[0.85] tracking-tighter text-stone-950 max-w-4xl mb-8 text-balance">
            Sistema de Direção Criativa.
          </h1>
          <p className="text-xl md:text-3xl font-light text-stone-600 max-w-3xl mb-24 leading-relaxed text-balance">
            Um método rigoroso para transformar marca, produto e espaço em percepção de valor palpável.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 border-t border-stone-900/10 pt-16">
          {cards.map((card) => (
            <article key={card.num} className="group flex flex-col p-8 md:p-10 border border-stone-900/10 bg-white/40 hover:bg-white/80 transition-all duration-700 rounded-sm">
              <span className="font-serif text-4xl text-stone-300 group-hover:text-stone-800 transition-colors duration-500 mb-8" aria-hidden="true">{card.num}.</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-3">{card.title}</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-6 block">{card.phrase}</span>
              <p className="text-sm font-light text-stone-600 leading-relaxed">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

function Contato() {
  const [toast, setToast] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setToast(`${type} copiado com sucesso!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <PageTransition>
      <DynamicSEO title="Contato" />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col justify-between min-h-[85vh] pt-12 relative">
        <header>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">EDITORIAL CLOSING</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-950 leading-[1.1] tracking-[-0.02em] max-w-6xl text-balance">
            "Uma marca torna-se inesquecível quando a sua estética deixa de ser aparência e passa a construir <span className="italic font-light text-stone-500">presença</span>."
          </h1>
        </header>

        <footer className="mt-auto pt-24">
          <address className="not-italic grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 border-t border-stone-900/10 pt-16">
            
            {/* INSERÇÃO DA LOGO DE ASSINATURA COMPLETA NO CONTATO / RODAPÉ */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-start">
              <img 
                src="/images/00_LOGOS/symbol-black-navbar.png" 
                alt="Samuel Carrera Paes - Assinatura e Logo" 
                className="navbar-logo-final"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
            
            <div className="flex flex-col gap-3 group">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-2">WhatsApp</h2>
              <button 
                type="button"
                onClick={() => handleCopy("(31) 98118-4250", "Telefone")}
                aria-label="Copiar número de WhatsApp"
                className="text-sm font-light text-stone-900 hover:text-stone-500 transition-colors text-left flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm p-1 -ml-1"
              >
                (31) 98118-4250
                <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col gap-3 group">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-2">Redes / E-mail</h2>
              <a 
                href="https://instagram.com/samuelcarrerapaes" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-light text-stone-900 hover:text-stone-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm p-1 -ml-1 w-fit block"
              >
                @samuelcarrerapaes
              </a>
              <button 
                type="button"
                onClick={() => handleCopy("samuel.paes@icloud.com", "E-mail")}
                aria-label="Copiar endereço de e-mail"
                className="text-sm font-light text-stone-900 hover:text-stone-500 transition-colors text-left flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm p-1 -ml-1"
              >
                samuel.paes@icloud.com
                <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-2">Localização</h2>
              <p className="text-sm font-light text-stone-900 p-1 -ml-1">Belo Horizonte — MG</p>
            </div>
          </address>

          <div className="flex flex-col items-center justify-center pt-20 border-t border-stone-900/10">
            <p className="text-sm font-light text-stone-500 mb-10 max-w-md text-center leading-relaxed text-balance">
              Disponível para projetos de direção criativa, consultoria de marca e experiência física de varejo.
            </p>
            <a 
              href="https://wa.me/5531981184250" 
              target="_blank" rel="noopener noreferrer"
              aria-label="Iniciar uma conversa via WhatsApp"
              className="group flex items-center gap-5 text-xs font-bold uppercase tracking-[0.25em] text-stone-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-full"
            >
              <span className="border-b border-stone-900/20 pb-1 group-hover:text-stone-600 group-hover:border-stone-900 transition-colors duration-300">
                Iniciar uma conversa
              </span>
              <div className="w-14 h-14 rounded-full border border-stone-900/10 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm">
                <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
              </div>
            </a>
          </div>
        </footer>

        {/* Toast de Cópia (Acessível) */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: PREMIUM_EASE }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-6 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 z-50 whitespace-nowrap"
            >
              <CheckCircle2 className="w-4 h-4 text-stone-300" aria-hidden="true" /> {toast}
            </motion.div>
          )}
        </AnimatePresence>

      </article>
    </PageTransition>
  );
}

// --- APP PRINCIPAL E NAVBAR ---

export default function SamuelPaesPortfolio() {
  const { route, navigate } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scroll when mobile menu is open (Acessibilidade + UX)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const navLinks = [
    { id: "inicio", num: "01.", label: "INÍCIO" },
    { id: "visao", num: "02.", label: "Visão" },
    { id: "cases", num: "03.", label: "Cases" },
    { id: "sistema", num: "04.", label: "Sistema" },
    { id: "contato", num: "05.", label: "Contato" },
  ];

  const handleNavClick = (id) => {
    navigate(id);
    setIsMenuOpen(false);
  };

  const isCaseDetail = route.startsWith("case/");

  return (
    <div className="min-h-screen bg-[#F4F0E9] text-stone-950 font-sans selection:bg-stone-900 selection:text-[#F4F0E9]">
      
      {/* NAVBAR GLOBAL FIXA - EDITORIAL */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#F4F0E9]/90 backdrop-blur-xl border-b border-stone-900/10 transition-all duration-500">
        <nav aria-label="Navegação Principal" className="mx-auto flex h-24 max-w-[90rem] items-center justify-between px-6 lg:px-12 gap-4">
          
          {/* LOGO CONTAINER: Ícone simples na navbar restrito com overflow hidden */}
          <div className="flex w-1/2 lg:w-1/4 justify-start overflow-visible">
            <button 
              type="button"
              onClick={() => handleNavClick("inicio")} 
              className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm group shrink-0"
              aria-label="Ir para a página inicial"
            >
              <div className="h-8 md:h-10 w-full max-w-[180px] xl:max-w-[240px] relative flex items-center">
                <img 
                  src="/images/00_LOGOS/symbol-black-navbar.png" 
                  alt="Samuel Carrera Paes Signature" 
                  className="navbar-logo-final"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if(e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden h-8 px-4 items-center justify-center border border-stone-900/10 bg-stone-200/30 rounded-sm">
                  <span className="font-serif text-[10px] uppercase tracking-[0.2em] text-stone-500">Samuel Carrera Paes Signature</span>
                </div>
              </div>
            </button>
          </div>

          {/* MENU CENTRAL */}
          <div className="hidden lg:flex flex-1 justify-center gap-4 xl:gap-10" role="menubar">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                type="button"
                role="menuitem"
                aria-label={`Página ${link.label}`}
                onClick={() => handleNavClick(link.id)} 
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm px-2 pb-1 border-b-2 ${
                  (route === link.id || (link.id === "cases" && isCaseDetail)) 
                    ? "text-stone-900 border-stone-900" 
                    : "text-stone-400 border-transparent hover:text-stone-900 hover:border-stone-900/20"
                }`}
              >
                <span className="opacity-50" aria-hidden="true">{link.num}</span> {link.label}
              </button>
            ))}
          </div>

          {/* BOTÕES DIREITA */}
          <div className="hidden lg:flex w-1/4 justify-end items-center gap-6 xl:gap-8">
            <button 
              type="button"
              onClick={() => handleNavClick("cases")}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900 border-b border-stone-900/30 pb-1 hover:text-stone-600 hover:border-stone-900 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              Entrar no Portfólio
            </button>
            <a 
              href="https://wa.me/5531981184250" 
              target="_blank" rel="noopener noreferrer"
              aria-label="Contato via WhatsApp"
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-stone-900/20 hover:border-stone-900 hover:bg-stone-900 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 shrink-0 shadow-sm hover:shadow-md"
            >
              <ArrowUpRight className="w-5 h-5 text-stone-900 group-hover:text-white transition-colors" aria-hidden="true" />
            </a>
          </div>

          {/* Menu Mobile Toggle */}
          <button 
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            className="lg:hidden p-2 text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm z-50 relative" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </nav>

        {/* Menu Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação móvel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: PREMIUM_EASE }}
              className="lg:hidden absolute top-20 left-0 w-full bg-[#F4F0E9] flex flex-col justify-center px-8 pb-32 shadow-xl"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.button 
                    key={link.id} 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.08, ease: PREMIUM_EASE }}
                    type="button"
                    onClick={() => handleNavClick(link.id)} 
                    className={`flex items-baseline gap-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 p-3 rounded-sm transition-colors duration-300 ${
                      (route === link.id || (link.id === "cases" && isCaseDetail)) ? "text-stone-900 bg-stone-900/5" : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    <span className="font-serif text-3xl italic opacity-50" aria-hidden="true">{link.num}</span>
                    <span className="font-serif text-5xl tracking-tight">{link.label}</span>
                  </motion.button>
                ))}
              </div>
              <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.4, ease: PREMIUM_EASE }}
                 className="mt-16 pt-8 border-t border-stone-900/10 flex justify-between items-center px-2"
              >
                <button type="button" onClick={() => handleNavClick("cases")} className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-500 focus-visible:outline-none focus-visible:underline hover:text-stone-900 transition-colors">Ver Cases</button>
                <a href="https://wa.me/5531981184250" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-900 flex items-center gap-2 focus-visible:outline-none focus-visible:underline hover:text-stone-600 transition-colors">
                  WhatsApp <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* RENDERIZADOR DE PÁGINAS */}
      <main id="main-content">
        <AnimatePresence mode="wait">
          {route === "inicio" && <Inicio key="inicio" navigate={navigate} />}
          {route === "visao" && <Visao key="visao" />}
          {route === "cases" && <Cases key="cases" navigate={navigate} />}
          {route.startsWith("case/") && <CaseDetail key="case-detail" caseId={route.replace("case/", "")} navigate={navigate} />}
          {route === "sistema" && <Sistema key="sistema" />}
          {route === "contato" && <Contato key="contato" />}
        </AnimatePresence>
      </main>

    </div>
  );
}
















