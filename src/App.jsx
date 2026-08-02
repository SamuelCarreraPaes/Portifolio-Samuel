import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRightCircle, ArrowLeftCircle, Menu, X, ArrowUp, CheckCircle2, Copy } from "lucide-react";

import { sistemaArticleCards } from "./sistemaArticleCards";
import { deliveryPortal } from "./data/deliveries";
import {
  casesData,
  featuredCases,
  getCaseByRouteKey,
} from "./data/cases";
import { practiceAreaCatalog } from "./data/practiceAreas";
import { ShowroomAv27CaseDetail } from "./components/ShowroomAv27CaseDetail";

const homePortrait = "/images/13_VISAO/about-transition.png";

// --- CURVAS DE TRANSIÇÃO PREMIUM ---
const PREMIUM_EASE = [0.22, 1, 0.36, 1];

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
  const [search, setSearch] = useState(() => window.location.search);

  useEffect(() => {
    const handleRouteChange = (event) => {
      const pathRoute = window.location.pathname.replace(/^\/+|\/+$/g, "");
      const hasPathRoute = Boolean(pathRoute && pathRoute !== "index.html");
      setRoute(getRouteFromLocation());
      setSearch(window.location.search);
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
    const queryIndex = newRoute.indexOf("?");
    const routeName = queryIndex >= 0 ? newRoute.slice(0, queryIndex) : newRoute;
    const query = queryIndex >= 0 ? newRoute.slice(queryIndex) : "";
    window.history.pushState(null, "", `${routeToPath(routeName)}${query}`);
    setRoute(routeName);
    setSearch(query);
    window.scrollTo(0, 0);
  }, []);

  return { route, navigate, search };
}

// --- DYNAMIC SEO INJECTION ---
function DynamicSEO({ title, description, url, image, schemaType = "WebPage", noindex = false }) {
  useEffect(() => {
    const siteUrl = "https://paesconsultoria.com";
    const defaultTitle = "Samuel Carrera Paes | Creative Consultant — Paes Consultoria";
    const defaultDescription = "Portfólio autoral de Samuel Carrera Paes em direção criativa, imagem, espaço, eventos, varejo, cenografia, campanhas e experiências.";
    const pageTitle = !title || title === "Início" ? defaultTitle : `${title} | Samuel Carrera Paes — Paes Consultoria`;
    const pageDescription = description || defaultDescription;
    const pageUrl = url ? `${siteUrl}/${url.replace(/^\/+/, "")}` : siteUrl;
    const pageImage = image
      ? (image.startsWith("http") ? image : `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`)
      : `${siteUrl}${homePortrait}`;
    document.title = pageTitle;

    // Update or inject meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = pageDescription;

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.name = "robots";
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = noindex ? "noindex, follow" : "index, follow";

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

    const schemaData = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": pageTitle,
      ...(schemaType === "Article" ? {
        "headline": pageTitle,
        "author": { "@type": "Person", "name": "Samuel Carrera Paes", "url": siteUrl },
        "mainEntityOfPage": pageUrl,
        "dateModified": "2026-05-24"
      } : {}),
      "description": pageDescription,
      "image": pageImage,
      "creator": { "@type": "Person", "name": "Samuel Carrera Paes", "url": siteUrl },
      "about": { "@type": "Person", "name": "Samuel Carrera Paes", "alternateName": "Samuel Paes" },
      "url": pageUrl
    };
    script.text = JSON.stringify(schemaData);

  }, [title, description, url, image, schemaType, noindex]);

  return null;
}

// --- COMPONENTES DE ALTA PERFORMANCE & UX ---

function ImageWithFallback({ src, alt, imageClassName = "", fallbackLabel, loading = "lazy", mode = "natural" }) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isNatural = mode === "natural";

  return (
    <div
      aria-busy={!error && !isLoaded}
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
        <div role="img" aria-label={alt || fallbackLabel} className={`flex flex-col items-center justify-center p-6 text-center z-0 bg-stone-200/60 ${isNatural ? 'aspect-[4/5]' : 'absolute inset-0'}`}>
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
      className={`min-h-screen pt-20 pb-32 ${className}`}
    >
      {children}
    </motion.div>
  );
};

function handleShareIntent({ title = document.title, text = "Samuel Carrera Paes | Paes Consultoria", url = window.location.href } = {}) {
  if (navigator.share) {
    navigator.share({ title, text, url }).catch(() => {});
    return;
  }

  navigator.clipboard?.writeText(url);
}

// --- PÁGINAS ---

