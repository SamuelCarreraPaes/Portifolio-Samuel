import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRightCircle, ArrowLeftCircle, Menu, X, ArrowUp, CheckCircle2, Copy } from "lucide-react";

import { authorityAtlas, authorityServiceGroups, authorityServices, getAuthorityService } from "./authorityMap";
import { sistemaArticleCards } from "./sistemaArticleCards";

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
    thumb: "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_08.png",
    blocks: [
      ["Abertura", "Este projeto marcou o início de uma transição estratégica de posicionamento para a Val Fortunatto — uma multimarca mineira consolidada no varejo feminino contemporâneo."],
      ["Contexto & Desafio", "O objetivo central foi reconstruir a percepção estética da marca, sofisticando sua comunicação visual e aproximando um público mais jovem, sem romper com a elegância e a maturidade já reconhecidas pela cliente tradicional da loja."],
      ["Estratégia & Execução", "A curadoria de produto (com marcas mineiras como Eminem, Victor Dzenk e Sara Santos) teve papel central. A direção visual foi construída sobre a tensão entre leveza e estrutura, fluidez e monumentalidade. Texturas densas e alfaiataria arquitetônica foram utilizadas para construir uma narrativa visual mais madura."],
      ["Impacto & Resultados", "Reposicionamento visual estratégico da marca, elevando sua percepção editorial. Fortalecimento da percepção premium e rejuvenescimento gradual da comunicação. Feedback: 'A campanha marcou claramente uma nova fase estética da marca sem perder sua identidade original.'"]
    ],
    gallery: [
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_02.png",
      "/images/01_VAL_FORTUNATTO/SP_CASE01_VALFORTUNATTO_03.png",
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
    thumb: "/images/11_PARAISO_TROPICAL/SP_CASE11_PARAISO_TROPICAL_04.png",
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

const SITE_URL = "https://paesconsultoria.com";
const SEO_LAST_MODIFIED = "2026-06-10";
const SAMUEL_INSTAGRAM = "https://instagram.com/samuelcarrerapaes";
const VERDE_BURGO_INSTAGRAM = "https://instagram.com/verdeburgoeventos";
const DEFAULT_OG_IMAGE = homePortrait;
const SEO_KEYWORDS = [
  "Samuel Carrera Paes",
  "Samuel Paes",
  "Paes Consultoria",
  "Consultoria Paes",
  "diretor criativo",
  "consultor criativo",
  "BANAL marketing",
  "Verde Burgo Eventos",
  "branding",
  "marketing",
  "eventos",
  "buffet",
  "decoração",
  "bar",
  "cerimonial",
  "varejo",
  "visual merchandising",
  "direção criativa",
  "experiência de marca"
];

function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function getSamuelEntity() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#samuel-carrera-paes`,
    "name": "Samuel Carrera Paes",
    "alternateName": "Samuel Paes",
    "url": SITE_URL,
    "image": absoluteUrl(homePortrait),
    "jobTitle": "Diretor Criativo / Consultor Criativo",
    "sameAs": [SAMUEL_INSTAGRAM],
    "worksFor": { "@id": `${SITE_URL}/#paes-consultoria` },
    "knowsAbout": SEO_KEYWORDS
  };
}

function getPaesEntity() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#paes-consultoria`,
    "name": "Paes Consultoria",
    "alternateName": ["Consultoria Paes", "Samuel Carrera Paes"],
    "url": SITE_URL,
    "logo": absoluteUrl("/images/00_LOGOS/logo-full-transparent.png"),
    "founder": { "@id": `${SITE_URL}/#samuel-carrera-paes` },
    "sameAs": [SAMUEL_INSTAGRAM],
    "knowsAbout": SEO_KEYWORDS,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços e territórios do ecossistema Samuel Paes",
      "itemListElement": authorityServices.map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "url": `${SITE_URL}/servicos/${service.slug}`,
          "provider": { "@id": `${SITE_URL}/#paes-consultoria` }
        }
      }))
    }
  };
}

function getBrandEntities() {
  return [
    {
      "@type": "Brand",
      "@id": `${SITE_URL}/#banal`,
      "name": "BANAL",
      "url": `${SITE_URL}/banal`,
      "logo": absoluteUrl("/brands/banal/media/banal-logo-balanced.png"),
      "parentOrganization": { "@id": `${SITE_URL}/#paes-consultoria` },
      "description": "Empresa de branding, marketing, posicionamento, narrativa, campanhas e percepção de valor."
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#verde-burgo-eventos`,
      "name": "Verde Burgo Eventos",
      "alternateName": "Verde Burgo",
      "url": `${SITE_URL}/verdeburgo`,
      "logo": absoluteUrl("/brands/verde-burgo/logos/verde-burgo-logo-balanced.png"),
      "sameAs": [VERDE_BURGO_INSTAGRAM],
      "parentOrganization": { "@id": `${SITE_URL}/#paes-consultoria` },
      "description": "Empresa de eventos com buffet, decoração, bar, cerimonial, planejamento, produção e execução com direção criativa aplicada."
    }
  ];
}

// --- CURVAS DE TRANSIÇÃO PREMIUM ---
const PREMIUM_EASE = [0.22, 1, 0.36, 1];

const verdeburgoBase = "/images/14_VERDEBURGO/PROVENCE_RAIZ/02_WEB";
const verdeburgoRefinement = "/images/14_VERDEBURGO/PROVENCE_RAIZ/03_REFINAMENTO";

const verdeburgoAssets = {
  logo: `${verdeburgoBase}/logo-verdeburgo-eventos.png`,
  hero: `${verdeburgoBase}/hero-mural-toile-de-jouy-provence-raiz.jpg`,
  planta: `${verdeburgoBase}/provence-raiz-planta-casa-giardini.jpg`,
  materialidade: `${verdeburgoBase}/provence-raiz-moodboard-materialidade-antiga.jpg`,
  materiaReal: `${verdeburgoBase}/provence-raiz-moodboard-materia-real.jpg`,
  floral: `${verdeburgoBase}/provence-raiz-estudo-floral-volume-natural.jpg`,
  cerimoniaMood: `${verdeburgoBase}/provence-raiz-moodboard-cerimonia.jpg`,
  cerimonia: `${verdeburgoBase}/provence-raiz-cerimonia-passarela-altar.jpg`,
  mesaMood: `${verdeburgoBase}/provence-raiz-moodboard-mesa-bolo.jpg`,
  mesa: `${verdeburgoBase}/provence-raiz-mesa-bolo-toile-lustres.jpg`,
  bar: `${verdeburgoBase}/provence-raiz-bar-hospitalidade-toile-lavanda.jpg`,
  loungeMood: `${verdeburgoBase}/provence-raiz-moodboard-lounge.jpg`,
  lounge: `${verdeburgoBase}/provence-raiz-lounge-residencial-linho-azul.jpg`,
  escada: `${verdeburgoBase}/provence-raiz-escada-cascata-floral.jpg`,
  pilastras: `${verdeburgoBase}/prancha-tecnica-pilastras-cenograficas-altar.jpg`,
  luminariaCarretel: `${verdeburgoBase}/prancha-tecnica-luminaria-pendulo-carretel.jpg`,
  luminariaSuspensa: `${verdeburgoBase}/prancha-tecnica-luminaria-cenografica-suspensa.jpg`,
  moodboardIntegrado: `${verdeburgoRefinement}/moodboard-integracao-atmosfera-provence.jpg`,
  materiaTextura: `${verdeburgoRefinement}/board-materia-textura-cores.jpg`,
  volumeNatural: `${verdeburgoRefinement}/board-volume-natural-nunca-artificial.jpg`,
  cerimoniaRefinada: `${verdeburgoRefinement}/render-cerimonia-altar-passarela-refinado.jpg`,
  mesaRefinada: `${verdeburgoRefinement}/render-mesa-bolo-mural-toile-refinado.jpg`,
  escadaRefinada: `${verdeburgoRefinement}/render-escada-cascata-floral-refinado.jpg`,
  pilastrasRefinada: `${verdeburgoRefinement}/pilastras-refinada.jpg`,
  luminariaCarretelRefinada: `${verdeburgoRefinement}/prancha-tecnica-luminaria-carretel-refinada.jpg`,
  luminariaGaiola: `${verdeburgoRefinement}/prancha-tecnica-luminaria-gaiola-cenografica.jpg`
};

const verdeburgoChapters = [
  {
    number: "01",
    label: "Origem",
    title: "Uma Provence menos literal e mais enraizada.",
    text: "O projeto parte de uma atmosfera romântica, orgânica e construída por camadas. A intenção não é reproduzir uma paisagem francesa, mas traduzir sua memória em matéria, luz e permanência.",
    image: verdeburgoAssets.materialidade,
    alt: "Moodboard com referências de materialidade antiga, elementos naturais e atmosfera provençal."
  },
  {
    number: "02",
    label: "Linguagem Visual",
    title: "Toile de Jouy como memória gráfica, não como estampa decorativa.",
    text: "A imagem de fundo funciona como uma reinterpretação contemporânea do Toile de Jouy: menos reprodução histórica, mais memória gráfica. Azul, matéria, papel, textura e luz aparecem como camadas de atmosfera.",
    image: verdeburgoAssets.materiaTextura,
    alt: "Prancha de matéria, textura, cores e Toile de Jouy para Provence Raiz.",
    mode: "contain",
    frameClassName: "aspect-[4/5]"
  },
  {
    number: "03",
    label: "Arquitetura",
    title: "O espaço como campo de leitura, não como vitrine.",
    text: "A Casa Giardini entra como escala, luz, vazio, percurso e sombra. O lugar não é anunciado como produto; ele atua como pano de fundo vivo para que a atmosfera, os objetos e a narrativa ganhem corpo.",
    image: verdeburgoAssets.planta,
    alt: "Planta de implantação da Casa Giardini para o projeto Provence Raiz."
  },
  {
    number: "04",
    label: "Floral",
    title: "Volume natural, nunca artificial.",
    text: "O floral procura imperfeição elegante: hastes aparentes, assimetria, respiro e azul distribuído como ritmo pictórico. Nada plástico, nada compacto; a pergunta é se parece que nasceu ali.",
    image: verdeburgoAssets.volumeNatural,
    alt: "Prancha floral Volume Natural Nunca Artificial com flores do projeto Provence Raiz.",
    mode: "contain",
    frameClassName: "aspect-[16/9]"
  },
  {
    number: "05",
    label: "Cerimônia",
    title: "Uma cena em deslocamento.",
    text: "A passarela preserva o respiro central, os florais conduzem o olhar, os voais filtram a luz e o altar surge como extensão natural do espaço.",
    image: verdeburgoAssets.cerimoniaRefinada,
    alt: "Render refinado da cerimônia Provence Raiz com passarela, florais, luminária e altar.",
    frameClassName: "aspect-[3/4]"
  },
  {
    number: "06",
    label: "Permanência",
    title: "Hospitalidade como experiência, não passagem.",
    text: "Bar, lounge, mesa do bolo e escada criam zonas de permanência. Cada ambiente sustenta uma qualidade: chegada, encontro, contemplação, memória e fotografia.",
    image: verdeburgoAssets.escadaRefinada,
    alt: "Render refinado da escada Provence Raiz com cascata floral orgânica.",
    frameClassName: "aspect-square"
  }
];

