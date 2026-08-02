import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { publicRouteDefinitions, isKnownPublicRoute } from "../src/router/routes.js";
import { strategicSeoRoutes } from "../src/seoRegistry.js";
import { sistemaArticleCards } from "../src/sistemaArticleCards.js";
import {
  casesData,
  featuredCaseSlugs,
  validateCaseCatalog,
} from "../src/data/cases.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const requiredStaticRoutes = [
  "inicio",
  "sobre/samuel-carrera-paes",
  "visao",
  "ecossistema",
  "paes-consultoria",
  "cases",
  "banal",
  "empresas/banal",
  "verdeburgo",
  "empresas/verde-burgo",
  "projetos/provence-raiz",
  "biblioteca",
  "sistema",
  "biblioteca/geracao-dos-realizadores",
  "contato",
];

const checks = [];
const expectedCaseSlugs = [
  "val-fortunatto-brand-transition",
  "val-fortunatto-linho-produto-proprio",
  "atelie-bambini-arquitetura-de-marca-infantil",
  "r-lovers-calendario-comercial",
  "porti-expansao-fisica-cenografia",
  "hexa-copa-do-mundo-reserva",
  "campanhas-collabs",
  "rouge-gold-exposicao-premium",
  "outerwear-hotspots-color-blocking",
  "vintage-denim-capsula-heritage",
  "paraiso-tropical-mata-atlantica",
  "provence-raiz-sistema-visual",
  "showroom-alto-verao-2027",
];

function check(name, condition, details = "") {
  checks.push({ name, ok: Boolean(condition), details });
}

const appSource = await readFile(path.join(root, "src", "App.jsx"), "utf8");
const indexHtml = await readFile(path.join(root, "index.html"), "utf8");
const robots = await readFile(path.join(root, "public", "robots.txt"), "utf8");
const sitemap = await readFile(path.join(root, "public", "sitemap.xml"), "utf8");
const imageSitemap = await readFile(path.join(root, "public", "sitemap-images.xml"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

check("package has lint script", packageJson.scripts?.lint === "eslint .");
check("package has build script", packageJson.scripts?.build === "vite build");
check("package has smoke script", packageJson.scripts?.smoke === "node scripts/project-os-smoke.mjs");
check("App exposes recovered Inicio page", appSource.includes("function Inicio"));
check("App exposes recovered Cases page", appSource.includes("function Cases"));
check("App exposes recovered Sistema page", appSource.includes("function Sistema"));
check("App imports canonical case catalog", appSource.includes('from "./data/cases"'));
check("App has no duplicated inline case catalog", !appSource.includes("const casesData = ["));
check("App does not expose BANAL company page", !appSource.includes("function Banal"));
check("App does not expose Verde Burgo company page", !appSource.includes("function Verdeburgo"));
check("App maps legacy company routes to safe equivalents", appSource.includes('route === "empresas/banal"') && appSource.includes('route === "empresas/verde-burgo"'));
check("index has base canonical", indexHtml.includes('rel="canonical"'));
check("index centers Samuel Carrera Paes", indexHtml.includes("Samuel Carrera Paes"));
check("index no longer promotes BANAL", !indexHtml.includes("BANAL"));
check("index no longer promotes Verde Burgo", !indexHtml.includes("Verde Burgo"));
check("robots references sitemap", robots.includes("sitemap.xml") && robots.includes("sitemap-images.xml"));
check("sitemap contains homepage", sitemap.includes("https://paesconsultoria.com/"));
check("sitemap contains cases", sitemap.includes("https://paesconsultoria.com/cases"));
check("sitemap contains sistema", sitemap.includes("https://paesconsultoria.com/sistema"));
check("sitemap no longer submits company pages", !sitemap.includes("/empresas/banal") && !sitemap.includes("/empresas/verde-burgo"));
check("image sitemap contains image namespace", imageSitemap.includes("google.com/schemas/sitemap-image"));
check("strategic SEO registry covers recovered routes", strategicSeoRoutes.some((item) => item.route === "cases") && strategicSeoRoutes.some((item) => item.route === "sistema"));
check("sistema article cards available", sistemaArticleCards.length >= 6);

const caseCatalog = validateCaseCatalog();
check("case catalog count matches delivery contract", caseCatalog.count === expectedCaseSlugs.length);
check("case catalog has unique slugs", caseCatalog.uniqueSlugs);
check("case catalog has no unverified public metrics", !caseCatalog.hasUnverifiedPublicMetrics);
check("case slugs match delivery contract", JSON.stringify(casesData.map((item) => item.slug)) === JSON.stringify(expectedCaseSlugs));
check("featured cases match delivery contract", JSON.stringify(featuredCaseSlugs) === JSON.stringify([
  "porti-expansao-fisica-cenografia",
  "campanhas-collabs",
  "provence-raiz-sistema-visual",
]));

for (const caseItem of casesData) {
  const route = `case/${caseItem.slug}`;
  check(`route matcher accepts case: ${caseItem.slug}`, isKnownPublicRoute(route));
  check(`sitemap contains case: ${caseItem.slug}`, sitemap.includes(`https://paesconsultoria.com/${route}`));
  check(`case has usable cover: ${caseItem.slug}`, Boolean(caseItem.thumb));
}

for (const route of requiredStaticRoutes) {
  check(`known static route: ${route}`, publicRouteDefinitions.some((definition) => definition.id === route));
  check(`route matcher accepts: ${route}`, isKnownPublicRoute(route));
}

const failures = checks.filter((item) => !item.ok);

for (const item of checks) {
  console.log(`${item.ok ? "OK" : "FAIL"} ${item.name}${item.details ? ` - ${item.details}` : ""}`);
}

if (failures.length) {
  console.error(`\nProject smoke failed: ${failures.length} check(s).`);
  process.exit(1);
}

console.log(`\nProject smoke passed: ${checks.length} checks.`);
