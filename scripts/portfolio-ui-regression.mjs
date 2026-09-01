import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  getGalleryAssetMeta,
  getPortfolioCover,
  getPortfolioPresentation,
  portfolioCategoryDefinitions,
} from "../src/portfolioPresentation.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appSource = fs.readFileSync(path.join(repoRoot, "src", "App.jsx"), "utf8");
const carouselSource = fs.readFileSync(path.join(repoRoot, "src", "components", "portfolio", "PortfolioDisciplineCarousel.jsx"), "utf8");
const imageSource = fs.readFileSync(path.join(repoRoot, "src", "components", "portfolio", "ImageWithFallback.jsx"), "utf8");

const galleryCounts = {
  "case-05": 6,
  "case-18": 8,
  "case-06": 3,
  "case-04": 5,
  "case-07": 9,
  "case-03": 10,
  "case-17": 10,
  "case-16": 9,
  "case-12": 6,
  "case-19": 5,
  "case-20": 7,
  "case-21": 5,
  "case-22": 5,
  "case-23": 5,
  "case-24": 10,
  "case-13": 7,
  "case-14": 6,
  "case-15": 9,
};

const checks = [];
const check = (condition, message) => {
  if (!condition) throw new Error(message);
  checks.push(message);
};

const visibleCaseIds = portfolioCategoryDefinitions.flatMap((category) => category.caseIds);
check(portfolioCategoryDefinitions.length === 5, "cinco disciplinas preservadas");
check(new Set(visibleCaseIds).size === 18, "18 cases visíveis sem duplicação");
check(Object.keys(galleryCounts).every((caseId) => visibleCaseIds.includes(caseId)), "matriz narrativa cobre todos os cases visíveis");

for (const [caseId, galleryCount] of Object.entries(galleryCounts)) {
  const presentation = getPortfolioPresentation(caseId);
  check(Boolean(presentation.sectionIntro), `${caseId}: introdução curatorial presente`);
  check(presentation.frames?.length === galleryCount, `${caseId}: metadados específicos para ${galleryCount} imagens`);

  const pseudoCase = {
    id: caseId,
    title: caseId,
    shortTese: "Tese editorial",
    blocks: [["Capítulo", "Conteúdo"]],
  };
  const frameMeta = getGalleryAssetMeta(pseudoCase, `/teste/${caseId}.jpg`, galleryCount - 1);
  check(Boolean(frameMeta.label && frameMeta.caption && frameMeta.alt), `${caseId}: legenda, conteúdo e alt text resolvidos`);

  const cover = getPortfolioCover({ id: caseId, thumb: "/fallback.jpg" });
  for (const assetPath of new Set([cover.mobileSrc, cover.desktopSrc])) {
    if (assetPath !== "/fallback.jpg") {
      check(fs.existsSync(path.join(repoRoot, "public", assetPath.replace(/^\//, ""))), `${caseId}: capa responsiva existe (${assetPath})`);
    }
  }
}

check(!carouselSource.includes("clamp(3.25rem"), "título de disciplina não usa o mínimo que causava overflow em 320 px");
check(carouselSource.includes("clamp(2.5rem"), "escala tipográfica segura para mobile pequeno");
check(carouselSource.includes('event.key === "ArrowLeft"') && carouselSource.includes('event.key === "ArrowRight"'), "carrossel navegável por teclado");
check(carouselSource.includes("useReducedMotion"), "carrossel respeita preferência de movimento reduzido");
check(carouselSource.includes("desktopSrc={cover.desktopSrc}"), "carrossel usa direção de arte responsiva");
check(appSource.includes("Papel de Samuel"), "autoria de Samuel explicitada nos cases");
check(appSource.includes("Samuel Carrera Paes transforma intenção em presença"), "Samuel centralizado na abertura do portfólio");
check(appSource.includes('loading="eager"') && appSource.includes('fetchPriority="high"'), "hero do case priorizado para carregamento");
check((imageSource.match(/role="img"/g) || []).length === 1, "semântica de imagem não é duplicada no estado normal");
check(imageSource.includes("motion-reduce:transition-none"), "transição de imagem respeita movimento reduzido");

console.log(`Portfolio UI regression: ${checks.length} verificações aprovadas.`);
