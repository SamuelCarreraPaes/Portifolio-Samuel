export const publicRouteDefinitions = [
  { id: "inicio", path: "/", canonical: "/", area: "consultoria", component: "Inicio", legacyCompatible: false },
  { id: "sobre/samuel-carrera-paes", path: "/sobre/samuel-carrera-paes", canonical: "/sobre/samuel-carrera-paes", area: "consultoria", component: "SamuelEntityPage", legacyCompatible: false },
  { id: "visao", path: "/visao", canonical: "/visao", area: "consultoria", component: "Visao", legacyCompatible: false },
  { id: "ecossistema", path: "/ecossistema", canonical: "/paes-consultoria", area: "consultoria", component: "PaesConsultoria", legacyCompatible: true },
  { id: "paes-consultoria", path: "/paes-consultoria", canonical: "/paes-consultoria", area: "consultoria", component: "PaesConsultoria", legacyCompatible: false },
  { id: "cases", path: "/cases", canonical: "/empresas/banal", area: "banal", component: "Banal", legacyCompatible: true },
  { id: "banal", path: "/banal", canonical: "/empresas/banal", area: "banal", component: "Banal", legacyCompatible: true },
  { id: "empresas/banal", path: "/empresas/banal", canonical: "/empresas/banal", area: "banal", component: "Banal", legacyCompatible: false },
  { id: "verdeburgo", path: "/verdeburgo", canonical: "/empresas/verde-burgo", area: "verde-burgo", component: "Verdeburgo", legacyCompatible: true },
  { id: "empresas/verde-burgo", path: "/empresas/verde-burgo", canonical: "/empresas/verde-burgo", area: "verde-burgo", component: "Verdeburgo", legacyCompatible: false },
  { id: "projetos/provence-raiz", path: "/projetos/provence-raiz", canonical: "/projetos/provence-raiz", area: "verde-burgo", component: "ProvenceRaizPage", legacyCompatible: false },
  { id: "biblioteca", path: "/biblioteca", canonical: "/biblioteca", area: "biblioteca", component: "Biblioteca", legacyCompatible: false },
  { id: "sistema", path: "/sistema", canonical: "/biblioteca", area: "biblioteca", component: "Biblioteca", legacyCompatible: true },
  { id: "biblioteca/geracao-dos-realizadores", path: "/biblioteca/geracao-dos-realizadores", canonical: "/biblioteca/geracao-dos-realizadores", area: "biblioteca", component: "GeracaoDosRealizadoresPage", legacyCompatible: false },
  { id: "contato", path: "/contato", canonical: "/contato", area: "contact", component: "Contato", legacyCompatible: false },
];

export const dynamicRouteDefinitions = [
  { pattern: /^case\/[^/]+$/, canonicalPrefix: "/case/", area: "banal", component: "CaseDetail" },
  { pattern: /^biblioteca\/[^/]+$/, canonicalPrefix: "/biblioteca/", area: "biblioteca", component: "SistemaArticle" },
  { pattern: /^sistema\/[^/]+$/, canonicalPrefix: "/biblioteca/", area: "biblioteca", component: "SistemaArticle", legacyCompatible: true },
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
