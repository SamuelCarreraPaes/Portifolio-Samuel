import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

export const SITE_URL = "https://paesconsultoria.com";
export const DEFAULT_OG_IMAGE = "/images/13_VISAO/about-transition.png";

const CASE_SLUG_OVERRIDES = {
  "case-01": "val-fortunatto-brand-transition",
  "case-12": "provence-raiz-sistema-visual",
  "case-13": "room-329",
  "case-14": "pais-presenca-e-heranca",
  "case-15": "irene-1945-feito-a-mao",
  "case-16": "banal-identidade-de-agencia-criativa",
  "case-17": "casarao-medeiros-identidade-visual",
};

export function absoluteUrl(pathname = "") {
  if (!pathname) return SITE_URL;
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[.\u00b7\u2013\u2014-]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCaseSlug(caseItem) {
  return caseItem.slug || CASE_SLUG_OVERRIDES[caseItem.id] || slugify(caseItem.title);
}

export function getCaseLinkedInImage(caseItem) {
  return `/images/social/linkedin/${getCaseSlug(caseItem)}.jpg`;
}

export function getCaseSocialImage(caseItem) {
  return caseItem.ogImage || caseItem.socialImage || caseItem.linkedinImage || getCaseLinkedInImage(caseItem) || caseItem.coverImage || caseItem.heroImage || caseItem.thumb || caseItem.gallery?.[0] || DEFAULT_OG_IMAGE;
}

export function getCaseSocialAlt(caseItem) {
  return caseItem.ogImageAlt || `Imagem social do case ${caseItem.title} no portfolio Samuel Carrera Paes / Paes Consultoria.`;
}

export function getCaseSeoTitle(caseItem) {
  return caseItem.seoTitle || `${caseItem.title} | Samuel Paes`;
}

export function getCaseSeoDescription(caseItem) {
  return caseItem.seoDescription || caseItem.shortTese || caseItem.directorsNote || "Case do portfolio Samuel Carrera Paes / Paes Consultoria.";
}

function localPublicImagePath(root, imagePath) {
  if (!imagePath) return null;

  if (/^https?:\/\//i.test(imagePath)) {
    const url = new URL(imagePath);
    if (url.origin !== SITE_URL) return null;
    return path.join(root, "public", decodeURIComponent(url.pathname.replace(/^\/+/, "")));
  }

  return path.join(root, "public", decodeURIComponent(imagePath.replace(/^\/+/, "")));
}

function readWebpDimension(buffer) {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (chunkType === "VP8X" && dataOffset + 10 <= buffer.length) {
      const width = 1 + buffer.readUIntLE(dataOffset + 4, 3);
      const height = 1 + buffer.readUIntLE(dataOffset + 7, 3);
      return { width, height };
    }

    if (chunkType === "VP8L" && dataOffset + 5 <= buffer.length && buffer[dataOffset] === 0x2f) {
      const bits = buffer.readUInt32LE(dataOffset + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }

    if (chunkType === "VP8 " && dataOffset + 10 <= buffer.length) {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }

    offset += 8 + chunkSize + (chunkSize % 2);
  }

  return null;
}

function readImageDimension(buffer) {
  if (buffer.length >= 24 && buffer[0] === 0x89 && buffer.toString("ascii", 1, 4) === "PNG") {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    const sofMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);

    while (offset + 4 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      while (buffer[offset] === 0xff) offset += 1;
      const marker = buffer[offset];
      offset += 1;

      if (marker === 0xd9 || marker === 0xda) break;
      if (marker >= 0xd0 && marker <= 0xd7) continue;

      const segmentLength = buffer.readUInt16BE(offset);
      if (sofMarkers.has(marker) && offset + 7 < buffer.length) {
        return {
          height: buffer.readUInt16BE(offset + 3),
          width: buffer.readUInt16BE(offset + 5),
        };
      }

      offset += segmentLength;
    }
  }

  return readWebpDimension(buffer);
}

export async function getLocalImageDimensions(root, imagePath) {
  const filePath = localPublicImagePath(root, imagePath);
  if (!filePath) return null;

  try {
    const buffer = await readFile(filePath);
    return readImageDimension(buffer);
  } catch {
    return null;
  }
}

function extractArrayLiteral(source, declarationName) {
  const declaration = `const ${declarationName} =`;
  const declarationIndex = source.indexOf(declaration);
  const start = declarationIndex < 0 ? -1 : source.indexOf("[", declarationIndex + declaration.length);

  if (start < 0) return null;

  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (lineComment) {
      if (character === "\n") lineComment = false;
      continue;
    }

    if (blockComment) {
      if (character === "*" && nextCharacter === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === "/" && nextCharacter === "/") {
      lineComment = true;
      index += 1;
      continue;
    }

    if (character === "/" && nextCharacter === "*") {
      blockComment = true;
      index += 1;
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "[") depth += 1;
    if (character === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }

  return null;
}

export async function loadCasesData(root) {
  const casesPath = path.join(root, "src", "data", "portfolioCases.js");
  const casesSource = await readFile(casesPath, "utf8");
  const casesLiteral = extractArrayLiteral(casesSource, "casesData");

  if (!casesLiteral) {
    throw new Error("Nao foi possivel localizar casesData em src/data/portfolioCases.js.");
  }

  const casesData = vm.runInNewContext(`(${casesLiteral})`, Object.freeze({}));

  return Promise.all(casesData.map(async (caseItem) => {
    const ogImage = getCaseSocialImage(caseItem);
    const dimensions = await getLocalImageDimensions(root, ogImage);

    return {
      ...caseItem,
      slug: getCaseSlug(caseItem),
      seoTitle: getCaseSeoTitle(caseItem),
      seoDescription: getCaseSeoDescription(caseItem),
      ogImage,
      ogImageAlt: getCaseSocialAlt(caseItem),
      ogImageWidth: caseItem.ogImageWidth || dimensions?.width,
      ogImageHeight: caseItem.ogImageHeight || dimensions?.height,
    };
  }));
}
