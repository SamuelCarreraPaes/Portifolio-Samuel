# Dossie de Auditoria Enterprise - Paes Consultoria V2

Data de geracao: 2026-06-30  
Projeto auditado: Paes Consultoria / Samuel Carrera Paes  
Repositorio real: `C:\Users\samue\iCloudDrive\SAMUEL PAES — ARQUIVOS\02 — Trabalho e Portfólio\Samuel Paes — Creative Consultant\Portfólio\Site Portfolio\portfolio-samuel`  
Dominio publico: `https://paesconsultoria.com`  
Pacote documental recebido: `Paes_Consultoria_V2_Final_Enterprise_Project_OS (1).zip`  
Pasta documental extraida: `C:\Users\samue\Documents\Codex\Paes_Consultoria_V2_Final_Enterprise_Project_OS_extract\Paes_Consultoria_V2_Final_Enterprise_Project_OS`

## 1. Veredito executivo

**Fato observado:** o site da Paes Consultoria V2 e uma aplicacao React/Vite com identidade editorial premium, roteamento proprio, SEO dinamico, paginas de ecossistema, dados externos modularizados parcialmente, componentes compartilhados e forte dependencia de um `src/App.jsx` monolitico.

**Fato observado:** o `App.jsx` real possui 3.117 linhas, 178.555 bytes e SHA-256 `15eb1935099d7d4d87b706c23d0318151a22759c34f2466b1141cf3a5cffc990`. Esse valor coincide com a auditoria do pacote Project OS, portanto o pacote recebido esta alinhado ao app real atual.

**Inferencia:** a maturidade visual, editorial e de SEO e maior que a maturidade arquitetural. O site ja tem presenca publica consistente, mas ainda precisa de testes, extracao gradual de paginas/dados/componentes e governanca formal para evoluir sem regressao.

**Recomendacao:** nao fazer refatoracao Big Bang. A sequencia segura e: preservar rotas/CTAs/SEO, criar smoke tests, extrair dados, extrair shell/rotas, componentizar, formalizar design system, testar acessibilidade/performance e so entao preparar CMS, analytics e IA.

## 2. Escopo e fontes de verdade

### Fontes primarias lidas

- `src/App.jsx` real do repositorio.
- `package.json`.
- `src/router.js`.
- `src/seo.jsx`.
- `src/components/shared.jsx`.
- `index.html`.
- `public/robots.txt`.
- `public/sitemap.xml`.
- `public/sitemap-images.xml`.
- `scripts/generate-seo-assets.mjs`.
- `README.md` do pacote Project OS.
- `01_CURRENT_APP_AUDIT.md`.
- `07_DESIGN_SYSTEM.md`.
- `08_COMPONENT_SPECIFICATION.md`.
- `09_FRONTEND_ARCHITECTURE.md`.
- `11_SEO_ARCHITECTURE.md`.
- `12_ACCESSIBILITY_ARCHITECTURE.md`.
- `13_PERFORMANCE_ARCHITECTURE.md`.
- `17_TESTING_STRATEGY.md`.
- `19_EXECUTION_ROADMAP.md`.
- `20_PROJECT_MEMORY.md`.
- `references/TRACEABILITY_MATRIX.md`.
- Prompts da pasta `codex/`.
- Checklists da pasta `checklists/`.
- ADRs da pasta `decisions/`.

### Regra de leitura

- **Fato observado:** algo confirmado em arquivo real ou pacote documental.
- **Inferencia:** conclusao tecnica derivada de evidencias.
- **Hipotese:** possibilidade ainda nao validada por teste.
- **Recomendacao:** acao sugerida para evolucao.

## 3. Stack e scripts

### Stack observada

| Camada | Tecnologia |
| --- | --- |
| Framework de UI | React 19.2.5 |
| Build tool | Vite 8.0.10 |
| Estilo | Tailwind CSS 4.3.0 |
| Motion | Framer Motion 12.38.0 |
| Icones | lucide-react 1.14.0 |
| Linguagem | JavaScript / JSX |
| Roteamento | hook customizado `useRouter` |
| SEO | componente customizado `DynamicSEO` |

### Scripts disponiveis

