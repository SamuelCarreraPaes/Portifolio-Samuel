export const strategicSeoRoutes = [
  { route: "inicio", title: "Paes Consultoria | Samuel Carrera Paes — Direção Criativa", schemaType: "WebPage" },
  { route: "sobre/samuel-carrera-paes", title: "Samuel Carrera Paes | Direção Criativa e Consultoria Criativa", schemaType: "ProfilePage" },
  { route: "visao", title: "Minha Visão", schemaType: "WebPage" },
  { route: "cases", title: "Portfólio de Trabalhos", schemaType: "CollectionPage" },
  { route: "case/provence-raiz-sistema-visual", title: "Provence Raiz — Sistema Visual e Direção Criativa", schemaType: "CreativeWork" },
  { route: "case/banal-identidade-de-agencia-criativa", title: "BANAL — Identidade de Agência Criativa", schemaType: "CreativeWork" },
  { route: "case/casarao-medeiros-identidade-visual", title: "Casarão Medeiros — Identidade Visual", schemaType: "CreativeWork" },
  { route: "sistema", title: "Sistema de Direção Criativa", schemaType: "CollectionPage" },
  { route: "ia-com-alma", title: "IA & Alma — Direção Humana e Produção Generativa", schemaType: "Service" },
  { route: "contato", title: "Contato", schemaType: "WebPage" },
];

export const seoAliasCanonicals = {
  "sobre/samuel-carrera-paes": "visao",
  ecossistema: "visao",
  "paes-consultoria": "visao",
  banal: "case/banal-identidade-de-agencia-criativa",
  "empresas/banal": "case/banal-identidade-de-agencia-criativa",
  verdeburgo: "cases",
  "empresas/verde-burgo": "cases",
  "projetos/provence-raiz": "case/provence-raiz-sistema-visual",
  biblioteca: "sistema",
  "biblioteca/geracao-dos-realizadores": "sistema",
  comercial: "ia-com-alma",
};

export function getCanonicalRoute(route) {
  if (route.startsWith("biblioteca/")) return route.replace(/^biblioteca\//, "sistema/");
  return seoAliasCanonicals[route] || route;
}