function Inicio({ navigate }) {
  const heroCase = featuredCases[0];
  const heroCaseIndex = casesData.findIndex((c) => c.slug === heroCase.slug);
  const heroCaseCounter = `${String(heroCaseIndex >= 0 ? heroCaseIndex + 1 : 1).padStart(2, "0")} / ${String(casesData.length).padStart(2, "0")}`;
  const homeFeaturedCases = [
    getCaseByRouteKey("provence-raiz-sistema-visual"),
    getCaseByRouteKey("val-fortunatto-brand-transition"),
    getCaseByRouteKey("campanhas-collabs"),
  ].filter(Boolean);
  const homePracticeAreas = practiceAreaCatalog.map((area) => ({
    ...area,
    cases: area.caseSlugs.map((slug) => getCaseByRouteKey(slug)).filter(Boolean),
  }));

  return (
    <PageTransition>
      <DynamicSEO
        title="Início"
        description="Portfólio autoral de Samuel Carrera Paes em direção criativa, sistemas visuais, varejo, campanhas, cenografia, eventos e experiências."
      />
      <div className="sp-home">
        <section className="sp-home-hero" aria-labelledby="home-title">
          <div className="sp-home-hero__copy">
            <span className="sp-eyebrow">Samuel Carrera Paes · Portfólio autoral</span>
            <motion.h1
              id="home-title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: PREMIUM_EASE }}
              className="sp-home-hero__title"
            >
              Direção criativa para marcas que precisam existir com presença.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: PREMIUM_EASE }}
              className="sp-home-hero__intro"
            >
              <p>Consultoria em imagem, espaço, produto, varejo e experiência física — do conceito à execução.</p>
              <div className="sp-home-actions">
                <button type="button" onClick={() => navigate("cases")} className="sp-button-primary">
                  Ver portfólio <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <a href="https://wa.me/5531981184250" target="_blank" rel="noopener noreferrer" className="sp-button-secondary">
                  Falar sobre um projeto
                </a>
              </div>
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={() => navigate(`case/${heroCase.slug}`)}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: PREMIUM_EASE }}
            className="sp-home-hero__visual group"
            aria-label={`Abrir case ${heroCase.title}`}
          >
            <ImageWithFallback
              src={heroCase.thumb}
              mode="cover"
              loading="eager"
              alt={`Imagem de capa do projeto ${heroCase.title}`}
              fallbackLabel={heroCase.shortTitle}
              imageClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
            />
            <span className="sp-home-hero__index">{heroCaseCounter}</span>
            <span className="sp-home-hero__case">
              <small>Em foco · {heroCase.category}</small>
              <strong>{heroCase.shortTitle}</strong>
              <span>Ver case <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
            </span>
            <span className="sp-home-hero__disciplines" aria-hidden="true">Imagem · Espaço · Produto · Experiência</span>
          </motion.button>
        </section>

        <div className="sp-home-discipline-bar" aria-label="Disciplinas de atuação">
          <span>Direção criativa</span><span>Sistemas visuais</span><span>Varejo</span><span>Cenografia</span><span>Eventos</span><span>Experiência física</span>
        </div>

        <section className="sp-home-section" aria-labelledby="featured-cases-title">
          <header className="sp-home-section__header">
            <div>
              <span className="sp-eyebrow">Trabalhos em destaque</span>
              <h2 id="featured-cases-title" className="sp-section-title">Três escalas de uma mesma direção.</h2>
              <p className="sp-section-deck">Marca, espaço e experiência apresentados como matéria viva, não como uma galeria estática.</p>
            </div>
            <button type="button" onClick={() => navigate("cases")} className="sp-text-link">
              Ver os {casesData.length} cases <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </header>

          <div className="sp-featured-grid">
            {homeFeaturedCases.map((c, index) => (
              <motion.article
                key={c.slug}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: PREMIUM_EASE }}
                className={`group sp-featured-card ${index === 0 ? "sp-featured-card--primary" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => navigate(`case/${c.slug}`)}
                  aria-label={`Abrir case ${c.title}`}
                  className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-4"
                >
                  <figure className="sp-featured-card__figure">
                    <ImageWithFallback
                      src={c.thumb}
                      mode="cover"
                      alt={`Imagem de capa do projeto ${c.title}`}
                      fallbackLabel={c.shortTitle}
                      imageClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.025]"
                    />
                    <figcaption className="sp-featured-card__caption">
                      <span>{c.category}</span>
                      <h3>{c.title}</h3>
                      <p>{c.originalDescription}</p>
                      <small>Ver case <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></small>
                    </figcaption>
                  </figure>
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="sp-home-section sp-thinking" aria-labelledby="thinking-title">
          <div className="sp-system-entry">
            <header className="sp-system-entry__intro">
              <span className="sp-system-entry__eyebrow">Sistema · leitura e prática</span>
              <h2 id="thinking-title">O pensamento que sustenta a prática.</h2>
              <p>Seis artigos articulam a leitura de marca, produto, espaço, percepção, operação e experiência que atravessa os projetos.</p>
              <button type="button" onClick={() => navigate("sistema")} className="sp-system-entry__cta">
                Explorar a biblioteca <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <ol className="sp-system-entry__articles">
              {sistemaArticleCards.map((article) => (
                <li key={article.slug}>
                  <button type="button" onClick={() => navigate(`sistema/${article.slug}`)}>
                    <span>{article.num}</span>
                    <span className="sp-system-entry__article-copy">
                      <small>{article.title}</small>
                      <strong>{article.editorialTitle}</strong>
                      <p>{article.subtitle}</p>
                    </span>
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sp-home-section sp-practice" aria-labelledby="practice-areas-title">
          <header className="sp-home-section__header">
            <div>
              <span className="sp-eyebrow">Áreas de atuação</span>
              <h2 id="practice-areas-title" className="sp-section-title">Estratégia aplicada à forma.</h2>
            </div>
            <p className="sp-section-deck">A direção muda de escala, mas preserva o mesmo compromisso: fazer cada escolha sustentar uma presença reconhecível.</p>
          </header>
          <div className="sp-practice__index">
            {homePracticeAreas.map((area, index) => (
              <article className="sp-practice-area" key={area.id}>
                <span className="sp-practice-area__number">{String(index + 1).padStart(2, "0")}</span>
                <div className="sp-practice-area__copy">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
                <div className="sp-practice-area__case-group">
                  <span className="sp-practice-area__label">
                    {area.cases.length === 1 ? "1 case relacionado" : `${area.cases.length} cases relacionados`}
                  </span>
                  <ul className="sp-practice-area__cases" aria-label={`Cases relacionados a ${area.title}`}>
                    {area.cases.map((caseItem) => (
                      <li key={caseItem.slug}>
                        <button type="button" onClick={() => navigate(`case/${caseItem.slug}`)}>
                          {caseItem.shortTitle || caseItem.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button type="button" onClick={() => navigate(`cases?area=${area.id}`)} className="sp-practice-area__all">
                  Ver recorte <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="sp-home-final-cta" aria-labelledby="final-cta-title">
          <span className="sp-eyebrow">Próximo projeto</span>
          <h2 id="final-cta-title">Pronto para transformar intenção em presença?</h2>
          <div>
            <p>Conte o que precisa existir no mundo. A resposta pode começar por uma conversa.</p>
            <a href="https://wa.me/5531981184250" target="_blank" rel="noopener noreferrer" className="sp-button-primary">
              Iniciar conversa <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

function Visao() {
  return (
    <PageTransition>
      <DynamicSEO title="Visão Criativa" description="Direção criativa aplicada a imagem, espaço, evento, produto, varejo, narrativa e experiência." url="visao" />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col pt-12">
        <header>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">CREATIVE STATEMENT</span>
          <h1 className="font-serif text-6xl md:text-[8rem] leading-[0.85] tracking-tighter text-stone-950 max-w-5xl text-balance">
            Visão
            <br />
            <span className="text-stone-500 italic font-light">Criativa.</span>
          </h1>
          <p className="mt-16 text-xl md:text-3xl leading-relaxed tracking-tight text-stone-800 font-light border-l border-stone-900/20 pl-6 md:pl-10 max-w-4xl text-balance">
            "Um projeto ganha presença quando intenção, forma, contexto, operação e memória passam a sustentar a mesma linguagem."
          </p>
        </header>

        <section className="mt-24 grid gap-12 border-y border-stone-900/10 py-16 lg:grid-cols-[0.85fr_1.15fr]" aria-labelledby="experiencia-continua-title">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-8 block">PROJETO COMO PRESENÇA CONTÍNUA</span>
            <h2 id="experiencia-continua-title" className="font-serif text-4xl md:text-6xl leading-tight text-stone-950 text-balance">
              A imagem cria expectativa. O espaço confirma presença. A execução sustenta memória.
            </h2>
          </div>
          <div className="space-y-7 text-base md:text-xl font-light leading-relaxed text-stone-700">
            <p>
              Um trabalho pode nascer de uma marca, de uma loja, de uma festa, de uma campanha, de uma imagem, de um objeto ou de um espaço. O que conecta tudo é a construção de presença: a capacidade de fazer uma ideia ser percebida, lembrada e vivida.
            </p>
            <p>
              A visão de Samuel Carrera Paes não se limita ao branding nem ao varejo. Ela organiza linguagem, atmosfera, narrativa, materialidade e operação para que cada projeto tenha coerência entre o que promete, o que mostra e o que entrega.
            </p>
            <p>
              Por isso o portfólio reúne naturezas diferentes: direção de imagem, exposição de produto, experiência física, cenografia, eventos, campanhas, collabs, espaços comerciais e pesquisas visuais. A pergunta central permanece a mesma: como transformar intenção em presença real?
            </p>
          </div>
        </section>

        <section aria-label="Pilares da Visão Criativa">
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-32 border-t border-stone-900/10 pt-16">
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">01</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Leitura de Contexto</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Compreender códigos culturais, comerciais, espaciais e visuais antes de transformar uma intenção em linguagem reconhecível.</p>
            </li>
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">02</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Produto como Narrativa</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Produto, objeto, coleção ou elemento visual deixam de ser item isolado e passam a participar de uma leitura maior.</p>
            </li>
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">03</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Espaço como Mídia</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Loja, evento, vitrine, altar, set ou ambiente funcionam como linguagem física: enquadram atenção, ritmo e memória.</p>
            </li>
            <li className="flex flex-col">
              <span className="font-serif text-3xl text-stone-300 mb-4 block" aria-hidden="true">04</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-4">Percepção como Valor</h3>
              <p className="text-sm md:text-base font-light text-stone-600 leading-relaxed">Orquestrar imagem, cor, luz, textura, escala, copy, gesto e ritmo para gerar valor percebido sem depender de excesso.</p>
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
            "Projetos sem presença competem por atenção. Projetos com presença constroem memória."
          </h2>
        </footer>
      </article>
    </PageTransition>
  );
}

function Cases({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO
        title="Portfólio de presença construída"
        description={`${casesData.length} cases de Samuel Carrera Paes em direção criativa, branding, produto, varejo, campanhas, colaborações, cenografia, eventos e experiências físicas.`}
        url="cases"
        schemaType="CollectionPage"
      />
      <section className="mx-auto max-w-[110rem] px-6 pt-16 lg:px-12" aria-labelledby="cases-title">
        <div id="cases-index" className="mb-32">
          <header className="sp-projects-hero">
            <div>
              <span className="sp-projects-eyebrow">Samuel Carrera Paes · Portfólio autoral</span>
              <h1 id="cases-title">Projetos</h1>
            </div>
            <p>
              Uma seleção de trabalhos em imagem, espaço, produto, varejo e experiência física. Esta página funciona como entrada visual; a leitura completa acontece dentro de cada case.
            </p>
          </header>

          <section className="sp-projects-archive-head" aria-labelledby="cases-archive-title">
            <h2 id="cases-archive-title">Arquivo visual.</h2>
            <p>{casesData.length} cases publicados em sequência editorial. Cada projeto aparece com imagem em escala, uma expressão de intenção e acesso direto à leitura completa.</p>
          </section>

          <div id="case-results" className="sp-projects-archive" aria-label="Arquivo visual de cases">
            {casesData.map((c, index) => (
              <motion.article
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, ease: PREMIUM_EASE }}
                key={c.id}
                className={`sp-project-row ${index % 2 === 1 ? "sp-project-row--reverse" : ""}`}
                id={c.id}
              >
                <button
                  type="button"
                  aria-label={`Abrir case ${c.number}: ${c.title}`}
                  className="sp-project-row__media"
                  onClick={() => navigate(`case/${c.slug}`)}
                >
                  <ImageWithFallback src={c.thumb} mode="cover" alt={`Imagem de capa do projeto ${c.title}`} imageClassName="sp-project-row__image" fallbackLabel={`Case ${c.number}`} />
                </button>

                <div className="sp-project-row__body">
                  <p className="sp-project-row__meta">{c.number} / {c.role}</p>
                  <h2>{c.title}</h2>
                  <p className="sp-project-row__expression">{c.strategicThesis}</p>
                  <p className="sp-project-row__description">{c.originalDescription}</p>
                  <button type="button" onClick={() => navigate(`case/${c.slug}`)} className="sp-project-row__link">
                    Abrir case <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function CaseDetail({ caseId, navigate }) {
  const c = getCaseByRouteKey(caseId);
  const caseIndex = c ? casesData.findIndex((item) => item.id === c.id) : -1;

  if (!c) {
    return (
      <PageTransition>
        <DynamicSEO title="Case não encontrado" description="O projeto solicitado não foi encontrado no portfólio." url={`case/${caseId}`} noindex />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-4xl mb-4">Case não encontrado.</h1>
          <p className="mb-8 max-w-md text-sm font-light leading-relaxed text-stone-600">O endereço pode ter mudado. O portfólio reúne os {casesData.length} projetos atualmente publicados.</p>
          <button type="button" onClick={() => navigate("cases")} className="min-h-11 text-xs font-bold uppercase tracking-[0.2em] border-b border-stone-900 pb-1 hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">Voltar aos cases</button>
        </div>
      </PageTransition>
    );
  }

  const isLast = caseIndex === casesData.length - 1;
  const nextCaseId = !isLast ? casesData[caseIndex + 1].slug : null;
  const previousCaseId = caseIndex > 0 ? casesData[caseIndex - 1].slug : null;

  if (c.id === "case-12") {
    return (
      <ProvenceRaizCaseDetail
        c={c}
        navigate={navigate}
        caseIndex={caseIndex}
        totalCases={casesData.length}
        previousCaseId={previousCaseId}
        nextCaseId={nextCaseId}
        isLast={isLast}
      />
    );
  }

  if (c.id === "case-13") {
    return (
      <ShowroomAv27CaseDetail
        c={c}
        navigate={navigate}
        caseIndex={caseIndex}
        totalCases={casesData.length}
        previousCaseId={previousCaseId}
        nextCaseId={nextCaseId}
        isLast={isLast}
      />
    );
  }

  return (
    <PageTransition>
      <DynamicSEO
        title={c.seo.title}
        description={c.seo.description}
        image={c.seo.ogImage}
        url={c.seo.canonicalPath}
        schemaType="CreativeWork"
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12 relative pb-20 md:pb-0">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
          <button type="button" onClick={() => navigate("cases")} className="min-h-10 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">Portfólio</button>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-stone-700">{c.shortTitle}</span>
        </nav>

        {/* A. Case Hero */}
        <header className="flex flex-col mb-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 block">CASE {c.number}/{casesData.length}</span>
            <button
              type="button"
              onClick={() => handleShareIntent({ title: c.title, text: c.originalDescription })}
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            >
              Compartilhar <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <h1 className="font-serif text-5xl md:text-[6rem] leading-[0.9] text-stone-950 tracking-[-0.02em] mb-8 max-w-5xl text-balance">{c.title}</h1>
          <p className="text-xl md:text-2xl font-light text-stone-600 max-w-3xl mb-12 leading-relaxed text-balance">{c.originalDescription}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-b border-stone-900/10 py-10 mb-16">
            {c.client && <div>
              <dt className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">Cliente / Contexto</dt>
              <dd className="text-sm font-light text-stone-900">{c.client}</dd>
            </div>}
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
              <dd className="text-sm font-light text-stone-900 leading-relaxed">{c.deliverables.join(" · ")}</dd>
            </div>
          </dl>

          <figure className="w-full bg-stone-200/50 relative overflow-visible mb-24 rounded-sm flex justify-center m-0 p-0 shadow-sm">
            <ImageWithFallback src={c.thumb} mode="natural" alt={`Fotografia de destaque do projeto ${c.title}`} imageClassName="max-h-[85vh]" />
          </figure>
        </header>

        <aside className="sp-case-progress hidden lg:flex" aria-label="Navegação contextual do case">
          <button type="button" onClick={() => navigate("cases")}>Portfólio</button>
          {previousCaseId && <button type="button" onClick={() => navigate(`case/${previousCaseId}`)}>Anterior</button>}
          <button type="button" onClick={() => handleShareIntent({ title: c.title, text: c.originalDescription })}>Compartilhar</button>
          {!isLast ? (
            <button type="button" onClick={() => navigate(`case/${nextCaseId}`)}>Próximo</button>
          ) : (
            <button type="button" onClick={() => navigate("sistema")}>Sistema</button>
          )}
        </aside>

        <section aria-labelledby="case-thesis-title" className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-24 items-start">
          <h2 id="case-thesis-title" className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Tese estratégica</h2>
          <blockquote className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight tracking-tight italic border-l-2 border-stone-900/10 pl-6 md:pl-10 text-balance">
            “{c.strategicThesis}”
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
                const sliceImgs = c.media.slice(1).slice(sliceStart, sliceEnd);
                return (
                  <section key={subTitle} aria-labelledby={`subtitle-${sIdx}`}>
                    <header className="flex items-center gap-4 mb-8">
                      <h3 id={`subtitle-${sIdx}`} className="font-serif text-3xl text-stone-900">{subTitle}</h3>
                      <span className="h-px w-full bg-stone-900/10 flex-1" aria-hidden="true"></span>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sliceImgs.map((mediaItem, i) => (
                        <figure key={mediaItem.src} className={`w-full bg-stone-200/50 group overflow-visible rounded-sm m-0 p-0 shadow-sm ${i === 0 || i % 3 === 0 ? 'md:col-span-2' : ''}`}>
                           <ImageWithFallback src={mediaItem.src} alt={mediaItem.alt} mode="natural" imageClassName="group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out" />
                           <figcaption className="px-1 pt-3 text-xs font-light leading-relaxed text-stone-500">{mediaItem.caption}</figcaption>
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
              {c.media.slice(1).map((mediaItem, idx) => {
                let spanClass = "md:col-span-1";
                if ((c.media.length - 1) % 2 !== 0 && idx === 0) spanClass = "md:col-span-2";
                else if (c.media.length - 1 > 5 && idx % 3 === 0) spanClass = "md:col-span-2";

                return (
                  <figure key={mediaItem.src} className={`${spanClass} w-full relative bg-stone-200/50 group overflow-visible rounded-sm m-0 p-0 shadow-sm`}>
                    <ImageWithFallback
                      src={mediaItem.src}
                      mode="natural"
                      alt={mediaItem.alt}
                      imageClassName="group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out"
                    />
                    <figcaption className="px-1 pt-3 text-xs font-light leading-relaxed text-stone-500">{mediaItem.caption}</figcaption>
                  </figure>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-24 grid gap-8 border-y border-stone-900/10 py-16 md:grid-cols-[0.8fr_1.2fr]" aria-labelledby="case-impact-title">
          <div>
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Leitura qualitativa</span>
            <h2 id="case-impact-title" className="font-serif text-4xl leading-tight text-stone-950">Impacto percebido.</h2>
          </div>
          <div>
            <p className="text-lg font-light leading-relaxed text-stone-700">{c.impact.publicText}</p>
            {c.quote?.text && (
              <blockquote className="mt-8 border-l border-stone-900/20 pl-6 font-serif text-2xl italic leading-tight text-stone-800">
                “{c.quote.text}”
              </blockquote>
            )}
          </div>
        </section>

        <section className="mt-24 bg-stone-950 px-7 py-16 text-stone-50 md:px-12 md:py-20" aria-labelledby="case-contact-title">
          <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Próximo projeto</span>
          <h2 id="case-contact-title" className="max-w-4xl font-serif text-4xl leading-tight text-balance md:text-6xl">Vamos construir uma presença que faça sentido no contexto real.</h2>
          <a href="https://wa.me/5531981184250" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Conversar sobre um projeto <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
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

function CaseChapterGallery({ chapter, index, openGallery }) {
  const featured = chapter.items.slice(0, chapter.previewCount || 3);
  const isObjectGrid = chapter.layout === "objects";
  const isPortraitGrid = chapter.layout === "portrait";

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: PREMIUM_EASE }}
      className="grid gap-10 border-t border-stone-900/10 pt-12 md:grid-cols-[0.8fr_1.2fr] md:pt-16"
      aria-labelledby={`provence-chapter-${chapter.id}`}
    >
      <header className="md:sticky md:top-28 md:self-start">
        <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
          Capítulo {String(index + 1).padStart(2, "0")} · {chapter.eyebrow}
        </span>
        <h2 id={`provence-chapter-${chapter.id}`} className="mb-5 max-w-lg font-serif text-4xl leading-none tracking-tight text-stone-950 md:text-6xl text-balance">{chapter.title}</h2>
        <p className="mb-8 max-w-md text-sm font-light leading-relaxed text-stone-600 md:text-base">{chapter.text}</p>
        {chapter.statement && (
          <blockquote className="mb-8 max-w-md border-l border-stone-900/20 pl-5 font-serif text-xl italic leading-snug text-stone-800">
            {chapter.statement}
          </blockquote>
        )}
        {chapter.principles && (
          <ul className="mb-9 flex max-w-md flex-wrap gap-x-4 gap-y-2" aria-label={`Princípios de ${chapter.title}`}>
            {chapter.principles.map((principle) => (
              <li key={principle} className="text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400">{principle}</li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={() => openGallery(chapter.id, 0)}
          className="inline-flex items-center gap-3 border-b border-stone-900/25 pb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 transition-colors hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
        >
          {chapter.previewCount === 1 && chapter.items.length > 1
            ? `Abrir série · ${chapter.items.length} imagens`
            : "Abrir galeria"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </header>

      <div className={`grid gap-4 ${isObjectGrid ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
        {featured.map((item, itemIndex) => (
          <button
            key={item.src}
            type="button"
            onClick={() => openGallery(chapter.id, itemIndex)}
            className={`group overflow-hidden rounded-sm bg-stone-200/50 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${!isObjectGrid && itemIndex === 0 ? "md:col-span-2" : ""}`}
            aria-label={`Abrir imagem: ${item.caption}`}
          >
            <div className={
              isObjectGrid
                ? "aspect-square"
                : isPortraitGrid
                  ? (itemIndex === 0 ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[4/5]")
                  : (itemIndex === 0 ? "aspect-[16/10]" : "aspect-[4/5]")
            }>
              <ImageWithFallback
                src={item.src}
                mode="cover"
                alt={item.alt}
                imageClassName="transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                fallbackLabel={chapter.title}
              />
            </div>
            <figcaption className="border-t border-stone-900/10 bg-[#F4F0E9]/90 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
              {item.caption}
            </figcaption>
          </button>
        ))}
      </div>
    </motion.section>
  );
}

function ProvenceRaizLightbox({ lightbox, galleries, setLightbox }) {
  const [touchStart, setTouchStart] = useState(null);
  const gallery = galleries.find((item) => item.id === lightbox?.galleryId);
  const image = gallery?.items[lightbox?.index || 0];

  const closeLightbox = useCallback(() => setLightbox(null), [setLightbox]);
  const moveLightbox = useCallback((direction) => {
    setLightbox((current) => {
      if (!current) return current;
      const currentGallery = galleries.find((item) => item.id === current.galleryId);
      if (!currentGallery) return current;
      const nextIndex = (current.index + direction + currentGallery.items.length) % currentGallery.items.length;
      return { ...current, index: nextIndex, zoom: false };
    });
  }, [galleries, setLightbox]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, lightbox, moveLightbox]);

  if (!lightbox || !gallery || !image) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Galeria ${gallery.title}`}
        className="fixed inset-0 z-[100] flex flex-col bg-stone-950 text-stone-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStart === null) return;
          const distance = event.changedTouches[0].clientX - touchStart;
          if (Math.abs(distance) > 48) moveLightbox(distance > 0 ? -1 : 1);
          setTouchStart(null);
        }}
      >
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 md:px-8">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">{gallery.title}</span>
            <p className="mt-1 text-xs font-light text-stone-300">{lightbox.index + 1} / {gallery.items.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => moveLightbox(-1)} className="rounded-full border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Anterior</button>
            <button type="button" onClick={() => setLightbox((current) => ({ ...current, zoom: !current.zoom }))} className="rounded-full border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Zoom</button>
            <button type="button" onClick={closeLightbox} aria-label="Fechar galeria" className="rounded-full border border-white/20 p-2 transition-colors hover:bg-white hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-4 md:p-8">
          <img
            src={image.src}
            alt={image.alt}
            className={`${lightbox.zoom ? "max-h-none max-w-none cursor-zoom-out" : "max-h-full max-w-full cursor-zoom-in"} object-contain`}
            onClick={() => setLightbox((current) => ({ ...current, zoom: !current.zoom }))}
          />
        </div>

        <footer className="grid gap-3 border-t border-white/10 px-4 py-4 md:grid-cols-[1fr_auto] md:items-center md:px-8">
          <p className="max-w-3xl text-sm font-light leading-relaxed text-stone-300">{image.caption}</p>
          <button type="button" onClick={() => moveLightbox(1)} className="justify-self-start rounded-full border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:justify-self-end">Próxima</button>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

function ProvenceRaizCaseDetail({ c, navigate, totalCases, previousCaseId, nextCaseId, isLast }) {
  const [lightbox, setLightbox] = useState(null);
  const openGallery = (galleryId, index = 0) => setLightbox({ galleryId, index, zoom: false });

  const galleries = useMemo(() => {
    const base = "/images/14_VERDEBURGO/PROVENCE_RAIZ";
    const architecture = `${base}/06_ARCHITECTURE_SERIES`;
    const starter = `${base}/07_STARTER_X5`;
    return [
      {
        id: "moodboards",
        eyebrow: "Processo criativo",
        title: "Moodboards e direção de atmosfera",
        text: "O repertório visual aparece como ferramenta de direção: não como fundo decorativo, mas como processo de decisão para calibrar memória, luz, matéria e ritmo.",
        statement: "Referência vira decisão; decisão vira aplicação; aplicação vira experiência.",
        principles: ["Pesquisa", "Curadoria", "Atmosfera", "Materialidade"],
        items: [
          { src: `${base}/03_REFINAMENTO/moodboard-integracao-atmosfera-provence.jpg`, alt: "Moodboard editorial de atmosfera Provence Raiz", caption: "Integração de atmosfera, cor e memória gráfica." },
          { src: `${base}/02_WEB/provence-raiz-moodboard-materialidade-antiga.jpg`, alt: "Moodboard de materialidade antiga do projeto Provence Raiz", caption: "Materialidade antiga como base para o luxo silencioso." },
          { src: `${base}/02_WEB/provence-raiz-moodboard-cerimonia.jpg`, alt: "Moodboard de cerimônia Provence Raiz", caption: "Cerimônia tratada como sequência espacial." },
          { src: `${base}/02_WEB/provence-raiz-moodboard-lounge.jpg`, alt: "Moodboard de lounge Provence Raiz", caption: "Hospitalidade e permanência em chave residencial." },
          { src: `${base}/02_WEB/provence-raiz-moodboard-mesa-bolo.jpg`, alt: "Moodboard de mesa de bolo Provence Raiz", caption: "Mesa de bolo como núcleo de memória visual." }
        ]
      },
      {
        id: "identidade-visual",
        eyebrow: "Universo visual",
        title: "Identidade visual",
        text: "Paleta, tipografia, toile, matéria e proporção formam uma linguagem comum. O sistema orienta fornecedores e aplicações sem reduzir o projeto a uma estampa decorativa.",
        statement: "A identidade não é um conjunto de elementos. É um sistema de decisões.",
        principles: ["70% base quente", "30% azul", "Serifa editorial", "Toile autoral"],
        items: [
          { src: `${starter}/identity-brand-board.jpg`, alt: "Brand board completo da identidade visual Provence Raiz", caption: "O sistema reunido: paleta, monograma, papel, ornamento e matéria." },
          { src: `${starter}/identity-palette-system.jpg`, alt: "Sistema de paleta visual da identidade Provence Raiz", caption: "Paleta cromática e hierarquia visual como regras de coerência." },
          { src: `${starter}/identity-material-board.jpg`, alt: "Material board tátil do projeto Provence Raiz", caption: "Papel, tecido, porcelana e azul organizados como linguagem tátil." },
          { src: `${starter}/identity-toile-wallpaper.jpg`, alt: "Toile de Jouy autoral aplicado ao sistema visual Provence Raiz", caption: "Toile de Jouy reinterpretado como matriz narrativa, não ornamento isolado." },
          { src: `${starter}/identity-cotton-paper.jpg`, alt: "Convite Provence Raiz impresso em papel algodão", caption: "Matéria, impressão e acabamento aproximam identidade e experiência." },
          { src: `${starter}/identity-toile-envelope.jpg`, alt: "Envelope Provence Raiz com aplicação interna de toile", caption: "A identidade atravessa escalas e aparece também no gesto de abrir." }
        ]
      },
      {
        id: "monograma",
        eyebrow: "Sistema de marca",
        title: "Monograma",
        text: "O emblema condensa iniciais, memória botânica e caráter editorial. Sua função é assinar com discrição, criando reconhecimento sem competir com a experiência.",
        statement: "Uma assinatura silenciosa, desenhada para permanecer.",
        principles: ["Síntese", "Autoria", "Gravura", "Aplicação"],
        layout: "objects",
        items: [
          { src: `${starter}/monogram-primary.jpg`, alt: "Monograma principal MMV criado para Provence Raiz", caption: "Monograma principal: iniciais, moldura botânica e desenho de gravura." },
          { src: `${starter}/monogram-secondary.jpg`, alt: "Monograma secundário Provence Raiz aplicado em papel", caption: "Variação secundária preservando reconhecimento em diferentes escalas." },
          { src: `${starter}/monogram-seal.jpg`, alt: "Monograma em formato de selo da identidade Provence Raiz", caption: "O selo transforma a assinatura em elemento de fechamento e memória." },
          { src: `${starter}/monogram-coat-of-arms.jpg`, alt: "Brasão completo do sistema visual Provence Raiz", caption: "Emblema completo integrando iniciais, botânica e paisagem." }
        ]
      },
      {
        id: "ornamentos",
        eyebrow: "Gramática gráfica",
        title: "Ornamentos",
        text: "Filetes, molduras, cantoneiras, selos e ícones constroem hierarquia e orientação. Cada elemento nasce de uma função dentro do sistema.",
        statement: "O ornamento que não tem função não tem lugar.",
        principles: ["Filetes organizam", "Molduras enquadram", "Selos autenticam"],
        layout: "objects",
        items: [
          { src: `${starter}/ornament-filets.jpg`, alt: "Estudo de filetes e ornamentos Provence Raiz", caption: "Filetes e elementos lineares organizando ritmo e hierarquia." },
          { src: `${starter}/ornament-frames.jpg`, alt: "Biblioteca de molduras Provence Raiz", caption: "Molduras para diferentes escalas e contextos de aplicação." },
          { src: `${starter}/ornament-corners.jpg`, alt: "Estudo de cantoneiras Provence Raiz", caption: "Cantoneiras e pequenos gestos construindo orientação visual." },
          { src: `${starter}/ornament-seals.jpg`, alt: "Estudo de selos gráficos Provence Raiz", caption: "Selos como marcas de autenticidade e fechamento." },
          { src: `${starter}/ornament-icon-library.jpg`, alt: "Biblioteca completa de ícones Provence Raiz", caption: "Biblioteca visual consolidada para preservar consistência na execução." }
        ]
      },
      {
        id: "pilastras-cenograficas",
        eyebrow: "Arquitetura cenográfica · Artefato 01",
        title: "Pilastras cenográficas",
        text: "Duas peças independentes constroem um portal sem fechar o vão. A curva interna, a base estável e a estrutura reversível transformam arquitetura temporária em presença real.",
        statement: "A forma enquadra o rito; a técnica sustenta a forma.",
        principles: ["Par espelhado", "Vão livre", "Estrutura reversível", "Luz oculta"],
        previewCount: 1,
        items: [
          { src: `${architecture}/pilastras-capa.webp`, alt: "Par de pilastras cenográficas Provence Raiz em render arquitetônico", caption: "Capa da série: duas pilastras independentes definem um portal sem se tocar." },
          { src: `${architecture}/pilastras-explodida.webp`, alt: "Perspectiva explodida da pilastra cenográfica Provence Raiz", caption: "Pele mineral, nervuras curvas, montantes, contraventamentos e base revelados como sistema construtivo." },
          { src: `${architecture}/pilastras-corte.webp`, alt: "Corte construtivo da pilastra cenográfica Provence Raiz", caption: "O corte mostra estrutura interna, canal técnico, lastro e pés reguláveis sem perder a leitura externa." },
          { src: `${architecture}/pilastras-integracao-floral.webp`, alt: "Pilastra Provence Raiz com integração de tecido e arranjo floral", caption: "Tecido e floral entram como aplicação reversível; não corrigem nem sustentam a arquitetura." },
          { src: `${architecture}/pilastras-luz-oculta.webp`, alt: "Detalhe de iluminação oculta na curva da pilastra Provence Raiz", caption: "Luz quente embutida acompanha a curva com difusão contínua e sem pontos aparentes." }
        ]
      },
      {
        id: "luminaria-carretel",
        eyebrow: "Arquitetura cenográfica · Artefato 02",
        title: "Luminária carretel",
        text: "O núcleo preservado do carretel recebe discos de madeira, difusor leitoso, filetes metálicos e luz contínua. A suspensão real permanece independente da corrente decorativa.",
        statement: "A técnica desaparece para que a luz permaneça.",
        principles: ["Núcleo preservado", "12 filetes", "2700K", "Carga independente"],
        previewCount: 1,
        items: [
          { src: `${architecture}/carretel-capa.webp`, alt: "Luminária carretel Provence Raiz acesa em render de alta qualidade", caption: "Capa da série: madeira clara, metal champagne e difusor leitoso organizados como um único objeto de luz." },
          { src: `${architecture}/carretel-explodida.webp`, alt: "Perspectiva explodida da luminária carretel Provence Raiz", caption: "Suspensão, discos, núcleo, difusor, LED e filetes aparecem como componentes autônomos e alinhados." },
          { src: `${architecture}/carretel-corte.webp`, alt: "Corte construtivo da luminária carretel Provence Raiz", caption: "O corte revela o cabo de carga, o núcleo central, o reforço superior e a iluminação escondida." },
          { src: `${architecture}/carretel-suspensao.webp`, alt: "Detalhe superior da suspensão da luminária carretel Provence Raiz", caption: "Cabo de aço e corrente assumem funções diferentes: sustentação real e leitura decorativa." },
          { src: `${architecture}/carretel-difusor.webp`, alt: "Detalhe do difusor e dos filetes da luminária carretel Provence Raiz", caption: "Difusor removível, encaixe oculto e filetes ritmados preservam uma luz contínua e sem brilho técnico." }
        ]
      },
      {
        id: "gaiola-cenografica",
        eyebrow: "Arquitetura cenográfica · Artefato 03",
        title: "Gaiola cenográfica",
        text: "A luminária hexagonal combina estrutura metálica, vidro texturizado, núcleo de luz e acabamento artesanal. O desenho preserva escala cênica sem perder precisão construtiva.",
        statement: "A atmosfera nasce quando estrutura, transparência e luz trabalham juntas.",
        principles: ["Geometria hexagonal", "Vidro texturizado", "Alma estrutural", "Acabamento artesanal"],
        previewCount: 1,
        items: [
          { src: `${architecture}/gaiola-capa.webp`, alt: "Luminária gaiola cenográfica Provence Raiz acesa em render de alta qualidade", caption: "Capa da série: geometria hexagonal, vidro texturizado e luz quente em uma peça de escala cênica." },
          { src: `${architecture}/gaiola-explodida.webp`, alt: "Perspectiva explodida da gaiola cenográfica Provence Raiz", caption: "Cúpula, painéis, núcleo de luz, aros e pingente são apresentados como uma montagem coerente." },
          { src: `${architecture}/gaiola-corte.webp`, alt: "Corte construtivo da gaiola cenográfica Provence Raiz", caption: "Com painéis removidos, a alma estrutural e o percurso de carga tornam-se legíveis." },
          { src: `${architecture}/gaiola-suspensao.webp`, alt: "Detalhe superior da suspensão da gaiola cenográfica Provence Raiz", caption: "Canopla, corrente, argola e nervuras convergem em uma união artesanal precisa." },
          { src: `${architecture}/gaiola-pingente.webp`, alt: "Detalhe inferior e pingente da gaiola cenográfica Provence Raiz", caption: "A estrutura inferior recebe o vidro e conduz a carga até o pingente torneado." }
        ]
      },
      {
        id: "papelaria",
        eyebrow: "Aplicações",
        title: "Papelaria",
        text: "Convites, menus, votos, programas e cartões transformam o sistema visual em gestos de leitura. A função muda; a voz permanece a mesma.",
        statement: "Do convite ao menu, cada peça prepara e prolonga a experiência.",
        principles: ["Papel algodão", "Hierarquia editorial", "Uso real", "Memória"],
        layout: "objects",
        items: [
          { src: `${starter}/paper-invitation.jpg`, alt: "Convite principal da identidade Provence Raiz", caption: "Convite principal: abertura da narrativa antes da chegada." },
          { src: `${starter}/paper-envelope.jpg`, alt: "Envelope externo Provence Raiz", caption: "Envelope externo transforma o ato de abrir em experiência." },
          { src: `${starter}/paper-envelope-liner.jpg`, alt: "Forro de envelope em toile Provence Raiz", caption: "O forro em toile revela a identidade de maneira gradual." },
          { src: `${starter}/paper-table-menu.jpg`, alt: "Menu de mesa Provence Raiz", caption: "Menu vertical com hierarquia funcional e presença discreta." },
          { src: `${starter}/paper-place-card.jpg`, alt: "Cartão de lugar Provence Raiz", caption: "Cartão de lugar integrando orientação e cuidado individual." },
          { src: `${starter}/paper-vows-book.jpg`, alt: "Caderno de votos Provence Raiz", caption: "Caderno de votos como objeto íntimo de permanência." },
          { src: `${starter}/paper-ceremony-program.jpg`, alt: "Programa da cerimônia Provence Raiz", caption: "Programa da cerimônia organizando informação sem romper a atmosfera." },
          { src: `${starter}/paper-thank-you-card.jpg`, alt: "Cartão de agradecimento Provence Raiz", caption: "Agradecimento como último capítulo da hospitalidade." }
        ]
      },
      {
        id: "sinalizacao",
        eyebrow: "Orientação espacial",
        title: "Sinalização",
        text: "Welcome signs, placas direcionais e identificadores orientam o percurso sem introduzir uma linguagem paralela. Informação e atmosfera operam juntas.",
        statement: "Informar sem interromper a cena.",
        principles: ["Chegada", "Fluxo", "Legibilidade", "Coerência"],
        layout: "portrait",
        items: [
          { src: `${starter}/sign-welcome.jpg`, alt: "Welcome sign do evento Provence Raiz", caption: "Welcome sign como primeiro encontro físico com a identidade." },
          { src: `${starter}/sign-ceremony.jpg`, alt: "Sinalização de cerimônia Provence Raiz", caption: "Placa de cerimônia integrada à arquitetura e à paisagem." },
          { src: `${starter}/sign-reception.jpg`, alt: "Sinalização de recepção Provence Raiz", caption: "Recepção identificada com clareza sem introduzir uma linguagem paralela." },
          { src: `${starter}/sign-bar.jpg`, alt: "Sinalização do bar Provence Raiz", caption: "Placa do bar combinando orientação, proporção e acabamento editorial." },
          { src: `${starter}/sign-buffet.jpg`, alt: "Sinalização do buffet Provence Raiz", caption: "Sinalização do buffet integrada ao ambiente e ao serviço." },
          { src: `${starter}/sign-directional.jpg`, alt: "Placa direcional Provence Raiz", caption: "Orientação de fluxo com leitura imediata e acabamento editorial." },
          { src: `${starter}/sign-table.jpg`, alt: "Mini placas de mesa Provence Raiz", caption: "Escala de mesa preservando hierarquia, informação e identidade." }
        ]
      },
      {
        id: "hospitalidade",
        eyebrow: "Pontos de contato",
        title: "Hospitalidade",
        text: "Rótulos, embalagens, lembranças e pequenos objetos levam a identidade até o cuidado. A linguagem visual deixa a superfície e passa a participar do uso.",
        statement: "Hospitalidade é identidade convertida em atenção.",
        principles: ["Cuidado", "Objeto", "Materialidade", "Permanência"],
        layout: "objects",
        items: [
          { src: `${starter}/hospitality-cologne-label.jpg`, alt: "Rótulo de colônia Provence Raiz", caption: "Rótulo de colônia levando a identidade ao gesto de cuidado." },
          { src: `${starter}/hospitality-soap-label.jpg`, alt: "Rótulo de sabonete Provence Raiz", caption: "Rótulo de sabonete tratado como parte da família visual." },
          { src: `${starter}/hospitality-alcohol-label.jpg`, alt: "Rótulo de álcool Provence Raiz", caption: "Informação funcional organizada com a mesma precisão do evento." },
          { src: `${starter}/hospitality-toiletry-label.jpg`, alt: "Etiqueta do kit toilette Provence Raiz", caption: "Etiqueta do kit toilette combinando orientação e acolhimento." },
          { src: `${starter}/hospitality-favor-wrap.jpg`, alt: "Embalagem de bem-casado Provence Raiz", caption: "Embalagem do bem-casado como gesto final de hospitalidade." },
          { src: `${starter}/hospitality-favor-band.jpg`, alt: "Cinta de bem-casado Provence Raiz", caption: "Cinta, papel e desenho botânico compondo um fechamento discreto." },
          { src: `${starter}/hospitality-gift-tag.jpg`, alt: "Tag de lembrança Provence Raiz", caption: "Tag de lembrança preservando legibilidade em pequena escala." },
          { src: `${starter}/hospitality-instruction-card.jpg`, alt: "Cartão de instrução Provence Raiz", caption: "Informação prática convertida em ponto de atenção e cuidado." },
          { src: `${starter}/hospitality-toiletry-kit.jpg`, alt: "Kit toilette montado Provence Raiz", caption: "O sistema aplicado ao conjunto real de objetos de hospitalidade." },
          { src: `${starter}/hospitality-wrapped-favor.jpg`, alt: "Bem-casado embalado Provence Raiz", caption: "A aplicação final reúne toile, selo, fita e materialidade." },
          { src: `${base}/02_WEB/provence-raiz-bar-hospitalidade-toile-lavanda.jpg`, alt: "Bar de hospitalidade Provence Raiz com toile e lavanda", caption: "Hospitalidade ampliada para o ambiente: luz, serviço e permanência." }
        ]
      },
      {
        id: "decoracao",
        eyebrow: "Direção de decoração",
        title: "Decoração como linguagem física",
        text: "A decoração é apresentada como consequência do sistema: flor, luz, mobiliário, mural e escala constroem uma presença coerente em vez de uma estética solta.",
        statement: "A arquitetura não é pano de fundo. É matéria viva da narrativa.",
        principles: ["Volume natural", "Sombras reais", "Fluxo", "Convivência"],
        items: [
          { src: `${base}/03_REFINAMENTO/render-cerimonia-altar-passarela-refinado.jpg`, alt: "Cerimônia Provence Raiz com altar, passarela e flores", caption: "A cerimônia organiza eixo, entrada e ponto focal." },
          { src: `${base}/03_REFINAMENTO/render-mesa-bolo-mural-toile-refinado.jpg`, alt: "Mesa de bolo com mural Toile de Jouy e arranjos Provence Raiz", caption: "Mural, mesa e flores como composição editorial." },
          { src: `${base}/03_REFINAMENTO/render-escada-cascata-floral-refinado.jpg`, alt: "Escada com cascata floral Provence Raiz", caption: "Escada transformada em gesto de percurso." },
          { src: `${base}/02_WEB/provence-raiz-bar-toile-pinheiros-luminarias.jpg`, alt: "Bar Provence Raiz com mural toile, pinheiros e luminárias", caption: "Hospitalidade com profundidade visual e luz quente." },
          { src: `${base}/02_WEB/provence-raiz-lounge-residencial-linho-azul.jpg`, alt: "Lounge residencial com linho azul Provence Raiz", caption: "Lounge como pausa, não como preenchimento." }
        ]
      }
    ];
  }, []);

  return (
    <PageTransition>
      <DynamicSEO
        title={c.seo.title}
        description={c.seo.description}
        image={c.seo.ogImage}
        url={c.seo.canonicalPath}
        schemaType="CreativeWork"
      />

      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12 relative pb-20 md:pb-0">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">
          <button type="button" onClick={() => navigate("cases")} className="hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm">Portfólio</button>
          <span aria-hidden="true">/</span>
          <span>Verde Burgo Eventos</span>
          <span aria-hidden="true">/</span>
          <span className="text-stone-900">Provence Raiz</span>
        </nav>

        <header className="grid gap-12 border-b border-stone-900/10 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">CASE {c.number}/{totalCases} · Direção criativa aplicada a eventos</span>
            <h1 className="mb-8 max-w-5xl font-serif text-5xl leading-[0.9] tracking-[-0.02em] text-stone-950 md:text-[6.5rem] text-balance">{c.title}</h1>
            <p className="max-w-3xl text-xl font-light leading-relaxed text-stone-600 md:text-2xl text-balance">{c.shortTese}</p>
          </div>

          <figure className="overflow-hidden rounded-sm bg-stone-200/50 shadow-sm">
            <div className="aspect-[4/5] lg:aspect-[5/6]">
              <ImageWithFallback
                src={c.thumb}
                mode="cover"
                loading="eager"
                alt="Mural Toile de Jouy contemporâneo criado como matriz visual do case Provence Raiz"
                imageClassName="scale-[1.01]"
                fallbackLabel="Provence Raiz"
              />
            </div>
          </figure>
        </header>

        <dl className="grid grid-cols-2 gap-6 border-b border-stone-900/10 py-10 md:grid-cols-4">
          {[
            ["Cliente / Contexto", "Provence Raiz"],
            ["Papel", "Direção Criativa"],
            ["Execução", "Verde Burgo Eventos"],
            ["Local", "Casa Giardini"]
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{label}</dt>
              <dd className="text-sm font-light leading-relaxed text-stone-900">{value}</dd>
            </div>
          ))}
        </dl>

        <aside className="sp-case-progress hidden lg:flex" aria-label="Navegação contextual do case Provence Raiz">
          <button type="button" onClick={() => navigate("cases")}>Portfólio</button>
          {previousCaseId && <button type="button" onClick={() => navigate(`case/${previousCaseId}`)}>Anterior</button>}
          <button type="button" onClick={() => handleShareIntent({ title: c.title, text: c.shortTese })}>Compartilhar</button>
          {!isLast && nextCaseId ? (
            <button type="button" onClick={() => navigate(`case/${nextCaseId}`)}>Próximo</button>
          ) : (
            <button type="button" onClick={() => navigate("sistema")}>Sistema</button>
          )}
        </aside>

        <section className="grid gap-8 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28" aria-label="Nota do Diretor">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Director's Note</h2>
          <blockquote className="border-l-2 border-stone-900/10 pl-6 font-serif text-2xl italic leading-tight tracking-tight text-stone-900 md:pl-10 md:text-4xl text-balance">
            "{c.directorsNote}"
          </blockquote>
        </section>

        <section className="grid gap-8 border-y border-stone-900/10 py-16 md:grid-cols-4" aria-label="Estratégia do case Provence Raiz">
          {c.blocks.map(([blockTitle, blockText], idx) => (
            <article key={blockTitle}>
              <span className="mb-6 block font-serif text-2xl italic text-stone-300" aria-hidden="true">0{idx + 1}</span>
              <h2 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900">{blockTitle}</h2>
              <p className="text-sm font-light leading-relaxed text-stone-600">{blockText}</p>
            </article>
          ))}
        </section>

        <div className="flex flex-col gap-24 py-24 md:gap-32 md:py-32">
          {galleries.map((chapter, index) => (
            <CaseChapterGallery key={chapter.id} chapter={chapter} index={index} openGallery={openGallery} />
          ))}
        </div>

        <section className="grid gap-10 border-y border-stone-900/10 py-16 md:grid-cols-[0.8fr_1.2fr]" aria-labelledby="provence-credits">
          <h2 id="provence-credits" className="font-serif text-4xl leading-none text-stone-950 md:text-5xl">Créditos.</h2>
          <div className="grid gap-5 text-sm font-light leading-relaxed text-stone-600 md:grid-cols-2">
            <p><strong className="font-semibold text-stone-900">Direção Criativa, Conceito, Identidade Visual e Sistema Visual:</strong><br />Samuel Carrera Paes / Paes Consultoria.</p>
            <p><strong className="font-semibold text-stone-900">Execução do evento:</strong><br />Verde Burgo Eventos.</p>
            <p><strong className="font-semibold text-stone-900">Local:</strong><br />Casa Giardini, tratada como suporte espacial do projeto.</p>
            <p><strong className="font-semibold text-stone-900">Leitura autoral:</strong><br />Evento como linguagem 360 graus: buffet, decoração, bar, cerimonial, ambientação, papelaria, atmosfera e narrativa.</p>
          </div>
        </section>

        <nav
          aria-label="Paginação de Cases"
          className="fixed bottom-0 left-0 z-40 flex w-full flex-row items-center justify-between gap-4 border-t border-stone-900/10 bg-[#F4F0E9]/95 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] backdrop-blur-xl md:static md:mt-24 md:border-t md:border-stone-900/10 md:bg-transparent md:p-0 md:pt-12 md:shadow-none"
        >
          <button type="button" onClick={() => navigate("cases")} className="flex flex-1 items-center justify-center gap-3 rounded-sm border border-stone-900/20 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 md:flex-none md:justify-start md:border-transparent md:py-0">
            <ArrowLeftCircle className="hidden h-5 w-5 sm:block" aria-hidden="true" /> INÍCIO <span className="hidden sm:inline">de Cases</span>
          </button>
          <button type="button" onClick={() => navigate("sistema")} className="flex flex-1 items-center justify-center gap-3 rounded-sm bg-stone-900 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm transition-colors hover:text-stone-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 md:flex-none md:justify-end md:bg-transparent md:py-0 md:text-stone-900 md:shadow-none">
            Ver Sistema <ArrowRightCircle className="hidden h-5 w-5 md:block" aria-hidden="true" />
          </button>
        </nav>

        <ProvenceRaizLightbox lightbox={lightbox} galleries={galleries} setLightbox={setLightbox} />
      </article>
    </PageTransition>
  );
}

function Sistema({ navigate }) {
  return (
    <PageTransition>
      <DynamicSEO
        title="Sistema de Direção Criativa"
        description="Índice editorial com seis artigos autorais de Samuel Carrera Paes sobre imagem, espaço, produto, operação, experiência e percepção de valor."
        url="sistema"
      />
      <section className="mx-auto max-w-[90rem] px-6 lg:px-12 flex flex-col pt-12" aria-labelledby="sistema-title">
        <header>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-12 block">CREATIVE SYSTEM</span>
          <h1 id="sistema-title" className="font-serif text-5xl md:text-[7rem] leading-[0.85] tracking-tighter text-stone-950 max-w-4xl mb-8 text-balance">
            Sistema de Direção Criativa.
          </h1>
          <p className="text-xl md:text-3xl font-light text-stone-600 max-w-3xl mb-24 leading-relaxed text-balance">
            Seis artigos sobre a construção de presença em imagem, espaço, produto, experiência física, operação e memória.
          </p>
        </header>

        <aside className="mb-12 grid gap-4 border-y border-stone-900/10 py-6 md:grid-cols-[0.8fr_1.2fr_auto] md:items-center" aria-label="Leitura orientada do sistema">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Biblioteca / Learn</span>
          <p className="max-w-3xl text-sm font-light leading-relaxed text-stone-600">
            Artigos para entender como o repertório vira método: curadoria, espaço, percepção, operação e experiência física.
          </p>
          <button
            type="button"
            onClick={() => navigate(`sistema/${sistemaArticleCards[0].slug}`)}
            className="inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 border-b border-stone-900/20 pb-1 hover:border-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
          >
            Começar leitura <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </aside>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 border-t border-stone-900/10 pt-16">
          {sistemaArticleCards.map((card) => (
            <article key={card.num} className="group flex min-h-[24rem] flex-col border border-stone-900/10 bg-white/40 transition-all duration-700 hover:bg-white/80 hover:border-stone-900/25 rounded-sm">
              <button
                type="button"
                onClick={() => navigate(`sistema/${card.slug}`)}
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
        <DynamicSEO title="Sistema" description="Carregando artigo do Sistema Samuel Paes." url={`sistema/${slug}`} />
        <section className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12 min-h-[70vh] flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-8 block">SISTEMA</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-none text-stone-950">Carregando artigo.</h1>
        </section>
      </PageTransition>
    );
  }

  if (!article) {
    return (
      <PageTransition>
        <DynamicSEO title="Artigo não encontrado" description="Artigo do Sistema Samuel Paes não encontrado." url={`sistema/${slug}`} />
        <section className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12 min-h-[70vh] flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-8 block">SISTEMA</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-none text-stone-950 mb-8">Artigo não encontrado.</h1>
          <button
            type="button"
            onClick={() => navigate("sistema")}
            className="inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 border-b border-stone-900/30 pb-2 hover:border-stone-900 transition-colors"
          >
            <ArrowLeftCircle className="h-4 w-4" aria-hidden="true" /> Voltar ao Sistema
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
        url={`sistema/${article.slug}`}
        schemaType="Article"
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="sistema-article-title">
        <button
          type="button"
          onClick={() => navigate("sistema")}
          className="mb-14 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 border-b border-stone-900/10 pb-2 hover:text-stone-900 hover:border-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
        >
          <ArrowLeftCircle className="h-4 w-4" aria-hidden="true" /> Sistema
        </button>

        <header className="grid gap-14 border-b border-stone-900/10 pb-16 lg:grid-cols-[0.7fr_1.3fr]">
          <aside>
            <span className="font-serif text-7xl text-stone-300 block mb-8" aria-hidden="true">{article.num}.</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-5">ARTIGO DO SISTEMA</p>
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

        <nav className="grid gap-6 border-t border-stone-900/10 py-12 md:grid-cols-3" aria-label="Navegação entre artigos do Sistema">
          <button
            type="button"
            onClick={() => navigate(`sistema/${previous.slug}`)}
            className="group flex min-h-32 flex-col justify-between border border-stone-900/10 bg-white/30 p-6 text-left rounded-sm hover:bg-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">
              <ArrowLeftCircle className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> Anterior
            </span>
            <span className="font-serif text-2xl leading-tight text-stone-950">{previous.editorialTitle}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("sistema")}
            className="flex min-h-32 flex-col items-center justify-center border border-stone-900/10 bg-stone-900 text-[#F4F0E9] p-6 text-center rounded-sm hover:bg-stone-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Todos os artigos</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(`sistema/${next.slug}`)}
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
            "Um trabalho ganha força quando sua estética deixa de ser aparência e passa a construir <span className="italic font-light text-stone-500">presença</span>."
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
              Disponível para projetos de direção criativa, imagem, espaço, eventos, cenografia, varejo, conteúdo e experiências físicas.
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

function DeliveryPortal() {
  const [toast, setToast] = useState(null);
  const portalUrl = `https://paesconsultoria.com/${deliveryPortal.route}`;

  const handleCopyPortal = () => {
    navigator.clipboard?.writeText(portalUrl);
    setToast("Link do portal copiado.");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <PageTransition>
      <DynamicSEO
        title={`${deliveryPortal.title} - Portal de Entrega`}
        description={deliveryPortal.description}
        url={deliveryPortal.route}
        schemaType="WebPage"
        noindex
      />
      <article className="mx-auto flex min-h-[86vh] max-w-[92rem] flex-col px-6 pt-12 lg:px-12">
        <header className="grid gap-12 border-b border-stone-900/10 pb-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.32em] text-stone-400">
              {deliveryPortal.kicker}
            </span>
            <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[0.96] tracking-[-0.035em] text-stone-950 md:text-7xl lg:text-8xl">
              {deliveryPortal.title}
            </h1>
          </div>
          <div className="sp-surface-strong rounded-sm p-6 md:p-8">
            <p className="text-sm leading-relaxed text-stone-700">{deliveryPortal.description}</p>
            <dl className="mt-8 grid gap-4 border-t border-stone-900/10 pt-6 text-sm">
              {[
                ["Cliente", deliveryPortal.client],
                ["Showroom", deliveryPortal.showroom],
                ["Escopo", deliveryPortal.scope],
                ["Autoria", deliveryPortal.author],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 sm:grid-cols-[6rem_1fr]">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">{label}</dt>
                  <dd className="text-stone-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <section className="grid gap-12 border-b border-stone-900/10 py-16 lg:grid-cols-[0.78fr_1.22fr]" aria-labelledby="delivery-summary-title">
          <div>
            <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Leitura da entrega</span>
            <h2 id="delivery-summary-title" className="max-w-xl font-serif text-4xl leading-tight text-stone-950 md:text-5xl">
              Uma entrega pensada para ser consultada, não apenas baixada.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {deliveryPortal.summary.map((item, index) => (
              <p key={item} className="border-t border-stone-900/10 pt-5 text-sm leading-relaxed text-stone-700">
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.25em] text-[#8a5a38]">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="grid gap-5 py-14 md:grid-cols-3" aria-label="Arquivos da entrega">
          {deliveryPortal.files.map((file) => {
            const isReady = Boolean(file.href);
            return (
              <article key={file.id} className="sp-interactive-card flex min-h-64 flex-col justify-between rounded-sm p-6">
                <div>
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">{file.type}</span>
                    <span className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${isReady ? "border-stone-900/20 text-stone-900" : "border-stone-900/10 text-stone-400"}`}>
                      {isReady ? "Disponível" : "Pendente"}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl leading-tight text-stone-950">{file.label}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">{file.meta}</p>
                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">{file.status}</p>
                </div>
                {isReady ? (
                  <a href={file.href} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-11 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">
                    Abrir arquivo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <button type="button" disabled className="mt-10 inline-flex min-h-11 items-center gap-2 text-left text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
                    Aguardando link final
                  </button>
                )}
              </article>
            );
          })}
        </section>

        <section className="grid gap-10 border-y border-stone-900/10 py-16 lg:grid-cols-[1fr_1.2fr]" aria-labelledby="delivery-method-title">
          <div>
            <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Método</span>
            <h2 id="delivery-method-title" className="max-w-lg font-serif text-4xl leading-tight text-stone-950 md:text-5xl">
              Da cartografia à memória operacional.
            </h2>
          </div>
          <div className="grid border border-stone-900/10 md:grid-cols-4">
            {deliveryPortal.checkpoints.map(([number, title, text]) => (
              <article key={number} className="flex min-h-44 flex-col justify-between border-b border-stone-900/10 p-5 md:border-b-0 md:border-r md:last:border-r-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a5a38]">{number}</span>
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-stone-950">{title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-stone-600">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="grid gap-8 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <p className="max-w-3xl text-sm leading-relaxed text-stone-600">
            {deliveryPortal.accessNote} Para ativar os downloads, suba PDF, ZIP e vídeo no Vercel Blob e substitua os links no módulo de entrega.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <button type="button" onClick={handleCopyPortal} className="sp-button-secondary justify-center">
              Copiar link do portal <Copy className="h-4 w-4" aria-hidden="true" />
            </button>
            <a href="https://wa.me/5531981184250" target="_blank" rel="noopener noreferrer" className="sp-button-primary justify-center">
              Falar com Samuel <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </footer>

        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: PREMIUM_EASE }}
              className="fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-stone-900 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-2xl"
            >
              <CheckCircle2 className="h-4 w-4 text-stone-300" aria-hidden="true" /> {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </PageTransition>
  );
}

// --- APP PRINCIPAL E NAVBAR ---

export default function SamuelPaesPortfolio() {
  const { route, navigate, search } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const effectiveRoute = useMemo(() => {
    if (
      route === "sobre/samuel-carrera-paes" ||
      route === "paes-consultoria" ||
      route === "ecossistema" ||
      route.startsWith("atlas/") ||
      route.startsWith("servicos/")
    ) {
      return "visao";
    }

    if (
      route === "banal" ||
      route === "empresas/banal" ||
      route === "verdeburgo" ||
      route === "empresas/verde-burgo"
    ) {
      return "cases";
    }

    if (route === "projetos/provence-raiz") return "case/provence-raiz-sistema-visual";

    if (route === "biblioteca") return "sistema";
    if (route.startsWith("biblioteca/")) {
      return `sistema/${route.replace(/^biblioteca\//, "")}`;
    }

    return route;
  }, [route]);

  // Prevent scroll when mobile menu is open (Acessibilidade + UX)
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { id: "visao", label: "Visão" },
    { id: "cases", label: "Portfólio" },
    { id: "sistema", label: "Sistema" },
    { id: "contato", label: "Contato" },
  ];

  const handleNavClick = (id) => {
    navigate(id);
    setIsMenuOpen(false);
  };

  const isCaseDetail = effectiveRoute.startsWith("case/");
  const isSistemaDetail = effectiveRoute.startsWith("sistema/");

  return (
    <div className="min-h-screen bg-[#F4F0E9] text-stone-950 font-sans selection:bg-stone-900 selection:text-[#F4F0E9]">
      <a href="#main-content" className="sp-skip-link">Pular para o conteúdo</a>

      <header className="sp-site-header">
        <nav aria-label="Navegação principal" className="sp-site-header__nav">
          <div className="flex min-w-0 flex-1 justify-start">
            <button
              type="button"
              onClick={() => handleNavClick("inicio")}
              className="sp-site-brand"
              aria-label="Ir para a página inicial"
            >
              <img src="/images/00_LOGOS/symbol-black-navbar.png" alt="" aria-hidden="true" className="navbar-logo-final" />
              <span>Samuel Paes</span>
            </button>
          </div>

          <div className="hidden items-center justify-center gap-7 lg:flex xl:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                aria-label={`Página ${link.label}`}
                aria-current={
                  (effectiveRoute === link.id || (link.id === "cases" && isCaseDetail) || (link.id === "sistema" && isSistemaDetail))
                    ? "page"
                    : undefined
                }
                onClick={() => handleNavClick(link.id)}
                className={`sp-site-header__link ${
                  (effectiveRoute === link.id || (link.id === "cases" && isCaseDetail) || (link.id === "sistema" && isSistemaDetail))
                    ? "is-active"
                    : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden flex-1 justify-end lg:flex">
            <a
              href="https://wa.me/5531981184250"
              target="_blank" rel="noopener noreferrer"
              className="sp-site-header__cta"
            >
              Falar com Samuel <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            className="relative z-50 grid h-11 w-11 place-items-center text-stone-900 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </nav>

        {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação móvel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              transition={{ duration: 0.6, ease: PREMIUM_EASE }}
              className="absolute left-0 top-20 flex h-[calc(100vh-5rem)] w-full flex-col justify-center bg-[#F3EEE7] px-7 pb-16 lg:hidden"
            >
              <div className="flex flex-col border-t border-stone-900/15">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.08, ease: PREMIUM_EASE }}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    aria-current={
                      (effectiveRoute === link.id || (link.id === "cases" && isCaseDetail) || (link.id === "sistema" && isSistemaDetail))
                        ? "page"
                        : undefined
                    }
                    className={`flex min-h-20 items-center justify-between border-b border-stone-900/15 text-left transition-colors ${
                      (effectiveRoute === link.id || (link.id === "cases" && isCaseDetail) || (link.id === "sistema" && isSistemaDetail)) ? "text-stone-950" : "text-stone-500 hover:text-stone-950"
                    }`}
                  >
                    <span className="font-serif text-4xl">{link.label}</span>
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </motion.button>
                ))}
              </div>
              <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.4, ease: PREMIUM_EASE }}
                 className="mt-10 flex items-center"
              >
                <a href="https://wa.me/5531981184250" target="_blank" rel="noopener noreferrer" className="sp-button-primary w-full">
                  Falar com Samuel <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
        )}
      </header>

      {/* RENDERIZADOR DE PÁGINAS */}
      <main id="main-content">
        <AnimatePresence mode="wait">
          {effectiveRoute === "inicio" && <Inicio key="inicio" navigate={navigate} />}
          {effectiveRoute === "visao" && <Visao key="visao" />}
          {effectiveRoute === "cases" && (
            <Cases
              key={`cases-${search}`}
              navigate={navigate}
              initialArea={new URLSearchParams(search).get("area")}
            />
          )}
          {effectiveRoute.startsWith("case/") && <CaseDetail key="case-detail" caseId={effectiveRoute.replace("case/", "")} navigate={navigate} />}
          {effectiveRoute === "sistema" && <Sistema key="sistema" navigate={navigate} />}
          {effectiveRoute.startsWith("sistema/") && <SistemaArticle key={effectiveRoute} slug={effectiveRoute.replace("sistema/", "")} navigate={navigate} />}
          {effectiveRoute === "entregas/showroom-av2027" && <DeliveryPortal key="delivery-showroom-av2027" />}
          {effectiveRoute === "contato" && <Contato key="contato" />}
        </AnimatePresence>
      </main>

      <footer className="sp-site-footer" aria-label="Rodapé">
        <div className="sp-site-footer__main">
          <div>
            <button type="button" onClick={() => navigate("inicio")} className="font-serif text-4xl text-stone-950">
              Samuel Carrera Paes
            </button>
            <p>Direção criativa, sistemas visuais, experiências físicas e execução.</p>
          </div>
          <nav aria-label="Navegação do rodapé" className="sp-site-footer__links">
            {navLinks.map((link) => (
              <button key={link.id} type="button" onClick={() => navigate(link.id)} className="min-h-10 text-left hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">
                {link.label}
              </button>
            ))}
          </nav>
          <div className="sp-site-footer__links">
            <a href="mailto:samuel.paes@icloud.com" className="min-h-10 content-center hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">E-mail</a>
            <a href="https://instagram.com/samuelcarrerapaes" target="_blank" rel="noopener noreferrer" className="min-h-10 content-center hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">Instagram</a>
            <a href="https://wa.me/5531981184250" target="_blank" rel="noopener noreferrer" className="min-h-10 content-center hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">WhatsApp</a>
          </div>
        </div>
        <div className="sp-site-footer__signature">
          <span>Paes Consultoria · Samuel Carrera Paes · 2026</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2">
            Voltar ao topo <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </footer>

    </div>
  );
}
