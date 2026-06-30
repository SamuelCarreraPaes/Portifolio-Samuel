import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { authorityAtlas, authorityServices } from "../src/authorityMap.js";
import { casesData } from "../src/data/cases.js";
import { publicRouteDefinitions, isKnownPublicRoute } from "../src/router/routes.js";
import { strategicSeoRoutes } from "../src/seoRegistry.js";
import { sistemaArticleCards } from "../src/sistemaArticleCards.js";
import {
  ecosystemPublicFlow,
  homeServiceCards,
  verdeBurgoDeliveryStack,
} from "../src/content/ecosystemContent.js";
import { analyticsEvents } from "../src/analytics/events.js";
import { cmsCollections } from "../src/content/cmsModel.js";
import { aiOpportunities } from "../src/services/ai/opportunities.js";

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

const dynamicSmokeRoutes = [
  `atlas/${authorityAtlas.slug}`,
  `case/${casesData[0]?.id}`,
  `biblioteca/${sistemaArticleCards[0]?.slug}`,
  `sistema/${sistemaArticleCards[0]?.slug}`,
  `servicos/${authorityServices[0]?.slug}`,
];

const checks = [];

function check(name, condition, details = "") {
  checks.push({ name, ok: Boolean(condition), details });
}

const appSource = await readFile(path.join(root, "src", "App.jsx"), "utf8");
const seoSource = await readFile(path.join(root, "src", "seo.jsx"), "utf8");
const indexHtml = await readFile(path.join(root, "index.html"), "utf8");
const robots = await readFile(path.join(root, "public", "robots.txt"), "utf8");
const sitemap = await readFile(path.join(root, "public", "sitemap.xml"), "utf8");
const imageSitemap = await readFile(path.join(root, "public", "sitemap-images.xml"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

check("package has lint script", packageJson.scripts?.lint === "eslint .");
check("package has build script", packageJson.scripts?.build === "vite build");
check("package has smoke script", packageJson.scripts?.smoke === "node scripts/project-os-smoke.mjs");
check("App imports extracted ecosystem content", appSource.includes("./content/ecosystemContent"));
check("App uses route registry for known routes", appSource.includes("isKnownPublicRoute(route"));
check("DynamicSEO remains in App", (appSource.match(/<DynamicSEO/g) || []).length >= 17);
check("SEO injects JSON-LD", seoSource.includes("application/ld+json"));
check("SEO keeps canonical update", seoSource.includes("link[rel='canonical']"));
check("index has base canonical", indexHtml.includes('rel="canonical"'));
check("robots references sitemap", robots.includes("sitemap.xml") && robots.includes("sitemap-images.xml"));
check("sitemap contains homepage", sitemap.includes("https://paesconsultoria.com/"));
check("image sitemap contains image namespace", imageSitemap.includes("google.com/schemas/sitemap-image"));
check("home ecosystem flow preserved", ecosystemPublicFlow.length === 5);
check("home service cards preserved", homeServiceCards.length === 4);
check("Verde Burgo delivery stack preserved", verdeBurgoDeliveryStack.length === 6);
check("analytics events mapped without provider", analyticsEvents.length >= 3);
check("CMS model stays future-only", cmsCollections.every((item) => item.implementation === "future"));
check("AI opportunities stay hypotheses", aiOpportunities.every((item) => item.status === "hypothesis"));
check("strategic SEO registry covers key routes", strategicSeoRoutes.length >= 10);

for (const route of requiredStaticRoutes) {
  check(`known static route: ${route}`, publicRouteDefinitions.some((definition) => definition.id === route));
  check(`route matcher accepts: ${route}`, isKnownPublicRoute(route, { atlasSlug: authorityAtlas.slug }));
}

for (const route of dynamicSmokeRoutes.filter(Boolean)) {
  check(`route matcher accepts dynamic: ${route}`, isKnownPublicRoute(route, { atlasSlug: authorityAtlas.slug }));
}

const failures = checks.filter((item) => !item.ok);

for (const item of checks) {
  console.log(`${item.ok ? "OK" : "FAIL"} ${item.name}${item.details ? ` - ${item.details}` : ""}`);
}

if (failures.length) {
  console.error(`\nProject OS smoke failed: ${failures.length} check(s).`);
  process.exit(1);
}

console.log(`\nProject OS smoke passed: ${checks.length} checks.`);
