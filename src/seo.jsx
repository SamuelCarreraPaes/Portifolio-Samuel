import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  SEO_KEYWORDS,
  SEO_LAST_MODIFIED,
  SITE_URL,
  absoluteUrl,
  getBrandEntities,
  getPaesEntity,
  getSamuelEntity,
} from "./seoData";

// --- DYNAMIC SEO INJECTION ---
export function DynamicSEO({ title, fullTitle, description, url, image, schemaType = "WebPage", schemaExtra = {}, graphExtra = [] }) {
  useEffect(() => {
    const defaultTitle = "Paes Consultoria | Samuel Carrera Paes — Direção Criativa";
    const defaultDescription = "Paes Consultoria, de Samuel Carrera Paes, desenvolve negócios, marcas, experiências, eventos, cases e artigos por meio de direção criativa, identidade, estratégia e execução.";
    const pageTitle = fullTitle || (!title || title === "Início" ? defaultTitle : `${title} | Samuel Carrera Paes — Paes Consultoria`);
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
      } : {}),
      ...schemaExtra
    };

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        getSamuelEntity(),
        getPaesEntity(),
        ...getBrandEntities(),
        ...graphExtra,
        pageEntity
      ]
    };
    script.text = JSON.stringify(schemaData);

  }, [title, fullTitle, description, url, image, schemaType, schemaExtra, graphExtra]);

  return null;
}
