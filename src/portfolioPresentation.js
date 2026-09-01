export const portfolioCategoryDefinitions = [
  {
    id: "visual-merchandising",
    label: "Visual Merchandising",
    title: "Produto, percurso e desejo.",
    description: "Projetos em que coleção, composição, vitrine e leitura comercial transformam o espaço de venda.",
    caseIds: ["case-05", "case-18", "case-06", "case-04", "case-07"],
  },
  {
    id: "identidade-visual",
    label: "Identidade Visual",
    title: "Sistemas de presença.",
    description: "Marcas e identidades construídas para permanecer reconhecíveis em linguagem, matéria, aplicação e experiência.",
    caseIds: ["case-03", "case-17", "case-16", "case-12"],
  },
  {
    id: "cenografia",
    label: "Cenografia",
    title: "Forma, escala e construção.",
    description: "Vitrines, objetos de luz e arquiteturas temporárias tratados como instrumentos narrativos e espaciais.",
    caseIds: ["case-19", "case-20", "case-21", "case-22", "case-23"],
  },
  {
    id: "decoracao",
    label: "Decoração",
    title: "Atmosfera como linguagem física.",
    description: "Moodboards, materialidade, flor, luz e ambiente reunidos por uma direção coerente de experiência.",
    caseIds: ["case-24"],
  },
  {
    id: "ia-alma",
    label: "IA & Alma",
    title: "Direção humana, tecnologia generativa.",
    description: "Projetos autorais em que inteligência artificial opera sob conceito, worldbuilding, continuidade e curadoria.",
    caseIds: ["case-13", "case-14", "case-15"],
  },
];

