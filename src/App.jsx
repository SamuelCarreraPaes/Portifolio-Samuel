import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRightCircle, ArrowLeftCircle, Menu, X, ArrowUp, CheckCircle2, Copy } from "lucide-react";

import { authorityAtlas, authorityServiceGroups, authorityServices, getAuthorityService } from "./authorityMap";
import { sistemaArticleCards } from "./sistemaArticleCards";
import {
  banalCaseGroups,
  banalRepertoireNotes,
  banalRepertoireStats,
  casesData,
  getBanalCaseGroupByCaseId,
} from "./data/cases";
import {
  banalAssets,
  banalLayers,
  banalProcess,
  consultancyCompanies,
  consultancyPrinciples,
  verdeBurgoBrandAssets,
  verdeBurgoEventFormats,
  verdeBurgoMethod,
  verdeburgoAssets,
  verdeburgoChapters,
  verdeburgoObjects,
} from "./data/ecosystem";
import { useRouter } from "./router";
import { playMutedLoop, PREMIUM_EASE } from "./motionConfig";
import { DynamicSEO } from "./seo";
import { SITE_URL, homePortrait } from "./seoData";
import { EditorialConnectionGrid, ImageWithFallback, PageTransition } from "./components/shared";

const ecosystemPublicFlow = [
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

const homeProofMetrics = [
  ["2", "empresas em operação pública"],
  [String(casesData.length), "núcleos BANAL catalogados"],
  ["1", "projeto Verde Burgo publicado"],
  [String(sistemaArticleCards.length + 1), "textos na Biblioteca"],
];

const operatingLanes = [
  ["Visão", "A tese que define direção, critérios e linguagem antes do projeto virar peça, campanha ou evento."],
  ["Empresa", "Estruturas criadas para operar mercados específicos com identidade, oferta e repertório próprios."],
  ["Projeto", "Aplicações visíveis da visão em marca, marketing, varejo, eventos, hospitalidade e experiência."],
  ["Biblioteca", "Produção intelectual que documenta método, posicionamento, pesquisa e repertório de Samuel Carrera Paes."],
];

const banalTerritories = [
  ["Marca", "Identidade, posicionamento, assinatura, valor percebido e leitura pública."],
  ["Marketing", "Campanhas, calendário, conteúdo, canais, collabs e ativação comercial."],
  ["Varejo", "Visual merchandising, narrativa espacial, produto, ponto de venda e experiência física."],
  ["Cultura", "Repertório, desejo, sinais, linguagem, memória e construção de presença."],
];

const verdeBurgoDeliveryStack = [
  ["Planejamento", "Escuta, orçamento, cronograma, prioridades e condução do processo."],
  ["Buffet", "Comida como hospitalidade, ritmo de serviço e parte da identidade do encontro."],
  ["Decoração", "Atmosfera, matéria, florais, mobiliário, objetos e composição visual."],
  ["Bar", "Serviço, carta, gesto, circulação, permanência e experiência de recepção."],
  ["Cerimonial", "Fluxo, protocolo, tranquilidade, bastidor e cuidado com o acontecimento."],
  ["Execução", "Montagem, fornecedores, equipe, produção, desmontagem e acabamento final."],
];

const bibliotecaTerritories = [
  ["Manifesto", "A Geração dos Realizadores e a tese central do ecossistema."],
  ["Marca", "Branding, percepção, valor, posicionamento e desejo."],
  ["Varejo", "Loja física, produto, narrativa espacial e experiência."],
  ["Eventos", "Hospitalidade, festa, identidade, atmosfera e comunicação 360 graus."],
  ["IA e operação", "Tecnologia, método, repertório, produção e execução."],
];

function SamuelEntityPage({ navigate }) {
  const connections = [
    {
      eyebrow: "Núcleo",
      title: "Paes Consultoria",
      text: "A estrutura que organiza visão, direção criativa, consultoria e construção de presença.",
      route: "paes-consultoria"
    },
    {
      eyebrow: "Empresa",
      title: "BANAL",
      text: "A camada de branding, marketing, conteúdo, comunicação e percepção de valor.",
      route: "empresas/banal"
    },
    {
      eyebrow: "Empresa",
      title: "Verde Burgo",
      text: "A frente de eventos, experiências, produção e direção criativa aplicada ao encontro real.",
      route: "empresas/verde-burgo"
    },
    {
      eyebrow: "Projeto",
      title: "Provence Raiz",
      text: "Um case de atmosfera, evento, identidade visual e experiência dentro da Verde Burgo.",
      route: "projetos/provence-raiz"
    },
    {
      eyebrow: "Biblioteca",
      title: "Geração dos Realizadores",
      text: "O conceito que organiza criação, execução, tecnologia, repertório e presença.",
      route: "biblioteca/geracao-dos-realizadores"
    },
    {
      eyebrow: "Atlas",
      title: "Mapa do Ecossistema",
      text: "Serviços, empresas, cases e artigos conectados em uma malha pública de leitura.",
      route: `atlas/${authorityAtlas.slug}`
    }
  ];

  return (
    <PageTransition>
      <DynamicSEO
        fullTitle="Samuel Carrera Paes | Direção Criativa e Consultoria Criativa"
        description="Conheça Samuel Carrera Paes, diretor criativo e consultor criativo à frente da Paes Consultoria, com atuação em branding, eventos e ecossistemas de presença."
        url="sobre/samuel-carrera-paes"
        image={homePortrait}
        schemaType="ProfilePage"
        schemaExtra={{
          mainEntity: { "@id": `${SITE_URL}/#samuel-carrera-paes` },
          about: [
            { "@id": `${SITE_URL}/#samuel-carrera-paes` },
            { "@id": `${SITE_URL}/#paes-consultoria` },
            { "@id": `${SITE_URL}/#banal` },
            { "@id": `${SITE_URL}/#verde-burgo-eventos` }
          ]
        }}
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="samuel-entity-title">
        <header className="grid gap-14 border-b border-stone-900/10 pb-20 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <span className="mb-10 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">SOBRE SAMUEL CARRERA PAES</span>
            <h1 id="samuel-entity-title" className="font-serif text-5xl leading-[0.85] tracking-tighter text-stone-950 md:text-[7rem] text-balance">
              Diretor criativo, consultor criativo e criador de ecossistemas de presença.
            </h1>
          </div>
          <div className="self-end">
            <p className="max-w-3xl text-xl font-light leading-relaxed text-stone-700 md:text-3xl text-balance">
              Samuel Carrera Paes atua na interseção entre direção criativa, consultoria, branding, eventos, comunicação e experiência.
            </p>
            <p className="mt-8 max-w-3xl text-base font-light leading-relaxed text-stone-600 md:text-lg">
              Seu trabalho parte de uma pergunta central: como transformar intenção em presença real? A resposta se organiza em estratégia, linguagem, percepção, operação e execução, sempre com atenção ao que uma marca, empresa ou evento precisa sustentar no mundo.
            </p>
          </div>
        </header>

        <section className="grid gap-12 border-b border-stone-900/10 py-16 lg:grid-cols-[0.72fr_1.28fr]" aria-labelledby="samuel-atuacao-title">
          <figure className="bg-[#F4F0E9]">
            <ImageWithFallback
              src={homePortrait}
              mode="natural"
              alt="Retrato editorial de Samuel Carrera Paes, diretor criativo e consultor criativo da Paes Consultoria"
              imageClassName="mix-blend-multiply"
              fallbackLabel="Samuel Carrera Paes"
            />
          </figure>
          <div className="self-center">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">ATUAÇÃO</span>
            <h2 id="samuel-atuacao-title" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Criar não apenas peças, mas sistemas capazes de continuar operando.
            </h2>
            <div className="mt-10 space-y-7 text-base font-light leading-relaxed text-stone-700 md:text-xl">
              <p>
                A direção criativa aparece como critério: define linguagem, ordena repertório e conecta imagem, experiência e decisão. A consultoria criativa aparece como método: lê contexto, identifica ruídos e constrói caminhos possíveis sem separar pensamento de execução.
              </p>
              <p>
                A Paes Consultoria funciona como núcleo dessa visão. A BANAL concentra a camada de branding, marketing, conteúdo, comunicação e presença. A Verde Burgo atua no campo de eventos, experiências, produção e direção criativa aplicada. Provence Raiz entra como projeto que materializa atmosfera, memória e operação dentro desse ecossistema.
              </p>
              <p>
                A Biblioteca organiza a dimensão intelectual do trabalho: artigos, ensaios e conceitos que ajudam a sustentar publicamente a relação entre criação, percepção, valor e presença.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-stone-900/10 py-16 md:grid-cols-3" aria-label="Territórios de atuação de Samuel Carrera Paes">
          {[
            ["Direção criativa", "Transformar estratégia em linguagem, atmosfera, narrativa e experiência reconhecível."],
            ["Consultoria criativa", "Ler marca, mercado, operação e percepção para orientar decisões com clareza."],
            ["Ecossistema de presença", "Conectar empresas, projetos, serviços e pensamento em uma estrutura autoral e legível."]
          ].map(([title, text]) => (
            <section key={title} className="border-t border-stone-900/10 pt-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900">{title}</h2>
              <p className="mt-5 text-sm font-light leading-relaxed text-stone-600 md:text-base">{text}</p>
            </section>
          ))}
        </section>

        <EditorialConnectionGrid
          eyebrow="MALHA DO ECOSSISTEMA"
          title="As frentes públicas que organizam a atuação de Samuel Carrera Paes."
          items={connections}
          navigate={navigate}
        />
      </article>
    </PageTransition>
  );
}

function Inicio({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO title="Início" />
      <section className="mx-auto max-w-[96rem] px-6 pt-10 lg:px-12" aria-labelledby="home-title">
        <div className="grid gap-8 border-b border-stone-900/10 pb-10 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: PREMIUM_EASE }}
            className="flex flex-col justify-between border-b border-stone-900/10 pb-8 lg:border-b-0 lg:border-r lg:pr-10 xl:pr-14"
          >
            <div>
              <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400">
                Paes Consultoria · Ecossistema Criativo
              </p>
              <h1
                id="home-title"
                className="max-w-6xl font-serif text-[19vw] leading-[0.78] tracking-tight text-stone-950 sm:text-[8.8rem] md:text-[10rem] lg:text-[11rem] xl:text-[12.5rem] text-balance"
              >
                Samuel
                <br aria-hidden="true" />
                Paes.
              </h1>
              <div className="mt-10 grid gap-8 border-t border-stone-900/10 pt-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
                <p className="font-serif text-3xl leading-tight text-stone-950 md:text-5xl text-balance">
                  Diretor Criativo / Consultor Criativo
                </p>
                <p className="max-w-2xl text-lg font-light leading-relaxed text-stone-700 md:text-xl">
                  Cria empresas, identidades, narrativas e estruturas criativas capazes de transformar intenção em presença real.
                </p>
              </div>
            </div>

            <dl className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {homeProofMetrics.map(([value, label]) => (
                <div key={label} className="border-t border-stone-900/10 pt-5">
                  <dd className="font-serif text-4xl leading-none text-stone-950">{value}</dd>
                  <dt className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{label}</dt>
                </div>
              ))}
            </dl>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: PREMIUM_EASE }}
            className="grid gap-6"
          >
            <section className="flex min-h-[24rem] flex-col justify-between bg-stone-950 p-7 text-[#F4F0E9] rounded-sm md:p-10" aria-labelledby="home-map-title">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F4F0E9]/50">Mapa público</p>
              <div>
                <h2 id="home-map-title" className="mt-8 font-serif text-4xl leading-[0.95] md:text-6xl lg:text-5xl xl:text-6xl text-balance">
                  Ecossistema criativo autoral.
                </h2>
                <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[#F4F0E9]/70 md:text-lg">
                  Uma estrutura pública para conectar visão, empresas, projetos e biblioteca sem reduzir o trabalho a um catálogo de cases.
                </p>
              </div>
              <div className="mt-10 grid gap-2">
                {ecosystemPublicFlow.map((step) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => navigate(step.route)}
                    className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-t border-[#F4F0E9]/10 py-4 text-left transition-colors duration-500 hover:border-[#F4F0E9]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E9] rounded-sm"
                  >
                    <span className="font-serif text-3xl text-[#F4F0E9]/35" aria-hidden="true">{step.number}</span>
                    <span>
                      <span className="block text-sm font-bold uppercase tracking-[0.2em] text-[#F4F0E9]">{step.title}</span>
                      <span className="mt-1 block text-xs font-light leading-relaxed text-[#F4F0E9]/55">{step.label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#F4F0E9]/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          </motion.div>
        </div>

        <section className="grid gap-6 py-10 md:grid-cols-2" aria-label="Empresas do ecossistema Paes Consultoria">
          {consultancyCompanies.map((company) => (
            <button
              key={company.id}
              type="button"
              onClick={() => navigate(company.route)}
              className="group grid min-h-[22rem] gap-8 border border-stone-900/10 bg-white/30 p-6 text-left transition-colors duration-500 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm lg:grid-cols-[0.95fr_1.05fr]"
              aria-label={`Abrir ${company.name}`}
            >
              <figure className="flex min-h-56 items-center justify-center overflow-hidden bg-[#F8F5EF] p-8 rounded-sm">
                <img
                  src={company.id === "banal" ? banalAssets.balancedLogo : verdeBurgoBrandAssets.balancedLogo}
                  alt={`${company.name}, empresa do ecossistema Samuel Carrera Paes`}
                  loading="eager"
                  decoding="async"
                  className="max-h-36 w-full max-w-[20rem] object-contain transition duration-700 group-hover:scale-[1.03]"
                />
              </figure>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{company.eyebrow}</p>
                  <h2 className="mt-6 font-serif text-5xl leading-none text-stone-950">{company.name}</h2>
                  <p className="mt-6 text-base font-light leading-relaxed text-stone-600">{company.description}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900">
                  Entrar <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </section>
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
              O núcleo que transforma visão em empresas.
            </h1>
          </div>
          <div className="max-w-3xl self-end">
            <p className="text-xl font-light leading-relaxed text-stone-700 md:text-3xl text-balance">
              A Paes Consultoria é a estrutura central de Samuel Carrera Paes para criar, dirigir e organizar marcas, eventos, projetos, métodos e presença pública.
            </p>
            <p className="mt-8 text-base font-light leading-relaxed text-stone-600 md:text-lg">
              BANAL e Verde Burgo atuam em mercados diferentes, mas compartilham a mesma base: direção criativa, identidade, experiência, operação e coerência de valor.
            </p>
          </div>
        </header>

        <section className="grid gap-8 border-b border-stone-900/10 py-16 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="consultoria-operating-title">
          <div className="bg-stone-950 p-8 text-[#F4F0E9] rounded-sm md:p-10">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#F4F0E9]/50">Arquitetura pública</span>
            <h2 id="consultoria-operating-title" className="font-serif text-4xl leading-tight md:text-6xl text-balance">
              Uma pessoa, uma visão, empresas especializadas e uma biblioteca que sustenta a tese.
            </h2>
            <p className="mt-8 text-base font-light leading-relaxed text-[#F4F0E9]/70 md:text-lg">
              O site precisa deixar claro que cada frente tem uma função: a Paes Consultoria organiza a visão; a BANAL concentra marca e comunicação; a Verde Burgo concentra eventos completos; os projetos provam a execução; a Biblioteca registra pensamento e repertório.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {operatingLanes.map(([title, text], index) => (
              <article key={title} className="flex min-h-full flex-col border border-stone-900/10 bg-white/30 p-6 rounded-sm">
                <span className="font-serif text-4xl text-stone-300" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-stone-900">{title}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

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
              Projetos de branding, comunicação, varejo, posicionamento e conteúdo pertencem à BANAL como núcleos e desdobramentos. Projetos de festas, hospitalidade, produção e eventos pertencem à Verde Burgo, com Provence Raiz como primeiro projeto publicado.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="border border-stone-900/10 bg-white/35 p-8 rounded-sm">
              <div className="mb-10 flex items-center justify-between gap-6 border-b border-stone-900/10 pb-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">BANAL</p>
                  <h3 className="mt-3 font-serif text-4xl text-stone-950">Branding, marketing e comunicação.</h3>
                </div>
                <button type="button" onClick={() => navigate("empresas/banal")} className="hidden shrink-0 border-b border-stone-900/30 pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 md:block">
                  Ver empresa
                </button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {casesData.map((project) => (
                  <button key={project.id} type="button" onClick={() => navigate(`case/${project.id}`)} className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm">
                    <figure className="relative aspect-[4/3] overflow-hidden bg-stone-200/50 rounded-sm">
                      <ImageWithFallback src={project.thumb} alt={`Projeto BANAL por Samuel Carrera Paes: ${project.title}`} mode="cover" imageClassName="transition-transform duration-[1.5s] group-hover:scale-[1.04]" />
                    </figure>
                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{project.number} · {project.territory}</p>
                    <h4 className="mt-2 font-serif text-2xl leading-tight text-stone-950 group-hover:text-stone-600">{project.title}</h4>
                  </button>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-4 border-t border-stone-900/10 pt-8 md:flex-row md:items-center md:justify-between">
                <p className="max-w-xl text-sm font-light leading-relaxed text-stone-600">
                  A listagem mostra os {casesData.length} núcleos estruturados publicados. Alguns concentram desdobramentos internos, como Porti Natal/Verão e Campanhas & Collabs.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("empresas/banal")}
                  className="inline-flex w-fit items-center gap-3 border-b border-stone-900/30 pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                >
                  Ver arquivo BANAL <ArrowRightCircle className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>

            <article className="flex flex-col border border-stone-900/10 bg-white/35 p-8 rounded-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">VERDE BURGO</p>
              <h3 className="mt-3 font-serif text-4xl text-stone-950">Eventos completos, do planejamento à execução.</h3>
              <figure className="mt-8 aspect-[4/3] overflow-hidden bg-stone-200/50 rounded-sm">
                <ImageWithFallback src={verdeburgoAssets.mesaRefinada} alt="Projeto Provence Raiz dentro da Verde Burgo, com direção criativa de Samuel Paes" mode="cover" imageClassName="transition-transform duration-[1.5s] hover:scale-[1.03]" />
              </figure>
              <p className="mt-8 text-sm font-light leading-relaxed text-stone-600">
                Provence Raiz é o primeiro projeto publicado dentro da Verde Burgo: uma referência de como buffet, decoração, bar, cerimonial, ambientação, papelaria e produção podem operar em uma mesma identidade.
              </p>
              <button type="button" onClick={() => navigate("empresas/verde-burgo")} className="mt-auto pt-10 inline-flex w-fit items-center gap-3 border-b border-stone-900/30 pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900">
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
        fullTitle="BANAL | Branding, Marketing e Presença"
        description="BANAL é a empresa de branding, marketing, comunicação, varejo, posicionamento, narrativa, campanhas, collabs e estratégia criativa da Paes Consultoria."
        url="empresas/banal"
        image={banalAssets.balancedLogo}
        schemaType="CollectionPage"
        schemaExtra={{
          mainEntity: { "@id": `${SITE_URL}/#banal` },
          about: [
            { "@id": `${SITE_URL}/#samuel-carrera-paes` },
            { "@id": `${SITE_URL}/#paes-consultoria` },
            { "@id": `${SITE_URL}/#banal` }
          ]
        }}
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
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-stone-600 md:text-lg">
              A empresa concentra branding, marketing, posicionamento, conteúdo, campanhas, collabs, varejo e percepção de valor dentro da Paes Consultoria.
            </p>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-4 border-t border-stone-900/10 pt-6 sm:grid-cols-3">
              {banalRepertoireStats.map(([value, label]) => (
                <div key={label}>
                  <dt className="text-[8px] font-bold uppercase leading-relaxed tracking-[0.12em] text-stone-400 sm:text-[9px] sm:tracking-[0.22em]">{label}</dt>
                  <dd className="mt-3 font-serif text-2xl leading-none text-stone-950 sm:text-3xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="overflow-hidden border border-stone-900/10 bg-white/35 rounded-sm shadow-sm">
            <div className="aspect-[16/10] overflow-hidden bg-[#F8F5EF]">
              <ImageWithFallback
                src={banalAssets.showcase}
                alt="Prancha de identidade da BANAL com garrafa, mosca, logotipos e paleta principal."
                mode="contain"
                loading="eager"
                fetchPriority="high"
                imageClassName="transition-transform duration-[1.5s] hover:scale-[1.02]"
              />
            </div>
            <figcaption className="grid gap-4 border-t border-stone-900/10 p-6 md:grid-cols-[0.7fr_1.3fr]">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Identidade BANAL</span>
              <span className="text-sm font-light leading-relaxed text-stone-600">
                Marketing, estratégia e desejo tratados como sistema visual, verbal e comercial.
              </span>
            </figcaption>
          </figure>
        </section>

        <section className="border-b border-stone-900/10 py-20 md:py-28" aria-labelledby="banal-territorios">
          <header className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">TERRITÓRIOS DE ATUAÇÃO</span>
              <h2 id="banal-territorios" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
                A BANAL organiza a camada pública de desejo, leitura e valor.
              </h2>
            </div>
            <p className="max-w-4xl text-lg font-light leading-relaxed text-stone-700 md:text-xl">
              O trabalho não começa na peça final. Começa na pergunta sobre como uma marca deve ser percebida, lembrada, desejada e operada em canais reais: loja, campanha, conteúdo, collab, produto, vitrine e presença digital.
            </p>
          </header>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {banalTerritories.map(([title, text], index) => (
              <article key={title} className="border border-stone-900/10 bg-white/30 p-6 rounded-sm">
                <span className="font-serif text-4xl text-stone-300" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-stone-900">{title}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-stone-900/10 py-20 md:py-28" aria-labelledby="banal-arquivo">
          <header className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">ARQUIVO BANAL</span>
              <h2 id="banal-arquivo" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
                Os cards são núcleos. O repertório é maior.
              </h2>
            </div>
            <div>
              <p className="max-w-4xl text-lg font-light leading-relaxed text-stone-700 md:text-xl">
                A BANAL não deve ser lida como uma coleção fechada de onze trabalhos. Esses registros funcionam como páginas-mãe: concentram campanhas, ativações, collabs, vitrines, brand transitions, produto próprio, varejo e conteúdo em uma malha editorial que ainda está em expansão.
              </p>
              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                {banalRepertoireStats.map(([value, label]) => (
                  <div key={label} className="border-t border-stone-900/10 pt-5">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">{label}</dt>
                    <dd className="mt-3 font-serif text-3xl leading-none text-stone-950">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </header>

          <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {banalCaseGroups.map((group) => {
              const parentCase = casesData.find((project) => project.id === group.parentCaseId);
              return (
                <article key={group.id} className="flex min-h-full flex-col border border-stone-900/10 bg-white/25 p-6 rounded-sm">
                  <button
                    type="button"
                    onClick={() => parentCase && navigate(`case/${parentCase.id}`)}
                    className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">{group.label}</span>
                    <h3 className="mt-5 font-serif text-2xl leading-tight text-stone-950 group-hover:text-stone-600 text-balance">{group.title}</h3>
                    <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{group.summary}</p>
                  </button>
                  <div className="mt-8 border-t border-stone-900/10 pt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">Desdobramentos</p>
                    <ul className="mt-4 space-y-3">
                      {group.subprojects.map((item) => (
                        <li key={item.title} className="text-sm leading-relaxed text-stone-600">
                          <span className="font-semibold text-stone-900">{item.title}</span>
                          <span className="text-stone-400"> · {item.type}</span>
                          <span className="block text-xs font-light text-stone-500">{item.scope}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          <ul className="mt-12 grid gap-3 border-t border-stone-900/10 pt-8 md:grid-cols-2">
            {banalRepertoireNotes.map((note) => (
              <li key={note} className="text-sm font-light leading-relaxed text-stone-500">
                {note}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-stone-900/10 py-24 md:py-32" aria-labelledby="banal-projetos">
          <header className="mb-16 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">NÚCLEOS ESTRUTURADOS</span>
            <h2 id="banal-projetos" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Projetos de marketing, comunicação, varejo, marca e percepção que abrem o arquivo.
            </h2>
            <p className="mt-8 max-w-3xl text-base font-light leading-relaxed text-stone-600 md:text-lg">
              Cada card abaixo é uma entrada editorial para um território maior. Alguns são cases independentes; outros reúnem campanhas e collabs que serão aprofundadas à medida que o arquivo visual e narrativo for catalogado.
            </p>
          </header>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {casesData.map((project) => (
              <article key={project.id} className="group">
                <button type="button" onClick={() => navigate(`case/${project.id}`)} className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm">
                  <figure className="aspect-[4/5] overflow-hidden bg-stone-200/50 rounded-sm">
                    <ImageWithFallback src={project.thumb} alt={`Projeto BANAL por Samuel Carrera Paes: ${project.title}`} mode="cover" imageClassName="transition-transform duration-[1.5s] group-hover:scale-[1.04]" />
                  </figure>
                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{project.number} · {project.territory}</p>
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
                A BANAL é a frente de branding, marketing, posicionamento, narrativa, campanhas, collabs, varejo e percepção de valor da Paes Consultoria. Ela existe para negócios que precisam se tornar mais claros para o público, mais desejáveis para o mercado e mais coerentes nos seus canais.
              </p>
              <p>
                O trabalho vai além de aparência. A empresa organiza sinais, discurso, conteúdo, campanhas, collabs, produto, loja e presença comercial para que marca e mercado falem a mesma língua.
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

        <EditorialConnectionGrid
          eyebrow="Conexões da BANAL"
          title="A empresa dentro do ecossistema."
          description="A BANAL concentra os territórios de branding, marketing, comunicação, varejo, conteúdo, campanhas, collabs, produto próprio e percepção de valor dentro da arquitetura criativa de Samuel Carrera Paes."
          links={[
            { label: "Samuel Carrera Paes", text: "Direção criativa e visão que orientam a empresa.", route: "sobre/samuel-carrera-paes" },
            { label: "Mapa do ecossistema", text: "Serviços, empresas, cases e biblioteca em uma leitura única.", route: `atlas/${authorityAtlas.slug}` },
            { label: "Biblioteca", text: "Artigos que sustentam pensamento, método e repertório.", route: "biblioteca" }
          ]}
          navigate={navigate}
        />

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
          <button onClick={() => navigate("empresas/banal")} className="text-xs font-bold uppercase tracking-[0.2em] border-b border-stone-900 pb-1 hover:text-stone-600 transition-colors">Voltar à BANAL</button>
        </div>
      </PageTransition>
    );
  }

  const isLast = caseIndex === casesData.length - 1;
  const nextCaseId = !isLast ? casesData[caseIndex + 1].id : null;
  const caseGroup = getBanalCaseGroupByCaseId(c.id);

  return (
    <PageTransition>
      <DynamicSEO
        title={`${c.number}. ${c.title}`}
        description={c.seoDescription || c.shortTese}
        image={c.thumb}
        url={`case/${c.id}`}
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12 relative pb-20 md:pb-0">

        {/* A. Case Hero */}
        <header className="flex flex-col mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-6 block">NÚCLEO BANAL · {c.number}/{casesData.length}</span>
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

          <figure className="relative mb-24 aspect-[16/9] w-full overflow-hidden bg-stone-200/50 rounded-sm shadow-sm">
            <ImageWithFallback
              src={c.thumb}
              mode="cover"
              alt={`Fotografia de destaque do projeto ${c.title}, direção criativa de Samuel Carrera Paes para Paes Consultoria`}
              loading="eager"
              fetchPriority="high"
              imageClassName="transition-transform duration-[1.5s] hover:scale-[1.02]"
            />
          </figure>
        </header>

        {/* B. Director's Note */}
        <section aria-label="Nota do Diretor" className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-24 items-start">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Director's Note</h2>
          <blockquote className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight tracking-tight italic border-l-2 border-stone-900/10 pl-6 md:pl-10 text-balance">
            "{c.directorsNote}"
          </blockquote>
        </section>

        {c.caseDepth && (
          <section aria-labelledby={`case-depth-${c.id}`} className="mb-24 max-w-full overflow-hidden border-y border-stone-900/10 py-14">
            <header className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="min-w-0">
                <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Leitura ampliada</span>
                <h2 id={`case-depth-${c.id}`} className="font-serif text-3xl leading-tight text-stone-950 md:text-5xl text-balance">
                  {c.caseDepth.title}
                </h2>
              </div>
              <p className="min-w-0 max-w-4xl break-words text-base font-light leading-relaxed text-stone-700 md:text-xl">
                {c.caseDepth.intro}
              </p>
            </header>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {c.caseDepth.pillars.map(([title, text], index) => (
                <article key={title} className="min-w-0 border border-stone-900/10 bg-white/25 p-5 rounded-sm">
                  <span className="font-serif text-3xl text-stone-300" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-stone-900">{title}</h3>
                  <p className="mt-4 break-words text-sm font-light leading-relaxed text-stone-600">{text}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2 border-t border-stone-900/10 pt-8" aria-label="Territórios associados ao case">
              {c.caseDepth.signals.map((signal) => (
                <span key={signal} className="rounded-full border border-stone-900/10 bg-white/30 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-stone-500">
                  {signal}
                </span>
              ))}
            </div>
          </section>
        )}

        {caseGroup && (
          <section aria-labelledby="case-desdobramentos" className="mb-24 grid gap-8 border-y border-stone-900/10 py-12 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">ARQUIVO BANAL</span>
              <h2 id="case-desdobramentos" className="font-serif text-3xl leading-tight text-stone-950 md:text-5xl text-balance">
                Núcleo e desdobramentos.
              </h2>
            </div>
            <div>
              <p className="max-w-3xl text-base font-light leading-relaxed text-stone-600 md:text-lg">
                {caseGroup.summary}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {caseGroup.subprojects.map((item) => (
                  <article key={item.title} className="border border-stone-900/10 bg-white/25 p-5 rounded-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">{item.type}</p>
                    <h3 className="mt-4 font-serif text-2xl leading-tight text-stone-950">{item.title}</h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-stone-600">{item.scope}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

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
              {["Natal", "Verão"].map((subTitle, sIdx) => {
                const sliceStart = sIdx === 0 ? 0 : 4;
                const sliceEnd = sIdx === 0 ? 4 : 10;
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
            onClick={() => navigate("empresas/banal")}
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
  const openProvence = () => navigate("projetos/provence-raiz");

  return (
    <PageTransition>
      <DynamicSEO
        title="Verde Burgo"
        fullTitle="Verde Burgo | Eventos, Experiências e Direção Criativa"
        description="Verde Burgo é uma empresa de eventos com buffet, decoração, bar, cerimonial, planejamento, produção e execução, com direção criativa aplicada por Samuel Paes."
        url="empresas/verde-burgo"
        image={verdeBurgoBrandAssets.caseCover}
        schemaType="CollectionPage"
        schemaExtra={{
          mainEntity: { "@id": `${SITE_URL}/#verde-burgo-eventos` },
          about: [
            { "@id": `${SITE_URL}/#samuel-carrera-paes` },
            { "@id": `${SITE_URL}/#paes-consultoria` },
            { "@id": `${SITE_URL}/#verde-burgo-eventos` }
          ]
        }}
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
              onClick={openProvence}
              className="group mt-14 inline-flex w-fit items-center gap-4 border-b border-[#F4F0E9]/40 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F4F0E9] transition-colors hover:border-[#F4F0E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E9] rounded-sm"
            >
              Ver Provence Raiz
              <ArrowRightCircle className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="border-b border-stone-900/10 py-20 md:py-28" aria-labelledby="verdeburgo-entrega">
          <header className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">O que a empresa resolve</span>
              <h2 id="verdeburgo-entrega" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
                Uma festa completa sem o cliente costurar fornecedores soltos.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="max-w-4xl text-lg font-light leading-relaxed text-stone-700 md:text-xl">
                A Verde Burgo é comercialmente simples de entender: realiza festas e eventos com planejamento, buffet, decoração, bar, cerimonial, produção e execução. A diferença está na direção criativa que faz tudo conversar como uma comunicação 360 graus.
              </p>
              <button
                type="button"
                onClick={() => navigate("contato")}
                className="inline-flex items-center gap-3 border-b border-stone-900/30 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
              >
                Planejar um evento <ArrowRightCircle className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {verdeBurgoDeliveryStack.map(([title, text]) => (
              <article key={title} className="border border-stone-900/10 bg-white/30 p-6 rounded-sm">
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900">{title}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{text}</p>
              </article>
            ))}
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
              { title: "Provence Raiz", status: "Primeiro projeto publicado", media: verdeburgoAssets.hero, type: "image", action: openProvence },
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

        <EditorialConnectionGrid
          eyebrow="Conexões da Verde Burgo"
          title="Evento como empresa, projeto e linguagem."
          description="A Verde Burgo concentra eventos completos. Provence Raiz mostra a primeira aplicação publicada dessa visão, enquanto a Biblioteca sustenta o pensamento sobre experiência, presença e execução."
          links={[
            { label: "Provence Raiz", text: "Primeiro projeto publicado dentro da Verde Burgo.", route: "projetos/provence-raiz" },
            { label: "Samuel Carrera Paes", text: "Direção criativa e identidade aplicada aos eventos.", route: "sobre/samuel-carrera-paes" },
            { label: "Geração dos Realizadores", text: "A tese que conecta visão, operação e presença real.", route: "biblioteca/geracao-dos-realizadores" }
          ]}
          navigate={navigate}
        />

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

function ProvenceRaizPage({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO
        title="Provence Raiz"
        fullTitle="Provence Raiz | Projeto e Experiência Criativa"
        description="Provence Raiz é um projeto dentro da Verde Burgo, com evento completo, direção criativa, identidade visual, ambientação, buffet, bar, cerimonial e produção."
        url="projetos/provence-raiz"
        image={verdeburgoAssets.hero}
        schemaType="CreativeWork"
        schemaExtra={{
          name: "Provence Raiz",
          creator: { "@id": `${SITE_URL}/#samuel-carrera-paes` },
          isPartOf: { "@id": `${SITE_URL}/#verde-burgo-eventos` },
          about: [
            "eventos",
            "direção criativa",
            "cenografia",
            "hospitalidade",
            "identidade de evento",
            "Verde Burgo Eventos"
          ]
        }}
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="provence-page-title">
        <header className="grid gap-12 border-b border-stone-900/10 pb-20 lg:grid-cols-[0.68fr_1.32fr]">
          <aside>
            <button
              type="button"
              onClick={() => navigate("empresas/verde-burgo")}
              className="mb-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              <ArrowLeftCircle className="h-4 w-4" aria-hidden="true" /> Verde Burgo
            </button>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Primeiro projeto publicado</span>
            <dl className="grid gap-6 border-t border-stone-900/10 pt-8">
              {[
                ["Empresa", "Verde Burgo Eventos"],
                ["Direção criativa", "Samuel Carrera Paes"],
                ["Território", "Casamento, evento e experiência"],
                ["Camadas", "Buffet, decoração, bar, cerimonial, ambientação e produção"]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{label}</dt>
                  <dd className="mt-2 text-sm font-light leading-relaxed text-stone-700">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="self-end">
            <h1 id="provence-page-title" className="font-serif text-6xl leading-[0.82] tracking-tight text-stone-950 md:text-[8rem] text-balance">
              Provence Raiz.
            </h1>
            <p className="mt-10 max-w-4xl text-xl font-light leading-relaxed text-stone-700 md:text-3xl text-balance">
              Um projeto dentro da Verde Burgo que mostra como uma festa pode funcionar como comunicação 360 graus: serviço, matéria, decoração, bar, cerimônia, papelaria, percurso e atmosfera sustentando a mesma identidade.
            </p>
          </div>
        </header>

        <figure className="grid gap-6 border-b border-stone-900/10 py-16 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative aspect-[16/10] overflow-hidden bg-stone-200/40 rounded-sm shadow-sm">
            <ImageWithFallback
              src={verdeburgoAssets.hero}
              alt="Mural contemporâneo inspirado em Toile de Jouy para o projeto Provence Raiz da Verde Burgo, com direção criativa de Samuel Carrera Paes."
              mode="cover"
              loading="eager"
              imageClassName="transition-transform duration-[1.5s] ease-out hover:scale-[1.02]"
            />
          </div>
          <figcaption className="flex flex-col justify-end border-l border-stone-900/10 pl-8 text-sm font-light leading-relaxed text-stone-600">
            <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Imagem matriz</span>
            A memória gráfica aparece como linguagem de evento, não como estampa decorativa. Ela cria pano de fundo, repertório e coerência para a experiência física.
          </figcaption>
        </figure>

        <section className="grid gap-12 border-b border-stone-900/10 py-24 md:py-32 lg:grid-cols-[0.85fr_1.15fr]" aria-labelledby="provence-system-title">
          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Sistema do projeto</span>
            <h2 id="provence-system-title" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Não é cenário isolado. É identidade aplicada ao evento inteiro.
            </h2>
          </div>
          <div className="space-y-7 text-lg font-light leading-relaxed text-stone-700 md:text-xl">
            <p>
              Provence Raiz organiza a festa como uma experiência completa. O espaço não aparece como vitrine de decoração, mas como matéria viva da narrativa: luz, textura, desenho, cheiro, comida, rito, circulação e permanência precisam conversar.
            </p>
            <p>
              A Verde Burgo entra como operação integrada. Samuel Paes entra como direção criativa, construindo a linguagem que permite que buffet, decoração, bar, cerimonial e produção trabalhem dentro de uma única presença.
            </p>
            <p>
              O valor do projeto está na coerência entre desejo e execução. Uma festa sofisticada precisa ser bonita, possível, montável, servida com precisão e lembrada como experiência.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32" aria-labelledby="provence-camadas-title">
          <header className="mb-16 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Camadas visuais</span>
            <h2 id="provence-camadas-title" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Da referência gráfica ao objeto físico.
            </h2>
          </header>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Mesa e hospitalidade",
                image: verdeburgoAssets.mesaRefinada,
                alt: "Mesa de bolo Provence Raiz com mural Toile de Jouy, luminárias e composição floral da Verde Burgo.",
                text: "A mesa funciona como ponto de permanência, serviço e memória visual."
              },
              {
                title: "Cerimônia",
                image: verdeburgoAssets.cerimoniaRefinada,
                alt: "Cerimônia Provence Raiz com passarela, altar e flores em direção criativa da Verde Burgo.",
                text: "A cerimônia precisa sustentar emoção, eixo visual, escala e leitura do rito."
              },
              {
                title: "Volume natural",
                image: verdeburgoAssets.volumeNatural,
                alt: "Estudo floral Volume Natural, Nunca Artificial do projeto Provence Raiz.",
                text: "O floral entra com assimetria, hastes aparentes e imperfeição elegante."
              },
              {
                title: "Pilastras cenográficas",
                image: verdeburgoAssets.pilastrasRefinada,
                alt: "Prancha técnica de pilastras cenográficas para altar Provence Raiz.",
                text: "A peça cenográfica organiza presença, escala e leitura sem fechar o espaço."
              },
              {
                title: "Luminária carretel",
                image: verdeburgoAssets.luminariaCarretelRefinada,
                alt: "Prancha técnica da luminária pêndulo carretel cenográfico Provence Raiz.",
                text: "O objeto traduz atmosfera em engenharia de luz, material e montagem."
              },
              {
                title: "Escada floral",
                image: verdeburgoAssets.escadaRefinada,
                alt: "Escada com cascata floral no projeto Provence Raiz da Verde Burgo.",
                text: "O percurso também comunica, criando transição entre chegada, memória e experiência."
              }
            ].map((item) => (
              <article key={item.title} className="border-t border-stone-900/10 pt-8">
                <figure className="relative aspect-[4/3] overflow-hidden bg-white/40 rounded-sm shadow-sm">
                  <ImageWithFallback src={item.image} alt={item.alt} mode="cover" imageClassName="transition-transform duration-[1.5s] ease-out hover:scale-[1.02]" />
                </figure>
                <h3 className="mt-8 font-serif text-3xl leading-tight text-stone-950">{item.title}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <EditorialConnectionGrid
          eyebrow="Conexões do projeto"
          title="Provence Raiz dentro da malha do ecossistema."
          description="A página conecta o projeto à Verde Burgo, à direção criativa de Samuel Carrera Paes e aos serviços que tornam o evento executável."
          links={[
            { label: "Verde Burgo Eventos", text: "Empresa de eventos completos com direção criativa aplicada.", route: "empresas/verde-burgo" },
            { label: "Eventos", text: "Festas como experiência integrada de serviço, operação e identidade.", route: "servicos/eventos" },
            { label: "Decoração", text: "Atmosfera construída com matéria, memória e intenção.", route: "servicos/decoracao" }
          ]}
          navigate={navigate}
        />
      </article>
    </PageTransition>
  );
}

function GeracaoDosRealizadoresPage({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO
        title="Geração dos Realizadores"
        fullTitle="Geração dos Realizadores | Biblioteca Paes Consultoria"
        description="A Geração dos Realizadores organiza a tese de Samuel Carrera Paes sobre visão, repertório, inteligência artificial, direção criativa, operação e execução."
        url="biblioteca/geracao-dos-realizadores"
        image={homePortrait}
        schemaType="Article"
        schemaExtra={{
          headline: "Geração dos Realizadores",
          author: { "@id": `${SITE_URL}/#samuel-carrera-paes` },
          publisher: { "@id": `${SITE_URL}/#paes-consultoria` },
          about: [
            "direção criativa",
            "consultoria criativa",
            "inteligência artificial",
            "execução",
            "ecossistemas criativos"
          ]
        }}
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="geracao-title">
        <header className="grid gap-12 border-b border-stone-900/10 pb-20 lg:grid-cols-[0.7fr_1.3fr]">
          <aside>
            <button
              type="button"
              onClick={() => navigate("biblioteca")}
              className="mb-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              <ArrowLeftCircle className="h-4 w-4" aria-hidden="true" /> Biblioteca
            </button>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Manifesto / Tese</span>
            <p className="border-t border-stone-900/10 pt-8 text-sm font-light leading-relaxed text-stone-600">
              Texto matriz para entender Samuel Carrera Paes como diretor criativo, consultor criativo e criador de empresas, sistemas, identidades e narrativas.
            </p>
          </aside>
          <div className="self-end">
            <h1 id="geracao-title" className="font-serif text-5xl leading-[0.85] tracking-tight text-stone-950 md:text-[7rem] text-balance">
              A Geração dos Realizadores.
            </h1>
            <p className="mt-10 max-w-4xl text-xl font-light leading-relaxed text-stone-700 md:text-3xl text-balance">
              Uma geração que não separa repertório de execução, inteligência de presença, estética de operação. Ela cria empresas, métodos, campanhas, eventos e sistemas capazes de transformar intenção em realidade.
            </p>
          </div>
        </header>

        <section className="grid gap-12 border-b border-stone-900/10 py-24 md:py-32 lg:grid-cols-[0.85fr_1.15fr]" aria-labelledby="geracao-contexto-title">
          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Contexto</span>
            <h2 id="geracao-contexto-title" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              Criar já não é apenas imaginar. É estruturar, testar, operar e publicar.
            </h2>
          </div>
          <div className="space-y-7 text-lg font-light leading-relaxed text-stone-700 md:text-xl">
            <p>
              A tese parte de uma mudança clara: repertório, ferramentas digitais, inteligência artificial e execução ficaram mais próximos. O profissional que apenas idealiza perde força. O realizador ganha relevância porque consegue conduzir a visão até a presença concreta.
            </p>
            <p>
              No ecossistema Samuel Paes, essa lógica aparece em três camadas. A Paes Consultoria organiza visão, diagnóstico e direção. A BANAL traduz marca, marketing e percepção. A Verde Burgo transforma evento, festa, serviço e atmosfera em experiência integrada.
            </p>
            <p>
              A Geração dos Realizadores não celebra pressa. Ela exige critério. A execução só vira valor quando nasce de leitura, identidade, operação e coerência.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32" aria-labelledby="geracao-pilares-title">
          <header className="mb-16 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Pilares</span>
            <h2 id="geracao-pilares-title" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              O pensamento que sustenta o ecossistema.
            </h2>
          </header>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Visão", "A capacidade de formular uma direção própria antes de escolher forma, canal ou ferramenta."],
              ["Repertório", "A leitura de referências, contextos, materiais, comportamentos e sinais culturais."],
              ["Sistema", "A organização de empresas, serviços, conteúdos e processos para que a ideia tenha continuidade."],
              ["Execução", "A disciplina de fazer a visão sobreviver ao orçamento, ao tempo, à equipe e ao mundo real."]
            ].map(([title, text]) => (
              <section key={title} className="border-t border-stone-900/10 pt-8">
                <h3 className="font-serif text-3xl leading-tight text-stone-950">{title}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{text}</p>
              </section>
            ))}
          </div>
        </section>

        <EditorialConnectionGrid
          eyebrow="Leitura relacionada"
          title="A tese aplicada no site."
          description="Esta página funciona como base intelectual para as empresas, os serviços e os projetos do ecossistema."
          links={[
            { label: "Samuel Carrera Paes", text: "Diretor criativo, consultor criativo e criador do ecossistema.", route: "sobre/samuel-carrera-paes" },
            { label: "BANAL", text: "A frente de marca, marketing, posicionamento e narrativa.", route: "empresas/banal" },
            { label: "Verde Burgo", text: "A frente de eventos, festas, serviço, atmosfera e execução.", route: "empresas/verde-burgo" }
          ]}
          navigate={navigate}
        />
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

        <section className="grid gap-10 border-y border-stone-900/10 py-16 lg:grid-cols-[0.72fr_1.28fr]" aria-labelledby="biblioteca-territorios">
          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">HUB INTELECTUAL</span>
            <h2 id="biblioteca-territorios" className="font-serif text-4xl leading-tight text-stone-950 md:text-6xl text-balance">
              A Biblioteca sustenta as empresas antes de parecer blog.
            </h2>
          </div>
          <div>
            <p className="max-w-4xl text-lg font-light leading-relaxed text-stone-700 md:text-xl">
              Cada texto deve ampliar a associação pública entre Samuel Carrera Paes, Paes Consultoria, BANAL, Verde Burgo, direção criativa, marketing, eventos, varejo, hospitalidade e sistemas de percepção.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {bibliotecaTerritories.map(([title, text]) => (
                <article key={title} className="border border-stone-900/10 bg-white/30 p-5 rounded-sm">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-900">{title}</h3>
                  <p className="mt-4 text-xs font-light leading-relaxed text-stone-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 border-t border-stone-900/10 pt-16">
          <article className="group flex min-h-[24rem] flex-col border border-stone-900/20 bg-stone-950 text-[#F4F0E9] transition-all duration-700 hover:bg-stone-800 rounded-sm md:col-span-2 lg:col-span-1">
            <button
              type="button"
              onClick={() => navigate("biblioteca/geracao-dos-realizadores")}
              aria-label="Ler artigo A Geração dos Realizadores"
              className="flex h-full flex-col p-8 md:p-10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              <span className="font-serif text-4xl mb-8 text-[#F4F0E9]/35" aria-hidden="true">00.</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] mb-3">Manifesto</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4F0E9]/55 mb-6 block">Visão, IA, operação e execução</span>
              <p className="font-serif text-2xl leading-tight mb-6 text-balance">A Geração dos Realizadores</p>
              <p className="text-sm font-light text-[#F4F0E9]/70 leading-relaxed mb-8">
                A tese que apresenta Samuel Carrera Paes como diretor criativo, consultor criativo e criador de empresas, métodos, narrativas e sistemas.
              </p>
              <span className="mt-auto inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em]">
                Ler tese <ArrowRightCircle className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </button>
          </article>
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
              ["BANAL", "Branding, marketing, posicionamento, narrativa, conteúdo, campanhas, collabs, varejo, produto próprio e percepção de valor."],
              ["Verde Burgo Eventos", "Eventos completos com buffet, decoração, bar, cerimonial, planejamento, produção e direção criativa. Provence Raiz é o primeiro projeto publicado."]
            ].map(([title, text]) => (
              <section key={title} className="border-t border-stone-900/10 pt-8">
                <h2 className="font-serif text-3xl leading-tight text-stone-950">{title}</h2>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">{text}</p>
              </section>
            ))}
          </div>
          <div className="mt-14 grid gap-8 border-t border-stone-900/10 pt-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">ARQUIVO DE REPERTÓRIO</span>
              <h2 className="font-serif text-3xl leading-tight text-stone-950 md:text-5xl text-balance">
                A malha pública deve crescer sem perder hierarquia.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="border border-stone-900/10 bg-white/25 p-6 rounded-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">BANAL</p>
                <p className="mt-5 font-serif text-3xl leading-tight text-stone-950">{banalCaseGroups.length} núcleos estruturados.</p>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">
                  Inclui Porti Natal e Verão, Basquiat, Netflix/Tudum, Mangueira, Paraíso Tropical e outros projetos em catalogação editorial.
                </p>
              </article>
              <article className="border border-stone-900/10 bg-white/25 p-6 rounded-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">VERDE BURGO</p>
                <p className="mt-5 font-serif text-3xl leading-tight text-stone-950">Empresa antes do case.</p>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">
                  A frente comercial é eventos completos. Provence Raiz funciona como primeiro projeto publicado e demonstração de linguagem.
                </p>
              </article>
            </div>
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
  const relatedBanalGroups = banalCaseGroups.filter((group) => service.relatedCases.includes(group.parentCaseId));
  const relatedBanalSubprojects = relatedBanalGroups.flatMap((group) =>
    group.subprojects.map((item) => ({ ...item, parentTitle: group.title }))
  );
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
                {relatedBanalSubprojects.length > 0 && (
                  <div className="border-t border-stone-900/10 pt-6">
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">Desdobramentos BANAL</p>
                    <div className="grid gap-3">
                      {relatedBanalSubprojects.map((item) => (
                        <div key={`${item.parentTitle}-${item.title}`} className="bg-white/25 px-4 py-4 rounded-sm">
                          <p className="text-xs font-semibold text-stone-900">{item.title}</p>
                          <p className="mt-1 text-xs font-light leading-relaxed text-stone-500">{item.parentTitle} · {item.scope}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigate("projetos/provence-raiz")}
                className="group flex w-full items-center justify-between gap-6 border-t border-stone-900/10 pt-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
              >
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">Primeiro projeto publicado</span>
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

  const copyText = async (text) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  };

  const handleCopy = async (text, type) => {
    try {
      const copied = await copyText(text);
      setToast(copied ? `${type} copiado com sucesso!` : `${type}: ${text}`);
    } catch {
      setToast(`${type}: ${text}`);
    }
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
                  <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                    <img src={choice.image} alt={choice.name} className={`${choice.imageClassName} grayscale contrast-125`} loading="lazy" decoding="async" />
                    <span className="text-left text-[10px] font-bold uppercase leading-relaxed tracking-[0.25em] text-stone-400 sm:text-right">{choice.eyebrow}</span>
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

function NotFoundPage({ route, navigate }) {
  return (
    <PageTransition>
      <DynamicSEO
        title="Página não encontrada"
        description="A rota solicitada não foi encontrada no ecossistema Paes Consultoria. Continue pela visão, empresas, biblioteca ou contato."
        url={route || "404"}
      />
      <article className="mx-auto flex min-h-[70vh] max-w-[90rem] flex-col justify-center px-6 pt-12 lg:px-12" aria-labelledby="not-found-title">
        <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">404 · ROTA NÃO ENCONTRADA</span>
        <h1 id="not-found-title" className="max-w-5xl font-serif text-5xl leading-none tracking-[-0.02em] text-stone-950 md:text-7xl">
          Esta página não existe no ecossistema público.
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
          O caminho pode ter mudado, ou o conteúdo ainda não foi publicado. Continue pela visão de Samuel Carrera Paes, pelas empresas ou pela Biblioteca.
        </p>
        <nav className="mt-12 flex flex-wrap gap-4" aria-label="Rotas de recuperação">
          {[
            ["inicio", "Início"],
            ["empresas/banal", "BANAL"],
            ["empresas/verde-burgo", "Verde Burgo"],
            ["biblioteca", "Biblioteca"],
            ["contato", "Contato"]
          ].map(([target, label]) => (
            <button
              key={target}
              type="button"
              onClick={() => navigate(target)}
              className="border border-stone-900/15 bg-white/25 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-900 transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              {label}
            </button>
          ))}
        </nav>
      </article>
    </PageTransition>
  );
}

// --- APP PRINCIPAL E NAVBAR ---

export default function SamuelPaesPortfolio() {
  const { route, navigate } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Prevent scroll when mobile menu is open (Acessibilidade + UX)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    const focusFirstItem = () => {
      const firstItem = mobileMenuRef.current?.querySelector(focusableSelector);
      firstItem?.focus();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || !mobileMenuRef.current) return;

      const focusableItems = Array.from(mobileMenuRef.current.querySelectorAll(focusableSelector));
      if (!focusableItems.length) return;

      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    window.requestAnimationFrame(focusFirstItem);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { id: "sobre/samuel-carrera-paes", num: "01.", label: "Sobre" },
    { id: "visao", num: "02.", label: "Minha Visão" },
    { id: "biblioteca", num: "03.", label: "Biblioteca" },
    { id: "contato", num: "04.", label: "Contato" },
  ];

  const companyLinks = [
    {
      id: "empresas/banal",
      label: "BANAL",
      image: banalAssets.balancedLogo,
      buttonClassName: "w-[5.75rem]",
      mobileButtonClassName: "w-12 sm:w-[4.25rem]",
      imageClassName: "h-8 w-full md:h-9"
    },
    {
      id: "empresas/verde-burgo",
      label: "Verde Burgo",
      image: verdeBurgoBrandAssets.balancedLogo,
      buttonClassName: "w-[5.75rem]",
      mobileButtonClassName: "w-12 sm:w-[4.25rem]",
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
  const isConsultoriaArea = route === "inicio" || route === "ecossistema" || route === "paes-consultoria" || route === "sobre/samuel-carrera-paes" || isAtlasRoute;
  const isBanalArea = route === "banal" || route === "empresas/banal" || route === "cases" || isCaseDetail;
  const isVerdeBurgoArea = route === "verdeburgo" || route === "empresas/verde-burgo" || route === "projetos/provence-raiz";
  const routeMatches =
    route === "inicio" ||
    route === "sobre/samuel-carrera-paes" ||
    route === "visao" ||
    route === "ecossistema" ||
    route === "paes-consultoria" ||
    route === "cases" ||
    route === "banal" ||
    route === "empresas/banal" ||
    route.startsWith("case/") ||
    route === "verdeburgo" ||
    route === "empresas/verde-burgo" ||
    route === "projetos/provence-raiz" ||
    route === "biblioteca" ||
    route === "sistema" ||
    route.startsWith("biblioteca/") ||
    route.startsWith("sistema/") ||
    route === `atlas/${authorityAtlas.slug}` ||
    route.startsWith("servicos/") ||
    route === "contato";

  return (
    <div className="min-h-screen bg-[#F4F0E9] text-stone-950 font-sans selection:bg-stone-900 selection:text-[#F4F0E9]">

      {/* NAVBAR GLOBAL FIXA - EDITORIAL */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#F4F0E9]/90 backdrop-blur-xl border-b border-stone-900/10 transition-all duration-500">
        <nav aria-label="Navegação Principal" className="mx-auto flex h-24 max-w-[90rem] items-center justify-start gap-2 px-4 sm:gap-4 sm:px-6 lg:justify-between lg:px-12">

          <div className="flex shrink-0 justify-start lg:w-1/4">
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
                className="site-mark h-10 w-10 shrink-0 object-contain sm:h-16 sm:w-16"
                loading="eager"
                decoding="async"
              />
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 sm:block">Paes Consultoria</span>
            </button>
          </div>

          <div className="hidden flex-1 justify-center gap-4 lg:flex xl:gap-6">
            {navLinks.map((link) => {
              const active = route === link.id || (link.id === "biblioteca" && isBibliotecaDetail);
              return (
              <button
                key={link.id}
                type="button"
                aria-current={active ? "page" : undefined}
                aria-label={`Página ${link.label}`}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm px-2 pb-1 border-b-2 ${
                  active
                    ? "text-stone-900 border-stone-900"
                    : "text-stone-400 border-transparent hover:text-stone-900 hover:border-stone-900/20"
                }`}
              >
                <span className="opacity-50" aria-hidden="true">{link.num}</span> {link.label}
              </button>
              );
            })}
          </div>

          <div className="hidden w-1/4 items-center justify-end gap-4 lg:flex">
            {companyLinks.map((company) => {
              const active = company.id === "empresas/banal" ? isBanalArea : isVerdeBurgoArea;
              return (
                <button
                  key={company.id}
                  type="button"
                  onClick={() => handleNavClick(company.id)}
                  aria-current={active ? "page" : undefined}
                  aria-label={`Abrir ${company.label}`}
                  className={`flex h-12 ${company.buttonClassName} items-center justify-center border px-2 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm ${active ? "border-stone-900 bg-white/70" : "border-stone-900/10 bg-white/20 hover:border-stone-900/30 hover:bg-white/60"}`}
                >
                  <img src={company.image} alt={company.label} className={`${company.imageClassName} object-contain grayscale contrast-125`} loading="lazy" decoding="async" />
                </button>
              );
            })}
          </div>

          <div className="ml-auto hidden shrink-0 items-center gap-2 sm:flex lg:hidden">
            {companyLinks.map((company) => {
              const active = company.id === "empresas/banal" ? isBanalArea : isVerdeBurgoArea;
              return (
                <button
                  key={company.id}
                  type="button"
                  onClick={() => handleNavClick(company.id)}
                  aria-current={active ? "page" : undefined}
                  aria-label={`Abrir ${company.label}`}
                  className={`flex h-9 shrink-0 ${company.mobileButtonClassName} items-center justify-center border px-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm sm:h-10 sm:px-1.5 ${active ? "border-stone-900 bg-white/70" : "border-stone-900/10 bg-white/20"}`}
                >
                  <img src={company.image} alt={company.label} className={`${company.imageClassName} max-h-5 object-contain grayscale contrast-125 sm:max-h-6`} loading="lazy" decoding="async" />
                </button>
              );
            })}
          </div>

          {/* Menu Mobile Toggle */}
          <button
            type="button"
            ref={menuButtonRef}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            className="relative z-50 ml-auto p-1.5 text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm lg:hidden sm:ml-0 sm:p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
          </button>
        </nav>

        {/* Menu Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              ref={mobileMenuRef}
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
                    aria-current={(route === link.id || (link.id === "biblioteca" && isBibliotecaDetail)) ? "page" : undefined}
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
          {route === "sobre/samuel-carrera-paes" && <SamuelEntityPage key="samuel-carrera-paes" navigate={navigate} />}
          {route === "visao" && <Visao key="visao" />}
          {(route === "ecossistema" || route === "paes-consultoria") && <PaesConsultoria key="paes-consultoria" navigate={navigate} />}
          {route === "cases" && <Banal key="cases-compat" navigate={navigate} />}
          {(route === "banal" || route === "empresas/banal") && <Banal key="banal" navigate={navigate} />}
          {route.startsWith("case/") && <CaseDetail key="case-detail" caseId={route.replace("case/", "")} navigate={navigate} />}
          {(route === "verdeburgo" || route === "empresas/verde-burgo") && <Verdeburgo key="verdeburgo" navigate={navigate} />}
          {route === "projetos/provence-raiz" && <ProvenceRaizPage key="provence-raiz" navigate={navigate} />}
          {(route === "biblioteca" || route === "sistema") && <Biblioteca key="biblioteca" navigate={navigate} />}
          {route === "biblioteca/geracao-dos-realizadores" && <GeracaoDosRealizadoresPage key="geracao-dos-realizadores" navigate={navigate} />}
          {route.startsWith("biblioteca/") && route !== "biblioteca/geracao-dos-realizadores" && <SistemaArticle key={route} slug={route.replace("biblioteca/", "")} navigate={navigate} />}
          {route.startsWith("sistema/") && <SistemaArticle key={route} slug={route.replace("sistema/", "")} navigate={navigate} />}
          {route === `atlas/${authorityAtlas.slug}` && <EcosystemAtlas key="ecosystem-atlas" navigate={navigate} />}
          {route.startsWith("servicos/") && <AuthorityServicePage key={route} slug={route.replace("servicos/", "")} navigate={navigate} />}
          {route === "contato" && <Contato key="contato" />}
          {!routeMatches && <NotFoundPage key="not-found" route={route} navigate={navigate} />}
        </AnimatePresence>
      </main>

    </div>
  );
}