const verdeburgoObjects = [
  {
    title: "Pilastras Cenográficas",
    text: "Estruturam o altar como presença arquitetônica temporária. Não simulam permanência: criam verticalidade, enquadramento e solenidade.",
    image: verdeburgoAssets.pilastrasRefinada,
    alt: "Prancha técnica refinada das pilastras cenográficas para altar Provence Raiz."
  },
  {
    title: "Luminária Carretel",
    text: "Nasce da tensão entre objeto rústico e peça cenográfica refinada. Madeira clara, difusão leitosa e luz quente constroem uma presença suspensa e silenciosa.",
    image: verdeburgoAssets.luminariaCarretelRefinada,
    alt: "Prancha técnica refinada da luminária pêndulo carretel cenográfico Provence Raiz."
  },
  {
    title: "Luminária Gaiola",
    text: "Aparece como arquitetura suspensa: metal champagne, vidro texturizado, tecido interno e luz quente. Não é ornamento solto; é dispositivo de escala e atmosfera.",
    image: verdeburgoAssets.luminariaGaiola,
    alt: "Prancha técnica da luminária pendente gaiola cenográfica Provence Raiz."
  }
];

const banalAssets = {
  symbol: "/brands/banal/banal-symbol-primary.jpg",
  minimalSymbol: "/brands/banal/banal-symbol-minimal.jpg",
  transparentLogo: "/brands/banal/media/banal-logo-horizontal-transparent.png",
  balancedLogo: "/brands/banal/media/banal-logo-balanced.png",
  flyLoop: "/brands/banal/media/banal-fly-loop.mp4",
  identityDark: "/brands/banal/banal-identity-dark.jpg",
  showcase: "/brands/banal/banal-brand-showcase.jpg",
  guideline: "/brands/banal/banal-guideline-board.jpg",
  identityBoard: "/brands/banal/banal-identity-board.jpg",
  founderScene: "/brands/banal/banal-founder-scene.jpg",
  manifesto: "/brands/banal/banal-manifesto-board.jpg",
  refinedIdentity: "/brands/banal/banal-refined-identity.jpg"
};

const verdeBurgoBrandAssets = {
  logo: "/brands/verde-burgo/logos/verde-burgo-logo-principal.png",
  balancedLogo: "/brands/verde-burgo/logos/verde-burgo-logo-balanced.png",
  icon: "/brands/verde-burgo/icons/verde-burgo-icon-principal.png",
  hero: "/brands/verde-burgo/backgrounds/verde-burgo-bg-hero-branco-neve.jpg",
  greenHero: "/brands/verde-burgo/backgrounds/verde-burgo-bg-hero-verde.jpg",
  caseCover: "/brands/verde-burgo/backgrounds/verde-burgo-bg-case-cover.jpg",
  palette: "/brands/verde-burgo/elements/verde-burgo-paleta.png",
  slogan: "/brands/verde-burgo/elements/verde-burgo-slogan.png",
  developmentLoop: "/brands/verde-burgo/media/verdeburgo-in-development-hoop-loop.mp4"
};

const consultancyPrinciples = [
  {
    title: "Direção",
    text: "Definir intenção, linguagem, critério e prioridade antes de qualquer entrega visual, comercial ou operacional."
  },
  {
    title: "Identidade",
    text: "Construir coerência entre marca, experiência, comunicação e presença para que cada negócio seja reconhecível."
  },
  {
    title: "Execução",
    text: "Levar a estratégia ao mundo real com operação, ritmo, acabamento e responsabilidade sobre o resultado."
  }
];

const consultancyCompanies = [
  {
    id: "banal",
    name: "BANAL",
    eyebrow: "Marca · Marketing · Comunicação",
    route: "banal",
    image: banalAssets.founderScene,
    statement: "O consumo acaba. O signo continua.",
    description: "Empresa especializada em branding, marketing, comunicação, varejo e posicionamento para negócios que precisam se tornar mais claros, desejáveis e valiosos.",
    layers: ["Branding", "Marketing", "Posicionamento", "Narrativa", "Conteúdo", "Campanhas"]
  },
  {
    id: "verdeburgo",
    name: "VERDE BURGO",
    eyebrow: "Eventos · Festas · Operação Completa",
    route: "verdeburgo",
    image: verdeBurgoBrandAssets.caseCover,
    statement: "Evento bonito é consequência. Evento bem resolvido é estratégia.",
    description: "Empresa de eventos com solução integrada de buffet, decoração, bar, cerimonial, planejamento, produção e execução para festas completas.",
    layers: ["Buffet", "Decoração", "Bar", "Cerimonial", "Planejamento", "Produção"]
  }
];

const verdeBurgoEventFormats = [
  "Casamentos",
  "Aniversários",
  "Eventos corporativos",
  "Festas especiais",
  "Recepções",
  "Experiências de marca"
];

const verdeBurgoMethod = [
  ["Escuta", "Entender desejo, contexto, orçamento, restrições e nível de tranquilidade que o cliente precisa."],
  ["Desenho", "Criar conceito, narrativa visual, atmosfera e linguagem do evento."],
  ["Curadoria", "Selecionar fornecedores, materiais, menu, bar, ambientação, papelaria e detalhes."],
  ["Operação", "Planejar fluxos, bastidores, cronograma, montagem, equipe e execução."],
  ["Presença", "Entregar uma experiência fluida, bonita, resolvida e memorável."]
];

const banalLayers = [
  ["Branding", "Construção de identidade, assinatura, sistema visual e percepção pública."],
  ["Marketing", "Campanhas, calendário, conteúdo, canais e estratégia de crescimento."],
  ["Posicionamento", "Definição de território, promessa, discurso e diferenciação competitiva."],
  ["Narrativa", "Transformação de produto, gesto, cena ou detalhe em linguagem memorável."],
  ["Percepção de valor", "Arquitetura de sinais para fazer uma marca parecer mais clara, desejável e reconhecível."]
];

const banalProcess = [
  ["Diagnóstico", "Leitura do negócio, do mercado, dos sinais de marca e dos pontos de confusão na percepção pública."],
  ["Direção", "Definição de posicionamento, linguagem, narrativa, prioridade comercial e critérios de comunicação."],
  ["Sistema", "Organização de identidade, conteúdo, campanha, varejo e presença em canais com consistência."],
  ["Ativação", "Desdobramento em peças, rotinas, campanhas e experiências capazes de sustentar valor no uso real."]
];

