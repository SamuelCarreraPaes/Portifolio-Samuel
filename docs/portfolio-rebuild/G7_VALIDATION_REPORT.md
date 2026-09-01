# G7 — Relatório final de validação

> **Atualização posterior — 1º de setembro de 2026:** este relatório registra a rodada original de validação. Depois dela, o usuário solicitou a retirada das três reconstruções SVG do Casarão Medeiros. Os arquivos foram removidos do case e do acervo público; a galeria atual contém somente as dez apresentações JPG fornecidas posteriormente.

Data de fechamento: 2026-08-31  
Branch observada: `feature/comercial-ia-com-alma`  
Commit, push e publicação: não executados

## 1. Resumo

- 24 entradas de case preservadas no conjunto de dados.
- 18 cases publicados na vitrine editorial; 6 históricos continuam acessíveis por URL e fora do índice.
- 360 assets inventariados: 345 imagens, 2 vídeos e 13 documentos/manifestos.
- G4-001 e G4-002 aprovados e executados dentro do escopo autorizado.
- Carrossel editorial por disciplina implementado e validado em celular, intermediário e notebook.
- Curadoria adicional de ROOM 329 concluída com as oito imagens disponíveis: uma abertura e sete capítulos narrativos.

## 2. Alterações

- `/cases` reorganizado em Visual Merchandising, Identidade Visual, Cenografia, Decoração e IA & Alma.
- Cada disciplina usa uma imagem forte por vez, setas laterais, paginação e proporções responsivas padronizadas: 4:5 no celular, 3:2 no intermediário e 16:9 no desktop.
- Títulos das disciplinas ganharam escala editorial; títulos dos cases permanecem menores e consistentes.
- O título móvel “Visual Merchandising” foi recalibrado após a auditoria eliminar um overflow de 28 px.
- Val Fortunatto saiu da vitrine sem remoção de arquivos ou URLs.
- Denim e Paraíso Tropical foram reunidos; Porti e Provence Raiz foram separados por disciplina e tipo de entrega.
- BANAL foi ampliado com pranchas e vídeo existentes; a fonte rejeitada não alimenta o case.
- PAIS recebeu o hero solicitado; o nome visível passou a IA & Alma, mantendo a rota histórica.
- Casarão recebeu três pranchas SVG reconstruídas após G4-001, com classificação visível e sem mockups físicos inventados.
- Porti Natal e Verão receberam uma simulação técnica editorial cada após G4-002, identificadas como material novo e não histórico.
- `CaseDetail` passou a usar metadados específicos de mídia para `alt`, título de legenda, explicação e proveniência.
- O gerador de inventário distingue fontes de Porti Primavera, Natal e Verão e classifica reconstruções/simulações novas.

## 3. Validações executadas

- `npm run lint` — sucesso, sem mensagens.
- `npm run smoke` — sucesso, 77 verificações.
  - IDs e slugs únicos.
  - Todos os assets referenciados pelos 24 cases existem.
  - Categorias, rotas, aliases, hero PAIS, mídia BANAL, reconstrução Casarão, simulações Porti e carrossel acessível verificados.
- `npm run build` — sucesso.
  - SEO: 37 rotas e 31 imagens.
  - Vite: 2.132 módulos transformados.
  - Bundle principal: 499,05 kB / 146,50 kB gzip.
  - Pós-build: 48 páginas estáticas de case.
  - Aviso não bloqueante: tempo significativo no plugin interno `vite:prepare-out-dir`.
- `npm run portfolio:inventory` — sucesso; 24 cases e 360 assets.
- `git diff --check` — sucesso, sem erro de whitespace.
- Não há scripts oficiais separados de `test` ou `typecheck` no `package.json`; eles não foram inventados nem declarados como executados.

## 4. Auditoria visual

Tamanhos efetivamente verificados:

- mobile pequeno: 320 × 568;
- mobile: 390 × 844;
- tablet: 820 × 1180;
- intermediário: 820 × 1180;
- desktop/notebook: 1440 × 1000;
- desktop amplo: 1920 × 1080.

Rotas desta rodada:

- `/cases`;
- `/case/casarao-medeiros-identidade-visual`;
- `/case/porti-cenografia-de-natal`;
- `/case/porti-cenografia-de-verao`.

Resultados:

- nenhum overflow horizontal após a correção do título móvel;
- nenhuma imagem quebrada e nenhum `alt` ausente nas páginas auditadas;
- um `h1` por página;
- cinco regiões de carrossel com nomes acessíveis;
- setas do carrossel com 48 × 48 px, mudança de slide confirmada e contador atualizado;
- Casarão exibe três legendas de reconstrução e a nota de que os SVGs não são vetores originais;
- Porti Natal e Verão exibem a legenda “Simulação técnica editorial · 2026” e o limite “Não é documentação histórica de fabricação”;
- proporções confirmadas: 327 × 409 px no mobile, 757 × 505 px no intermediário e 1329 × 748 px no desktop;
- nenhuma mensagem `warn` ou `error` no console da aba auditada.

