export const authorityAtlas = {
  slug: "samuel-carrera-paes",
  title: "Mapa do Ecossistema",
  subtitle: "Uma leitura discreta dos territórios de atuação de Samuel Carrera Paes, Paes Consultoria, BANAL e Verde Burgo Eventos.",
  description: "O Mapa do Ecossistema organiza serviços, empresas, cases e artigos em uma malha editorial clara: Samuel Carrera Paes como direção criativa central, BANAL como frente de marca e marketing, e Verde Burgo como frente de eventos completos."
};

export const authorityServiceGroups = [
  {
    id: "direcao",
    label: "Direção e estratégia",
    description: "A camada central da Paes Consultoria: visão, critério, sistema e tomada de decisão criativa."
  },
  {
    id: "marca",
    label: "Marca, marketing e varejo",
    description: "A frente BANAL: identidade, comunicação, campanhas, posicionamento, conteúdo e percepção de valor."
  },
  {
    id: "eventos",
    label: "Eventos e hospitalidade",
    description: "A frente Verde Burgo: festas completas com operação, serviço, atmosfera, cerimônia e execução."
  }
];

export const authorityServices = [
  {
    slug: "direcao-criativa",
    group: "direcao",
    title: "Direção Criativa",
    company: "Paes Consultoria",
    companyRoute: "paes-consultoria",
    statement: "Transformar intenção em linguagem, sistema e presença real.",
    description: "Direção criativa é o eixo que conecta estética, estratégia, operação, repertório e execução. Na visão de Samuel Carrera Paes, ela não existe para produzir somente imagem, mas para construir coerência entre promessa, experiência e entrega.",
    applications: ["visão de marca", "linguagem visual", "campanhas", "eventos", "varejo", "experiências", "sistemas criativos"],
    relatedCases: ["case-01", "case-03", "case-05", "case-11"],
    relatedArticles: ["leitura-de-marca", "narrativa-espacial", "operacao-criativa"]
  },
  {
    slug: "consultoria-criativa",
    group: "direcao",
    title: "Consultoria Criativa",
    company: "Paes Consultoria",
    companyRoute: "paes-consultoria",
    statement: "Ler o negócio antes de desenhar a solução.",
    description: "Consultoria criativa combina diagnóstico, repertório, posicionamento, comportamento de consumo e leitura operacional. O objetivo é orientar decisões que melhorem clareza, percepção, experiência e valor.",
    applications: ["diagnóstico de marca", "arquitetura de oferta", "prioridade comercial", "repertório visual", "processos criativos", "inteligência artificial aplicada"],
    relatedCases: ["case-02", "case-03", "case-08"],
    relatedArticles: ["leitura-de-marca", "construcao-de-percepcao", "operacao-criativa"]
  },
  {
    slug: "branding",
    group: "marca",
    title: "Branding",
    company: "BANAL",
    companyRoute: "banal",
    statement: "Construir marca como sistema de percepção.",
    description: "Branding, dentro da BANAL, é a construção de identidade, narrativa, códigos visuais e sinais de valor para que uma empresa seja reconhecida com clareza e desejada com consistência.",
    applications: ["identidade de marca", "sistema visual", "tom de voz", "arquitetura de marca", "promessa", "percepção pública"],
    relatedCases: ["case-01", "case-02", "case-03"],
    relatedArticles: ["leitura-de-marca", "construcao-de-percepcao"]
  },
  {
    slug: "marketing",
    group: "marca",
    title: "Marketing",
    company: "BANAL",
    companyRoute: "banal",
    statement: "Dar forma, ritmo e direção para o desejo encontrar mercado.",
    description: "Marketing, para a BANAL, organiza posicionamento, campanha, conteúdo, canais e calendário para que a comunicação deixe de ser ruído e passe a conduzir leitura, valor e conversão.",
    applications: ["campanhas", "conteúdo", "calendário comercial", "lançamentos", "redes sociais", "comunicação de varejo"],
    relatedCases: ["case-04", "case-06", "case-07"],
    relatedArticles: ["curadoria-de-produto", "experiencia-fisica"]
  },
  {
    slug: "posicionamento",
    group: "marca",
    title: "Posicionamento",
    company: "BANAL",
    companyRoute: "banal",
    statement: "Definir o lugar que uma marca deve ocupar na percepção do público.",
    description: "Posicionamento é a escolha consciente de território, linguagem, público, valor e diferença. É o que permite uma marca parar de disputar atenção genérica e começar a sustentar presença própria.",
    applications: ["reposicionamento", "território de marca", "diferenciação", "promessa comercial", "percepção premium"],
    relatedCases: ["case-01", "case-08", "case-09"],
    relatedArticles: ["leitura-de-marca", "construcao-de-percepcao"]
  },
  {
    slug: "conteudo-e-narrativa",
    group: "marca",
    title: "Conteúdo e Narrativa",
    company: "BANAL",
    companyRoute: "banal",
    statement: "Transformar produto, serviço e gesto em linguagem memorável.",
    description: "Conteúdo e narrativa organizam o modo como uma marca explica, apresenta e sustenta seu valor. A BANAL trata conteúdo como continuidade estratégica, não como postagem isolada.",
    applications: ["storytelling", "copy", "campanhas editoriais", "artigos", "roteiros", "narrativas comerciais"],
    relatedCases: ["case-06", "case-07", "case-10"],
    relatedArticles: ["narrativa-espacial", "experiencia-fisica"]
  },
  {
    slug: "varejo-e-visual-merchandising",
    group: "marca",
    title: "Varejo e Visual Merchandising",
    company: "BANAL",
    companyRoute: "banal",
    statement: "Organizar espaço, produto e atenção para criar desejo físico.",
    description: "Varejo e visual merchandising conectam exposição, produto, fluxo, luz, campanha e comportamento. A leitura de loja vira ferramenta de marca, experiência e conversão.",
    applications: ["vitrine", "loja física", "hotspots", "curadoria de produto", "exposição premium", "experiência de compra"],
    relatedCases: ["case-04", "case-05", "case-08", "case-09", "case-11"],
    relatedArticles: ["curadoria-de-produto", "narrativa-espacial", "experiencia-fisica"]
  },
  {
    slug: "eventos",
    group: "eventos",
    title: "Eventos",
    company: "Verde Burgo Eventos",
    companyRoute: "verdeburgo",
    statement: "Festa completa com identidade, operação e experiência.",
    description: "Eventos, na Verde Burgo, são resolvidos como comunicação 360 graus: buffet, decoração, bar, cerimonial, ambientação, papelaria, atmosfera, bastidor e experiência precisam conversar dentro de uma linguagem coerente.",
    applications: ["casamentos", "aniversários", "eventos corporativos", "festas especiais", "experiências de marca", "hospitalidade"],
    relatedCases: [],
    relatedArticles: ["experiencia-fisica", "narrativa-espacial"]
  },
  {
    slug: "buffet",
    group: "eventos",
    title: "Buffet",
    company: "Verde Burgo Eventos",
    companyRoute: "verdeburgo",
    statement: "Serviço como parte da narrativa do evento.",
    description: "Buffet não entra apenas como alimentação. Dentro da Verde Burgo, ele participa da experiência, do ritmo, da hospitalidade e da percepção geral da festa.",
    applications: ["menu", "serviço", "hospitalidade", "mesa", "fluxo de convidados", "experiência sensorial"],
    relatedCases: [],
    relatedArticles: ["construcao-de-percepcao", "experiencia-fisica"]
  },
  {
    slug: "decoracao",
    group: "eventos",
    title: "Decoração",
    company: "Verde Burgo Eventos",
    companyRoute: "verdeburgo",
    statement: "Atmosfera construída com matéria, memória e intenção.",
    description: "Decoração, na Verde Burgo, é direção visual aplicada à festa: florais, mobiliário, luz, objetos, percurso e materialidade precisam sustentar uma mesma identidade.",
    applications: ["floral", "cenografia", "mobiliário", "luz", "objetos autorais", "ambientação"],
    relatedCases: [],
    relatedArticles: ["narrativa-espacial", "construcao-de-percepcao"]
  },
  {
    slug: "bar",
    group: "eventos",
    title: "Bar",
    company: "Verde Burgo Eventos",
    companyRoute: "verdeburgo",
    statement: "Hospitalidade, permanência e ritmo social.",
    description: "O bar funciona como ponto de encontro, fluxo e permanência. Ele deve acompanhar a identidade do evento, da seleção de bebidas à presença espacial.",
    applications: ["drinks", "serviço de bar", "pontos de encontro", "fluxo", "experiência de permanência"],
    relatedCases: [],
    relatedArticles: ["experiencia-fisica", "construcao-de-percepcao"]
  },
  {
    slug: "cerimonial",
    group: "eventos",
    title: "Cerimonial",
    company: "Verde Burgo Eventos",
    companyRoute: "verdeburgo",
    statement: "Condução, tranquilidade e precisão no momento real.",
    description: "Cerimonial organiza tempo, pessoas, emoção, bastidor e sequência. É a disciplina que permite que a experiência aconteça com fluidez e segurança.",
    applications: ["roteiro", "cronograma", "coordenação", "bastidor", "família", "fornecedores", "execução"],
    relatedCases: [],
    relatedArticles: ["operacao-criativa", "experiencia-fisica"]
  },
  {
    slug: "planejamento-e-producao",
    group: "eventos",
    title: "Planejamento e Produção",
    company: "Verde Burgo Eventos",
    companyRoute: "verdeburgo",
    statement: "A beleza depende de operação para existir sem fricção.",
    description: "Planejamento e produção transformam intenção em cronograma, fornecedor, logística, montagem, equipe e entrega. É a camada que protege a experiência do improviso.",
    applications: ["cronograma", "fornecedores", "montagem", "produção executiva", "logística", "operação"],
    relatedCases: [],
    relatedArticles: ["operacao-criativa", "experiencia-fisica"]
  }
];

export function getAuthorityService(slug) {
  return authorityServices.find((service) => service.slug === slug);
}

