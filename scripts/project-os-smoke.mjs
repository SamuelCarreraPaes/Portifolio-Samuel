import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { publicRouteDefinitions, isKnownPublicRoute } from "../src/router/routes.js";
import { strategicSeoRoutes } from "../src/seoRegistry.js";
import { sistemaArticleCards } from "../src/sistemaArticleCards.js";
import { loadCasesData } from "./case-seo-data.mjs";

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
  "ia-com-alma",
  "comercial",
  "contato",
];

const checks = [];

function check(name, condition, details = "") {
  checks.push({ name, ok: Boolean(condition), details });
}

const appShellSource = await readFile(path.join(root, "src", "App.jsx"), "utf8");
const portfolioCasesSource = await readFile(path.join(root, "src", "data", "portfolioCases.js"), "utf8");
const portfolioPresentationSource = await readFile(path.join(root, "src", "portfolioPresentation.js"), "utf8");
const portfolioCarouselSource = await readFile(path.join(root, "src", "components", "portfolio", "PortfolioDisciplineCarousel.jsx"), "utf8");
const appSource = [appShellSource, portfolioCasesSource, portfolioPresentationSource, portfolioCarouselSource].join("\n");
const indexHtml = await readFile(path.join(root, "index.html"), "utf8");
const robots = await readFile(path.join(root, "public", "robots.txt"), "utf8");
const sitemap = await readFile(path.join(root, "public", "sitemap.xml"), "utf8");
const imageSitemap = await readFile(path.join(root, "public", "sitemap-images.xml"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const cases = await loadCasesData(root);
const localCaseAssets = [...new Set(cases.flatMap((caseItem) => [
  caseItem.thumb,
  caseItem.ogImage,
  ...(caseItem.gallery || []),
  ...(caseItem.media || []).flatMap((item) => [item.src, item.poster]),
]).filter((assetPath) => assetPath?.startsWith("/")))];
const missingCaseAssets = [];

for (const assetPath of localCaseAssets) {
  try {
    await access(path.join(root, "public", decodeURIComponent(assetPath.replace(/^\/+/, ""))));
  } catch {
    missingCaseAssets.push(assetPath);
  }
}

check("package has lint script", packageJson.scripts?.lint === "eslint .");
check("package has build script", packageJson.scripts?.build === "vite build");
check("package has smoke script", packageJson.scripts?.smoke === "node scripts/project-os-smoke.mjs");
check("package has portfolio UI regression script", packageJson.scripts?.["test:portfolio-ui"] === "node scripts/portfolio-ui-regression.mjs");
check("App exposes recovered Inicio page", appSource.includes("function Inicio"));
check("App exposes recovered Cases page", appSource.includes("function Cases"));
check("App exposes recovered Sistema page", appSource.includes("function Sistema"));
check("App exposes IA & Alma page", appSource.includes("function IAComAlma") && appSource.includes('label: "IA & Alma"'));
check("App does not expose BANAL company page", !appSource.includes("function Banal"));
check("App exposes BANAL as identity case", appSource.includes('slug: "banal-identidade-de-agencia-criativa"') && appSource.includes('title: "BANAL — Identidade de Agência Criativa"'));
check("App exposes Casarao Medeiros as identity case", appSource.includes('slug: "casarao-medeiros-identidade-visual"') && appSource.includes('title: "Casarão Medeiros — Identidade Visual"'));
check(
  "App groups requested identity cases",
  portfolioPresentationSource.includes('caseIds: ["case-03", "case-17", "case-16", "case-12"]')
);
check(
  "App exposes the five editorial disciplines",
  portfolioPresentationSource.includes('id: "visual-merchandising"') &&
    portfolioPresentationSource.includes('id: "identidade-visual"') &&
    portfolioPresentationSource.includes('id: "cenografia"') &&
    portfolioPresentationSource.includes('id: "decoracao"') &&
    portfolioPresentationSource.includes('id: "ia-alma"')
);
check(
  "App excludes retired Val cases from the visible portfolio",
  appSource.includes("const visiblePortfolioCaseIds = portfolioCategoryDefinitions.flatMap") &&
    !portfolioPresentationSource.includes('caseIds: ["case-01"') &&
    !portfolioPresentationSource.includes('caseIds: ["case-02"')
);
check(
  "App exposes the separated Porti and Provence cases",
  appSource.includes('slug: "porti-cenografia-de-natal"') &&
    appSource.includes('slug: "porti-cenografia-de-verao"') &&
    appSource.includes('slug: "provence-raiz-pilastras-cenograficas"') &&
    appSource.includes('slug: "provence-raiz-luminaria-carretel"') &&
    appSource.includes('slug: "provence-raiz-gaiola-cenografica"') &&
    appSource.includes('slug: "provence-raiz-direcao-de-atmosfera"')
);
check(
  "App joins Denim and Paraiso Tropical into one merchandising case",
  appSource.includes('slug: "denim-paraiso-tropical-visual-merchandising"')
);
check(
  "App preserves the former Porti URL as a legacy slug",
  appSource.includes('legacySlugs: ["porti-expansao-fisica-cenografia"]')
);
check(
  "App expands BANAL with the recovered motion asset",
  appSource.includes('/brands/banal/media/banal-fly-loop.mp4')
);
check(
  "App exposes only the ten supplied Casarao presentations with provenance",
  appSource.includes("03-casarao-medeiros-papelaria-institucional.jpg") &&
    appSource.includes('interventionLabel: "Apresentações fornecidas"') &&
    appSource.includes("As dez imagens JPG foram fornecidas pelo usuário") &&
    !appSource.includes("casarao-medeiros-assinatura-principal-v1.svg") &&
    !appSource.includes("casarao-medeiros-sistema-de-marca-v1.svg") &&
    !appSource.includes("casarao-medeiros-paleta-tipografia-v1.svg")
);
check(
  "App exposes the approved Porti technical simulations",
  appSource.includes("porti-natal-simulacao-tecnica-editorial-v1.png") &&
    appSource.includes("porti-verao-simulacao-tecnica-editorial-v1.png") &&
    appSource.includes("Não é documentação histórica de fabricação")
);
check(
  "Portfolio uses one accessible standardized carousel per discipline",
  portfolioCarouselSource.includes("function PortfolioDisciplineCarousel") &&
    portfolioCarouselSource.includes('aria-roledescription="carrossel"') &&
    portfolioCarouselSource.includes("sm:aspect-[3/2] lg:aspect-[16/9]")
);
check(
  "App uses the requested PAIS hero",
  appSource.includes('/images/15_IA_COM_ALMA/03_PAIS/3501A05B-4DD7-43E8-8B30-32F8055861D3.jpeg')
);
check("case ids are unique", new Set(cases.map((caseItem) => caseItem.id)).size === cases.length);
check("case slugs are unique", new Set(cases.map((caseItem) => caseItem.slug)).size === cases.length);
check("all referenced case assets exist", missingCaseAssets.length === 0, missingCaseAssets.join(", "));
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
check("sitemap contains IA com Alma", sitemap.includes("https://paesconsultoria.com/ia-com-alma"));
check("sitemap contains IA com Alma cases", sitemap.includes("https://paesconsultoria.com/case/room-329") && sitemap.includes("https://paesconsultoria.com/case/pais-presenca-e-heranca") && sitemap.includes("https://paesconsultoria.com/case/irene-1945-feito-a-mao"));
check("sitemap contains requested identity cases", sitemap.includes("https://paesconsultoria.com/case/banal-identidade-de-agencia-criativa") && sitemap.includes("https://paesconsultoria.com/case/provence-raiz-sistema-visual") && sitemap.includes("https://paesconsultoria.com/case/casarao-medeiros-identidade-visual"));
check("sitemap contains separated Porti cases", sitemap.includes("https://paesconsultoria.com/case/porti-visual-merchandising") && sitemap.includes("https://paesconsultoria.com/case/porti-cenografia-de-natal") && sitemap.includes("https://paesconsultoria.com/case/porti-cenografia-de-verao"));
check("sitemap contains separated Provence cases", sitemap.includes("https://paesconsultoria.com/case/provence-raiz-pilastras-cenograficas") && sitemap.includes("https://paesconsultoria.com/case/provence-raiz-luminaria-carretel") && sitemap.includes("https://paesconsultoria.com/case/provence-raiz-gaiola-cenografica") && sitemap.includes("https://paesconsultoria.com/case/provence-raiz-direcao-de-atmosfera"));
check("sitemap no longer submits company pages", !sitemap.includes("/empresas/banal") && !sitemap.includes("/empresas/verde-burgo"));
check("image sitemap contains image namespace", imageSitemap.includes("google.com/schemas/sitemap-image"));
check("strategic SEO registry covers recovered routes", strategicSeoRoutes.some((item) => item.route === "cases") && strategicSeoRoutes.some((item) => item.route === "sistema"));
check("sistema article cards available", sistemaArticleCards.length >= 6);

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
