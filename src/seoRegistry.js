export const strategicSeoRoutes = [
  { route: "inicio", title: "Paes Consultoria | Samuel Carrera Paes — Direção Criativa", schemaType: "WebPage" },
  { route: "sobre/samuel-carrera-paes", title: "Samuel Carrera Paes | Direção Criativa e Consultoria Criativa", schemaType: "ProfilePage" },
  { route: "visao", title: "Minha Visão", schemaType: "WebPage" },
  { route: "paes-consultoria", title: "Paes Consultoria", schemaType: "WebPage" },
  { route: "empresas/banal", title: "BANAL", schemaType: "CollectionPage" },
  { route: "empresas/verde-burgo", title: "Verde Burgo", schemaType: "CollectionPage" },
  { route: "projetos/provence-raiz", title: "Provence Raiz", schemaType: "CreativeWork" },
  { route: "biblioteca", title: "Biblioteca", schemaType: "WebPage" },
  { route: "biblioteca/geracao-dos-realizadores", title: "Geração dos Realizadores", schemaType: "Article" },
  { route: "contato", title: "Contato", schemaType: "WebPage" },
];

export const seoAliasCanonicals = {
  ecossistema: "paes-consultoria",
  cases: "empresas/banal",
  banal: "empresas/banal",
  verdeburgo: "empresas/verde-burgo",
  sistema: "biblioteca",
};

export function getCanonicalRoute(route) {
  if (route.startsWith("sistema/")) return route.replace(/^sistema\//, "biblioteca/");
  return seoAliasCanonicals[route] || route;
}
