import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRightCircle, ArrowLeftCircle, Menu, X, ArrowUp, CheckCircle2, Copy } from "lucide-react";

import { sistemaArticleCards } from "./sistemaArticleCards";
import { ImageWithFallback } from "./components/portfolio/ImageWithFallback";
import { PortfolioDisciplineCarousel } from "./components/portfolio/PortfolioDisciplineCarousel";
import {
  formatPortfolioTerm,
  getGalleryAssetMeta,
  getGallerySectionIntro,
  portfolioCategoryDefinitions,
} from "./portfolioPresentation";

// --- DADOS DOS CASES OFICIAIS COM NARRATIVA PROFUNDA E TAGS DE FILTRO ---
const visiblePortfolioCaseIds = portfolioCategoryDefinitions.flatMap((category) => category.caseIds);
const homeFeaturedCase = {
  id: "case-13",
  title: "ROOM 329 — The Room Remembers",
  category: "IA & Alma · Fashion Editorial · Direção Criativa",
  thumb: "/images/15_IA_COM_ALMA/02_ROOM_329/0E70DF46-364B-4B5F-9B95-50E3A855FE83.jpeg",
};

function getCasePortfolioCategory(caseId) {
  return portfolioCategoryDefinitions.find((category) => category.caseIds.includes(caseId)) || null;
}

const homePortrait = "/images/13_VISAO/about-transition.png";
const SITE_URL = "https://paesconsultoria.com";
const SITE_NAME = "Paes Consultoria";
const DEFAULT_TITLE = "Samuel Carrera Paes | Creative Consultant — Paes Consultoria";
const DEFAULT_DESCRIPTION = "Portfólio autoral de Samuel Carrera Paes em direção criativa, imagem, espaço, eventos, varejo, cenografia, campanhas e experiências.";

const CASE_SLUG_OVERRIDES = {
  "case-01": "val-fortunatto-brand-transition",
  "case-12": "provence-raiz-sistema-visual",
  "case-13": "room-329",
  "case-14": "pais-presenca-e-heranca",
  "case-15": "irene-1945-feito-a-mao",
  "case-16": "banal-identidade-de-agencia-criativa",
  "case-17": "casarao-medeiros-identidade-visual",
};

const LEGACY_CASE_ROUTE_ALIASES = {
  "case/val-fortunatto-brand-transitio": "case/val-fortunatto-brand-transition",
  "case/luxury-dinner-fashion-editorial": "case/room-329",
};

function slugifyCaseTitle(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[.\u00b7\u2013\u2014-]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCaseSlug(caseItem) {
  return caseItem.slug || CASE_SLUG_OVERRIDES[caseItem.id] || slugifyCaseTitle(caseItem.title);
}

function getCaseRoute(caseItem) {
  return `case/${getCaseSlug(caseItem)}`;
}

function absoluteUrl(pathname = "") {
  if (!pathname) return SITE_URL;
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function getCaseCanonicalUrl(caseItem) {
  return `${SITE_URL}/${getCaseRoute(caseItem)}`;
}

function getCaseLinkedInImage(caseItem) {
  return `/images/social/linkedin/${getCaseSlug(caseItem)}.jpg`;
}

function getCaseSocialImage(caseItem) {
  return caseItem.ogImage || caseItem.socialImage || caseItem.linkedinImage || getCaseLinkedInImage(caseItem) || caseItem.coverImage || caseItem.heroImage || caseItem.thumb || caseItem.gallery?.[0] || homePortrait;
}

function getCaseSocialAlt(caseItem) {
  return caseItem.ogImageAlt || `Imagem social do case ${caseItem.title} no portfólio Samuel Carrera Paes / Paes Consultoria.`;
}

function getCaseSeoTitle(caseItem) {
  return caseItem.seoTitle || `${caseItem.title} | Samuel Paes`;
}

function getCaseSeoDescription(caseItem) {
  return caseItem.seoDescription || caseItem.shortTese || caseItem.directorsNote || "Case do portfólio Samuel Carrera Paes / Paes Consultoria.";
}

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
function DynamicSEO({ title, fullTitle, description, url, image, imageAlt, imageWidth, imageHeight, schemaType = "WebPage", ogType = "website" }) {
  useEffect(() => {
    const pageTitle = fullTitle || (!title || title === "Início" ? DEFAULT_TITLE : `${title} | Samuel Carrera Paes — Paes Consultoria`);
    const pageDescription = description || DEFAULT_DESCRIPTION;
    const pageUrl = url ? `${SITE_URL}/${url.replace(/^\/+/, "")}` : SITE_URL;
    const pageImage = image ? absoluteUrl(image) : absoluteUrl(homePortrait);
    const pageImageAlt = imageAlt || `${pageTitle} — imagem social Paes Consultoria.`;
    document.title = pageTitle;

    // Update or inject meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = pageDescription;

    const seoSelectors = [
      ["link[rel='canonical']", "href", pageUrl],
      ["meta[property='og:type']", "content", ogType],
      ["meta[property='og:site_name']", "content", SITE_NAME],
      ["meta[property='og:title']", "content", pageTitle],
      ["meta[property='og:description']", "content", pageDescription],
      ["meta[property='og:url']", "content", pageUrl],
      ["meta[property='og:image']", "content", pageImage],
      ["meta[property='og:image:width']", "content", imageWidth],
      ["meta[property='og:image:height']", "content", imageHeight],
      ["meta[property='og:image:alt']", "content", pageImageAlt],
      ["meta[name='twitter:card']", "content", "summary_large_image"],
      ["meta[name='twitter:title']", "content", pageTitle],
      ["meta[name='twitter:description']", "content", pageDescription],
      ["meta[name='twitter:image']", "content", pageImage],
      ["meta[name='twitter:image:alt']", "content", pageImageAlt]
    ];

    seoSelectors.forEach(([selector, attribute, value]) => {
      if (!value) return;
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
        "author": { "@type": "Person", "name": "Samuel Carrera Paes", "url": SITE_URL },
        "mainEntityOfPage": pageUrl,
        "dateModified": "2026-05-24"
      } : {}),
      "description": pageDescription,
      "image": pageImage,
      "creator": { "@type": "Person", "name": "Samuel Carrera Paes", "url": SITE_URL },
      "about": { "@type": "Person", "name": "Samuel Carrera Paes", "alternateName": "Samuel Paes" },
      "url": pageUrl
    };
    script.text = JSON.stringify(schemaData);

  }, [title, fullTitle, description, url, image, imageAlt, imageWidth, imageHeight, schemaType, ogType]);

  return null;
}

// --- COMPONENTES DE ALTA PERFORMANCE & UX ---

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

function handleShareIntent({ title = document.title, text = "Samuel Carrera Paes | Paes Consultoria", url = window.location.href } = {}) {
  if (navigator.share) {
    navigator.share({ title, text, url }).catch(() => {});
    return;
  }

  navigator.clipboard?.writeText(url);
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

function CaseShareActions({ caseItem }) {
  const [copied, setCopied] = useState(false);
  const canonicalUrl = getCaseCanonicalUrl(caseItem);
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(`${caseItem.title} — ${canonicalUrl}`)}`;

  useEffect(() => {
    if (!copied) return undefined;
    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      const didCopy = await copyTextToClipboard(canonicalUrl);
      setCopied(Boolean(didCopy));
    } catch {
      setCopied(false);
      window.prompt("Copie o link do case:", canonicalUrl);
    }
  };

  const buttonClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-stone-900/15 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 transition-colors hover:border-stone-900/35 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900";

  return (
    <section className="mt-20 border-y border-stone-900/10 py-8 md:mt-24 md:flex md:items-center md:justify-between md:gap-8" aria-label={`Compartilhar o case ${caseItem.title}`}>
      <div className="mb-5 md:mb-0">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Compartilhar case</h2>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartilhar ${caseItem.title} no LinkedIn`}
          className={buttonClass}
        >
          LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartilhar ${caseItem.title} no WhatsApp`}
          className={buttonClass}
        >
          WhatsApp <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copiar link canônico do case ${caseItem.title}`}
          className={buttonClass}
        >
          {copied ? "Link copiado" : "Copiar link"} <Copy className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="sr-only" aria-live="polite">{copied ? "Link copiado para a área de transferência." : ""}</span>
      </div>
    </section>
  );
}