| Script | Comando | Funcao |
| --- | --- | --- |
| `dev` | `vite` | servidor local |
| `seo` | `node scripts/generate-seo-assets.mjs` | gera sitemap, sitemap de imagens e robots |
| `build` | `vite build` | build de producao |
| `lint` | `eslint .` | validacao estatica |
| `preview` | `vite preview` | preview local do build |

## 4. Arquitetura atual

### Fato observado

O app concentra grande parte da aplicacao em `src/App.jsx`:

- paginas;
- shell global;
- navbar;
- controle de menu mobile;
- render condicional de rotas;
- arrays editoriais locais;
- CTAs;
- chamadas a `DynamicSEO`;
- navegacao via `navigate`;
- fallback de rotas;
- paginas de empresas, projetos, cases, biblioteca, artigos, atlas, servicos e contato.

### Arquivos ja separados

| Arquivo | Funcao |
| --- | --- |
| `src/router.js` | rota por path/hash, `routeToPath`, `useRouter` |
| `src/seo.jsx` | injecao dinamica de title, description, canonical, Open Graph, Twitter e JSON-LD |
| `src/seoData.js` | entidades e constantes SEO |
| `src/components/shared.jsx` | `ImageWithFallback`, `PageTransition`, `EditorialConnectionGrid` |
| `src/data/cases.js` | grupos e dados de cases BANAL |
| `src/data/ecosystem.js` | assets e dados de BANAL, Verde Burgo e ecossistema |
| `src/authorityMap.js` | atlas e servicos |
| `src/sistemaArticleCards.js` | cards da biblioteca |
| `src/sistemaArticles.js` | artigos completos carregados dinamicamente |

### Inferencia

O projeto ja iniciou a modularizacao, mas `App.jsx` ainda e o gargalo principal. A proxima extracao deve preservar o visual e mover apenas dados/configuracoes primeiro.

## 5. Mapa de rotas publicas

| Rota | Render atual | Papel publico | Observacao de risco |
| --- | --- | --- | --- |
| `/` ou `inicio` | `Inicio` | home / porta de entrada | H1, CTA e SEO principal nao podem regredir |
| `/sobre/samuel-carrera-paes` | `SamuelEntityPage` | perfil de Samuel | importante para SEO nominal |
| `/visao` | `Visao` | tese editorial | narrativa autoral |
| `/ecossistema` | `PaesConsultoria` | alias | nao remover |
| `/paes-consultoria` | `PaesConsultoria` | nucleo estrategico | rota canonica de consultoria |
| `/cases` | `Banal` | alias antigo | nao remover |
| `/banal` | `Banal` | alias | nao remover |
| `/empresas/banal` | `Banal` | empresa BANAL | rota canonica da empresa |
| `/case/:id` | `CaseDetail` | detalhe de case | depende de `casesData` |
| `/verdeburgo` | `Verdeburgo` | alias | nao remover |
| `/empresas/verde-burgo` | `Verdeburgo` | empresa Verde Burgo | rota canonica da empresa |
| `/projetos/provence-raiz` | `ProvenceRaizPage` | projeto dentro da Verde Burgo | nao confundir com empresa |
| `/biblioteca` | `Biblioteca` | hub intelectual | substitui conceito antigo de sistema |
| `/sistema` | `Biblioteca` | alias antigo | nao remover |
| `/biblioteca/geracao-dos-realizadores` | `GeracaoDosRealizadoresPage` | manifesto/artigo fixo | texto estrategico |
| `/biblioteca/:slug` | `SistemaArticle` | artigo dinamico | depende de `sistemaArticles` |
| `/sistema/:slug` | `SistemaArticle` | alias de artigo | nao remover |
| `/atlas/:slug` | `EcosystemAtlas` | mapa de autoridade | depende de `authorityAtlas.slug` |
| `/servicos/:slug` | `AuthorityServicePage` | servicos comerciais | depende de `authorityMap` |
| `/contato` | `Contato` | conversao | WhatsApp, e-mail e copy devem funcionar |
| demais rotas | `NotFoundPage` | recuperacao | deve oferecer caminhos de volta |

## 6. Componentes e paginas internas

### Paginas/funcoes principais em `App.jsx`

