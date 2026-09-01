# G0 — Lacunas, bloqueios e prontidão

Data da apuração inicial: 2026-08-29  
Fechamento das lacunas autorizadas: 2026-08-31  
Escopo observado: `public/images`, `public/brands`, `assets-source`, dados de cases, rotas, SEO e componentes do repositório ativo.

## Estado inicial protegido

- Branch: `feature/comercial-ia-com-alma`.
- O working tree já continha alterações rastreadas e diretórios não rastreados antes desta execução.
- Essas alterações foram tratadas como trabalho preexistente do usuário e não foram revertidas.
- Baseline executada antes da reconstrução: `npm run smoke`, `npm run lint` e `npm run build` aprovados.
- Nenhum commit, push ou deploy integra o escopo autorizado.

## Inventário resumido

- 17 cases existentes antes da nova taxonomia.
- 360 arquivos relevantes inventariados após as intervenções aprovadas.
- 345 imagens, 2 vídeos e 13 documentos/manifestos.
- 29 ocorrências de arquivos duplicados por SHA-256.
- 241 itens sem proveniência anterior confirmada no próprio repositório.
- Manifesto integral: `G2_ASSET_MANIFEST.json`.

## Lacunas críticas

### Casarão Medeiros

- O estado inicial possuía somente seis PNGs derivados de páginas do guideline PDF.
- A fonte e o SHA-256 estão documentados em `SOURCE.md`.
- O G4-001 foi aprovado e resultou em três pranchas SVG reconstruídas, explicitamente identificadas como reconstrução gráfica e não como vetores originais.
- Situação posterior em 1º de setembro de 2026: por solicitação do usuário, as três pranchas SVG foram retiradas do case e do acervo público. O estado atual utiliza somente as dez apresentações JPG fornecidas nessa data.
- Fotografias de aplicação e novos mockups físicos não foram inventados.

### Porti

- Há 16 imagens de apresentação: quatro de Natal, seis de Verão e seis de Primavera.
- Não foram localizadas no workspace fotografias técnicas de fabricação, montagem ou implantação; o usuário confirmou que elas não existem mais no acervo disponível.
- O G4-002 foi aprovado para duas simulações técnicas editoriais novas, uma de Natal e uma de Verão.
- As novas pranchas são identificadas como simulação contemporânea e não como documentação histórica de fabricação.

### Provença Raiz

- O acervo é amplo: fontes de apresentação, moodboards, renders, pranchas, identidade, papelaria, hospitalidade e três séries de arquitetura cenográfica.
- Os manifestos registram nomes, funções e dimensões, mas não comprovam o método de produção ou a implantação física de todos os itens.
- Os cases podem avançar se cada mídia for apresentada como estudo, render, prancha, aplicação ou fonte, sem converter simulação em fato.

### BANAL

- O case atual subutilizava o acervo.
- Foram localizadas nove pranchas, dois logos e o vídeo `banal-fly-loop.mp4`.
- O documento rejeitado pelo usuário permanece isolado em `docs/evidence/banal-fonte-rejeitada` e não alimenta o case.
- A espécie do inseto no vídeo não está comprovada no repositório; a legenda não a afirma.

## Itens que podem avançar imediatamente

- Nova indexação editorial do portfólio por cinco disciplinas.
- Retirada de Val Fortunatto da vitrine, preservando arquivos e rotas.
- União editorial de Denim e Paraíso Tropical.
- Separação de Porti em Visual Merchandising, Cenografia de Natal e Cenografia de Verão.
- Separação de Provence Raiz em Identidade Visual, três cases de Cenografia e Direção de Atmosfera.
- Ampliação do case BANAL com todo o acervo público e vídeo.
- Troca do hero de PAIS pelo arquivo solicitado.
- Alteração do nome visível para `IA & Alma`, mantendo a rota `/ia-com-alma`.
- Remoção da numeração ornamental da navegação principal.

## Bloqueios

- Nenhum bloqueio G4 permanece para o escopo aprovado.
- O escopo desta execução permaneceu restrito ao repositório/workspace; acervos externos não foram pesquisados.
- A curadoria adicional de ROOM 329 foi concluída com todas as oito imagens disponíveis no workspace, sem alegar a existência de masters ausentes.

## Quarta trava

Não foi localizada no repositório uma quarta trava correspondente ao briefing. Foram mantidas somente as três regras explicitadas — necessidade comprovada, fidelidade e proveniência — além do gate humano obrigatório. Nenhuma quarta regra foi inventada.
