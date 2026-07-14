export const strategicSeoRoutes = [
  { route: "inicio", title: "Paes Consultoria | Samuel Carrera Paes — Direção Criativa", schemaType: "WebPage" },
  { route: "sobre/samuel-carrera-paes", title: "Samuel Carrera Paes | Direção Criativa e Consultoria Criativa", schemaType: "ProfilePage" },
  { route: "visao", title: "Minha Visão", schemaType: "WebPage" },
  { route: "cases", title: "Portfólio de Trabalhos", schemaType: "CollectionPage" },
  { route: "case/case-12", title: "Provence Raiz — Sistema Visual e Direção Criativa", schemaType: "CreativeWork" },
  { route: "sistema", title: "Sistema de Direção Criativa", schemaType: "CollectionPage" },
  { route: "contato", title: "Contato", schemaType: "WebPage" },
];

export const seoAliasCanonicals = {
  "sobre/samuel-carrera-paes": "visao",
  ecossistema: "visao",
  "paes-consultoria": "visao",
  banal: "cases",
  "empresas/banal": "cases",
  verdeburgo: "cases",
  "empresas/verde-burgo": "cases",
  "projetos/provence-raiz": "case/case-12",
  biblioteca: "sistema",
  "biblioteca/geracao-dos-realizadores": "sistema",
};

export function getCanonicalRoute(route) {
  if (route.startsWith("biblioteca/")) return route.replace(/^biblioteca\//, "sistema/");
  return seoAliasCanonicals[route] || route;
}