const portfolioPresentationByCaseId = {
  "case-05": {
    cover: { positionClassName: "object-center", frameClassName: "bg-stone-200" },
    sectionIntro: "A sequência percorre a loja do plano geral ao detalhe, mostrando como produto, mobiliário e respiro constroem uma leitura comercial contínua.",
    frames: [
      ["Visão geral", "A abertura estabelece a relação entre arquitetura, circulação e densidade de produto."],
      ["Famílias de produto", "A exposição agrupa peças por cor, peso visual e possibilidade de composição."],
      ["Ponto focal", "Mobiliário e elementos de pausa interrompem a repetição das araras e orientam o olhar."],
      ["Ritmo", "Cheios, vazios e alturas diferentes mantêm a coleção legível durante o percurso."],
      ["Matéria e cor", "Madeira, metal e fundos profundos formam a base sobre a qual o produto ganha contraste."],
      ["Experiência de loja", "O enquadramento final reúne circulação, atmosfera e conversão sem transformar o espaço em cenário autônomo."],
    ],
  },
  "case-18": {
    cover: { positionClassName: "object-center", frameClassName: "bg-stone-200" },
    sectionIntro: "O ensaio contrapõe dois universos comerciais para tornar visível a adaptabilidade do método de visual merchandising.",
    frames: [
      ["Denim · abertura", "A cápsula de denim aparece em um ambiente de memória industrial, madeira e matéria acumulada."],
      ["Denim · textura", "A proximidade evidencia lavagens, sobreposições e a relação entre produto e objetos de arquivo."],
      ["Denim · composição", "A repetição das peças organiza um ritmo comercial sem apagar o caráter artesanal do conjunto."],
      ["Tropical · abertura", "A mudança de coleção também muda o campo visual: a estampa passa a comandar cor e profundidade."],
      ["Tropical · paleta", "Verdes e acentos luminosos prolongam a linguagem da coleção para o espaço."],
      ["Tropical · camadas", "Vegetação, desenho e produto são dispostos em planos para preservar leitura e circulação."],
      ["Tropical · detalhe", "O recorte aproxima matéria, estampa e props como partes do mesmo argumento visual."],
      ["Dois universos", "O fechamento evidencia que o método permanece estável mesmo quando atmosfera e repertório mudam."],
    ],
  },
  "case-06": {
    cover: {
      desktopSrc: "/images/social/linkedin/hexa-copa-do-mundo-reserva.jpg",
      fitClassName: "object-cover sm:object-scale-down",
      positionClassName: "object-center",
      frameClassName: "bg-[#EEE8DE]",
      sourceNote: "Capa editorial derivada do acervo para preservar resolução e leitura no desktop.",
    },
    sectionIntro: "Três enquadramentos mostram como códigos do futebol foram traduzidos para produto, exposição e experiência de loja sem depender de ornamentação literal.",
    frames: [
      ["Cultura em contexto", "A vista geral apresenta a campanha integrada à arquitetura e à rotina comercial da loja."],
      ["Produto e código", "A composição aproxima cor, uniforme e assinatura da marca para construir reconhecimento imediato."],
      ["Experiência sazonal", "O fechamento mostra como o tema ocupa o espaço sem retirar do produto sua função principal."],
    ],
  },
  "case-04": {
    cover: {
      desktopSrc: "/images/social/linkedin/r-lovers-calendario-comercial.jpg",
      fitClassName: "object-cover sm:object-scale-down",
      positionClassName: "object-center",
      frameClassName: "bg-[#EEE8DE]",
      sourceNote: "Capa editorial derivada do acervo para preservar resolução e leitura no desktop.",
    },
    sectionIntro: "A narrativa acompanha a transformação de uma data comercial em experiência afetiva orientada por produtos de maior valor agregado.",
    frames: [
      ["Entrada da campanha", "O módulo R Lovers apresenta o território afetivo sem retirar o produto do primeiro plano."],
      ["Produto hero", "Jaquetas e acessórios recebem enquadramento próprio para ganhar presença e presentabilidade."],
      ["Camada narrativa", "Imagem, cor e objetos constroem um romantismo contemporâneo em vez de recorrer ao clichê decorativo."],
      ["Ponto de interação", "A experiência física cria proximidade e transforma o percurso em ativação de campanha."],
      ["Conversão com atmosfera", "O fechamento reúne afeto, produto e leitura comercial como partes da mesma decisão."],
    ],
  },
  "case-07": {
    cover: { positionClassName: "object-center", frameClassName: "bg-stone-200" },
    sectionIntro: "A galeria é organizada em três capítulos — Basquiat, Mangueira e Netflix — para mostrar como cada colaboração preserva seu repertório sem romper a coerência do varejo.",
    frames: [
      ["Basquiat · entrada", "A colaboração assume gesto gráfico e energia urbana como primeiro campo de reconhecimento."],
      ["Basquiat · produto", "Obra, estampa e exposição são aproximadas sem transformar a loja em reprodução cenográfica."],
      ["Basquiat · sistema", "A repetição controlada dos códigos visuais mantém força e legibilidade institucional."],
      ["Mangueira · entrada", "Cor, samba e rua são apresentados como cultura viva, sem folclorização do repertório."],
      ["Mangueira · composição", "Estampas e produtos dialogam por contraste, ritmo e afinidade cromática."],
      ["Mangueira · presença", "A linguagem da collab ocupa a loja com identidade própria e continuidade de marca."],
      ["Netflix · entrada", "O universo do streaming é deslocado para uma experiência física de conforto e comportamento."],
      ["Netflix · produto", "Styling e exposição transformam o repertório audiovisual em argumento de lifestyle."],
      ["Netflix · fechamento", "A última imagem conclui a passagem entre entretenimento, produto e experiência de varejo."],
    ],
  },
  "case-03": {
    cover: { fitClassName: "object-cover sm:object-contain", positionClassName: "object-center", frameClassName: "bg-[#EEEAE2]" },
    sectionIntro: "A sequência parte da arquitetura da marca e avança por símbolo, matéria, aplicações e ambiente, mantendo a metáfora das três casas como fio condutor.",
    frames: [
      ["Arquitetura de marca", "A prancha de abertura apresenta o território de luxo sereno e acolhimento para a infância."],
      ["Símbolo", "Casa, estrela e janela condensam abrigo, imaginação e escala humana em um gesto reconhecível."],
      ["Três casas", "Palha, madeira e pedra organizam diferentes graus de delicadeza, calor e permanência."],
      ["Paleta", "Tons de baixa saturação criam um campo neutro capaz de acolher diferentes marcas e produtos."],
      ["Tipografia", "A combinação tipográfica equilibra presença editorial, legibilidade e proximidade."],
      ["Sistema gráfico", "Traço, ícones e ornamentos expandem a identidade sem recorrer a códigos infantis genéricos."],
      ["Papelaria", "A materialidade clara transfere o sistema para pontos de contato próximos e táteis."],
      ["Aplicação digital", "A identidade preserva calma e hierarquia quando migra para interfaces e comunicação de tela."],
      ["Experiência boutique", "Marca, mobiliário e objetos pertencem ao mesmo campo sensível de acolhimento."],
      ["Sistema vivo", "O fechamento demonstra como a identidade sustenta produto, memória e imaginação sem competir com eles."],
    ],
  },
  "case-17": {
    cover: {
      mobileSrc: "/images/16_IDENTIDADES/02_CASARAO_MEDEIROS/03_APRESENTACOES_USUARIO_2026-09-01/01-casarao-medeiros-relevo-seco-assinatura.jpg",
      desktopSrc: "/images/16_IDENTIDADES/02_CASARAO_MEDEIROS/03_APRESENTACOES_USUARIO_2026-09-01/03-casarao-medeiros-papelaria-institucional.jpg",
      fitClassName: "object-cover",
      positionClassName: "object-center",
      frameClassName: "bg-[#2A271F]",
      sourceNote: "Apresentações fornecidas pelo usuário em 1º de setembro de 2026; tratadas como mockups do sistema, não como registro de produção física.",
    },
    sectionIntro: "A leitura parte da presença material da marca e avança por assinaturas, construção, cor, tipografia, elementos gráficos, padrões e aplicações. As dez imagens fornecidas são tratadas como mockups e pranchas do sistema.",
    frames: [
      ["Papelaria institucional", "A família material apresenta a marca como sistema de hospitalidade e experiência."],
      ["Assinatura em relevo", "O relevo seco evidencia presença tátil, proporção e acabamento."],
      ["Sistema de assinaturas", "Versões principal, horizontal, reduzida e monocromática demonstram adaptabilidade."],
      ["Construção e proporção", "Malha, respiro e redução mínima explicitam as regras de consistência."],
      ["Paleta cromática", "Tons minerais, verde profundo, terra e bronze conectam arquitetura e contemporaneidade."],
      ["Sistema tipográfico", "Garamond e Montserrat equilibram patrimônio, legibilidade e clareza institucional."],
      ["Elementos gráficos", "Símbolos, ornamentos, divisórias, texturas e ícones expandem a linguagem."],
      ["Padrões", "Referências arquitetônicas e mineiras são convertidas em padrões coordenados."],
      ["Materialidade", "Pedra, madeira, metal, vidro, papel e tecido formam um campo tátil comum."],
      ["Detalhe tátil", "A aproximação encerra a sequência fornecida com precisão de textura e luz."],
    ],
  },
  "case-16": {
    cover: {
      mobileSrc: "/brands/banal/banal-refined-identity.jpg",
      desktopSrc: "/brands/banal/banal-brand-showcase.jpg",
      fitClassName: "object-scale-down",
      positionClassName: "object-center",
      frameClassName: "bg-[#F3EBDD]",
      sourceNote: "Duas aplicações existentes do sistema: assinatura vertical no mobile e prancha completa no desktop.",
    },
    sectionIntro: "A leitura apresenta BANAL como identidade de uma agência de marketing, estratégia e desejo — do signo principal às aplicações do sistema.",
    frames: [
      ["Diretrizes", "A primeira prancha organiza assinatura, proporções e regras para preservar reconhecimento."],
      ["Sistema de marca", "Versões vertical, horizontal, reduzida e negativa demonstram comportamento em diferentes escalas."],
      ["Aplicação principal", "A identidade se apresenta como sistema de agência, articulando nome, símbolo e posicionamento."],
      ["Versão negativa", "O contraste escuro evidencia a força gráfica do branco, do preto e do acento vermelho."],
      ["Símbolo mínimo", "A redução testa reconhecimento quando a assinatura verbal deixa de conduzir a leitura."],
      ["Assinatura vertical", "Nome, símbolo e descrição de agência aparecem em uma composição editorial direta."],
      ["Prancha de identidade", "Paleta, variações e aplicações são reunidas como repertório operacional da marca."],
      ["Manifesto", "A linguagem verbal explica como estratégia reorganiza o cotidiano e produz percepção de valor."],
      ["Presença autoral", "O fechamento posiciona a identidade dentro do trabalho de direção criativa que a originou."],
    ],
  },
  "case-12": {
    cover: { fitClassName: "object-contain", positionClassName: "object-center", frameClassName: "bg-[#EDE5D9]" },
    sectionIntro: "O monograma e os ornamentos atravessam papelaria, sinalização e hospitalidade para transformar uma identidade de evento em experiência contínua.",
    frames: [
      ["Sistema de identidade", "A abertura reúne assinatura, paleta e linguagem ornamental do Provence Raiz."],
      ["Monograma", "A marca reduzida concentra reconhecimento e permite aplicações em escalas menores."],
      ["Biblioteca ornamental", "Ícones e molduras ampliam o vocabulário sem perder unidade formal."],
      ["Papelaria", "O convite traduz identidade, materialidade e rito de chegada para um suporte tátil."],
      ["Sinalização", "A mensagem de boas-vindas leva o sistema visual ao percurso físico do evento."],
      ["Hospitalidade", "O kit de acolhimento mostra a identidade aplicada aos pequenos gestos da experiência."],
    ],
  },
  "case-19": {
    cover: { positionClassName: "object-center", frameClassName: "bg-stone-200" },
    sectionIntro: "As imagens de vitrine são seguidas por uma simulação técnica claramente identificada, separando registro disponível e hipótese construtiva.",
    frames: [
      ["Fachada e conjunto", "A visão geral apresenta a topografia de esferas como moldura para manequins e produto."],
      ["Escala e repetição", "Volumes metálicos se acumulam sem fechar completamente a leitura da vitrine."],
      ["Reflexo", "Superfícies vermelhas, douradas e prateadas multiplicam luz, fachada e movimento."],
      ["Integração com produto", "A cenografia cria celebração enquanto mantém os pontos comerciais reconhecíveis."],
      ["Hipótese construtiva", "Prancha editorial explicita uma montagem plausível; não é fotografia técnica histórica."],
    ],
  },
  "case-20": {
    cover: { positionClassName: "object-center", frameClassName: "bg-stone-200" },
    sectionIntro: "A galeria percorre fachada, planos cromáticos e integração com produto antes de apresentar a simulação técnica autorizada.",
    frames: [
      ["Fachada de verão", "A abertura apresenta volumes gráficos e cor como sinais de leveza e estação."],
      ["Planos", "Azuis, rosas e violetas ocupam profundidades diferentes e preservam áreas de respiro."],
      ["Produto em foco", "Manequins permanecem legíveis dentro da composição cenográfica."],
      ["Percurso", "A linguagem cromática conecta vitrines laterais e interior da loja."],
      ["Geometria", "O detalhe mostra como forma e sobreposição substituem o repertório tropical literal."],
      ["Conjunto", "A leitura final reúne escala, cor e circulação em uma mesma paisagem comercial."],
      ["Hipótese construtiva", "Prancha editorial apresenta uma montagem plausível; não é documentação histórica de fabricação."],
    ],
  },
  "case-21": {
    cover: { fitClassName: "object-contain", positionClassName: "object-center", frameClassName: "bg-[#EAE3D9]" },
    sectionIntro: "A série passa da presença cênica ao detalhamento de estrutura, integração floral e luz, sem afirmar fabricação ou implantação.",
    frames: [
      ["Pilastras · presença", "O par de elementos independentes enquadra o rito sem fechar o vão central."],
      ["Vista explodida", "Pele, nervuras, montantes e base são separados para tornar a lógica estrutural legível."],
      ["Corte", "A seção apresenta espessura, apoio e contraventamento como partes do sistema proposto."],
      ["Integração floral", "A aplicação vegetal acompanha a forma sem esconder a leitura do objeto cenográfico."],
      ["Luz oculta", "A iluminação reforça curva e profundidade enquanto mantém os pontos técnicos fora de vista."],
    ],
  },
  "case-22": {
    cover: { fitClassName: "object-contain", positionClassName: "object-center", frameClassName: "bg-[#EAE3D9]" },
    sectionIntro: "A sequência desmonta o objeto por camadas para tornar visíveis estrutura, difusão, suspensão e acabamento.",
    frames: [
      ["Carretel · presença", "A referência material é reinterpretada como objeto de luz e ritmo cenográfico."],
      ["Vista explodida", "Discos, núcleo, fonte de luz e acabamento aparecem como partes independentes."],
      ["Corte", "A seção evidencia a relação entre estrutura, difusor e passagem luminosa."],
      ["Suspensão", "O detalhe organiza fixação, cabos e equilíbrio visual do objeto."],
      ["Difusor", "A última prancha concentra o modo como a técnica é contida para que a luz permaneça protagonista."],
    ],
  },
  "case-23": {
    cover: { fitClassName: "object-contain", positionClassName: "object-center", frameClassName: "bg-[#EAE3D9]" },
    sectionIntro: "O estudo apresenta forma, montagem, corte, luz e aplicação vegetal como decisões coordenadas de um objeto cenográfico reversível.",
    frames: [
      ["Gaiola · presença", "A forma vertical cria um marco espacial permeável, capaz de receber luz e vegetação."],
      ["Vista explodida", "A separação das partes torna compreensível a lógica proposta de montagem."],
      ["Corte", "A seção evidencia base, estrutura e fechamento sem converter o estudo em prova de execução."],
      ["Luz", "A iluminação acompanha o desenho e preserva a leitura vazada do objeto."],
      ["Integração vegetal", "O fechamento mostra como matéria orgânica e estrutura podem coexistir sem perder identidade."],
    ],
  },
  "case-24": {
    cover: { positionClassName: "object-center", frameClassName: "bg-[#E9E1D5]" },
    sectionIntro: "Moodboards e renders são lidos como instrumentos de direção: eles coordenam matéria, flor, luz e escala antes da experiência física.",
    frames: [
      ["Atmosfera · abertura", "A primeira composição estabelece o campo de cor, materialidade e memória do projeto."],
      ["Cerimônia", "O moodboard organiza escala ritual, passagem e presença floral."],
      ["Mesa de bolo", "Toile, volume e composição definem um ponto de atenção sem romper a linguagem geral."],
      ["Lounge", "Texturas e mobiliário aproximam acolhimento residencial e hospitalidade de evento."],
      ["Altar e passarela", "O render refina profundidade, eixo e relação entre arquitetura temporária e flor."],
      ["Mural e mesa", "A cena articula estampa, fundo e objeto central como uma única composição."],
      ["Escada floral", "A vegetação transforma circulação e desnível em gesto cênico contínuo."],
      ["Bar", "Toile, pinheiros e luminárias estendem a atmosfera aos pontos de hospitalidade."],
      ["Lounge em linho", "Azul, tecido e escala doméstica constroem uma pausa dentro do percurso."],
      ["Linguagem física", "O fechamento reúne os códigos que devem permanecer coerentes quando o conceito ganha espaço."],
    ],
  },
  "case-13": {
    cover: {
      mobileSrc: "/images/15_IA_COM_ALMA/02_ROOM_329/F59E614F-F034-42C8-806B-045D2B363399.jpeg",
      desktopSrc: "/images/15_IA_COM_ALMA/02_ROOM_329/0E70DF46-364B-4B5F-9B95-50E3A855FE83.jpeg",
      positionClassName: "object-center",
      frameClassName: "bg-[#D9D1C7]",
      sourceNote: "Direção de arte responsiva com enquadramentos do próprio acervo.",
    },
    sectionIntro: "ROOM 329 é editado como uma noite em capítulos: apresentação das personagens, códigos do quarto, vestígios da festa e continuidade de styling.",
    frames: [
      ["Serviço depois da festa", "Em vestido azul, a personagem encara a câmera diante de cloches metálicas; luxo e estranhamento abrem a narrativa."],
      ["Vinho e veludo", "O vestido bordô, a cortina profunda e a mesa desorganizada introduzem os vestígios da noite."],
      ["O quarto como personagem", "A cena ampla reúne sofá, mesa, vinho, fruta, arquitetura e uma segunda figura em movimento."],
      ["Duas presenças", "As personagens aparecem juntas entre taças, garrafas, joias e a chave identificada como ROOM 329."],
      ["Manhã interrompida", "O vestido azul ocupa o centro enquanto cama desfeita, vinho e objetos mantêm a continuidade da noite."],
      ["Retrato de corpo inteiro", "O vestido amarelo cria contraste com madeira, veludo e prata; a chave do quarto ancora a narrativa."],
      ["Último enquadramento", "O retrato fechado reúne styling, maquiagem, bolsa e mesa posta como síntese do universo editorial."],
    ],
  },
  "case-14": {
    cover: { positionClassName: "object-[50%_35%]", frameClassName: "bg-stone-300" },
    sectionIntro: "A edição alterna retrato, gesto e deslocamento para construir vínculo sem transformar intimidade em espetáculo.",
    frames: [
      ["Presença", "O primeiro retrato estabelece pai e filho como centro absoluto da série."],
      ["Proximidade", "A redução da distância torna toque e confiança mais importantes do que o cenário."],
      ["Cuidado", "O gesto cotidiano funciona como linguagem de transmissão entre gerações."],
      ["Brincadeira", "Movimento e espontaneidade interrompem a solenidade do retrato."],
      ["Escala", "A diferença entre os corpos revela proteção, crescimento e continuidade."],
      ["Herança", "O fechamento transforma presença compartilhada em memória visual, sem recorrer a símbolos externos."],
    ],
  },
  "case-15": {
    cover: { fitClassName: "object-cover", positionClassName: "object-[50%_58%]", frameClassName: "bg-[#D7BFA8]" },
    sectionIntro: "A narrativa começa no gesto e avança por matéria, objeto, uso e natureza-morta, evitando que a coleção se reduza a catálogo.",
    frames: [
      ["Gesto", "Mãos, fio e ritmo manual apresentam o tempo incorporado ao objeto."],
      ["Matéria", "Fibra, trama e irregularidade tornam visível a presença do feito à mão."],
      ["Forma", "A bolsa é observada como volume, proporção e desenho antes de ser apresentada como produto."],
      ["Cor", "Terracota, cru, preto e tons de terra constroem uma memória cromática comum à série."],
      ["Luz", "Sombras recortadas aproximam o produto de superfícies porosas e paisagem."],
      ["Uso", "A presença do corpo altera escala e revela como o objeto participa do gesto cotidiano."],
      ["Detalhe", "A aproximação reforça acabamento, textura e variação da trama."],
      ["Natureza-morta", "Produto e objetos domésticos compartilham uma atmosfera de permanência e memória."],
      ["Coleção", "O fechamento reúne variedade e continuidade sem apagar a singularidade de cada peça."],
    ],
  },
};

