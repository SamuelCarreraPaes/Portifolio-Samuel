# Traceability Matrix - Rodada Project OS V2

| Achado | Mudanca aplicada | Arquivo | Teste | Rollback |
| --- | --- | --- | --- | --- |
| Dados locais no `App.jsx` | Extracao para modulo de conteudo | `src/content/ecosystemContent.js` | `npm run smoke`, `npm run build` | Restaurar arrays inline |
| Rotas espalhadas no `App.jsx` | Registry de rotas | `src/router/routes.js` | `npm run smoke` | Restaurar booleana `routeMatches` |
| CTAs repetidos | CTA componentizado | `src/components/ui/CTA.jsx` | `npm run lint`, `npm run build` | Voltar botoes inline |
| Tokens implícitos | Tokens documentados em JS | `src/design-system/tokens.js` | `npm run build` | Remover modulo |
| SEO inline sem registry | Registry estrategico | `src/seoRegistry.js` | `npm run smoke` | Remover modulo |
| Analytics sem mapa | Eventos noop | `src/analytics/events.js` | `npm run smoke` | Remover modulo |
| CMS futuro nao modelado | Colecoes futuras | `src/content/cmsModel.js` | `npm run smoke` | Remover modulo |
| IA futura sem guardrail | Oportunidades como hipoteses | `src/services/ai/opportunities.js` | `npm run smoke` | Remover modulo |
| Falta validacao objetiva | Smoke script | `scripts/project-os-smoke.mjs` | `npm run smoke` | Remover script e package entry |
