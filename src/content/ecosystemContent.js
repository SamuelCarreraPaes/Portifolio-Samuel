import { casesData } from "../data/cases.js";
import { sistemaArticleCards } from "../sistemaArticleCards.js";

export const ecosystemPublicFlow = [
  {
    number: "01",
    title: "Samuel",
    label: "Direção criativa",
    text: "Visão, repertório, inteligência artificial, estética, operação e execução reunidos em uma atuação autoral.",
    route: "sobre/samuel-carrera-paes",
  },
  {
    number: "02",
    title: "Visão",
    label: "Tese e método",
    text: "A Geração dos Realizadores como leitura de mundo: pensar, criar, operar e colocar no mundo real.",
    route: "visao",
  },
  {
    number: "03",
    title: "Empresas",
    label: "Estruturas vivas",
    text: "BANAL e Verde Burgo são empresas com função própria, não apenas vitrines de trabalhos passados.",
    route: "paes-consultoria",
  },
  {
    number: "04",
    title: "Projetos",
    label: "Provas aplicadas",
    text: "Cases, campanhas, eventos, atmosferas, ativações, marcas e experiências organizados por frente de atuação.",
    route: "empresas/banal",
  },
  {
    number: "05",
    title: "Biblioteca",
    label: "Produção intelectual",
    text: "Artigos, ensaios, pesquisas e manifestos que sustentam publicamente o pensamento do ecossistema.",
    route: "biblioteca",
  },
];

export const homeProofMetrics = [
  ["2", "empresas em operação pública"],
  [String(casesData.length), "núcleos BANAL catalogados"],
  ["1", "projeto Verde Burgo publicado"],
  [String(sistemaArticleCards.length + 1), "textos na Biblioteca"],
];

export const homeAuthorityChips = [
  "Direção criativa",
  "Estratégia",
  "Branding",
  "Experiências",
  "Eventos",
  "Conteúdo",
];

export const homeChallengeCards = [
  {
    title: "Visão dispersa",
    text: "Quando uma ideia existe, mas ainda não virou linguagem, prioridade e presença pública compreensível.",
  },
  {
    title: "Experiência fragmentada",
    text: "Quando marca, conteúdo, espaço, campanha, evento e operação parecem bons isoladamente, mas não sustentam a mesma direção.",
  },
  {
    title: "Repertório sem sistema",
    text: "Quando existe cultura, gosto e ambição, mas falta uma tese para organizar decisões e transformar intenção em entrega.",
  },
];

export const homeServiceCards = [
  {
    title: "Diagnóstico criativo",
    text: "Mapa inicial de problema, tese, prioridade e próximos passos para marcas, projetos e experiências.",
    route: "servicos/consultoria-criativa",
  },
  {
    title: "Estratégia e posicionamento",
    text: "Arquitetura de oferta, proposta de valor, mensagem e território público para negócios em evolução.",
    route: "servicos/posicionamento",
  },
  {
    title: "Identidade e presença",
    text: "Direção verbal, visual e editorial para transformar visão em uma linguagem reconhecível.",
    route: "servicos/branding",
  },
  {
    title: "Experiências e eventos",
    text: "Conceito, narrativa, jornada e operação para experiências presenciais com intenção e acabamento.",
    route: "servicos/eventos",
  },
];

export const homeMethodSteps = [
  ["Diagnóstico", "Entender contexto, ambição, restrições, público e ponto de confusão."],
  ["Tese", "Definir a ideia central que organiza marca, conteúdo, experiência ou evento."],
  ["Direção", "Traduzir a tese em linguagem, sistema, repertório e decisões criativas."],
  ["Execução", "Orientar entregáveis, rituais, produção e implementação no mundo real."],
  ["Evolução", "Medir, aprender e ajustar sem perder autoria, clareza e consistência."],
];

export const operatingLanes = [
  ["Visão", "A tese que define direção, critérios e linguagem antes do projeto virar peça, campanha ou evento."],
  ["Empresa", "Estruturas criadas para operar mercados específicos com identidade, oferta e repertório próprios."],
  ["Projeto", "Aplicações visíveis da visão em marca, marketing, varejo, eventos, hospitalidade e experiência."],
  ["Biblioteca", "Produção intelectual que documenta método, posicionamento, pesquisa e repertório de Samuel Carrera Paes."],
];

export const banalIdentityItems = [
  ["Símbolo", "Assinatura Banal como marca editorial da unidade."],
  ["Cor", "Paleta usada como código de presença, desejo e leitura."],
  ["Tom", "Direto, cultural, estratégico e não publicitário demais."],
  ["Função", "Traduzir estratégia em presença pública."],
  ["Campo", "Marca, produto, varejo, cultura, campanha e identidade."],
];

export const banalMethodSteps = [
  ["Ler", "Mercado, cultura, produto, concorrência e desejo."],
  ["Posicionar", "Definir lugar, promessa, tensão e diferença."],
  ["Dar forma", "Construir identidade, linguagem, sistema visual e narrativa."],
  ["Ativar", "Levar a marca para campanhas, varejo, conteúdo, experiência e presença."],
];

export const verdeBurgoDeliveryStack = [
  ["Planejamento", "Escuta, orçamento, cronograma, prioridades e condução do processo."],
  ["Buffet", "Comida como hospitalidade, ritmo de serviço e parte da identidade do encontro."],
  ["Decoração", "Atmosfera, matéria, florais, mobiliário, objetos e composição visual."],
  ["Bar", "Serviço, carta, gesto, circulação, permanência e experiência de recepção."],
  ["Cerimonial", "Fluxo, protocolo, tranquilidade, bastidor e cuidado com o acontecimento."],
  ["Execução", "Montagem, fornecedores, equipe, produção, desmontagem e acabamento final."],
];

export const bibliotecaTerritories = [
  ["Manifesto", "A Geração dos Realizadores e a tese central do ecossistema."],
  ["Marca", "Branding, percepção, valor, posicionamento e desejo."],
  ["Varejo", "Loja física, produto, narrativa espacial e experiência."],
  ["Eventos", "Hospitalidade, festa, identidade, atmosfera e comunicação 360 graus."],
  ["IA e operação", "Tecnologia, método, repertório, produção e execução."],
];