export function getPortfolioPresentation(caseId) {
  return portfolioPresentationByCaseId[caseId] || {};
}

export function getGalleryAssetMeta(caseItem, image, index) {
  const explicitMeta = caseItem.galleryMeta?.[image];
  if (explicitMeta) return explicitMeta;

  const presentation = getPortfolioPresentation(caseItem.id);
  const frame = presentation.frames?.[index];
  const fallbackChapter = caseItem.blocks?.[index % Math.max(caseItem.blocks?.length || 1, 1)];
  const label = frame?.[0] || fallbackChapter?.[0] || "Leitura visual";
  const caption = frame?.[1] || fallbackChapter?.[1] || caseItem.shortTese;

  return {
    label: `${label} · ${String(index + 1).padStart(2, "0")}`,
    caption,
    alt: `${label} no case ${caseItem.title}. ${caption}`,
  };
}

export function getGallerySectionIntro(caseId) {
  return getPortfolioPresentation(caseId).sectionIntro || null;
}

export function getPortfolioCover(caseItem) {
  const cover = getPortfolioPresentation(caseItem.id).cover || {};
  return {
    mobileSrc: cover.mobileSrc || caseItem.thumb,
    desktopSrc: cover.desktopSrc || caseItem.thumb,
    fitClassName: cover.fitClassName || "object-cover",
    positionClassName: cover.positionClassName || "object-center",
    frameClassName: cover.frameClassName || "bg-stone-200/60",
    sourceNote: cover.sourceNote || null,
  };
}

const portfolioTermTranslations = {
  "Brand Architecture": "Arquitetura de Marca",
  "Brand Collaboration": "Colaboração de Marca",
  "Retail Campaign": "Campanha de Varejo",
};

export function formatPortfolioTerm(value) {
  return portfolioTermTranslations[value] || value;
}
