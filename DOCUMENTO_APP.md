# Documento Do App — Samuel Carrera Paes / Paes Consultoria

## Decisão Atual

Em 2026-07-04 foi aplicada a Opção B de retorno estratégico: recuperar a versão centrada em Samuel Carrera Paes / Paes Consultoria sem descartar melhorias técnicas, SEO e proteção de rotas públicas.

## Objetivo Da Versão

O site deve funcionar como um portfólio autoral amplo de Samuel Carrera Paes, sem ficar preso apenas a branding, marketing ou varejo. A narrativa principal deve comportar direção criativa, imagem, espaço, eventos, cenografia, produto, campanhas, experiências físicas e projetos futuros.

Samuel Paes -> Visão -> Cases -> Sistema -> Contato

BANAL e Verde Burgo deixam de ser arquitetura pública principal nesta fase. O repertório visual, os assets e os caminhos antigos permanecem preservados, mas não são protagonistas da navegação.

## Direção Narrativa Atual

- Samuel Carrera Paes é o centro do site.
- Marca é um território possível, não a tese inteira.
- Varejo é um território possível, não o limite do portfólio.
- A área de cases deve receber trabalhos de naturezas diferentes, incluindo projetos de imagem, espaço, eventos, cenografia, varejo, produto e experiências.
- Provence Raiz e futuros trabalhos ligados à Verde Burgo devem entrar como projetos/cases quando houver curadoria de conteúdo e assets, não como substitutos da arquitetura principal.

## Rotas Públicas

| Rota | Função atual |
| --- | --- |
| `/` | Início |
| `/visao` | Visão criativa e posicionamento autoral |
| `/cases` | Portfólio de trabalhos selecionados |
| `/case/:slug` | Detalhe canônico de cada case |
| `/sistema` | Hub editorial dos artigos |
| `/sistema/:slug` | Artigo individual |
| `/contato` | Contato |

## Aliases Preservados

| Alias | Renderização segura |
| --- | --- |
| `/banal` | Cases |
| `/empresas/banal` | Cases |
| `/verdeburgo` | Cases |
| `/empresas/verde-burgo` | Cases |
| `/projetos/provence-raiz` | `/case/provence-raiz-sistema-visual` |
| `/biblioteca` | Sistema |
| `/biblioteca/:slug` | Sistema artigo equivalente |
| `/ecossistema` | Visão |
| `/paes-consultoria` | Visão |
| `/sobre/samuel-carrera-paes` | Visão |

## O Que Foi Preservado

- Identidade editorial, premium, minimalista e autoral.
- Logo/símbolo SP na navegação e favicon.
- SEO de Samuel Carrera Paes / Paes Consultoria.
- `robots.txt`, `sitemap.xml` e `sitemap-images.xml`.
- Rotas antigas sem virar página quebrada.
- Cases e artigos já existentes.
- Assets de repertório no diretório público.

## O Que Foi Retirado Do Protagonismo

- BANAL como página institucional principal.
- Verde Burgo como página institucional principal.
- Provence Raiz como projeto público separado.
- Biblioteca como substituta nominal do Sistema.
- Narrativa de ecossistema com empresas como eixo da homepage.

## Critérios De Aceite

- `npm run smoke` passa.
- `npm run lint` passa.
- `npm run build` passa.
- Home mostra Samuel/Paes Consultoria como centro.
- Navegação principal exibe Início, Visão, Cases, Sistema e Contato.
- URLs antigas não ficam em branco.
- Sitemap não submete páginas de empresa como destino principal.
- Indexação pública volta a privilegiar Samuel Carrera Paes e Paes Consultoria.

## Reestruturação Integral Do Portfólio — 2026-07-14

### Fonte Única De Verdade

`src/data/cases.js` é o catálogo canônico dos 12 cases. A Home, a listagem, os filtros, as páginas individuais, o registro de SEO, o sitemap e o teste de fumaça passam a depender do mesmo contrato de dados.

Cada case contém:

- ID legado e slug canônico;
- título, categoria e descrição editorial;
- tags de filtro;
- cliente apenas quando sustentado pelo arquivo existente;
- papel, território e entregáveis;
- contexto, desafio, abordagem e execução;
- impacto qualitativo sem métrica inventada;
- mídia com alt text e legenda;
- canonical, descrição e imagem social;
- estado interno de verificação.

### Ordem Editorial

1. Val Fortunatto — Brand Transition
2. Val Fortunatto Linho — Produto Próprio
3. Ateliê Bambini — Arquitetura de Marca Infantil
4. R Lovers — Calendário Comercial
5. PORTI — Expansão Física & Cenografia
6. HEXA — Copa do Mundo · Reserva
7. Campanhas & Collabs
8. Rouge & Gold — Exposição Premium
9. Outerwear — Hotspots & Color Blocking
10. Vintage Denim — Cápsula Heritage
11. Paraíso Tropical — Mata Atlântica
12. Provence Raiz — Sistema Visual e Direção Criativa

### Destaques Da Home

1. PORTI
2. Campanhas & Collabs
3. Provence Raiz

### Regras De Evidência

- Não publicar ano, métrica, resultado quantitativo ou depoimento sem fonte documental.
- Sínteses autorais são identificadas como leitura editorial, não como fala de cliente.
- Campos desconhecidos ficam ausentes da interface.
- Assets existentes são preservados; nenhum backup deve ser removido por esta entrega.

### Arquitetura Da Experiência

- Home: proposta, CTAs, três destaques, processo em seis etapas, áreas de atuação, entrada do Sistema e CTA final.
- Portfólio: 12 cards, nove filtros acessíveis e estado de resultado anunciado.
- Case genérico: hero, metadados confirmados, tese, narrativa, galeria, impacto qualitativo, contato e paginação.
- Provence Raiz: mantém sua narrativa visual aprofundada e usa o mesmo contrato canônico.
- Sistema: preserva seis artigos como hub intelectual.

### SEO E Compatibilidade

- Os 12 slugs canônicos entram em `src/seoRegistry.js`, `sitemap.xml`, `sitemap-images.xml` e `llms.txt`.
- IDs antigos `/case/case-01` a `/case/case-12` continuam renderizando o conteúdo correto.
- `/projetos/provence-raiz` continua aceito e aponta semanticamente para o novo canonical.
- Case inexistente recebe `noindex, follow` e retorno útil.

### Rollback

Esta entrega está isolada na branch `codex/portfolio-integral-restructure`. O retorno seguro consiste em abandonar a branch ou reverter seu commit, sem excluir assets e backups não rastreados.