- `SamuelEntityPage`
- `Inicio`
- `Visao`
- `PaesConsultoria`
- `Banal`
- `CaseDetail`
- `Verdeburgo`
- `ProvenceRaizPage`
- `GeracaoDosRealizadoresPage`
- `Biblioteca`
- `SistemaArticle`
- `EcosystemAtlas`
- `AuthorityServicePage`
- `Contato`
- `NotFoundPage`
- `SamuelPaesPortfolio`

### Helpers observados

- `getArticleReadingMinutes`
- `getArticleSectionId`
- `getArticleSectionLabel`

### Componentes compartilhados ja extraidos

- `ImageWithFallback`
- `PageTransition`
- `EditorialConnectionGrid`

## 7. Dados e conteudo

### Dados locais ainda no `App.jsx`

- `ecosystemPublicFlow`
- `homeProofMetrics`
- `homeAuthorityChips`
- `homeChallengeCards`
- `homeServiceCards`
- `homeMethodSteps`
- `operatingLanes`
- `banalIdentityItems`
- `banalMethodSteps`
- `verdeBurgoDeliveryStack`
- `bibliotecaTerritories`

### Dados importados

- `authorityAtlas`
- `authorityServiceGroups`
- `authorityServices`
- `getAuthorityService`
- `sistemaArticleCards`
- `banalCaseGroups`
- `casesData`
- `getBanalCaseGroupByCaseId`
- `banalAssets`
- `consultancyCompanies`
- `consultancyPrinciples`
- `verdeBurgoBrandAssets`
- `verdeBurgoEventFormats`
- `verdeBurgoMethod`
- `verdeburgoAssets`
- `verdeburgoChapters`
- `verdeburgoObjects`
- `SITE_URL`
- `homePortrait`

### Recomendacao

Extrair os arrays locais para `src/content/` antes de extrair paginas. Isso reduz risco porque nao mexe diretamente em UI, rotas ou SEO.

## 8. SEO e autoridade

### Fato observado

`DynamicSEO` atualiza:

- `document.title`;
- meta description;
- meta keywords;
- canonical;
- Open Graph;
- Twitter card;
- JSON-LD com grafo de entidades;
- entidades de Samuel, Paes Consultoria, BANAL e Verde Burgo;
- schema por pagina via `schemaType`.

### Schemas observados por pagina

| Pagina | Schema |
| --- | --- |
| Samuel | `ProfilePage` |
| BANAL | `CollectionPage` |
| Verde Burgo | `CollectionPage` |
| Provence Raiz | `CreativeWork` |
| Geracao dos Realizadores | `Article` |
| Artigos dinamicos | `Article` |
| Servicos | `Service` |
| demais paginas | `WebPage` / default |

### Infraestrutura SEO estatica

- `index.html` contem canonical, robots, Open Graph, Twitter e JSON-LD inicial.
- `public/robots.txt` aponta para `sitemap.xml` e `sitemap-images.xml`.
- `scripts/generate-seo-assets.mjs` gera sitemap, sitemap de imagens e robots.

### Risco

Ao extrair paginas, e facil esquecer `DynamicSEO` ou quebrar canonical de aliases. A proxima fase deve criar teste ou checklist SEO por rota antes de mover JSX.

## 9. Acessibilidade

### Pontos fortes observados

- Uso recorrente de `aria-labelledby`.
- `aria-current` em navegacao ativa.
- `aria-label` em botoes e links importantes.
- Icones decorativos com `aria-hidden`.
- Menu mobile com `aria-expanded`, `aria-controls`, `role="dialog"` e `aria-modal`.
- Fechamento por Escape e retorno de foco no menu mobile.
- Toast de contato com `role="status"` e `aria-live="polite"`.
- `PageTransition` usa `useReducedMotion` do Framer Motion.

### Lacunas a validar

- Mapa completo de headings por rota.
- Contraste real dos microtextos `stone-400` sobre fundo quente.
- Navegacao por teclado em todas as rotas profundas.
- Textos alternativos de todas as imagens importadas.
- Foco preso no menu mobile em todos os cenarios.

## 10. Performance

### Pontos fortes observados

- Artigos carregados por dynamic import.
- Imagens com `loading`, `decoding="async"` e, em alguns casos, prioridade eager.
- Videos usam helper `playMutedLoop`.
- `ImageWithFallback` reduz falhas visuais quando asset quebra.

### Riscos

