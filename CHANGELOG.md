# Changelog

## 2026-06-30 - Project OS V2 incremental execution

### Adicionado

- Smoke test do Project OS em `scripts/project-os-smoke.mjs`.
- Script `npm run smoke`.
- Conteudo editorial local extraido para `src/content/ecosystemContent.js`.
- Registry de rotas publicas e aliases em `src/router/routes.js`.
- Registry SEO estrategico em `src/seoRegistry.js`.
- Tokens de design system em `src/design-system/tokens.js`.
- Componente CTA incremental em `src/components/ui/CTA.jsx`.
- Mapa interno de eventos em `src/analytics/events.js` com provider noop.
- Modelo de CMS futuro em `src/content/cmsModel.js`.
- Oportunidades futuras de IA em `src/services/ai/opportunities.js`.
- Documentacao de status, memoria, backlog, ADR e matriz de rastreabilidade.

### Alterado

- `src/App.jsx` passou a consumir conteudo extraido.
- `src/App.jsx` passou a usar registry para checagem de rotas conhecidas.
- CTAs principais da home passaram a usar `CTAButton`, preservando classes visuais e destinos.

### Preservado

- Todas as rotas publicas e aliases.
- `DynamicSEO`, canonical, schemas e metadados.
- Navegacao desktop/mobile.
- CTAs, contato, WhatsApp, e-mail e Instagram.
- Identidade editorial premium.
- Separacao narrativa entre Paes Consultoria, BANAL, Verde Burgo, Provence Raiz, Biblioteca, Atlas, Servicos, Cases e Contato.

### Validado

- `npm run smoke`
- `npm run lint`
- `npm run build`

### Risco restante

- `App.jsx` ainda e monolitico. A proxima rodada deve extrair paginas uma por uma, protegida pelo smoke test.
