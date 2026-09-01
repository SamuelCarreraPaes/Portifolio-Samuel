export const publicRouteDefinitions = [
  { id: "inicio", path: "/", canonical: "/", area: "consultoria", component: "Inicio", legacyCompatible: false },
  { id: "sobre/samuel-carrera-paes", path: "/sobre/samuel-carrera-paes", canonical: "/visao", area: "consultoria", component: "Visao", legacyCompatible: true },
  { id: "visao", path: "/visao", canonical: "/visao", area: "consultoria", component: "Visao", legacyCompatible: false },
  { id: "ecossistema", path: "/ecossistema", canonical: "/visao", area: "consultoria", component: "Visao", legacyCompatible: true },
  { id: "paes-consultoria", path: "/paes-consultoria", canonical: "/visao", area: "consultoria", component: "Visao", legacyCompatible: true },
  { id: "cases", path: "/cases", canonical: "/cases", area: "portfolio", component: "Cases", legacyCompatible: false },
  { id: "banal", path: "/banal", canonical: "/case/banal-identidade-de-agencia-criativa", area: "portfolio", component: "CaseDetail", legacyCompatible: true },
  { id: "empresas/banal", path: "/empresas/banal", canonical: "/case/banal-identidade-de-agencia-criativa", area: "portfolio", component: "CaseDetail", legacyCompatible: true },
  { id: "verdeburgo", path: "/verdeburgo", canonical: "/cases", area: "portfolio", component: "Cases", legacyCompatible: true },
  { id: "empresas/verde-burgo", path: "/empresas/verde-burgo", canonical: "/cases", area: "portfolio", component: "Cases", legacyCompatible: true },
  { id: "projetos/provence-raiz", path: "/projetos/provence-raiz", canonical: "/case/provence-raiz-sistema-visual", area: "portfolio", component: "CaseDetail", legacyCompatible: true },
  { id: "biblioteca", path: "/biblioteca", canonical: "/sistema", area: "sistema", component: "Sistema", legacyCompatible: true },
  { id: "sistema", path: "/sistema", canonical: "/sistema", area: "sistema", component: "Sistema", legacyCompatible: false },
  { id: "biblioteca/geracao-dos-realizadores", path: "/biblioteca/geracao-dos-realizadores", canonical: "/sistema", area: "sistema", component: "Sistema", legacyCompatible: true },
  { id: "ia-com-alma", path: "/ia-com-alma", canonical: "/ia-com-alma", area: "consultoria", component: "IAComAlma", legacyCompatible: false },
  { id: "comercial", path: "/comercial", canonical: "/ia-com-alma", area: "consultoria", component: "IAComAlma", legacyCompatible: true },
  { id: "contato", path: "/contato", canonical: "/contato", area: "contact", component: "Contato", legacyCompatible: false },
];

export const dynamicRouteDefinitions = [
  { pattern: /^case\/[^/]+$/, canonicalPrefix: "/case/", area: "portfolio", component: "CaseDetail" },
  { pattern: /^biblioteca\/[^/]+$/, canonicalPrefix: "/sistema/", area: "sistema", component: "SistemaArticle", legacyCompatible: true },
  { pattern: /^sistema\/[^/]+$/, canonicalPrefix: "/sistema/", area: "sistema", component: "SistemaArticle" },
  { pattern: /^servicos\/[^/]+$/, canonicalPrefix: "/servicos/", area: "consultoria", component: "AuthorityServicePage" },
];

export function isKnownStaticRoute(route) {
  return publicRouteDefinitions.some((definition) => definition.id === route);
}

export function isKnownDynamicRoute(route) {
  return dynamicRouteDefinitions.some((definition) => definition.pattern.test(route));
}

export function isKnownPublicRoute(route, { atlasSlug } = {}) {
  return isKnownStaticRoute(route) || route === `atlas/${atlasSlug}` || isKnownDynamicRoute(route);
}

export function getRouteDefinition(route) {
  return publicRouteDefinitions.find((definition) => definition.id === route) || null;
}

export function getRouteArea(route) {
  const staticDefinition = getRouteDefinition(route);
  if (staticDefinition) return staticDefinition.area;
  const dynamicDefinition = dynamicRouteDefinitions.find((definition) => definition.pattern.test(route));
  return dynamicDefinition?.area || "unknown";
}