- `App.jsx` monolitico impede code splitting por pagina.
- Build atual tende a manter bundle grande.
- Videos e imagens de cases podem afetar LCP se nao houver dimensoes/posters adequados.
- Refatoracao visual sem comparacao pode piorar CLS.

## 11. Design System

### Tokens reais ja presentes em `src/index.css`

- `--sp-paper`
- `--sp-paper-soft`
- `--sp-surface`
- `--sp-surface-strong`
- `--sp-surface-muted`
- `--sp-ink`
- `--sp-ink-soft`
- `--sp-muted`
- `--sp-muted-light`
- `--sp-line`
- `--sp-line-strong`
- `--sp-green`
- `--sp-green-hover`
- `--sp-copper`
- `--sp-blue`
- `--sp-dark`
- `--sp-dark-soft`
- `--sp-focus`
- `--sp-shadow-subtle`

### Classes/padroes globais ja existentes

- `.sp-shell`
- `.sp-surface`
- `.sp-surface-strong`
- `.sp-interactive-card`
- `.sp-media-frame`
- `.sp-image-frame`
- `.sp-dark-panel`
- `.sp-cta-dark`
- `.sp-primary-cta`
- `.sp-secondary-cta`
- `.sp-authority-chip`

### Recomendacao

O design system ja existe como fundacao CSS, mas ainda nao como camada de componentes. O caminho seguro e criar primitives pequenas apenas quando houver uso repetido comprovado.

## 12. Logica de produto e marca

### Arquitetura de ecossistema preservada

- Samuel Carrera Paes: autoria, direcao criativa, visao e repertorio.
- Paes Consultoria: nucleo estrategico e consultivo.
- BANAL: marketing, marca, posicionamento, conteudo, campanhas, percepcao de valor e estrategia criativa.
- Verde Burgo: empresa de eventos completos, com buffet, decoracao, bar, cerimonial, planejamento, producao e execucao.
- Provence Raiz: projeto/case dentro da Verde Burgo.
- Biblioteca: hub intelectual de artigos, ensaios, manifestos e pesquisas.
- Atlas: malha semantica de autoridade, servicos e conexoes.

### Risco narrativo

Nao transformar empresas em simples cases. BANAL e Verde Burgo sao estruturas do ecossistema; cases e projetos ficam dentro delas.

## 13. Fases do Project OS e status recomendado

| Fase | Status nesta entrega | Comentario |
| --- | --- | --- |
| 0 - Auditoria real | Executada documentalmente | `App.jsx` real foi conferido contra o pacote |
| 1 - Preservacao funcional | Parcial | rotas/CTAs/SEO foram mapeados; falta suite automatizada |
| 2 - Extracao de dados | Nao executada | segura como proxima fase, mas exige smoke tests |
| 3 - Componentizacao | Nao executada | fazer uma familia por PR |
| 4 - Design System | Parcial documental | tokens reais identificados; falta componente piloto |
| 5 - SEO | Parcial documental | arquitetura observada; falta registry/testes |
| 6 - Acessibilidade | Parcial documental | boas praticas mapeadas; falta axe/teclado completo |
| 7 - Performance | Parcial documental | gargalos mapeados; falta baseline Lighthouse/bundle |
| 8 - Testes | Planejada | prioridade antes de refatorar |
| 9 - CMS | Planejada | nao implementar antes do modelo de conteudo |
| 10 - Analytics | Planejada | mapear eventos sem instalar provider ainda |
| 11 - IA | Planejada | arquitetura futura, sem prometer feature |
| 12 - Release | Planejada | usar gates antes de deploy |
| 13 - Evolucao continua | Parcial | este dossie funciona como memoria de auditoria |

## 14. Riscos principais

| Risco | Severidade | Mitigacao |
| --- | --- | --- |
| Refatoracao Big Bang do `App.jsx` | Alta | PRs pequenos, smoke tests e rollback simples |
| Perda de aliases publicos | Alta | registry de rotas + testes |
| Perda de `DynamicSEO` em paginas extraidas | Alta | SEO registry + snapshot por rota |
| Menu mobile perder acessibilidade | Alta | teste de teclado, Escape e foco |
| Contato/WhatsApp/copy quebrar | Alta | E2E de conversao |
| BANAL e Verde Burgo ficarem confusas | Media/Alta | preservar arquitetura de marca |
| Bundle continuar grande | Media | lazy routes apos extracao de paginas |
| CMS/IA prematuros | Media | documentar modelo antes de implementar tecnologia |

