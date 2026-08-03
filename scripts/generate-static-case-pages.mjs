import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  SITE_URL,
  absoluteUrl,
  getCaseSocialAlt,
  getCaseSocialImage,
  loadCasesData,
} from "./case-seo-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const indexPath = path.join(distDir, "index.html");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function upsertBeforeHeadEnd(html, tag) {
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function setTitle(html, value) {
  const escaped = escapeHtml(value);
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escaped}</title>`);
  }
  return upsertBeforeHeadEnd(html, `<title>${escaped}</title>`);
}

function setMeta(html, attributeName, attributeValue, content) {
  const escapedAttributeValue = escapeRegExp(attributeValue);
  const escapedContent = escapeHtml(content);
  const pattern = new RegExp(`<meta\\s+${attributeName}="${escapedAttributeValue}"\\s+content="[^"]*"\\s*/?>`, "i");
  const tag = `<meta ${attributeName}="${attributeValue}" content="${escapedContent}" />`;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return upsertBeforeHeadEnd(html, tag);
}

function setOptionalMeta(html, attributeName, attributeValue, content) {
  if (!content) return html;
  return setMeta(html, attributeName, attributeValue, String(content));
}

function setCanonical(html, href) {
  const escapedHref = escapeHtml(href);
  const tag = `<link rel="canonical" href="${escapedHref}" />`;

  if (/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i.test(html)) {
    return html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, tag);
  }

  return upsertBeforeHeadEnd(html, tag);
}

function caseJsonLd(caseItem, pageUrl, pageTitle, description, imageUrl) {
  const image = caseItem.ogImageWidth && caseItem.ogImageHeight
    ? {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": caseItem.ogImageWidth,
      "height": caseItem.ogImageHeight,
    }
    : imageUrl;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#primary`,
    "name": pageTitle,
    "headline": pageTitle,
    "description": description,
    "url": pageUrl,
    "image": image,
    "inLanguage": "pt-BR",
    "creator": {
      "@type": "Person",
      "@id": `${SITE_URL}/#samuel-carrera-paes`,
      "name": "Samuel Carrera Paes",
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#paes-consultoria`,
      "name": "Paes Consultoria",
    },
    "about": [caseItem.client, caseItem.role, caseItem.territory].filter(Boolean),
  };
}

function setCaseJsonLd(html, schema) {
  const tag = `<script id="case-seo-json-ld" type="application/ld+json">${JSON.stringify(schema)}</script>`;

  if (/<script\s+id="case-seo-json-ld"[\s\S]*?<\/script>/i.test(html)) {
    return html.replace(/<script\s+id="case-seo-json-ld"[\s\S]*?<\/script>/i, tag);
  }

  return upsertBeforeHeadEnd(html, tag);
}

function buildCaseHtml(baseHtml, caseItem) {
  const pageUrl = `${SITE_URL}/case/${caseItem.slug}`;
  const pageTitle = caseItem.seoTitle;
  const description = caseItem.seoDescription;
  const imageUrl = absoluteUrl(getCaseSocialImage(caseItem));
  const imageAlt = getCaseSocialAlt(caseItem);

  let html = baseHtml;
  html = setTitle(html, pageTitle);
  html = setMeta(html, "name", "description", description);
  html = setCanonical(html, pageUrl);
  html = setMeta(html, "property", "og:type", "article");
  html = setMeta(html, "property", "og:site_name", "Paes Consultoria");
  html = setMeta(html, "property", "og:title", pageTitle);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", pageUrl);
  html = setMeta(html, "property", "og:image", imageUrl);
  html = setOptionalMeta(html, "property", "og:image:width", caseItem.ogImageWidth);
  html = setOptionalMeta(html, "property", "og:image:height", caseItem.ogImageHeight);
  html = setMeta(html, "property", "og:image:alt", imageAlt);
  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:title", pageTitle);
  html = setMeta(html, "name", "twitter:description", description);
  html = setMeta(html, "name", "twitter:image", imageUrl);
  html = setMeta(html, "name", "twitter:image:alt", imageAlt);
  html = setCaseJsonLd(html, caseJsonLd(caseItem, pageUrl, pageTitle, description, imageUrl));

  return html;
}

async function writeRouteHtml(routePath, html) {
  const cleanPath = routePath.replace(/^\/+|\/+$/g, "");
  const outputDir = path.join(distDir, cleanPath);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "index.html"), html, "utf8");
}

const baseHtml = await readFile(indexPath, "utf8");
const cases = await loadCasesData(root);

for (const caseItem of cases) {
  const html = buildCaseHtml(baseHtml, caseItem);
  await writeRouteHtml(`/case/${caseItem.slug}`, html);
  await writeRouteHtml(`/case/${caseItem.id}`, html);
}

console.log(`Static case pages generated: ${cases.length * 2} routes.`);