Limites:

- contraste foi inspecionado visualmente, sem medição automatizada de todas as combinações;
- todos os caminhos referenciados foram validados, mas os 360 itens do acervo não publicado não foram abertos individualmente.

## 5. Proveniência

- Manifesto: 92 assets classificados como original existente, 23 como reconstrução, 4 como simulação e 241 como origem incerta.
- Novas mídias desta rodada: 3 SVGs de reconstrução gráfica do Casarão e 2 PNGs de simulação técnica Porti.
- Os dois `SOURCE.md` das simulações integram a contagem de quatro assets classificados como simulação.
- Cada intervenção nova possui diretório próprio, `SOURCE.md`, hash, referências, limites e identificação na interface.
- Nenhuma reconstrução ou simulação foi apresentada como fotografia, vetor original ou documentação histórica.

## 6. Pendências

- Nenhum item G4 permanece aguardando aprovação para o escopo implementado.
- A quarta trava citada no briefing não foi localizada; somente as três regras fornecidas foram aplicadas.
- ROOM 329 utiliza todas as oito imagens disponíveis no workspace e recebeu narrativa específica por quadro.
- Commit, push, PR e deploy permanecem bloqueados até autorização explícita do G8.

## 7. Git

### Estado inicial protegido

Modificados antes desta execução:

- `public/llms.txt`
- `public/sitemap-images.xml`
- `public/sitemap.xml`
- `scripts/case-seo-data.mjs`
- `scripts/generate-seo-assets.mjs`
- `scripts/project-os-smoke.mjs`
- `src/App.jsx`
- `src/router/routes.js`
- `src/seoRegistry.js`
- `vercel.json`

Não rastreados antes desta execução:

- `docs/IA_COM_ALMA_ARQUITETURA.md`
- `docs/NUCLEO_IDENTIDADES_ARQUITETURA.md`
- `docs/evidence/`
- `public/images/03_ATELIE_BAMBINI/02_RECUPERADO_CHATGPT/`
- `public/images/15_IA_COM_ALMA/`
- `public/images/16_IDENTIDADES/`

### Produzido nesta execução

- arquitetura e conteúdo editorial de cases em `src/App.jsx` e fontes de SEO associadas;
- `scripts/generate-portfolio-inventory.mjs` e suíte smoke ampliada;
- `docs/portfolio-rebuild/` com inventário, arquitetura, manifesto, protótipos, aprovações e validação;
- três SVGs e `SOURCE.md` em `public/images/16_IDENTIDADES/02_CASARAO_MEDEIROS/02_RECONSTRUCAO_GRAFICA/`;
- uma prancha PNG e `SOURCE.md` em cada diretório `02_SIMULACAO_TECNICA` de Porti Natal e Verão.

O trabalho preexistente foi preservado. O diretório não rastreado `public/images/16_IDENTIDADES/` já existia; somente o novo subdiretório documentado acima foi acrescentado por esta execução.

### Estado final

- Working tree continua intencionalmente sujo.
- Nenhum `git add`, commit, push, PR, merge ou deploy foi executado.

## 8. Veredito

**PRONTO PARA G8.**

## Revisão Codex — camada 1 a 9

Esta revisão substitui as ressalvas de responsividade e acabamento registradas antes da correção:

- overflow de “Visual Merchandising” em 320 px eliminado;
- capas responsivas com direção de arte específica para R Lovers, HEXA, BANAL e pranchas técnicas;
- 118 imagens das galerias visíveis receberam função narrativa, legenda e alt text rastreáveis por case;
- “Papel de Samuel” e a autoria de Samuel Carrera Paes foram explicitados;
- componente de imagem corrigido para semântica, prioridade de hero, `sizes`, fallback e movimento reduzido;
- ROOM 329 concluído com oito imagens disponíveis e sete capítulos legendados;
- `casesData`, apresentação editorial e componentes de portfólio extraídos de `App.jsx`;
- catálogo de cases passou a carregar sob demanda;
- bundle principal: 465,56 kB / 138,47 kB gzip; catálogo: 56,52 kB / 16,18 kB gzip;
- `npm run test:portfolio-ui`: 71 verificações aprovadas;
- `npm run smoke`: 78 verificações aprovadas;
- 18 rotas testadas em 320 px sem overflow ou imagens quebradas;
- matriz `/cases` 320/390/820/1440/1920 aprovada;
- console final sem warnings ou erros.

Evidência detalhada: `docs/portfolio-rebuild/RESPONSIVE_QA_MATRIX.md`.

G8 permanece bloqueado até autorização explícita para commit, push ou publicação.

O escopo autorizado está implementado e validado. G8 continua travado até autorização explícita para as ações específicas de versionamento ou publicação.