## 15. Fluxos criticos a preservar

1. Chegada na home e entendimento da proposta.
2. Navegacao para Paes Consultoria, BANAL, Verde Burgo, Biblioteca e Contato.
3. Abertura de case BANAL por `/case/:id`.
4. Abertura de artigo por `/biblioteca/:slug` e alias `/sistema/:slug`.
5. Abertura de servico por `/servicos/:slug`.
6. Abertura de Provence Raiz por `/projetos/provence-raiz`.
7. Menu mobile com teclado e Escape.
8. CTAs para contato.
9. Links WhatsApp/e-mail/Instagram.
10. Atualizacao de metadados por rota.

## 16. Plano de PRs recomendado

### PR1 - Preservacao e testes smoke

- Criar lista de rotas canônicas e aliases.
- Criar smoke test ou script de validacao local.
- Validar build e SEO basico.
- Nao alterar UI.

### PR2 - Extracao de conteudo local

- Mover arrays locais da home, biblioteca, BANAL, Verde Burgo e lanes para `src/content`.
- Manter import no `App.jsx`.
- Comparar build e render.

### PR3 - Extracao de shell e rotas

- Criar `src/app/AppShell.jsx`.
- Criar `src/router/routes.js`.
- Manter aliases.
- Nao mudar copy.

### PR4 - Componentes compartilhados

- Extrair CTA, card, section header e service card.
- Aplicar em uma area piloto.
- Validar foco/hover/responsividade.

### PR5 - SEO registry

- Centralizar metadados e schemas por rota.
- Preservar `DynamicSEO`.
- Testar canonical/title/description.

### PR6 - Acessibilidade e performance

- Rodar axe/teclado.
- Implementar ajustes pontuais.
- Medir bundle e preparar lazy route.

## 17. Criterios de aceite para auditoria externa

- `npm run lint` passa.
- `npm run build` passa.
- Rotas publicas respondem e renderizam conteudo esperado.
- H1 unico por rota estrategica.
- `DynamicSEO` presente nas paginas estrategicas.
- Canonical e JSON-LD atualizados por rota.
- Menu mobile acessivel por teclado.
- CTAs de contato funcionam.
- Sem overflow horizontal em mobile/desktop.
- Sem remocao de aliases historicos.
- Documentacao de risco/rollback atualizada a cada PR.

## 18. Rollback recomendado

Para mudancas documentais:

1. Reverter arquivo de documentacao alterado.
2. Manter nota no changelog se o documento ja tiver sido entregue externamente.

Para mudancas de codigo:

1. Reverter commit/PR da fase.
2. Se a mudanca tocou rota, restaurar render condicional anterior.
3. Se a mudanca tocou componente, manter adaptador temporario ou voltar JSX inline.
4. Se a mudanca tocou SEO, restaurar `DynamicSEO` inline da pagina.

## 19. O que uma empresa de auditoria deve revisar manualmente

- Se a home comunica claramente proposta, servicos e conversao.
- Se BANAL e Verde Burgo estao semanticamente separadas.
- Se Verde Burgo comunica empresa de eventos completos, nao apenas projeto conceitual.
- Se Provence Raiz aparece como projeto dentro da Verde Burgo.
- Se Biblioteca funciona como hub intelectual.
- Se todas as imagens criticas possuem `alt` adequado.
- Se os microtextos tem contraste suficiente.
- Se as rotas antigas continuam indexaveis ou redirecionaveis conforme decisao de canonical.
- Se o build atual atende aos objetivos de performance.
- Se o plano de refatoracao prioriza preservacao antes de redesign.

## 20. Conclusao

**Veredito geral:** aprovado para evolucao incremental, nao aprovado para reescrita ampla imediata.

O site possui uma base publica forte: identidade editorial, SEO real, arquitetura de ecossistema, paginas estrategicas, CTAs e conteudo autoral. A maior fragilidade esta na concentracao de responsabilidade em `App.jsx` e na falta de uma suite objetiva de testes. A proxima etapa tecnicamente correta e criar uma camada de preservacao funcional e testes smoke antes de qualquer extracao relevante.