function EditorialNotice({ navigate }) {
  const notices = [
    "Portfólio em expansão",
    "Direção criativa, imagem e espaço",
    "Novo eixo: trabalhos, artigos e experiências",
    "Biblioteca como repertório vivo"
  ];

  return (
    <aside className="sp-editorial-notice mt-16" aria-label="Atualização editorial">
      <button
        type="button"
        onClick={() => navigate("sistema")}
        className="group grid w-full gap-6 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 md:grid-cols-[auto_1fr_auto] md:items-center md:px-6"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Agora no arquivo</span>
        <span className="sp-marquee" aria-hidden="true">
          <span className="sp-marquee-track">
            {[...notices, ...notices].map((notice, index) => (
              <span key={`${notice}-${index}`}>{notice}</span>
            ))}
          </span>
        </span>
        <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900">
          Ler sistema <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
        </span>
      </button>
    </aside>
  );
}

function GlobalDiscoveryDock({ navigate, hidden = false }) {
  if (hidden) return null;

  return (
    <nav className="sp-discovery-dock hidden lg:flex" aria-label="Exploração rápida do site">
      <button type="button" onClick={() => navigate("cases")}>Portfólio</button>
      <button type="button" onClick={() => navigate("sistema")}>Sistema</button>
      <button type="button" onClick={() => navigate("contato")}>Contato</button>
      <a href="https://instagram.com/samuelcarrerapaes" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a href="https://wa.me/5531981184250" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    </nav>
  );
}

// --- PÁGINAS ---

