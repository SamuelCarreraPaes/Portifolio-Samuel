import { authorityServices } from "./authorityMap";

export const homePortrait = "/images/13_VISAO/about-transition.png";

export const SITE_URL = "https://paesconsultoria.com";
export const SEO_LAST_MODIFIED = "2026-06-10";
export const SAMUEL_INSTAGRAM = "https://instagram.com/samuelcarrerapaes";
export const VERDE_BURGO_INSTAGRAM = "https://instagram.com/verdeburgoeventos";
export const DEFAULT_OG_IMAGE = homePortrait;
export const SEO_KEYWORDS = [
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
  "campanhas",
  "collabs",
  "produto próprio",
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

export function getBrandEntities() {
  return [
    {
      "@type": "Brand",
      "@id": `${SITE_URL}/#banal`,
      "name": "BANAL",
      "url": `${SITE_URL}/empresas/banal`,
      "logo": absoluteUrl("/brands/banal/media/banal-logo-balanced.png"),
      "parentOrganization": { "@id": `${SITE_URL}/#paes-consultoria` },
      "description": "Empresa de branding, marketing, posicionamento, narrativa, campanhas, collabs, produto próprio, varejo e percepção de valor."
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#verde-burgo-eventos`,
      "name": "Verde Burgo Eventos",
      "alternateName": "Verde Burgo",
      "url": `${SITE_URL}/empresas/verde-burgo`,
      "logo": absoluteUrl("/brands/verde-burgo/logos/verde-burgo-logo-balanced.png"),
      "sameAs": [VERDE_BURGO_INSTAGRAM],
      "parentOrganization": { "@id": `${SITE_URL}/#paes-consultoria` },
      "description": "Empresa de eventos com buffet, decoração, bar, cerimonial, planejamento, produção e execução com direção criativa aplicada."
    }
  ];
}
