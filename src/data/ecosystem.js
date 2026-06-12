const verdeburgoBase = "/images/14_VERDEBURGO/PROVENCE_RAIZ/02_WEB";
const verdeburgoRefinement = "/images/14_VERDEBURGO/PROVENCE_RAIZ/03_REFINAMENTO";

export const verdeburgoAssets = {
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

export const verdeburgoChapters = [
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

export const verdeburgoObjects = [
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

export const banalAssets = {
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

export const verdeBurgoBrandAssets = {
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

export const consultancyPrinciples = [
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

export const consultancyCompanies = [
  {
    id: "banal",
    name: "BANAL",
    eyebrow: "Marca · Marketing · Comunicação",
    route: "empresas/banal",
    image: banalAssets.founderScene,
    statement: "O consumo acaba. O signo continua.",
    description: "Empresa especializada em branding, marketing, comunicação, varejo e posicionamento para negócios que precisam se tornar mais claros, desejáveis e valiosos.",
    layers: ["Branding", "Marketing", "Posicionamento", "Narrativa", "Conteúdo", "Campanhas"]
  },
  {
    id: "verdeburgo",
    name: "VERDE BURGO",
    eyebrow: "Eventos · Festas · Operação Completa",
    route: "empresas/verde-burgo",
    image: verdeBurgoBrandAssets.caseCover,
    statement: "Evento bonito é consequência. Evento bem resolvido é estratégia.",
    description: "Empresa de eventos com solução integrada de buffet, decoração, bar, cerimonial, planejamento, produção e execução para festas completas.",
    layers: ["Buffet", "Decoração", "Bar", "Cerimonial", "Planejamento", "Produção"]
  }
];

export const verdeBurgoEventFormats = [
  "Casamentos",
  "Aniversários",
  "Eventos corporativos",
  "Festas especiais",
  "Recepções",
  "Experiências de marca"
];

export const verdeBurgoMethod = [
  ["Escuta", "Entender desejo, contexto, orçamento, restrições e nível de tranquilidade que o cliente precisa."],
  ["Desenho", "Criar conceito, narrativa visual, atmosfera e linguagem do evento."],
  ["Curadoria", "Selecionar fornecedores, materiais, menu, bar, ambientação, papelaria e detalhes."],
  ["Operação", "Planejar fluxos, bastidores, cronograma, montagem, equipe e execução."],
  ["Presença", "Entregar uma experiência fluida, bonita, resolvida e memorável."]
];

export const banalLayers = [
  ["Branding", "Construção de identidade, assinatura, sistema visual e percepção pública."],
  ["Marketing", "Campanhas, calendário, conteúdo, canais e estratégia de crescimento."],
  ["Posicionamento", "Definição de território, promessa, discurso e diferenciação competitiva."],
  ["Narrativa", "Transformação de produto, gesto, cena ou detalhe em linguagem memorável."],
  ["Percepção de valor", "Arquitetura de sinais para fazer uma marca parecer mais clara, desejável e reconhecível."]
];

export const banalProcess = [
  ["Diagnóstico", "Leitura do negócio, do mercado, dos sinais de marca e dos pontos de confusão na percepção pública."],
  ["Direção", "Definição de posicionamento, linguagem, narrativa, prioridade comercial e critérios de comunicação."],
  ["Sistema", "Organização de identidade, conteúdo, campanha, varejo e presença em canais com consistência."],
  ["Ativação", "Desdobramento em peças, rotinas, campanhas e experiências capazes de sustentar valor no uso real."]
];
