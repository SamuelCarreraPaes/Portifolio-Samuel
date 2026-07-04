import { authorityServices } from "./authorityMap";

export const homePortrait = "/images/13_VISAO/about-transition.png";

export const SITE_URL = "https://paesconsultoria.com";
export const SEO_LAST_MODIFIED = "2026-06-14";
export const SAMUEL_INSTAGRAM = "https://instagram.com/samuelcarrerapaes";
export const DEFAULT_OG_IMAGE = homePortrait;
export const SEO_KEYWORDS = [
  "Samuel Carrera Paes",
  "Samuel Paes",
  "Paes Consultoria",
  "Consultoria Paes",
  "diretor criativo",
  "consultor criativo",
  "branding",
  "marketing",
  "campanhas",
  "collabs",
  "produto próprio",
  "varejo",
  "visual merchandising",
  "retail design",
  "styling",
  "inteligência artificial aplicada",
  "direção criativa",
  "experiência de marca"
];

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getSamuelEntity() {
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

export function getPaesEntity() {
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
      "name": "Serviços e territórios da Paes Consultoria",
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

export function getBrandEntities() {
  return [];
}