// --- CUSTOM ROUTER HOOK FOR SEO & SHAREABILITY ---
function getRouteFromLocation() {
  const pathRoute = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (pathRoute && pathRoute !== "index.html") {
    return decodeURIComponent(pathRoute);
  }

  const hashRoute = window.location.hash.replace(/^#\/?/, "");
  return hashRoute || "inicio";
}

function routeToPath(route) {
  return route === "inicio" ? "/" : `/${route}`;
}

function useRouter() {
  const [route, setRoute] = useState(getRouteFromLocation);

  useEffect(() => {
    const handleRouteChange = (event) => {
      const pathRoute = window.location.pathname.replace(/^\/+|\/+$/g, "");
      const hasPathRoute = Boolean(pathRoute && pathRoute !== "index.html");
      setRoute(getRouteFromLocation());
      if (!(event?.type === "hashchange" && hasPathRoute)) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const navigate = useCallback((newRoute) => {
    window.history.pushState(null, "", routeToPath(newRoute));
    setRoute(newRoute);
    window.scrollTo(0, 0);
  }, []);

  return { route, navigate };
}

// --- DYNAMIC SEO INJECTION ---
function DynamicSEO({ title, description, url, image, schemaType = "WebPage" }) {
  useEffect(() => {
    const defaultTitle = "Paes Consultoria | Samuel Carrera Paes — Direção Criativa";
    const defaultDescription = "Paes Consultoria, de Samuel Carrera Paes, desenvolve negócios, marcas, experiências, eventos, cases e artigos por meio de direção criativa, identidade, estratégia e execução.";
    const pageTitle = !title || title === "Início" ? defaultTitle : `${title} | Samuel Carrera Paes — Paes Consultoria`;
    const pageDescription = description || defaultDescription;
    const pageUrl = url ? absoluteUrl(url.replace(/^\/+/, "")) : SITE_URL;
    const pageImage = absoluteUrl(image || DEFAULT_OG_IMAGE);
    document.title = pageTitle;

    // Update or inject meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = pageDescription;

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = SEO_KEYWORDS.join(", ");

    const seoSelectors = [
      ["link[rel='canonical']", "href", pageUrl],
      ["meta[property='og:title']", "content", pageTitle],
      ["meta[property='og:description']", "content", pageDescription],
      ["meta[property='og:url']", "content", pageUrl],
      ["meta[property='og:image']", "content", pageImage],
      ["meta[name='twitter:title']", "content", pageTitle],
      ["meta[name='twitter:description']", "content", pageDescription],
      ["meta[name='twitter:image']", "content", pageImage]
    ];

    seoSelectors.forEach(([selector, attribute, value]) => {
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute(attribute, value);
      }
    });

    // Inject or update JSON-LD for rich snippets
    let script = document.getElementById("seo-json-ld");
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-json-ld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const pageEntity = {
      "@type": schemaType,
      "@id": `${pageUrl}#primary`,
      "name": pageTitle,
      "headline": pageTitle,
      "description": pageDescription,
      "url": pageUrl,
      "mainEntityOfPage": pageUrl,
      "inLanguage": "pt-BR",
      "image": pageImage,
      "dateModified": SEO_LAST_MODIFIED,
      "author": { "@id": `${SITE_URL}/#samuel-carrera-paes` },
      "creator": { "@id": `${SITE_URL}/#samuel-carrera-paes` },
      "publisher": { "@id": `${SITE_URL}/#paes-consultoria` },
      "keywords": SEO_KEYWORDS.join(", "),
      "about": [
        { "@id": `${SITE_URL}/#samuel-carrera-paes` },
        { "@id": `${SITE_URL}/#paes-consultoria` },
        { "@id": `${SITE_URL}/#banal` },
        { "@id": `${SITE_URL}/#verde-burgo-eventos` }
      ],
      "mentions": [
        { "@id": `${SITE_URL}/#banal` },
        { "@id": `${SITE_URL}/#verde-burgo-eventos` }
      ],
      ...(schemaType === "Article" ? {
        "datePublished": SEO_LAST_MODIFIED,
        "articleSection": "Biblioteca Samuel Paes"
      } : {}),
      ...(schemaType === "Service" ? {
        "serviceType": title,
        "provider": { "@id": `${SITE_URL}/#paes-consultoria` },
        "areaServed": "Brasil"
      } : {})
    };

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        getSamuelEntity(),
        getPaesEntity(),
        ...getBrandEntities(),
        pageEntity
      ]
    };
    script.text = JSON.stringify(schemaData);

  }, [title, description, url, image, schemaType]);

  return null;
}

// --- COMPONENTES DE ALTA PERFORMANCE & UX ---

function ImageWithFallback({ src, alt, imageClassName = "", fallbackLabel, loading = "lazy", mode = "natural" }) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isNatural = mode === "natural";
  const isContain = mode === "contain";

  return (
    <div
      role="img"
      aria-label={alt || fallbackLabel}
      className={`w-full bg-stone-200/40 flex items-center justify-center ${isNatural ? 'h-auto relative' : 'h-full relative overflow-hidden'}`}
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
              isNatural ? "h-auto block object-contain" : `h-full absolute inset-0 ${isContain ? "object-contain" : "object-cover"}`
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

function playMutedLoop(event) {
  const video = event.currentTarget;
  video.muted = true;
  const playback = video.play();
  if (playback?.catch) {
    playback.catch(() => {});
  }
}

// --- PÁGINAS ---

function Inicio({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO title="Início" />
      <section className="mx-auto flex min-h-[85vh] max-w-[90rem] flex-col justify-center px-6 pt-10 lg:px-12" aria-labelledby="home-title">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: PREMIUM_EASE }}
          className="mb-10 text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400"
        >
          Samuel Carrera Paes · Diretor Criativo / Consultor Criativo
        </motion.p>
        <motion.h1
          id="home-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: PREMIUM_EASE }}
          className="max-w-6xl font-serif text-[15vw] leading-[0.82] tracking-[-0.02em] text-stone-950 sm:text-[10vw] md:text-[8.5rem] lg:text-[11rem] text-balance"
        >
          Paes Consultoria
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: PREMIUM_EASE }}
          className="mt-14 grid gap-8 border-y border-stone-900/10 py-10 md:grid-cols-[1fr_auto_1fr] md:items-center"
          aria-label="Empresas originadas pela Paes Consultoria"
        >
          <button
            type="button"
            onClick={() => navigate("banal")}
            className="group flex min-h-40 items-center justify-center border border-stone-900/10 bg-white/20 px-8 py-10 transition-colors duration-500 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            aria-label="Abrir BANAL"
          >
            <span className="flex h-28 w-full max-w-[18rem] items-center justify-center md:h-32">
              <img
                src={banalAssets.balancedLogo}
                alt="BANAL, empresa de branding e marketing dirigida por Samuel Carrera Paes"
                loading="eager"
                decoding="async"
                className="max-h-full w-full object-contain transition duration-700 group-hover:scale-[1.02]"
              />
            </span>
          </button>

          <div className="hidden h-px w-16 bg-stone-900/20 md:block" aria-hidden="true" />

          <button
            type="button"
            onClick={() => navigate("verdeburgo")}
            className="group flex min-h-40 items-center justify-center border border-stone-900/10 bg-white/20 px-8 py-10 transition-colors duration-500 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            aria-label="Abrir Verde Burgo"
          >
            <span className="flex h-28 w-full max-w-[18rem] items-center justify-center md:h-32">
              <img
                src={verdeBurgoBrandAssets.balancedLogo}
                alt="Verde Burgo Eventos, empresa de eventos com direção criativa de Samuel Paes"
                loading="eager"
                decoding="async"
                className="h-full w-full object-contain grayscale contrast-125 transition duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
              />
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: PREMIUM_EASE }}
          className="mt-14 max-w-3xl"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400">Direção Criativa e Estratégia</p>
          <p className="mt-6 text-xl font-light leading-relaxed tracking-tight text-stone-800 md:text-3xl lg:text-4xl text-balance">
            Samuel Carrera Paes desenvolve negócios, marcas, experiências e projetos por meio de uma visão estratégica e criativa unificada.
          </p>
        </motion.div>

        <div className="mt-24 grid gap-4 border-t border-stone-900/10 pt-10 md:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            onClick={() => navigate("visao")}
            className="group flex items-center justify-between border border-stone-900/10 bg-white/20 px-5 py-5 text-left transition-colors duration-500 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
          >
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">01</span>
              <span className="mt-2 block font-serif text-2xl text-stone-950">Minha Visão</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-stone-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </button>
          {consultancyCompanies.map((company, index) => (
            <button
              key={company.id}
              type="button"
              onClick={() => navigate(company.route)}
              className="group flex items-center justify-between border border-stone-900/10 bg-white/20 px-5 py-5 text-left transition-colors duration-500 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{String(index + 2).padStart(2, "0")}</span>
                <span className="mt-2 block font-serif text-2xl text-stone-950">{company.name}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-stone-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => navigate(`atlas/${authorityAtlas.slug}`)}
            className="group flex items-center justify-between border border-stone-900/10 bg-white/20 px-5 py-5 text-left transition-colors duration-500 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
          >
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">04</span>
              <span className="mt-2 block font-serif text-2xl text-stone-950">Mapa</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-stone-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </button>
        </div>
      </section>
    </PageTransition>
  );
}

function Visao() {
  return (
    <PageTransition>
      <DynamicSEO title="Minha Visão" description="A visão profissional de Samuel Carrera Paes conecta pensamento sistêmico, direção criativa, identidade, estratégia, experiência e excelência de execução." url="visao" />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col pt-12">
        <header>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">POSICIONAMENTO PROFISSIONAL</span>
          <h1 className="font-serif text-6xl md:text-[8rem] leading-[0.85] tracking-tighter text-stone-950 max-w-5xl text-balance">
            Minha
            <br aria-hidden="true" />
            <span className="sr-only"> </span>
            <span className="text-stone-500 italic font-light">Visão.</span>
          </h1>
          <p className="mt-16 text-xl md:text-3xl leading-relaxed tracking-tight text-stone-800 font-light border-l border-stone-900/20 pl-6 md:pl-10 max-w-4xl text-balance">
            "Estratégia, estética e operação não deveriam ser departamentos separados. Quando funcionam juntos, constroem identidade, confiança e valor percebido."
          </p>
        </header>

        <section className="mt-24 grid gap-12 border-y border-stone-900/10 py-16 lg:grid-cols-[0.85fr_1.15fr]" aria-labelledby="experiencia-continua-title">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-8 block">CONSULTORIA COMO MÉTODO</span>
            <h2 id="experiencia-continua-title" className="font-serif text-4xl md:text-6xl leading-tight text-stone-950 text-balance">
              Direção criativa só tem valor quando melhora a leitura, a decisão e a execução de um negócio.
            </h2>
          </div>
          <div className="space-y-7 text-base md:text-xl font-light leading-relaxed text-stone-700">
            <p>
              Meu trabalho parte de pensamento sistêmico: entender como marca, produto, ambiente, atendimento, comunicação, equipe e operação se afetam. Uma decisão estética nunca é apenas estética; ela altera percepção, confiança, desejo e comportamento.
            </p>
            <p>
              A Paes Consultoria organiza essa leitura para transformar intenção em estrutura. BANAL atua onde o desafio é marca, varejo, comunicação e posicionamento. Verde Burgo atua onde o desafio é evento, hospitalidade, festa, experiência e produção.
            </p>
            <p>
              Tecnologia e inteligência artificial podem acelerar repertório, teste e prototipagem. Mas elas não substituem direção, critério, responsabilidade e entendimento humano do contexto.
            </p>
          </div>
        </section>

        <section className="grid gap-12 border-b border-stone-900/10 py-16 lg:grid-cols-[0.72fr_1.28fr]" aria-labelledby="samuel-visao-title">
          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">SAMUEL CARRERA PAES</span>
            <h2 id="samuel-visao-title" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Diretor Criativo e Consultor Criativo.
            </h2>
          </div>
          <div className="space-y-7 text-base font-light leading-relaxed text-stone-700 md:text-xl">
            <p>
              Samuel Carrera Paes atua a partir de uma leitura multidisciplinar: marca, estética, comportamento, varejo, evento, operação, repertório visual, escrita, tecnologia e execução. A função não é apenas criar uma imagem bonita, mas construir sistemas que façam uma intenção ganhar presença real.
            </p>
            <p>
              Essa visão exige curiosidade e pragmatismo ao mesmo tempo. O pensamento estratégico define direção; a direção criativa transforma essa direção em linguagem; a execução prova se a linguagem consegue existir no mundo sem perder força.
            </p>
            <p>
              Inteligência artificial entra como instrumento de pesquisa, simulação, expansão de repertório e prototipagem. Ela ajuda o processo a acelerar, mas não substitui critério, autoria, escuta, responsabilidade e capacidade de decidir o que deve ou não existir.
            </p>
          </div>
        </section>

        <section aria-label="Pilares da Visão Criativa">
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-32 border-t border-stone-900/10 pt-16">
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">01</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Pensamento Sistêmico</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Ler o negócio como conjunto: marca, público, linguagem, canal, operação, espaço e entrega.</p>
            </li>
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">02</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Identidade como Estratégia</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Transformar identidade em ferramenta de decisão, diferenciação, comunicação e valor percebido.</p>
            </li>
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">03</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Experiência e Percepção</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Projetar os sinais que fazem uma marca, loja ou evento ser compreendido antes de ser explicado.</p>
            </li>
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">04</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Excelência de Execução</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Garantir que a estratégia apareça no detalhe, no cronograma, no acabamento e na experiência real.</p>
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
            "Clareza estratégica, estética consistente e execução cuidadosa são ferramentas de negócio."
          </h2>
        </footer>
      </article>
    </PageTransition>
  );
}

