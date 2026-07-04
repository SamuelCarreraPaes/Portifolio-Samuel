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
| `/case/:id` | Detalhe de cada case |
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
| `/projetos/provence-raiz` | Cases |
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