function Inicio({ navigate }) {
  const stats = [
    { number: "09+", label: "Anos", text: "Construindo repertório visual, espacial e estratégico." },
    { number: "40+", label: "Projetos", text: "Trabalhos entre imagem, espaço, evento, produto e presença." },
    { number: "10+", label: "Implantações", text: "Execuções físicas, lançamentos e ativações acompanhadas." },
    { number: String(visiblePortfolioCaseIds.length), label: "Cases", text: "Estudos publicados em um arquivo em expansão." },
    { number: "100%", label: "Foco", text: "Transformar intenção criativa em experiência real." },
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
          <span className="italic text-stone-500 font-light pr-4">Consultor Criativo.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: PREMIUM_EASE }}
          className="mt-16 md:mt-24 max-w-3xl"
        >
          <p className="text-xl md:text-3xl lg:text-4xl leading-relaxed tracking-tight text-stone-800 font-light border-l border-stone-900/20 pl-6 md:pl-10 text-balance">
            "Construo presença no ponto em que estética, estratégia, espaço e execução deixam de ser intenção e passam a existir no mundo."
          </p>
          <p className="mt-8 max-w-2xl text-sm md:text-base leading-relaxed text-stone-600 font-light">
            Samuel Carrera Paes reúne trabalhos de direção criativa, consultoria, imagem, varejo, eventos, cenografia, conteúdo, produto e experiência física. Este site funciona como um portfólio autoral do que ele cria, conduz e transforma.
          </p>
          <div className="mt-10 flex flex-wrap gap-7">
            <button
              type="button"
              onClick={() => navigate("cases")}
              className="inline-flex items-center gap-3 border-b border-stone-900/30 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              Ver cases <ArrowRightCircle className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigate("ia-com-alma")}
              className="inline-flex items-center gap-3 border-b border-stone-900/30 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              Conheça IA & Alma <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        <EditorialNotice navigate={navigate} />

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
                  {homeFeaturedCase.title.split('—')[0].trim()}
                </h2>
                <p className="text-sm md:text-base font-light text-stone-600 mb-12 max-w-md leading-relaxed">
                  {homeFeaturedCase.category}
                </p>

                <button
                  type="button"
                  aria-label={`Explorar o case em destaque: ${homeFeaturedCase.title}`}
                  onClick={() => {
                    navigate("cases");
                    setTimeout(() => {
                      const el = document.getElementById(homeFeaturedCase.id);
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
               <ImageWithFallback src={homeFeaturedCase.thumb} mode="cover" alt={`Imagem de destaque do projeto ${homeFeaturedCase.title}`} fallbackLabel="Featured Work" imageClassName="group-hover:scale-[1.03] transition duration-[2s] ease-out" />

               {/* Tipografia como Textura */}
               <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-10 px-8 opacity-[0.03]" aria-hidden="true">
                 <span className="font-serif text-[10vw] leading-none tracking-tighter mix-blend-overlay">IMAGEM</span>
                 <span className="font-serif text-[10vw] leading-none tracking-tighter mix-blend-overlay text-right">OBJETO</span>
                 <span className="font-serif text-[10vw] leading-none tracking-tighter mix-blend-overlay">ESPAÇO</span>
                 <span className="font-serif text-[10vw] leading-none tracking-tighter mix-blend-overlay text-right">PRESENÇA</span>
               </div>
            </div>
          </div>
        </motion.article>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: PREMIUM_EASE }}
          className="mt-32 grid gap-12 border-y border-stone-900/10 py-20 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
          aria-labelledby="home-ia-com-alma-title"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">
              NOVO EIXO / DIREÇÃO SINTÉTICA
            </span>
          </div>
          <div>
            <h2 id="home-ia-com-alma-title" className="font-serif text-5xl leading-[0.92] tracking-tight text-stone-950 md:text-7xl text-balance">
              IA & Alma.
            </h2>
            <p className="mt-7 max-w-3xl text-xl font-light leading-relaxed text-stone-700 md:text-2xl text-balance">
              Campanhas sintéticas com direção real. A tecnologia amplia repertório, intenção e autoria — não ocupa o lugar deles.
            </p>
            <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-stone-600">
              Uma nova expressão da mesma prática que conecta marca, imagem, produto, espaço e narrativa. Samuel continua no centro; a inteligência artificial entra como infraestrutura criativa governada por critério editorial.
            </p>
            <button
              type="button"
              onClick={() => navigate("ia-com-alma")}
              className="mt-10 inline-flex items-center gap-4 border-b border-stone-900/30 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              Entrar em IA & Alma <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.section>

        {/* --- MAGNETIC CALL TO ACTION --- */}
        <div className="mt-32 flex items-center justify-between border-t border-stone-900/10 pt-10 pb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400 hidden md:block">
            Explore o arquivo visual dos trabalhos
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

function Cases({ navigate, casesData }) {
  return (
    <PageTransition>
      <DynamicSEO title="Portfólio de Trabalhos" description="Portfólio de Samuel Carrera Paes organizado por Visual Merchandising, Identidade Visual, Cenografia, Decoração e IA & Alma." />
      <section className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12" aria-labelledby="cases-title">
        <header className="border-b border-stone-900/10 pb-16 md:pb-24">
          <span className="mb-10 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">PORTFÓLIO / CINCO DISCIPLINAS</span>
          <h1 id="cases-title" className="mb-8 max-w-5xl font-serif text-5xl leading-[0.85] tracking-tighter text-stone-950 text-balance md:text-[7rem]">Trabalhos com estrutura, presença e contexto.</h1>
          <p className="max-w-3xl text-lg font-light leading-relaxed text-stone-600 md:text-2xl">
            Samuel Carrera Paes transforma intenção em presença por meio de direção criativa, imagem, espaço e experiência. Este arquivo organiza essa prática em Visual Merchandising, Identidade Visual, Cenografia, Decoração e IA & Alma.
          </p>

          <nav className="mt-12 flex flex-wrap gap-3" aria-label="Ir para uma disciplina do portfólio">
            {portfolioCategoryDefinitions.map((category) => (
              <a key={category.id} href={`#${category.id}`} className="inline-flex min-h-11 items-center rounded-full border border-stone-900/20 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">
                {category.label}
              </a>
            ))}
          </nav>
        </header>

        <div id="cases-index" className="mb-40">
          {portfolioCategoryDefinitions.map((category, categoryIndex) => (
            <PortfolioDisciplineCarousel
              key={category.id}
              category={category}
              categoryIndex={categoryIndex}
              categoryCases={category.caseIds.map((caseId) => casesData.find((caseItem) => caseItem.id === caseId)).filter(Boolean)}
              onOpenCase={(caseItem) => navigate(getCaseRoute(caseItem))}
            />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

function CaseDetail({ caseId, navigate, casesData }) {
  const caseIndex = casesData.findIndex(c => c.id === caseId || getCaseSlug(c) === caseId || c.legacySlugs?.includes(caseId));
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

  const portfolioCategory = getCasePortfolioCategory(c.id);
  const categoryCases = portfolioCategory
    ? portfolioCategory.caseIds.map((caseItemId) => casesData.find((caseItem) => caseItem.id === caseItemId)).filter(Boolean)
    : [];
  const categoryCaseIndex = categoryCases.findIndex((caseItem) => caseItem.id === c.id);
  const isLast = categoryCaseIndex === -1 || categoryCaseIndex === categoryCases.length - 1;
  const nextCase = categoryCaseIndex >= 0 && !isLast ? categoryCases[categoryCaseIndex + 1] : null;
  const previousCase = categoryCaseIndex > 0 ? categoryCases[categoryCaseIndex - 1] : null;
  const nextCaseRoute = nextCase ? getCaseRoute(nextCase) : null;
  const previousCaseRoute = previousCase ? getCaseRoute(previousCase) : null;

  if (c.id === "case-12") {
    return (
      <ProvenceRaizCaseDetail
        c={c}
        navigate={navigate}
        previousCaseRoute={previousCaseRoute}
        nextCaseRoute={nextCaseRoute}
        isLast={isLast}
      />
    );
  }

  return (
    <PageTransition>
      <DynamicSEO
        fullTitle={getCaseSeoTitle(c)}
        description={getCaseSeoDescription(c)}
        image={getCaseSocialImage(c)}
        imageAlt={getCaseSocialAlt(c)}
        imageWidth={c.ogImageWidth}
        imageHeight={c.ogImageHeight}
        ogType="article"
        url={getCaseRoute(c)}
        schemaType="CreativeWork"
      />
      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12 relative pb-20 md:pb-0">

        {/* A. Case Hero */}
        <header className="flex flex-col mb-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 block">{portfolioCategory?.label || "Arquivo preservado"}{c.projectFamily ? ` / ${c.projectFamily}` : ""}</span>
            <button
              type="button"
              onClick={() => handleShareIntent({ title: getCaseSeoTitle(c), text: getCaseSeoDescription(c), url: getCaseCanonicalUrl(c) })}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm px-2 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500 transition-colors hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              Compartilhar <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <h1 className="mb-8 max-w-5xl break-words font-serif text-[clamp(2.6rem,13vw,3rem)] leading-[0.92] tracking-[-0.02em] text-stone-950 text-balance md:text-[6rem] md:leading-[0.9]">{c.title}</h1>
          <p className="text-xl md:text-2xl font-light text-stone-600 max-w-3xl mb-12 leading-relaxed text-balance">{c.shortTese}</p>

          {/* Metadata Grid */}
          <dl className="mb-16 grid grid-cols-1 gap-6 border-t border-b border-stone-900/10 py-10 sm:grid-cols-2 md:grid-cols-4">
            <div className="min-w-0">
              <dt className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">Cliente / Contexto</dt>
              <dd className="text-sm font-light text-stone-900">{c.client}</dd>
            </div>
            <div className="min-w-0">
              <dt className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">Papel de Samuel</dt>
              <dd className="text-sm font-light text-stone-900">{c.role}</dd>
            </div>
            <div className="min-w-0">
              <dt className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">Território</dt>
              <dd className="text-sm font-light text-stone-900">{formatPortfolioTerm(c.territory)}</dd>
            </div>
            <div className="min-w-0">
              <dt className="block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">Entregáveis</dt>
              <dd className="break-words text-sm font-light leading-relaxed text-stone-900">{c.deliverables}</dd>
            </div>
          </dl>

          <figure className="w-full bg-stone-200/50 relative overflow-visible mb-24 rounded-sm flex justify-center m-0 p-0 shadow-sm">
            <ImageWithFallback
              src={c.thumb}
              mode="natural"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1440px) 1440px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 48px)"
              alt={`Imagem de abertura do case ${c.title}`}
              imageClassName="max-h-[85vh]"
            />
          </figure>

          {c.requiresG4 && (
            <aside className="mb-24 border border-amber-900/20 bg-amber-50/50 p-6 text-sm font-light leading-relaxed text-stone-700" aria-label="Estado editorial do case">
              <strong className="mb-2 block text-[10px] font-bold uppercase tracking-[0.24em] text-amber-900">Reconstrução editorial aguardando G4</strong>
              As imagens atuais são derivados documentados do guideline original. Novas pranchas e simulações não serão produzidas sem aprovação específica.
            </aside>
          )}
        </header>

        <aside className="sp-case-progress hidden lg:flex" aria-label="Navegação contextual do case">
          <button type="button" onClick={() => navigate("cases")}>Portfólio</button>
          {previousCaseRoute && <button type="button" onClick={() => navigate(previousCaseRoute)}>Anterior</button>}
          <button type="button" onClick={() => handleShareIntent({ title: getCaseSeoTitle(c), text: getCaseSeoDescription(c), url: getCaseCanonicalUrl(c) })}>Compartilhar</button>
          {!isLast ? (
            <button type="button" onClick={() => navigate(nextCaseRoute)}>Próximo</button>
          ) : (
            <button type="button" onClick={() => navigate("sistema")}>Sistema</button>
          )}
        </aside>

        {/* B. Director's Note */}
        <section aria-label="Nota do Diretor" className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-24 items-start">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Nota de direção</h2>
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
          {getGallerySectionIntro(c.id) && (
            <p className="mb-12 max-w-3xl font-serif text-2xl leading-tight text-stone-800 md:text-3xl">
              {getGallerySectionIntro(c.id)}
            </p>
          )}

          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
            {c.gallery.map((img, idx) => {
              const assetMeta = getGalleryAssetMeta(c, img, idx);
              let spanClass = "md:col-span-1";
              if (c.gallery.length % 2 !== 0 && idx === 0) spanClass = "md:col-span-2";
              else if (c.gallery.length > 5 && idx % 3 === 0) spanClass = "md:col-span-2";

              return (
                <figure key={img} className={`${spanClass} group relative m-0 w-full overflow-hidden rounded-sm bg-stone-200/50 p-0 shadow-sm`}>
                  <ImageWithFallback
                    src={img}
                    mode="cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    alt={assetMeta.alt}
                    containerClassName={c.id === "case-17" ? "aspect-[3/2]" : "aspect-[4/5] sm:aspect-[3/2]"}
                    fitClassName={img.endsWith(".svg") ? "object-contain" : "object-scale-down"}
                    imageClassName="ease-out group-hover:scale-[1.015]"
                  />
                  <figcaption className="border-t border-stone-900/10 bg-[#F4F0E9]/80 px-4 py-4">
                    <strong className="block text-[9px] font-bold uppercase tracking-[0.18em] text-stone-500">
                      {assetMeta.label}
                    </strong>
                    <span className="mt-2 block max-w-2xl text-xs font-light leading-relaxed text-stone-600">{assetMeta.caption}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {c.media?.length > 0 && (
          <section className="mb-20 border-t border-stone-900/10 pt-16" aria-labelledby="case-motion-title">
            <header className="mb-10 max-w-3xl">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Imagem em movimento</span>
              <h2 id="case-motion-title" className="font-serif text-4xl leading-none text-stone-950 md:text-6xl">O sistema também se move.</h2>
            </header>
            <div className="grid gap-8 lg:grid-cols-2">
              {c.media.map((mediaItem) => (
                <figure key={mediaItem.src} className="overflow-hidden rounded-sm border border-stone-900/10 bg-stone-950">
                  <video controls muted loop playsInline preload="metadata" poster={mediaItem.poster} className="aspect-video w-full bg-stone-950 object-contain">
                    <source src={mediaItem.src} type="video/mp4" />
                    Seu navegador não conseguiu reproduzir este vídeo.
                  </video>
                  <figcaption className="bg-[#F4F0E9] p-5">
                    <strong className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-900">{mediaItem.title}</strong>
                    <p className="mt-3 text-sm font-light leading-relaxed text-stone-600">{mediaItem.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {c.provenanceNote && (
          <aside className="mb-20 grid gap-5 border-y border-stone-900/10 py-8 md:grid-cols-[0.55fr_1.45fr]" aria-label="Proveniência dos materiais do case">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Proveniência</h2>
            <p className="max-w-3xl text-sm font-light leading-relaxed text-stone-600">{c.provenanceNote}</p>
          </aside>
        )}

        {portfolioCategory && categoryCases.length > 1 && (
          <section className="mb-20 border-t border-stone-900/10 pt-16" aria-labelledby="related-cases-title">
            <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Também em {portfolioCategory.label}</span>
            <h2 id="related-cases-title" className="mb-8 font-serif text-4xl leading-none text-stone-950 md:text-5xl">Continue pela disciplina.</h2>
            <div className="flex flex-wrap gap-3">
              {categoryCases.filter((caseItem) => caseItem.id !== c.id).map((caseItem) => (
                <button key={caseItem.id} type="button" onClick={() => navigate(getCaseRoute(caseItem))} className="inline-flex min-h-11 items-center rounded-full border border-stone-900/20 px-5 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">
                  {caseItem.title}
                </button>
              ))}
            </div>
          </section>
        )}

        <CaseShareActions caseItem={c} />

        {/* E. Navigation (Sticky Bottom on Mobile for better UX) */}
        <nav
          aria-label="Paginação de Cases"
          className="fixed bottom-0 left-0 z-40 flex w-full flex-row items-center justify-between gap-3 border-t border-stone-900/10 bg-[#F4F0E9]/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] backdrop-blur-xl md:static md:mt-24 md:gap-4 md:border-t md:bg-transparent md:p-0 md:pt-12 md:shadow-none"
        >
          <button
            type="button"
            onClick={() => navigate("cases")}
            className="flex min-h-11 flex-1 items-center justify-center gap-3 rounded-sm border border-stone-900/20 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 md:flex-none md:justify-start md:border-transparent md:py-0"
          >
            <ArrowLeftCircle className="w-5 h-5 hidden sm:block" aria-hidden="true" /> INÍCIO <span className="hidden sm:inline">de Cases</span>
          </button>

          {!isLast ? (
            <button
              type="button"
              onClick={() => navigate(nextCaseRoute)}
              className="flex min-h-11 flex-1 items-center justify-center gap-3 rounded-sm bg-stone-900 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm transition-colors hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 md:flex-none md:justify-end md:bg-transparent md:py-0 md:text-stone-900 md:shadow-none"
            >
              Próximo <span className="hidden sm:inline">Case</span> <ArrowRightCircle className="w-5 h-5 hidden md:block" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("sistema")}
              className="flex min-h-11 flex-1 items-center justify-center gap-3 rounded-sm bg-stone-900 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm transition-colors hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 md:flex-none md:justify-end md:bg-transparent md:py-0 md:text-stone-900 md:shadow-none"
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

function ProvenceRaizCaseDetail({ c, navigate, previousCaseRoute, nextCaseRoute, isLast }) {
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
          { src: `${base}/02_WEB/provence-raiz-moodboard-materialidade-antiga.jpg`, alt: "Moodboard Provence Raiz com arquitetura antiga, flor seca, espelhos, madeira, cerâmica e tons terrosos", caption: "Arquitetura, matéria e memória como base para o luxo silencioso." },
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
    ].filter((chapter) => [
      "identidade-visual",
      "monograma",
      "ornamentos",
      "papelaria",
      "sinalizacao",
      "hospitalidade"
    ].includes(chapter.id));
  }, []);

  return (
    <PageTransition>
      <DynamicSEO
        fullTitle={getCaseSeoTitle(c)}
        description={getCaseSeoDescription(c)}
        image={getCaseSocialImage(c)}
        imageAlt={getCaseSocialAlt(c)}
        imageWidth={c.ogImageWidth}
        imageHeight={c.ogImageHeight}
        ogType="article"
        url={getCaseRoute(c)}
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
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Identidade Visual · Provence Raiz</span>
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
          {previousCaseRoute && <button type="button" onClick={() => navigate(previousCaseRoute)}>Anterior</button>}
          <button type="button" onClick={() => handleShareIntent({ title: getCaseSeoTitle(c), text: getCaseSeoDescription(c), url: getCaseCanonicalUrl(c) })}>Compartilhar</button>
          {!isLast && nextCaseRoute ? (
            <button type="button" onClick={() => navigate(nextCaseRoute)}>Próximo</button>
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

        {c.provenanceNote && (
          <aside className="mt-16 grid gap-6 border-b border-stone-900/10 pb-16 md:grid-cols-[0.8fr_1.2fr]" aria-label="Proveniência dos materiais do case">
            <h2 className="font-serif text-4xl leading-none text-stone-950 md:text-5xl">Proveniência.</h2>
            <p className="max-w-3xl text-sm font-light leading-relaxed text-stone-600">{c.provenanceNote}</p>
          </aside>
        )}

        <CaseShareActions caseItem={c} />

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

function IAComAlma({ navigate }) {
  const assetBase = "/images/15_IA_COM_ALMA/01_COMERCIAL";

  const systemSteps = [
    {
      num: "01",
      title: "Estrutura",
      text: "Antes da imagem final, definimos corpo, proporção e presença como uma estrutura controlável.",
      image: `${assetBase}/system-01-structure.png`,
      alt: "Estrutura corporal em ambiente de desenvolvimento visual branco."
    },
    {
      num: "02",
      title: "Assets",
      text: "Produto, acessórios e materiais são tratados como elementos independentes dentro do sistema visual.",
      image: `${assetBase}/system-03-assets.png`,
      alt: "Jaqueta burgundy, saia e bolsa verde apresentados como assets independentes."
    },
    {
      num: "03",
      title: "Worldbuilding",
      text: "O ambiente é construído como um mundo com arquitetura, escala, matéria, luz e atmosfera próprias.",
      image: `${assetBase}/system-06-worldbuilding.png`,
      alt: "Ambiente arquitetônico desenvolvido como base de worldbuilding."
    },
    {
      num: "04",
      title: "Output",
      text: "Personagem, styling e ambiente convergem em uma imagem editorial pronta para comunicar.",
      image: `${assetBase}/system-08-output.png`,
      fit: "contain",
      alt: "Resultado editorial com personagem integrada ao ambiente arquitetônico."
    }
  ];

  const capabilities = [
    {
      num: "01",
      title: "Campanha",
      text: "Um universo desenvolvido para lançamento, coleção, produto ou ação específica."
    },
    {
      num: "02",
      title: "Sistema Visual",
      text: "Personagens, ambientes, styling e linguagem proprietária organizados para a marca."
    },
    {
      num: "03",
      title: "Continuidade",
      text: "Novos conteúdos desenvolvidos dentro de um universo já definido, sem perder identidade."
    },
    {
      num: "04",
      title: "Direção & Consultoria",
      text: "Estratégia, curadoria, diagnóstico e refinamento para processos criativos com IA."
    }
  ];

  return (
    <PageTransition>
      <DynamicSEO
        title="IA & Alma — Direção Humana e Produção Generativa"
        description="IA & Alma é o sistema autoral de Samuel Paes para criar campanhas sintéticas com direção humana, worldbuilding, continuidade visual e critério editorial."
        url="ia-com-alma"
        image="/images/15_IA_COM_ALMA/02_ROOM_329/0E70DF46-364B-4B5F-9B95-50E3A855FE83.jpeg"
        imageAlt="Campanha ROOM 329: modelo em alfaiataria rosa, mesa, vinho e atmosfera editorial."
        schemaType="Service"
      />

      <article className="mx-auto max-w-[90rem] px-6 lg:px-12 pt-12">
        {/* HERO */}
        <header className="grid gap-14 border-b border-stone-900/10 pb-20 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <span className="mb-10 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
              IA & ALMA / CREATIVE DIRECTION
            </span>

            <p className="max-w-sm text-sm font-light leading-relaxed text-stone-500">
              Produto real · Direção humana · Tecnologia generativa
            </p>
          </div>

          <div>
            <h1 className="max-w-5xl font-serif text-5xl leading-[0.9] tracking-tighter text-stone-950 text-balance md:text-7xl lg:text-[7rem]">
              Produto real. Direção humana. Tecnologia generativa. Critério editorial.
            </h1>

            <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-stone-600 text-balance md:text-3xl">
              IA & Alma investiga como criar imagens, campanhas e mundos sintéticos sem abrir mão de intenção, sensibilidade, repertório e autoria.
            </p>
          </div>
        </header>

        {/* SYSTEM HERO */}
        <section className="py-20 lg:py-28" aria-labelledby="ia-system-title">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
                01 / SISTEMA DE CONSTRUÇÃO VISUAL
              </span>
            </div>

            <div>
              <h2
                id="ia-system-title"
                className="font-serif text-4xl leading-none tracking-tight text-stone-950 md:text-6xl"
              >
                Do sistema à imagem.
              </h2>

              <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-stone-600 md:text-lg">
                A tecnologia entra como infraestrutura. A direção continua sendo humana: definir o que existe, por que existe, o que precisa ser corrigido e como cada elemento participa da narrativa.
              </p>
            </div>
          </div>

          <figure className="overflow-hidden border border-stone-900/10 bg-white/30">
            <ImageWithFallback
              src={`${assetBase}/system-05-environment-mapping.png`}
              alt="Modelo inserida diante de estrutura arquitetônica em wireframe azul durante o processo de desenvolvimento."
              fallbackLabel="Environment Mapping"
              loading="eager"
            />
            <figcaption className="flex flex-col gap-3 border-t border-stone-900/10 px-5 py-5 md:flex-row md:items-center md:justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900">
                Environment Mapping
              </span>
              <span className="max-w-2xl text-xs font-light leading-relaxed text-stone-500 md:text-right">
                Personagem definida. Ambiente ainda em construção. Cada camada pode ser desenvolvida, ajustada e validada separadamente.
              </span>
            </figcaption>
          </figure>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {systemSteps.map((step) => (
              <article
                key={step.num}
                className="flex flex-col border border-stone-900/10 bg-white/30"
              >
                <div className="aspect-[3/2] overflow-hidden bg-[#E8E3DC]">
                  <ImageWithFallback
                    src={step.image}
                    alt={step.alt}
                    fallbackLabel={step.title}
                    mode="cover"
                    fitClassName={step.fit === "contain" ? "object-contain" : "object-cover"}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-8 font-serif text-4xl text-stone-300">
                    {step.num}.
                  </span>

                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-stone-900">
                    {step.title}
                  </h3>

                  <p className="text-sm font-light leading-relaxed text-stone-600">
                    {step.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ENVIRONMENT AS SYSTEM */}
        <section
          className="border-t border-stone-900/10 py-20 lg:py-28"
          aria-labelledby="environment-title"
        >
          <header className="mb-14 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
              02 / WORLDBUILDING
            </span>

            <h2
              id="environment-title"
              className="font-serif text-4xl leading-none tracking-tight text-stone-950 md:text-6xl"
            >
              Ambiente-base, histórias múltiplas.
            </h2>

            <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-stone-600 md:text-xl">
              O espaço não funciona apenas como fundo. Ele é uma estrutura narrativa que pode receber diferentes personagens, produtos, atmosferas e campanhas.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            <figure className="border border-stone-900/10 bg-white/30">
              <ImageWithFallback
                src={`${assetBase}/environment-base.png`}
                alt="Ambiente-base de sala de jantar desenvolvido para receber diferentes narrativas."
                fallbackLabel="Ambiente-base"
              />

              <figcaption className="border-t border-stone-900/10 p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900">
                  Environment Base
                </span>
                <p className="mt-3 text-sm font-light leading-relaxed text-stone-500">
                  Arquitetura, iluminação, mobiliário e materialidade existem antes da história.
                </p>
              </figcaption>
            </figure>

            <figure className="border border-stone-900/10 bg-white/30">
              <ImageWithFallback
                src={`${assetBase}/environment-activated.png`}
                alt="Mesmo ambiente-base ativado por personagem e styling de campanha."
                fallbackLabel="Ativação narrativa"
              />

              <figcaption className="border-t border-stone-900/10 p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900">
                  Narrative Activation
                </span>
                <p className="mt-3 text-sm font-light leading-relaxed text-stone-500">
                  O mesmo mundo recebe personagem, styling e intenção para se transformar em campanha.
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ASSET TO CAMPAIGN */}
        <section
          className="border-t border-stone-900/10 py-20 lg:py-28"
          aria-labelledby="asset-campaign-title"
        >
          <header className="mb-14 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
              03 / DO ASSET À CAMPANHA
            </span>

            <div>
              <h2
                id="asset-campaign-title"
                className="font-serif text-4xl leading-none tracking-tight text-stone-950 md:text-6xl"
              >
                Identidade. Styling. Contexto.
              </h2>

              <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-stone-600">
                Cada elemento pode nascer separado. O valor aparece quando todos passam a responder à mesma direção.
              </p>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <figure className="border border-stone-900/10 bg-white/30">
              <ImageWithFallback
                src={`${assetBase}/identity-base.png`}
                alt="Retrato neutro usado como base de identidade da personagem."
                fallbackLabel="Identity"
              />
              <figcaption className="p-5 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                Identity
              </figcaption>
            </figure>

            <figure className="border border-stone-900/10 bg-white/30">
              <ImageWithFallback
                src={`${assetBase}/styling-green.png`}
                alt="Vestido, joias e sapatos apresentados como sistema de styling."
                fallbackLabel="Styling"
              />
              <figcaption className="p-5 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                Styling
              </figcaption>
            </figure>

            <figure className="border border-stone-900/10 bg-white/30">
              <ImageWithFallback
                src={`${assetBase}/output-green.png`}
                alt="Resultado editorial da personagem com styling aplicado ao ambiente final."
                fallbackLabel="Campaign Output"
              />
              <figcaption className="p-5 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">
                Campaign Output
              </figcaption>
            </figure>
          </div>
        </section>

        {/* PROOF / ROOM 329 */}
        <section
          className="border-t border-stone-900/10 py-20 lg:py-28"
          aria-labelledby="ia-proof-title"
        >
          <header className="mb-14 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
              04 / PROVA EDITORIAL
            </span>
            <div>
              <h2 id="ia-proof-title" className="font-serif text-4xl leading-none tracking-tight text-stone-950 md:text-6xl">
                ROOM 329.
              </h2>
              <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-stone-600 md:text-xl">
                Um universo visual desenvolvido como campanha, não como imagens isoladas. Personagem, arquitetura, styling, luz e atmosfera pertencem à mesma noite.
              </p>
            </div>
          </header>

          <div className="grid gap-5 md:gap-6">
            <figure className="overflow-hidden border border-stone-900/10 bg-stone-950">
              <div className="aspect-[16/9] overflow-hidden">
                <ImageWithFallback
                  src="/images/15_IA_COM_ALMA/02_ROOM_329/0E70DF46-364B-4B5F-9B95-50E3A855FE83.jpeg"
                  alt="Modelo em alfaiataria rosa diante de uma mesa com vinho no universo ROOM 329."
                  fallbackLabel="ROOM 329"
                  loading="lazy"
                  mode="cover"
                  positionClassName="object-center"
                />
              </div>
              <figcaption className="border-t border-white/10 bg-stone-950 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-300">
                Cena-base · Arquitetura, personagem e vestígios
              </figcaption>
            </figure>

            <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
              <figure className="overflow-hidden border border-stone-900/10 bg-stone-950">
                <div className="aspect-[4/5] overflow-hidden">
                  <ImageWithFallback
                    src="/images/15_IA_COM_ALMA/02_ROOM_329/F59E614F-F034-42C8-806B-045D2B363399.jpeg"
                    alt="Modelo em vestido azul-escuro com cloches no ambiente ROOM 329."
                    fallbackLabel="Direção de personagem"
                    mode="cover"
                    positionClassName="object-center"
                  />
                </div>
                <figcaption className="border-t border-white/10 bg-stone-950 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-300">
                  Personagem · Continuidade de styling
                </figcaption>
              </figure>

              <figure className="overflow-hidden border border-stone-900/10 bg-stone-950">
                <div className="aspect-[4/5] overflow-hidden">
                  <ImageWithFallback
                    src="/images/15_IA_COM_ALMA/02_ROOM_329/E8FA9807-E247-48DD-847B-D901D3F31625.jpeg"
                    alt="Duas personagens em composição editorial junto à mesa do ROOM 329."
                    fallbackLabel="Continuidade visual"
                    mode="cover"
                    positionClassName="object-[50%_35%]"
                  />
                </div>
                <figcaption className="border-t border-white/10 bg-stone-950 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-300">
                  Duas presenças · Narrativa compartilhada
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-8 border-t border-stone-900/10 pt-8">
            <p className="max-w-2xl text-sm font-light leading-relaxed text-stone-600">
              O case demonstra a diferença entre gerar uma imagem e dirigir uma produção construída com IA: cada decisão precisa sustentar identidade e continuidade.
            </p>
            <button
              type="button"
              onClick={() => navigate("case/room-329")}
              className="inline-flex items-center gap-3 border-b border-stone-900/30 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              Ver case completo <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* IA COM ALMA / EDITORIAL RANGE */}
        <section
          className="border-t border-stone-900/10 py-20 lg:py-28"
          aria-labelledby="ia-editorial-range-title"
        >
          <header className="mb-14 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
              05 / OUTRAS NARRATIVAS
            </span>
            <div>
              <h2 id="ia-editorial-range-title" className="font-serif text-4xl leading-none tracking-tight text-stone-950 md:text-6xl">
                Um método. Linguagens distintas.
              </h2>
              <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-stone-600 md:text-xl">
                A coerência não vem de repetir uma estética. Ela nasce da capacidade de dirigir cada universo segundo sua própria intenção.
              </p>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            <article className="group flex flex-col border border-stone-900/10 bg-white/30">
              <figure className="aspect-[4/5] overflow-hidden bg-stone-950">
                <ImageWithFallback
                  src="/images/15_IA_COM_ALMA/03_PAIS/82064477-F96E-4925-8553-EDC7D32992E1.jpeg"
                  alt="Pai e filho sorrindo juntos em retrato preto e branco do projeto PAIS."
                  fallbackLabel="PAIS"
                  mode="cover"
                />
              </figure>
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">Retrato · Narrativa afetiva</span>
                <h3 className="mt-6 font-serif text-4xl leading-none text-stone-950 md:text-5xl">PAIS.</h3>
                <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-stone-600">
                  Vínculo, transmissão e presença narrados pela proximidade, pelo gesto e pelo preto e branco.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("case/pais-presenca-e-heranca")}
                  className="mt-9 inline-flex w-fit items-center gap-3 border-b border-stone-900/30 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                >
                  Ver case <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </article>

            <article className="group flex flex-col border border-stone-900/10 bg-white/30">
              <figure className="aspect-[4/5] overflow-hidden bg-stone-950">
                <ImageWithFallback
                  src="/images/15_IA_COM_ALMA/04_IRENE_1945/076E039F-CD10-431D-AFA7-BB94F151DC84.jpeg"
                  alt="Bolsa vermelha de crochê iluminada por luz e sombra no projeto Irene 1945."
                  fallbackLabel="Irene 1945"
                  mode="cover"
                />
              </figure>
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">Produto · Cultura material</span>
                <h3 className="mt-6 font-serif text-4xl leading-none text-stone-950 md:text-5xl">Irene 1945.</h3>
                <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-stone-600">
                  Matéria, mão, fibra, sombra e memória cromática de terra organizadas como universo de produto.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("case/irene-1945-feito-a-mao")}
                  className="mt-9 inline-flex w-fit items-center gap-3 border-b border-stone-900/30 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                >
                  Ver case <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="border-y border-stone-900/10 py-20 lg:py-28">
          <div className="mb-14 max-w-4xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
              06 / FORMAS DE ATUAÇÃO
            </span>

            <h2 className="font-serif text-4xl leading-none tracking-tight text-stone-950 md:text-6xl">
              Um universo, diferentes formas de continuidade.
            </h2>
          </div>

          <div className="grid border-t border-stone-900/10 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => (
              <article
                key={item.num}
                className="border-b border-stone-900/10 p-6 md:border-r lg:min-h-[18rem]"
              >
                <span className="font-serif text-3xl text-stone-300">
                  {item.num}.
                </span>

                <h3 className="mt-10 text-[11px] font-bold uppercase tracking-[0.24em] text-stone-900">
                  {item.title}
                </h3>

                <p className="mt-5 text-sm font-light leading-relaxed text-stone-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <footer className="flex flex-col items-start justify-between gap-12 py-20 lg:flex-row lg:items-end lg:py-28">
          <div className="max-w-3xl">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
              PROJETOS / COLABORAÇÕES
            </span>

            <h2 className="font-serif text-4xl leading-none tracking-tight text-stone-950 md:text-6xl">
              Sua marca não precisa de mais uma imagem. Precisa de um mundo reconhecidamente seu.
            </h2>
          </div>

          <div className="flex flex-wrap gap-8">
            <button
              type="button"
              onClick={() => navigate("cases")}
              className="inline-flex items-center gap-3 border-b border-stone-900/20 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 transition-colors hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              Ver Portfólio
              <ArrowRightCircle className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => navigate("contato")}
              className="inline-flex items-center gap-3 border-b border-stone-900/20 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-900 transition-colors hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              Iniciar conversa
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </footer>
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

function PortfolioLoadingState({ error = false }) {
  return (
    <PageTransition>
      <section className="mx-auto flex min-h-[60vh] max-w-[90rem] flex-col items-center justify-center px-6 text-center lg:px-12" aria-live="polite">
        <span className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
          {error ? "Portfólio indisponível" : "Abrindo o portfólio"}
        </span>
        <h1 className="max-w-2xl font-serif text-4xl leading-tight text-stone-950 md:text-6xl">
          {error ? "Não foi possível carregar os cases." : "Carregando imagens, contexto e narrativa."}
        </h1>
        {error && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 inline-flex min-h-11 items-center rounded-full border border-stone-900/20 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          >
            Tentar novamente
          </button>
        )}
      </section>
    </PageTransition>
  );
}

// --- APP PRINCIPAL E NAVBAR ---

export default function SamuelPaesPortfolio() {
  const { route, navigate } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portfolioCases, setPortfolioCases] = useState(null);
  const [portfolioLoadError, setPortfolioLoadError] = useState(false);
  const mobileMenuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const effectiveRoute = useMemo(() => {
    if (LEGACY_CASE_ROUTE_ALIASES[route]) {
      return LEGACY_CASE_ROUTE_ALIASES[route];
    }

    if (
      route === "sobre/samuel-carrera-paes" ||
      route === "paes-consultoria" ||
      route === "ecossistema" ||
      route.startsWith("atlas/") ||
      route.startsWith("servicos/")
    ) {
      return "visao";
    }

    if (route === "banal" || route === "empresas/banal") {
      return "case/banal-identidade-de-agencia-criativa";
    }

    if (
      route === "verdeburgo" ||
      route === "empresas/verde-burgo"
    ) {
      return "cases";
    }

    if (route === "projetos/provence-raiz") return "case/provence-raiz-sistema-visual";

    if (route === "comercial") return "ia-com-alma";

    if (route === "biblioteca") return "sistema";
    if (route.startsWith("biblioteca/")) {
      return `sistema/${route.replace(/^biblioteca\//, "")}`;
    }

    return route;
  }, [route]);
  const needsPortfolioData = effectiveRoute === "cases" || effectiveRoute.startsWith("case/");

  useEffect(() => {
    if (!needsPortfolioData || portfolioCases) return undefined;

    let cancelled = false;
    import("./data/portfolioCases")
      .then((module) => {
        if (cancelled) return;
        setPortfolioCases(module.casesData);
        setPortfolioLoadError(false);
      })
      .catch(() => {
        if (!cancelled) setPortfolioLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [needsPortfolioData, portfolioCases]);

  // Prevent background interaction and keep keyboard focus inside the mobile dialog.
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    const menu = mobileMenuRef.current;
    const focusable = menu
      ? [...menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      : [];
    const focusFrame = window.requestAnimationFrame(() => focusable[0]?.focus());

    const handleMenuKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    window.addEventListener("keydown", handleMenuKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleMenuKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { id: "inicio", label: "INÍCIO" },
    { id: "visao", label: "Visão" },
    { id: "cases", label: "Portfólio" },
    { id: "sistema", label: "Sistema" },
    { id: "ia-com-alma", label: "IA & Alma" },
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

      {/* NAVBAR GLOBAL FIXA - EDITORIAL */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#F4F0E9]/90 backdrop-blur-xl border-b border-stone-900/10 transition-all duration-500">
        <nav aria-label="Navegação Principal" className="mx-auto flex h-24 max-w-[90rem] items-center justify-between px-6 lg:px-12 gap-4">

          {/* LOGO CONTAINER: Ícone simples na navbar restrito com overflow hidden */}
          <div className="flex w-1/2 lg:w-1/4 justify-start overflow-visible">
            <button
              type="button"
              onClick={() => handleNavClick("inicio")}
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 group"
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
          <div className="hidden lg:flex flex-1 justify-center gap-2 xl:gap-8" role="menubar">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                role="menuitem"
                aria-label={`Página ${link.label}`}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm px-2 pb-1 border-b-2 ${
                  (effectiveRoute === link.id || (link.id === "cases" && isCaseDetail) || (link.id === "sistema" && isSistemaDetail))
                    ? "text-stone-900 border-stone-900"
                    : "text-stone-400 border-transparent hover:text-stone-900 hover:border-stone-900/20"
                }`}
              >
                {link.label}
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
            ref={mobileMenuButtonRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            className="relative z-50 inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm p-2 text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </nav>

        {/* Menu Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
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
                      (effectiveRoute === link.id || (link.id === "cases" && isCaseDetail) || (link.id === "sistema" && isSistemaDetail)) ? "text-stone-900 bg-stone-900/5" : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
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
                <button type="button" onClick={() => handleNavClick("cases")} className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-500 focus-visible:outline-none focus-visible:underline hover:text-stone-900 transition-colors">Ver Portfólio</button>
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
          {effectiveRoute === "inicio" && <Inicio key="inicio" navigate={navigate} />}
          {effectiveRoute === "visao" && <Visao key="visao" />}
          {effectiveRoute === "cases" && (
            portfolioCases
              ? <Cases key="cases" navigate={navigate} casesData={portfolioCases} />
              : <PortfolioLoadingState key="cases-loading" error={portfolioLoadError} />
          )}
          {effectiveRoute.startsWith("case/") && (
            portfolioCases
              ? <CaseDetail key="case-detail" caseId={effectiveRoute.replace("case/", "")} navigate={navigate} casesData={portfolioCases} />
              : <PortfolioLoadingState key="case-loading" error={portfolioLoadError} />
          )}
          {effectiveRoute === "sistema" && <Sistema key="sistema" navigate={navigate} />}
          {effectiveRoute.startsWith("sistema/") && <SistemaArticle key={effectiveRoute} slug={effectiveRoute.replace("sistema/", "")} navigate={navigate} />}
          {effectiveRoute === "ia-com-alma" && <IAComAlma key="ia-com-alma" navigate={navigate} />}
          {effectiveRoute === "contato" && <Contato key="contato" />}
        </AnimatePresence>
      </main>

      <GlobalDiscoveryDock
        navigate={navigate}
        hidden={isCaseDetail || effectiveRoute === "cases" || effectiveRoute === "ia-com-alma" || isMenuOpen}
      />

    </div>
  );
}