function PaesConsultoria({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO
        title="Paes Consultoria"
        description="Paes Consultoria é o núcleo estratégico e criativo que origina negócios, marcas, experiências, projetos e soluções com direção, identidade e execução."
        url=""
        image={banalAssets.founderScene}
      />
      <section className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="consultoria-title">
        <header className="grid gap-12 border-b border-stone-900/10 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="mb-10 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">PAES CONSULTORIA</span>
            <h1 id="consultoria-title" className="font-serif text-5xl leading-[0.85] tracking-tighter text-stone-950 md:text-[7rem] text-balance">
              A visão central antes das especializações.
            </h1>
          </div>
          <div className="max-w-3xl self-end">
            <p className="text-xl font-light leading-relaxed text-stone-700 md:text-3xl text-balance">
              A Paes Consultoria é o núcleo estratégico e criativo que orienta negócios, marcas, experiências, projetos e soluções.
            </p>
            <p className="mt-8 text-base font-light leading-relaxed text-stone-600 md:text-lg">
              BANAL e Verde Burgo atuam em mercados diferentes, mas compartilham a mesma base: direção, identidade, experiência, execução e coerência de valor.
            </p>
          </div>
        </header>

        <section className="grid gap-8 border-b border-stone-900/10 py-16 md:grid-cols-3" aria-label="Princípios da Paes Consultoria">
          {consultancyPrinciples.map((item, index) => (
            <article key={item.title} className="border-t border-stone-900/10 pt-8">
              <span className="font-serif text-4xl text-stone-300" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-stone-900">{item.title}</h2>
              <p className="mt-5 text-sm font-light leading-relaxed text-stone-600 md:text-base">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="py-24 md:py-32" aria-labelledby="empresas-title">
          <header className="mb-16 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">EMPRESAS</span>
            <h2 id="empresas-title" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Empresas especializadas, não seções secundárias.
            </h2>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            {consultancyCompanies.map((company) => (
              <article key={company.id} className="group flex min-h-full flex-col border border-stone-900/10 bg-white/35 transition-colors duration-500 hover:bg-white/70 rounded-sm">
                <button
                  type="button"
                  onClick={() => navigate(company.route)}
                  className="flex h-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                  aria-label={`Abrir empresa ${company.name}`}
                >
                  <figure className="relative aspect-[4/3] overflow-hidden bg-stone-200/50">
                    <ImageWithFallback src={company.image} alt={`Imagem da empresa ${company.name} no ecossistema criativo de Samuel Carrera Paes`} mode="cover" imageClassName="transition-transform duration-[1.5s] group-hover:scale-[1.03]" />
                  </figure>
                  <div className="flex flex-1 flex-col p-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{company.eyebrow}</p>
                    <h3 className="mt-6 font-serif text-4xl leading-none text-stone-950">{company.name}</h3>
                    <p className="mt-6 font-serif text-2xl leading-tight text-stone-700 text-balance">{company.statement}</p>
                    <p className="mt-6 text-sm font-light leading-relaxed text-stone-600">{company.description}</p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {company.layers.map((layer) => (
                        <span key={layer} className="rounded-full border border-stone-900/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-stone-500">{layer}</span>
                      ))}
                    </div>
                    <span className="mt-auto pt-10 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900">
                      Entrar <ArrowRightCircle className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-900/10 py-24 md:py-32" aria-labelledby="projetos-title">
          <header className="mb-16 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">PROJETOS</span>
              <h2 id="projetos-title" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
                Projetos com destino claro.
              </h2>
            </div>
            <p className="max-w-3xl text-lg font-light leading-relaxed text-stone-700 md:text-xl">
              Projetos de branding, comunicação, varejo, posicionamento e conteúdo pertencem à BANAL. Projetos de festas, hospitalidade, produção e eventos pertencem à Verde Burgo.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="border border-stone-900/10 bg-white/35 p-8 rounded-sm">
              <div className="mb-10 flex items-center justify-between gap-6 border-b border-stone-900/10 pb-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">BANAL</p>
                  <h3 className="mt-3 font-serif text-4xl text-stone-950">Branding, marketing e comunicação.</h3>
                </div>
                <button type="button" onClick={() => navigate("banal")} className="hidden shrink-0 border-b border-stone-900/30 pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 md:block">
                  Ver empresa
                </button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {casesData.slice(0, 6).map((project) => (
                  <button key={project.id} type="button" onClick={() => navigate(`case/${project.id}`)} className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm">
                    <figure className="relative aspect-[4/3] overflow-hidden bg-stone-200/50 rounded-sm">
                      <ImageWithFallback src={project.thumb} alt={`Projeto BANAL por Samuel Carrera Paes: ${project.title}`} mode="cover" imageClassName="transition-transform duration-[1.5s] group-hover:scale-[1.04]" />
                    </figure>
                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{project.territory}</p>
                    <h4 className="mt-2 font-serif text-2xl leading-tight text-stone-950 group-hover:text-stone-600">{project.title}</h4>
                  </button>
                ))}
              </div>
            </article>

            <article className="flex flex-col border border-stone-900/10 bg-white/35 p-8 rounded-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">VERDE BURGO</p>
              <h3 className="mt-3 font-serif text-4xl text-stone-950">Eventos completos, do planejamento à execução.</h3>
              <figure className="mt-8 aspect-[4/3] overflow-hidden bg-stone-200/50 rounded-sm">
                <ImageWithFallback src={verdeburgoAssets.mesaRefinada} alt="Projeto Provence Raiz dentro da Verde Burgo, com direção criativa de Samuel Paes" mode="cover" imageClassName="transition-transform duration-[1.5s] hover:scale-[1.03]" />
              </figure>
              <p className="mt-8 text-sm font-light leading-relaxed text-stone-600">
                Provence Raiz é um projeto dentro da Verde Burgo: uma referência de como buffet, decoração, bar, cerimonial, ambientação, papelaria e produção podem operar em uma mesma identidade.
              </p>
              <button type="button" onClick={() => navigate("verdeburgo")} className="mt-auto pt-10 inline-flex w-fit items-center gap-3 border-b border-stone-900/30 pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900">
                Ver Verde Burgo <ArrowRightCircle className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          </div>
        </section>
      </section>
    </PageTransition>
  );
}

function Banal({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO
        title="BANAL"
        description="BANAL é a empresa de branding, marketing, comunicação, varejo, posicionamento, narrativa e estratégia criativa da Paes Consultoria."
        url="banal"
        image={banalAssets.symbol}
        schemaType="Organization"
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="banal-title">
        <section className="grid gap-10 border-b border-stone-900/10 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="mb-10 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">EMPRESA · MARCA · MARKETING</span>
            <h1 id="banal-title" className="font-serif text-6xl leading-[0.8] tracking-tighter text-stone-950 md:text-[9rem] text-balance">
              BANAL.
            </h1>
            <p className="mt-10 max-w-xl font-serif text-3xl leading-tight text-stone-700 md:text-5xl text-balance">
              Marcas mais claras, desejáveis e valiosas.
            </p>
          </div>
          <figure className="aspect-[4/3] overflow-hidden bg-stone-950 rounded-sm">
            <video
              src={banalAssets.flyLoop}
              aria-label="Vídeo em loop da mosca da BANAL"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={playMutedLoop}
              onCanPlay={playMutedLoop}
              className="h-full w-full object-cover"
            />
          </figure>
        </section>

        <section className="border-b border-stone-900/10 py-24 md:py-32" aria-labelledby="banal-projetos">
          <header className="mb-16 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">PROJETOS BANAL</span>
            <h2 id="banal-projetos" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Projetos de marketing, comunicação, varejo, marca e percepção.
            </h2>
          </header>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {casesData.map((project) => (
              <article key={project.id} className="group">
                <button type="button" onClick={() => navigate(`case/${project.id}`)} className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm">
                  <figure className="aspect-[4/5] overflow-hidden bg-stone-200/50 rounded-sm">
                    <ImageWithFallback src={project.thumb} alt={`Projeto BANAL por Samuel Carrera Paes: ${project.title}`} mode="cover" imageClassName="transition-transform duration-[1.5s] group-hover:scale-[1.04]" />
                  </figure>
                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{project.territory}</p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight text-stone-950 group-hover:text-stone-600 text-balance">{project.title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-stone-600">{project.shortTese}</p>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-stone-900/10 py-24 md:py-32" aria-labelledby="banal-servicos">
          <header className="mb-14 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">SERVIÇOS</span>
            <h2 id="banal-servicos" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Uma estrutura para tornar negócios mais legíveis, desejáveis e consistentes.
            </h2>
          </header>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {authorityServices.filter((service) => service.group === "marca").map((service) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => navigate(`servicos/${service.slug}`)}
                className="group border border-stone-900/10 bg-white/35 px-5 py-5 text-left transition-colors duration-500 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-stone-900">{service.title}</p>
                <p className="mt-3 text-xs font-light leading-relaxed text-stone-500">{service.statement}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-12 border-b border-stone-900/10 py-24 md:py-32 lg:grid-cols-[0.85fr_1.15fr]" aria-labelledby="banal-institucional">
          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">EMPRESA</span>
            <h2 id="banal-institucional" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              O consumo acaba. O signo continua.
            </h2>
          </div>
          <div className="space-y-10">
            <div className="space-y-7 text-lg font-light leading-relaxed text-stone-700 md:text-xl">
              <p>
                A BANAL é a frente de branding, marketing, posicionamento, narrativa e percepção de valor da Paes Consultoria. Ela existe para negócios que precisam se tornar mais claros para o público, mais desejáveis para o mercado e mais coerentes nos seus canais.
              </p>
              <p>
                O trabalho vai além de aparência. A empresa organiza sinais, discurso, conteúdo, campanhas, varejo e presença comercial para que marca e mercado falem a mesma língua.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {banalLayers.map(([title, text]) => (
                <article key={title} className="border-t border-stone-900/10 pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-stone-900">{title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-stone-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-stone-900/10 py-24 md:py-32" aria-labelledby="banal-processo">
          <header className="mb-14 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">PROCESSO</span>
            <h2 id="banal-processo" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Do diagnóstico à ativação.
            </h2>
          </header>
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {banalProcess.map(([name, text], index) => (
              <li key={name} className="border-t border-stone-900/10 pt-8">
                <span className="font-serif text-4xl text-stone-300" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-stone-900">{name}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mb-16 bg-stone-950 px-8 py-20 text-center text-[#F4F0E9] rounded-sm md:px-16 md:py-28">
          <p className="mx-auto max-w-5xl font-serif text-3xl leading-tight md:text-5xl lg:text-6xl text-balance">
            Sua marca precisa ficar mais clara para vender, comunicar ou crescer?
          </p>
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("contato")}
              className="inline-flex items-center gap-3 border-b border-[#F4F0E9]/40 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors hover:border-[#F4F0E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E9] rounded-sm"
            >
              Conversar com a BANAL <ArrowRightCircle className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </article>
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
          <button onClick={() => navigate("banal")} className="text-xs font-bold uppercase tracking-[0.2em] border-b border-stone-900 pb-1 hover:text-stone-600 transition-colors">Voltar à BANAL</button>
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
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-6 block">PROJETO BANAL · {c.number}/11</span>
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
            <ImageWithFallback src={c.thumb} mode="natural" alt={`Fotografia de destaque do projeto ${c.title}, direção criativa de Samuel Carrera Paes para Paes Consultoria`} imageClassName="max-h-[85vh]" />
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
                           <ImageWithFallback src={img} alt={`Exposição temática de ${subTitle} por Samuel Carrera Paes - detalhe fotográfico ${i+1}`} mode="natural" imageClassName="group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out" />
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
                      alt={`Detalhe curatorial do projeto ${c.title} por Samuel Carrera Paes - fotografia ${idx+1}`}
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
          aria-label="Paginação de Projetos BANAL"
          className="fixed bottom-0 left-0 w-full bg-[#F4F0E9]/95 backdrop-blur-xl border-t border-stone-900/10 p-4 z-40 md:static md:bg-transparent md:border-t md:border-stone-900/10 md:p-0 md:mt-24 md:pt-12 flex flex-row justify-between items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] md:shadow-none"
        >
          <button
            type="button"
            onClick={() => navigate("banal")}
            className="flex flex-1 md:flex-none items-center justify-center md:justify-start gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 py-4 md:py-0 border border-stone-900/20 md:border-transparent rounded-sm"
          >
            <ArrowLeftCircle className="w-5 h-5 hidden sm:block" aria-hidden="true" /> BANAL <span className="hidden sm:inline">Projetos</span>
          </button>

          {!isLast ? (
            <button
              type="button"
              onClick={() => navigate(`case/${nextCaseId}`)}
              className="flex flex-1 md:flex-none items-center justify-center md:justify-end gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-white md:text-stone-900 bg-stone-900 md:bg-transparent hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 py-4 md:py-0 rounded-sm shadow-sm md:shadow-none"
            >
              Próximo <span className="hidden sm:inline">Projeto</span> <ArrowRightCircle className="w-5 h-5 hidden md:block" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("biblioteca")}
              className="flex flex-1 md:flex-none items-center justify-center md:justify-end gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-white md:text-stone-900 bg-stone-900 md:bg-transparent hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 py-4 md:py-0 rounded-sm shadow-sm md:shadow-none"
            >
              Ver Biblioteca <ArrowRightCircle className="w-5 h-5 hidden md:block" aria-hidden="true" />
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

function Verdeburgo({ navigate }) {
  const scrollToProvence = () => {
    document.getElementById("provence-raiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageTransition>
      <DynamicSEO
        title="Verde Burgo"
        description="Verde Burgo é uma empresa de eventos com buffet, decoração, bar, cerimonial, planejamento, produção e execução, com direção criativa aplicada por Samuel Paes."
        url="verdeburgo"
        image={verdeBurgoBrandAssets.caseCover}
        schemaType="Organization"
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="verdeburgo-title">
        <section className="relative min-h-[78vh] w-full max-w-full overflow-hidden bg-stone-950 text-[#F4F0E9] rounded-sm" aria-label="Abertura Verde Burgo">
          <img
            src={verdeburgoAssets.hero}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/30 to-stone-950/75" aria-hidden="true" />
          <div className="relative z-10 flex min-h-[78vh] flex-col justify-between p-6 md:p-12 lg:p-16">
            <header className="flex items-start justify-between gap-8">
              <img
                src={verdeBurgoBrandAssets.logo}
                alt="Verde Burgo"
                className="h-20 w-20 object-contain brightness-0 invert md:h-28 md:w-28"
                loading="eager"
                decoding="async"
              />
              <span className="hidden max-w-[11rem] text-right text-[10px] font-bold uppercase tracking-[0.25em] text-[#F4F0E9]/70 sm:block">
                Buffet · Decoração · Bar · Cerimonial
              </span>
            </header>

            <div className="max-w-5xl">
              <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.35em] text-[#F4F0E9]/70">
                Empresa de Eventos
              </span>
              <h1 id="verdeburgo-title" className="max-w-full overflow-hidden font-serif text-[16vw] leading-[0.82] tracking-tight sm:text-6xl md:text-[7rem] lg:text-[9rem] 2xl:text-[10rem] text-balance">
                <span className="block sm:inline">VERDE</span>{" "}
                <span className="block sm:inline">BURGO.</span>
              </h1>
              <p className="mt-10 max-w-3xl text-lg font-light leading-relaxed text-[#F4F0E9]/85 md:text-2xl text-balance">
                Eventos com direção criativa. Buffet, decoração, bar, cerimonial, planejamento, produção e execução em uma solução completa para festas e eventos.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToProvence}
              className="group mt-14 inline-flex w-fit items-center gap-4 border-b border-[#F4F0E9]/40 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F4F0E9] transition-colors hover:border-[#F4F0E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E9] rounded-sm"
            >
              Ver Provence Raiz
              <ArrowRightCircle className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="border-b border-stone-900/10 py-24 md:py-32" aria-labelledby="verdeburgo-projetos">
          <header className="mb-16 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">PROJETOS VERDE BURGO</span>
            <h2 id="verdeburgo-projetos" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Eventos, festas e projetos de hospitalidade organizados por identidade e execução.
            </h2>
          </header>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Provence Raiz", status: "Projeto publicado", media: verdeburgoAssets.hero, type: "image", action: scrollToProvence },
              { title: "Casamentos", status: "Em desenvolvimento", media: `${verdeBurgoBrandAssets.developmentLoop}?slot=casamentos`, type: "video" },
              { title: "Aniversários", status: "Em desenvolvimento", media: `${verdeBurgoBrandAssets.developmentLoop}?slot=aniversarios`, type: "video" },
              { title: "Eventos corporativos", status: "Em desenvolvimento", media: `${verdeBurgoBrandAssets.developmentLoop}?slot=corporativos`, type: "video" }
            ].map((project) => (
              <article key={project.title} className="group border-t border-stone-900/10 pt-8">
                <button
                  type="button"
                  onClick={project.action || undefined}
                  disabled={!project.action}
                  className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm disabled:cursor-default"
                >
                  <figure className="aspect-[4/5] overflow-hidden bg-stone-200/40 rounded-sm shadow-sm">
                    {project.type === "video" ? (
                      <video
                        src={project.media}
                        aria-label={`${project.title} em desenvolvimento`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onLoadedData={playMutedLoop}
                        onCanPlay={playMutedLoop}
                        className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                      />
                    ) : (
                      <ImageWithFallback
                        src={project.media}
                        alt={`Projeto Verde Burgo: ${project.title}`}
                        mode="cover"
                        imageClassName="transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                      />
                    )}
                  </figure>
                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{project.status}</p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight text-stone-950 text-balance">{project.title}</h3>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-stone-900/10 py-24 md:py-32" aria-labelledby="verdeburgo-servicos">
          <header className="mb-14 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Solução Completa</span>
            <h2 id="verdeburgo-servicos" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Da primeira conversa ao último detalhe de execução.
            </h2>
            <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-stone-700 md:text-xl">
              Uma festa bem feita não depende do cliente coordenar dezenas de partes soltas. A Verde Burgo organiza serviço, estética, produção e bastidor para entregar uma experiência coerente e tranquila.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {authorityServices.filter((service) => service.group === "eventos").map((service) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => navigate(`servicos/${service.slug}`)}
                className="group border border-stone-900/10 bg-white/35 px-5 py-5 text-left transition-colors duration-500 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-stone-900">{service.title}</p>
                <p className="mt-3 text-xs font-light leading-relaxed text-stone-500">{service.statement}</p>
              </button>
            ))}
          </div>
          <div className="mt-16 grid gap-4 border-t border-stone-900/10 pt-12 md:grid-cols-2 lg:grid-cols-3">
            {verdeBurgoEventFormats.map((format) => (
              <div key={format} className="border border-stone-900/10 bg-white/35 px-5 py-5 rounded-sm">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-stone-900">{format}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-12 border-b border-stone-900/10 py-24 md:py-32 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="verdeburgo-manifesto">
          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">EMPRESA</span>
            <h2 id="verdeburgo-manifesto" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl lg:text-7xl text-balance">
              Uma empresa para resolver eventos por completo.
            </h2>
          </div>
          <div className="space-y-7 text-lg font-light leading-relaxed text-stone-700 md:text-xl">
            <p>
              A Verde Burgo existe para resolver a vida de quem quer fazer uma festa. A empresa integra planejamento, buffet, decoração, bar, cerimonial, fornecedores, bastidores, montagem e execução em uma única condução.
            </p>
            <p>
              O diferencial está na direção criativa aplicada aos eventos. Samuel Paes desenvolve a identidade da experiência para que comida, bar, cerimônia, decoração, ambientação, papelaria e atendimento funcionem com a mesma linguagem.
            </p>
            <p>
              Provence Raiz não é a definição da Verde Burgo. É um projeto dentro dela: uma aplicação da operação completa em um território estético, narrativo e comercial específico.
            </p>
          </div>
        </section>

        <section className="border-b border-stone-900/10 py-24 md:py-32" aria-labelledby="verdeburgo-metodo">
          <header className="mb-14 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">MÉTODO</span>
            <h2 id="verdeburgo-metodo" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Identidade, operação e presença no mesmo fluxo.
            </h2>
          </header>
          <ol className="grid gap-8 md:grid-cols-5">
            {verdeBurgoMethod.map(([name, text], index) => (
              <li key={name} className="border-t border-stone-900/10 pt-6">
                <span className="font-serif text-4xl text-stone-300" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-stone-900">{name}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="provence-raiz" className="scroll-mt-32 border-b border-stone-900/10 py-24 md:py-32" aria-labelledby="provence-title">
          <header className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
            <aside>
              <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Projeto / Referência</span>
              <dl className="grid grid-cols-2 gap-6 border-t border-stone-900/10 pt-8 lg:grid-cols-1">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Projeto</dt>
                  <dd className="mt-2 font-serif text-2xl text-stone-950">Provence Raiz</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Para</dt>
                  <dd className="mt-2 font-serif text-2xl text-stone-950">Marcelle & Marcus Vinicius</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Território</dt>
                  <dd className="mt-2 text-sm font-light leading-relaxed text-stone-700">Casamento · Evento · Direção Criativa</dd>
                </div>
              </dl>
            </aside>
            <div>
              <h2 id="provence-title" className="font-serif text-5xl leading-[0.9] text-stone-950 md:text-7xl lg:text-8xl text-balance">
                Provence Raiz.
              </h2>
              <p className="mt-10 max-w-4xl text-xl font-light leading-relaxed text-stone-600 md:text-3xl text-balance">
                Um projeto dentro da Verde Burgo: evento completo conduzido por planejamento, identidade visual, ambientação, buffet, bar, cerimonial, objetos autorais, atmosfera e operação.
              </p>
            </div>
          </header>

          <figure className="mt-20 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-200/40 rounded-sm shadow-sm">
              <ImageWithFallback
                src={verdeburgoAssets.mesaRefinada}
                alt="Render refinado da mesa do bolo Provence Raiz com Toile de Jouy, luminárias e florais."
                mode="cover"
                loading="eager"
                imageClassName="transition-transform duration-[1.5s] ease-out hover:scale-[1.02]"
              />
            </div>
            <figcaption className="flex flex-col justify-end border-l border-stone-900/10 pl-8 text-sm font-light leading-relaxed text-stone-600">
              <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Tese visual</span>
              O espaço atua como pano de fundo vivo: concreto, luz, sombra, percurso, Toile de Jouy, floral e objetos autorais sustentam a atmosfera sem competir com a experiência.
            </figcaption>
          </figure>
        </section>

        <section className="py-24 md:py-32" aria-labelledby="verdeburgo-capitulos">
          <header className="mb-16 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Capítulos do Projeto</span>
            <h2 id="verdeburgo-capitulos" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Uma leitura vertical de conceito, matéria, espaço e memória.
            </h2>
          </header>

          <div className="space-y-24">
            {verdeburgoChapters.map((chapter, index) => (
              <section
                key={chapter.number}
                className={`grid gap-10 border-t border-stone-900/10 pt-12 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>figure]:order-2" : ""}`}
                aria-labelledby={`verdeburgo-chapter-${chapter.number}`}
              >
                <figure className={`relative overflow-hidden bg-stone-200/40 rounded-sm shadow-sm ${chapter.frameClassName || "aspect-[4/3]"}`}>
                  <ImageWithFallback
                    src={chapter.image}
                    alt={chapter.alt}
                    mode={chapter.mode || "cover"}
                    imageClassName="transition-transform duration-[1.5s] ease-out hover:scale-[1.02]"
                  />
                </figure>
                <div className="max-w-xl">
                  <span className="mb-8 block font-serif text-5xl text-stone-300" aria-hidden="true">{chapter.number}</span>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">{chapter.label}</p>
                  <h3 id={`verdeburgo-chapter-${chapter.number}`} className="font-serif text-3xl leading-tight text-stone-950 md:text-5xl text-balance">
                    {chapter.title}
                  </h3>
                  <p className="mt-8 text-base font-light leading-relaxed text-stone-600 md:text-lg">
                    {chapter.text}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="border-y border-stone-900/10 py-24 md:py-32" aria-labelledby="objetos-autorais">
          <header className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Objetos Autorais</span>
              <h2 id="objetos-autorais" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
                Peças entre cenografia, arquitetura efêmera e design de produto.
              </h2>
            </div>
            <p className="text-lg font-light leading-relaxed text-stone-700 md:text-xl">
              Alguns elementos foram desenvolvidos como dispositivos espaciais para organizar escala, luz, ritmo e memória. As pranchas técnicas não entram como anexo frio: elas revelam a engenharia invisível da experiência.
            </p>
          </header>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {verdeburgoObjects.map((item) => (
              <article key={item.title} className="flex flex-col border-t border-stone-900/10 pt-8">
                <figure className="relative aspect-[4/3] overflow-hidden bg-white/40 rounded-sm shadow-sm">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.alt}
                    mode="contain"
                    imageClassName="transition-transform duration-[1.5s] ease-out hover:scale-[1.02]"
                  />
                </figure>
                <h3 className="mt-8 font-serif text-3xl leading-tight text-stone-950">{item.title}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-24 md:py-32 lg:grid-cols-3" aria-label="Engenharia e desenvolvimento">
          {[
            ["Montável", "Cada peça precisa existir fisicamente, ser transportável, segura e coerente com o tempo real de montagem."],
            ["Técnico", "A camada executiva traduz intenção em medidas, materiais, tolerâncias, fixações e leitura de produção."],
            ["Editorial", "O rigor técnico aparece como valor autoral: a beleza final nasce da precisão invisível entre desenho, matéria e execução."]
          ].map(([title, text]) => (
            <section key={title} className="border-t border-stone-900/10 pt-8">
              <CheckCircle2 className="mb-8 h-5 w-5 text-stone-900" aria-hidden="true" />
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900">{title}</h3>
              <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{text}</p>
            </section>
          ))}
        </section>

        <footer className="mb-16 bg-stone-950 px-8 py-20 text-center text-[#F4F0E9] rounded-sm md:px-16 md:py-28">
          <p className="mx-auto max-w-5xl font-serif text-3xl leading-tight md:text-5xl lg:text-6xl text-balance">
            Cada detalhe foi desenhado para revelar, não decorar.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-sm font-light leading-relaxed text-[#F4F0E9]/70 md:text-base">
            É a Provence Raiz. Onde arquitetura, paisagem, matéria e memória tornam-se uma única experiência.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 md:flex-row">
            <button
              type="button"
              onClick={() => navigate("contato")}
              className="inline-flex items-center gap-3 border-b border-[#F4F0E9]/40 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors hover:border-[#F4F0E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E9] rounded-sm"
            >
              Conversar sobre uma experiência <ArrowRightCircle className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </article>
    </PageTransition>
  );
}

function Biblioteca({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO
        title="Biblioteca"
        description="Biblioteca Samuel Paes: artigos, ensaios, pesquisas e reflexões sobre branding, varejo, eventos, hospitalidade, posicionamento, percepção e direção criativa."
        url="biblioteca"
      />
      <section className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col pt-12" aria-labelledby="sistema-title">
        <header>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">BIBLIOTECA</span>
          <h1 id="sistema-title" className="font-serif text-5xl md:text-[7rem] leading-[0.85] tracking-tighter text-stone-950 max-w-4xl mb-8 text-balance">
            Biblioteca.
          </h1>
          <p className="text-xl md:text-3xl font-light text-stone-600 max-w-3xl mb-24 leading-relaxed text-balance">
            Artigos, ensaios e pesquisas para construir autoridade em branding, varejo, hospitalidade, eventos, narrativa, posicionamento, percepção, direção criativa e construção de negócios.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 border-t border-stone-900/10 pt-16">
          {sistemaArticleCards.map((card) => (
            <article key={card.num} className="group flex min-h-[24rem] flex-col border border-stone-900/10 bg-white/40 transition-all duration-700 hover:bg-white/80 hover:border-stone-900/25 rounded-sm">
              <button
                type="button"
                onClick={() => navigate(`biblioteca/${card.slug}`)}
                aria-label={`Ler artigo ${card.editorialTitle}`}
                className="flex h-full flex-col p-8 md:p-10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
              >
                <span className="font-serif text-4xl transition-colors duration-500 mb-8 text-stone-300 group-hover:text-stone-900" aria-hidden="true">{card.num}.</span>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-3">{card.title}</h3>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-6 block">{card.phrase}</span>
                <p className="font-serif text-2xl leading-tight text-stone-950 mb-6 text-balance">{card.editorialTitle}</p>
                <p className="text-sm font-light text-stone-600 leading-relaxed mb-8">{card.subtitle}</p>
                <span className="mt-auto inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900">
                  Ler artigo <ArrowRightCircle className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

function getArticleReadingMinutes(article) {
  const articleText = [
    article.subtitle,
    article.short,
    article.quote,
    ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs])
  ].join(" ");
  const wordCount = articleText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function getArticleSectionId(articleSlug, section, index) {
  const normalizedHeading = section.heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${articleSlug}-${index + 1}-${normalizedHeading}`;
}

function getArticleSectionLabel(heading) {
  return heading.split(" — ")[0];
}

function SistemaArticle({ slug, navigate }) {
  const [articleState, setArticleState] = useState({
    status: "loading",
    article: null,
    previous: null,
    next: null
  });

  useEffect(() => {
    let isCurrent = true;

    import("./sistemaArticles").then(({ getAdjacentSistemaArticles, getSistemaArticleBySlug }) => {
      if (!isCurrent) return;
      const article = getSistemaArticleBySlug(slug);
      const adjacent = getAdjacentSistemaArticles(slug);
      setArticleState({
        status: article ? "ready" : "missing",
        article,
        previous: adjacent.previous,
        next: adjacent.next
      });
    }).catch(() => {
      if (!isCurrent) return;
      setArticleState({ status: "missing", article: null, previous: null, next: null });
    });

    return () => {
      isCurrent = false;
    };
  }, [slug]);

  const { article, previous, next, status } = articleState;

  if (status === "loading") {
    return (
      <PageTransition>
        <DynamicSEO title="Biblioteca" description="Carregando artigo da Biblioteca Samuel Paes." url={`biblioteca/${slug}`} />
        <section className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12 min-h-[70vh] flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-8 block">BIBLIOTECA</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-none text-stone-950">Carregando artigo.</h1>
        </section>
      </PageTransition>
    );
  }

  if (!article) {
    return (
      <PageTransition>
        <DynamicSEO title="Artigo não encontrado" description="Artigo da Biblioteca Samuel Paes não encontrado." url={`biblioteca/${slug}`} />
        <section className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12 min-h-[70vh] flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-8 block">BIBLIOTECA</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-none text-stone-950 mb-8">Artigo não encontrado.</h1>
          <button
            type="button"
            onClick={() => navigate("biblioteca")}
            className="inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 border-b border-stone-900/30 pb-2 hover:border-stone-900 transition-colors"
          >
            <ArrowLeftCircle className="h-4 w-4" aria-hidden="true" /> Voltar à Biblioteca
          </button>
        </section>
      </PageTransition>
    );
  }

  const readingMinutes = getArticleReadingMinutes(article);
  const sectionLinks = article.sections.map((section, index) => ({
    id: getArticleSectionId(article.slug, section, index),
    label: getArticleSectionLabel(section.heading),
    heading: section.heading
  }));

  return (
    <PageTransition>
      <DynamicSEO
        title={article.editorialTitle}
        description={article.short}
        url={`biblioteca/${article.slug}`}
        schemaType="Article"
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="sistema-article-title">
        <button
          type="button"
          onClick={() => navigate("biblioteca")}
          className="mb-14 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 border-b border-stone-900/10 pb-2 hover:text-stone-900 hover:border-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
        >
          <ArrowLeftCircle className="h-4 w-4" aria-hidden="true" /> Biblioteca
        </button>

        <header className="grid gap-14 border-b border-stone-900/10 pb-16 lg:grid-cols-[0.7fr_1.3fr]">
          <aside>
            <span className="font-serif text-7xl text-stone-300 block mb-8" aria-hidden="true">{article.num}.</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-5">ARTIGO DA BIBLIOTECA</p>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-2">{article.title}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">{article.phrase}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-stone-900/10 pt-8 lg:grid-cols-1">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Leitura</dt>
                <dd className="mt-2 font-serif text-2xl text-stone-950">{readingMinutes} min</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Seções</dt>
                <dd className="mt-2 font-serif text-2xl text-stone-950">{article.sections.length}</dd>
              </div>
            </dl>
          </aside>

          <div>
            <h1 id="sistema-article-title" className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-stone-950 mb-8 text-balance">
              {article.editorialTitle}
            </h1>
            <p className="text-xl md:text-3xl font-light leading-relaxed text-stone-600 max-w-4xl text-balance">
              {article.subtitle}
            </p>
          </div>
        </header>

        <section className="grid gap-14 border-b border-stone-900/10 py-14 lg:grid-cols-[0.7fr_1.3fr]" aria-label="Tese do artigo">
          <blockquote className="font-serif text-3xl md:text-5xl leading-tight text-stone-950 text-balance">
            "{article.quote}"
          </blockquote>
          <div>
            <p className="text-base md:text-lg font-light leading-relaxed text-stone-600 max-w-3xl">
              {article.short}
            </p>
            <ul className="mt-10 flex flex-wrap gap-3" aria-label="Palavras-chave do artigo">
              {article.keywords.map((keyword) => (
                <li key={keyword} className="border border-stone-900/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 rounded-sm">
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <nav className="border-b border-stone-900/10 py-8 lg:hidden" aria-label="Sumário do artigo">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Sumário</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {sectionLinks.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 border border-stone-900/10 bg-white/30 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="grid gap-12 py-20 md:py-28 lg:grid-cols-[0.42fr_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-36 border-l border-stone-900/10 pl-8">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Sumário</p>
              <nav className="flex flex-col gap-4" aria-label="Sumário do artigo">
                {sectionLinks.map((section) => (
                  <a
                    key={section.id}
                    className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                    href={`#${section.id}`}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400 group-hover:text-stone-900 transition-colors">
                      {section.label}
                    </span>
                    <span className="mt-1 block text-sm font-light leading-relaxed text-stone-500 group-hover:text-stone-700 transition-colors">
                      {section.heading}
                    </span>
                  </a>
                ))}
              </nav>
              <div className="mt-10 border-t border-stone-900/10 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Tempo estimado</p>
                <p className="mt-2 font-serif text-2xl text-stone-950">{readingMinutes} min de leitura</p>
              </div>
            </div>
          </aside>

          <div className="max-w-4xl">
            {article.sections.map((section, index) => (
              <section id={getArticleSectionId(article.slug, section, index)} key={section.heading} className="mb-20 scroll-mt-36 last:mb-0">
                <h2 className="font-serif text-3xl md:text-5xl leading-tight text-stone-950 mb-8 text-balance">
                  {section.heading}
                </h2>
                <div className="space-y-7">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-lg md:text-xl font-light leading-[1.85] text-stone-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <nav className="grid gap-6 border-t border-stone-900/10 py-12 md:grid-cols-3" aria-label="Navegação entre artigos da Biblioteca">
          <button
            type="button"
            onClick={() => navigate(`biblioteca/${previous.slug}`)}
            className="group flex min-h-32 flex-col justify-between border border-stone-900/10 bg-white/30 p-6 text-left rounded-sm hover:bg-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">
              <ArrowLeftCircle className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> Anterior
            </span>
            <span className="font-serif text-2xl leading-tight text-stone-950">{previous.editorialTitle}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("biblioteca")}
            className="flex min-h-32 flex-col items-center justify-center border border-stone-900/10 bg-stone-900 text-[#F4F0E9] p-6 text-center rounded-sm hover:bg-stone-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Todos os artigos</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(`biblioteca/${next.slug}`)}
            className="group flex min-h-32 flex-col justify-between border border-stone-900/10 bg-white/30 p-6 text-left rounded-sm hover:bg-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          >
            <span className="inline-flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">
              Próximo <ArrowRightCircle className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="font-serif text-2xl leading-tight text-stone-950">{next.editorialTitle}</span>
          </button>
        </nav>
      </article>
    </PageTransition>
  );
}

function EcosystemAtlas({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO
        title="Mapa do Ecossistema"
        description="Mapa editorial dos serviços, empresas, cases e artigos associados a Samuel Carrera Paes, Paes Consultoria, BANAL e Verde Burgo Eventos."
        url={`atlas/${authorityAtlas.slug}`}
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col pt-12">
        <header className="grid gap-12 border-b border-stone-900/10 pb-20 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <span className="mb-10 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">ATLAS EDITORIAL</span>
            <h1 className="font-serif text-5xl leading-[0.85] tracking-tighter text-stone-950 md:text-[7rem] text-balance">
              {authorityAtlas.title}.
            </h1>
          </div>
          <div className="self-end max-w-3xl">
            <p className="text-xl font-light leading-relaxed text-stone-700 md:text-3xl text-balance">
              {authorityAtlas.subtitle}
            </p>
            <p className="mt-8 text-base font-light leading-relaxed text-stone-600 md:text-lg">
              {authorityAtlas.description}
            </p>
          </div>
        </header>

        <section className="border-b border-stone-900/10 py-16" aria-label="Entidades do ecossistema">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Samuel Carrera Paes", "Direção criativa, consultoria criativa, repertório, inteligência artificial aplicada, estratégia e execução."],
              ["BANAL", "Branding, marketing, posicionamento, narrativa, conteúdo, campanhas, varejo e percepção de valor."],
              ["Verde Burgo Eventos", "Eventos completos com buffet, decoração, bar, cerimonial, planejamento, produção e direção criativa."]
            ].map(([title, text]) => (
              <section key={title} className="border-t border-stone-900/10 pt-8">
                <h2 className="font-serif text-3xl leading-tight text-stone-950">{title}</h2>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{text}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-28" aria-labelledby="atlas-servicos-title">
          <header className="mb-14 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">SERVIÇOS E TERRITÓRIOS</span>
            <h2 id="atlas-servicos-title" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Uma malha leve para conectar nome, empresa, serviço, case e pensamento.
            </h2>
          </header>

          <div className="space-y-16">
            {authorityServiceGroups.map((group) => {
              const groupServices = authorityServices.filter((service) => service.group === group.id);
              return (
                <section key={group.id} aria-labelledby={`atlas-group-${group.id}`}>
                  <div className="mb-8 grid gap-6 border-t border-stone-900/10 pt-8 lg:grid-cols-[0.42fr_1fr]">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">{group.label}</p>
                    </div>
                    <p id={`atlas-group-${group.id}`} className="max-w-3xl text-base font-light leading-relaxed text-stone-600 md:text-lg">
                      {group.description}
                    </p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {groupServices.map((service) => (
                      <button
                        key={service.slug}
                        type="button"
                        onClick={() => navigate(`servicos/${service.slug}`)}
                        className="group min-h-64 border border-stone-900/10 bg-white/25 p-6 text-left transition-colors duration-500 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">{service.company}</span>
                        <h3 className="mt-6 font-serif text-3xl leading-tight text-stone-950 group-hover:text-stone-600 text-balance">{service.title}</h3>
                        <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{service.statement}</p>
                        <span className="mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-900">
                          Ler território <ArrowRightCircle className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </article>
    </PageTransition>
  );
}

function AuthorityServicePage({ slug, navigate }) {
  const service = getAuthorityService(slug);

  if (!service) {
    return (
      <PageTransition>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-4xl text-stone-950">Serviço não encontrado.</h1>
          <button
            type="button"
            onClick={() => navigate(`atlas/${authorityAtlas.slug}`)}
            className="mt-8 border-b border-stone-900/30 pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900"
          >
            Voltar ao mapa do ecossistema
          </button>
        </div>
      </PageTransition>
    );
  }

  const relatedCases = service.relatedCases.map((id) => casesData.find((item) => item.id === id)).filter(Boolean);
  const relatedArticles = service.relatedArticles.map((articleSlug) => sistemaArticleCards.find((item) => item.slug === articleSlug)).filter(Boolean);
  const peerServices = authorityServices.filter((item) => item.group === service.group && item.slug !== service.slug).slice(0, 3);

  return (
    <PageTransition>
      <DynamicSEO
        title={service.title}
        description={`${service.title} por Samuel Carrera Paes / ${service.company}: ${service.statement}`}
        url={`servicos/${service.slug}`}
        schemaType="Service"
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col pt-12">
        <header className="grid gap-12 border-b border-stone-900/10 pb-20 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <button
              type="button"
              onClick={() => navigate(`atlas/${authorityAtlas.slug}`)}
              className="mb-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              <ArrowLeftCircle className="h-4 w-4" aria-hidden="true" /> Mapa do Ecossistema
            </button>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">{service.company}</span>
            <h1 className="font-serif text-5xl leading-[0.85] tracking-tighter text-stone-950 md:text-[7rem] text-balance">
              {service.title}.
            </h1>
          </div>
          <div className="self-end max-w-3xl">
            <p className="text-xl font-light leading-relaxed text-stone-700 md:text-3xl text-balance">
              {service.statement}
            </p>
            <p className="mt-8 text-base font-light leading-relaxed text-stone-600 md:text-lg">
              {service.description}
            </p>
            <button
              type="button"
              onClick={() => navigate(service.companyRoute)}
              className="mt-10 inline-flex items-center gap-3 border-b border-stone-900/30 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 transition-colors hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              Ver {service.company} <ArrowRightCircle className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="grid gap-12 border-b border-stone-900/10 py-16 lg:grid-cols-[0.42fr_1fr]" aria-labelledby="aplicacoes-title">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">APLICAÇÕES</span>
            <h2 id="aplicacoes-title" className="mt-8 font-serif text-4xl leading-tight text-stone-950 md:text-5xl text-balance">
              Onde esse território aparece.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 self-start">
            {service.applications.map((item) => (
              <span key={item} className="rounded-full border border-stone-900/10 bg-white/35 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-12 border-b border-stone-900/10 py-16 lg:grid-cols-2" aria-label="Conexões do serviço">
          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">CASES RELACIONADOS</span>
            {relatedCases.length > 0 ? (
              <div className="space-y-5">
                {relatedCases.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => navigate(`case/${project.id}`)}
                    className="group flex w-full items-center justify-between gap-6 border-t border-stone-900/10 pt-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                  >
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">{project.client}</span>
                      <span className="mt-2 block font-serif text-2xl leading-tight text-stone-950 group-hover:text-stone-600">{project.title}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigate("verdeburgo")}
                className="group flex w-full items-center justify-between gap-6 border-t border-stone-900/10 pt-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
              >
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">Projeto publicado</span>
                  <span className="mt-2 block font-serif text-2xl leading-tight text-stone-950 group-hover:text-stone-600">Provence Raiz dentro da Verde Burgo</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </button>
            )}
          </div>

          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">ARTIGOS RELACIONADOS</span>
            <div className="space-y-5">
              {relatedArticles.map((article) => (
                <button
                  key={article.slug}
                  type="button"
                  onClick={() => navigate(`biblioteca/${article.slug}`)}
                  className="group flex w-full items-center justify-between gap-6 border-t border-stone-900/10 pt-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                >
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">{article.title}</span>
                    <span className="mt-2 block font-serif text-2xl leading-tight text-stone-950 group-hover:text-stone-600">{article.editorialTitle}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <nav className="grid gap-5 py-16 md:grid-cols-3" aria-label="Territórios relacionados">
          {peerServices.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => navigate(`servicos/${item.slug}`)}
              className="group min-h-36 border border-stone-900/10 bg-white/25 p-6 text-left transition-colors duration-500 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">{item.company}</span>
              <span className="mt-4 block font-serif text-2xl leading-tight text-stone-950 group-hover:text-stone-600">{item.title}</span>
            </button>
          ))}
        </nav>
      </article>
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

  const contactChoices = [
    {
      name: "BANAL",
      eyebrow: "Marca · Marketing · Posicionamento",
      text: "Para projetos de branding, comunicação, conteúdo, campanhas, varejo, reposicionamento e percepção de valor.",
      href: "https://wa.me/5531981184250?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20BANAL%20sobre%20marca%2C%20marketing%20ou%20posicionamento.",
      label: "Contact BANAL",
      image: banalAssets.balancedLogo,
      imageClassName: "h-auto w-40 object-contain"
    },
    {
      name: "VERDE BURGO",
      eyebrow: "Eventos · Buffet · Decoração · Cerimonial",
      text: "Para festas, casamentos, aniversários, eventos corporativos e projetos com buffet, decoração, bar, cerimonial e produção.",
      href: "https://wa.me/5531981184250?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20VERDE%20BURGO%20sobre%20um%20evento%20ou%20festa.",
      label: "Contact VERDE BURGO",
      image: verdeBurgoBrandAssets.balancedLogo,
      imageClassName: "h-16 w-16 object-contain"
    }
  ];

  return (
    <PageTransition>
      <DynamicSEO
        title="Contato"
        description="Contato profissional da Paes Consultoria para direção criativa, branding, marketing, varejo, eventos, experiências e execução."
        url="contato"
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col justify-between min-h-[85vh] pt-12 relative">
        <header>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">CONTATO</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-950 leading-[1.1] tracking-[-0.02em] max-w-6xl text-balance">
            Escolha a frente certa para o seu projeto.
          </h1>
          <p className="mt-10 max-w-3xl text-lg font-light leading-relaxed text-stone-600 md:text-2xl text-balance">
            A Paes Consultoria organiza a visão. BANAL e Verde Burgo conduzem as entregas comerciais de acordo com a natureza do desafio.
          </p>
        </header>

        <footer className="mt-auto pt-24">
          <section className="grid gap-8 border-y border-stone-900/10 py-12 md:grid-cols-2" aria-label="Escolhas de contato">
            {contactChoices.map((choice) => (
              <article key={choice.name} className="group flex min-h-[28rem] flex-col justify-between border border-stone-900/10 bg-white/30 p-8 transition-colors duration-500 hover:bg-white/70 rounded-sm md:p-10">
                <div>
                  <div className="mb-10 flex items-start justify-between gap-8">
                    <img src={choice.image} alt={choice.name} className={`${choice.imageClassName} grayscale contrast-125`} loading="lazy" decoding="async" />
                    <span className="text-right text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{choice.eyebrow}</span>
                  </div>
                  <h2 className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">{choice.name}</h2>
                  <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-stone-600 md:text-lg">{choice.text}</p>
                </div>
                <a
                  href={choice.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${choice.label} via WhatsApp`}
                  className="mt-12 inline-flex w-fit items-center gap-3 border-b border-stone-900/25 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 transition-colors hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                >
                  {choice.label} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </a>
              </article>
            ))}
          </section>

          <address className="not-italic grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 pt-16">
            <div className="col-span-2 md:col-span-1 flex flex-col items-start">
              <p className="font-serif text-4xl leading-none text-stone-950">SP</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Paes Consultoria</p>
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
              <a
                href="https://instagram.com/verdeburgoeventos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light text-stone-900 hover:text-stone-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm p-1 -ml-1 w-fit block"
              >
                @verdeburgoeventos
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
    { id: "visao", num: "01.", label: "Minha Visão" },
    { id: "biblioteca", num: "02.", label: "Biblioteca" },
    { id: "contato", num: "03.", label: "Contato" },
  ];

  const companyLinks = [
    {
      id: "banal",
      label: "BANAL",
      image: banalAssets.balancedLogo,
      buttonClassName: "w-[5.75rem]",
      mobileButtonClassName: "w-[4.25rem]",
      imageClassName: "h-8 w-full md:h-9"
    },
    {
      id: "verdeburgo",
      label: "Verde Burgo",
      image: verdeBurgoBrandAssets.balancedLogo,
      buttonClassName: "w-[5.75rem]",
      mobileButtonClassName: "w-[4.25rem]",
      imageClassName: "h-8 w-full md:h-9"
    },
  ];

  const handleNavClick = (id) => {
    navigate(id);
    setIsMenuOpen(false);
  };

  const isCaseDetail = route.startsWith("case/");
  const isBibliotecaDetail = route.startsWith("biblioteca/") || route.startsWith("sistema/");
  const isAtlasRoute = route === `atlas/${authorityAtlas.slug}` || route.startsWith("servicos/");
  const isConsultoriaArea = route === "inicio" || route === "ecossistema" || route === "paes-consultoria" || isAtlasRoute;
  const isBanalArea = route === "banal" || route === "cases" || isCaseDetail;
  const isVerdeBurgoArea = route === "verdeburgo";

  return (
    <div className="min-h-screen bg-[#F4F0E9] text-stone-950 font-sans selection:bg-stone-900 selection:text-[#F4F0E9]">

      {/* NAVBAR GLOBAL FIXA - EDITORIAL */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#F4F0E9]/90 backdrop-blur-xl border-b border-stone-900/10 transition-all duration-500">
        <nav aria-label="Navegação Principal" className="mx-auto flex h-24 max-w-[90rem] items-center justify-between px-6 lg:px-12 gap-4">

          <div className="flex w-1/2 justify-start lg:w-1/4">
            <button
              type="button"
              onClick={() => handleNavClick("inicio")}
              className={`group flex items-center gap-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm ${isConsultoriaArea ? "text-stone-950" : "text-stone-700 hover:text-stone-950"}`}
              aria-label="Ir para a página inicial"
            >
              <img
                src="/images/00_LOGOS/symbol-black-navbar.png"
                alt=""
                aria-hidden="true"
                className="h-9 w-9 object-contain md:h-11 md:w-11"
                loading="eager"
                decoding="async"
              />
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 sm:block">Paes Consultoria</span>
            </button>
          </div>

          <div className="hidden flex-1 justify-center gap-4 lg:flex xl:gap-6" role="menubar">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                role="menuitem"
                aria-label={`Página ${link.label}`}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm px-2 pb-1 border-b-2 ${
                  (route === link.id || (link.id === "biblioteca" && isBibliotecaDetail))
                    ? "text-stone-900 border-stone-900"
                    : "text-stone-400 border-transparent hover:text-stone-900 hover:border-stone-900/20"
                }`}
              >
                <span className="opacity-50" aria-hidden="true">{link.num}</span> {link.label}
              </button>
            ))}
          </div>

          <div className="hidden w-1/4 items-center justify-end gap-4 lg:flex">
            {companyLinks.map((company) => {
              const active = company.id === "banal" ? isBanalArea : isVerdeBurgoArea;
              return (
                <button
                  key={company.id}
                  type="button"
                  onClick={() => handleNavClick(company.id)}
                  aria-label={`Abrir ${company.label}`}
                  className={`flex h-12 ${company.buttonClassName} items-center justify-center border px-2 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm ${active ? "border-stone-900 bg-white/70" : "border-stone-900/10 bg-white/20 hover:border-stone-900/30 hover:bg-white/60"}`}
                >
                  <img src={company.image} alt={company.label} className={`${company.imageClassName} object-contain grayscale contrast-125`} loading="lazy" decoding="async" />
                </button>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            {companyLinks.map((company) => {
              const active = company.id === "banal" ? isBanalArea : isVerdeBurgoArea;
              return (
                <button
                  key={company.id}
                  type="button"
                  onClick={() => handleNavClick(company.id)}
                  aria-label={`Abrir ${company.label}`}
                  className={`flex h-10 ${company.mobileButtonClassName} items-center justify-center border px-1.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm ${active ? "border-stone-900 bg-white/70" : "border-stone-900/10 bg-white/20"}`}
                >
                  <img src={company.image} alt={company.label} className={`${company.imageClassName} max-h-6 object-contain grayscale contrast-125`} loading="lazy" decoding="async" />
                </button>
              );
            })}
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
              className="lg:hidden absolute top-20 left-0 w-full bg-[#F4F0E9] flex max-h-[calc(100vh-5rem)] flex-col overflow-y-auto px-8 py-16 shadow-xl"
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
                      (route === link.id || (link.id === "biblioteca" && isBibliotecaDetail)) ? "text-stone-900 bg-stone-900/5" : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    <span className="font-serif text-3xl italic opacity-50" aria-hidden="true">{link.num}</span>
                    <span className="font-serif text-4xl tracking-tight sm:text-5xl">{link.label}</span>
                  </motion.button>
                ))}
              </div>
              <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.4, ease: PREMIUM_EASE }}
                 className="mt-16 pt-8 border-t border-stone-900/10 flex justify-between items-center px-2"
              >
                <button type="button" onClick={() => handleNavClick("inicio")} className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-500 focus-visible:outline-none focus-visible:underline hover:text-stone-900 transition-colors">Paes Consultoria</button>
                <button type="button" onClick={() => handleNavClick("contato")} className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-900 flex items-center gap-2 focus-visible:outline-none focus-visible:underline hover:text-stone-600 transition-colors">
                  Contato <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
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
          {(route === "ecossistema" || route === "paes-consultoria") && <PaesConsultoria key="paes-consultoria" navigate={navigate} />}
          {route === "cases" && <Banal key="cases-compat" navigate={navigate} />}
          {route === "banal" && <Banal key="banal" navigate={navigate} />}
          {route.startsWith("case/") && <CaseDetail key="case-detail" caseId={route.replace("case/", "")} navigate={navigate} />}
          {route === "verdeburgo" && <Verdeburgo key="verdeburgo" navigate={navigate} />}
          {(route === "biblioteca" || route === "sistema") && <Biblioteca key="biblioteca" navigate={navigate} />}
          {route.startsWith("biblioteca/") && <SistemaArticle key={route} slug={route.replace("biblioteca/", "")} navigate={navigate} />}
          {route.startsWith("sistema/") && <SistemaArticle key={route} slug={route.replace("sistema/", "")} navigate={navigate} />}
          {route === `atlas/${authorityAtlas.slug}` && <EcosystemAtlas key="ecosystem-atlas" navigate={navigate} />}
          {route.startsWith("servicos/") && <AuthorityServicePage key={route} slug={route.replace("servicos/", "")} navigate={navigate} />}
          {route === "contato" && <Contato key="contato" />}
        </AnimatePresence>
      </main>

    </div>
  );
}
