# Samuel Carrera Paes - Paes Consultoria

Site institucional oficial de Samuel Carrera Paes / Paes Consultoria, publicado em:

- https://paesconsultoria.com
- https://www.paesconsultoria.com

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Vercel

## Arquitetura de Posicionamento

A estrutura atual posiciona a Paes Consultoria como o nucleo estrategico e criativo central.

Logica publica:

```text
Paes Consultoria
-> abertura institucional limpa
-> Minha Visao
-> empresas: BANAL / VERDE BURGO
-> Biblioteca
-> Contato por frente comercial
```

A Paes Consultoria concentra direcao, identidade, experiencia, estrategia, percepcao de valor e execucao.

- `BANAL`: empresa especializada em branding, marketing, comunicacao, varejo, posicionamento, narrativa, conteudo, campanhas, collabs e estrategia criativa. Os cases publicados funcionam como nucleos estruturados com desdobramentos internos e arquivo em expansao.
- `VERDE BURGO`: empresa de eventos com buffet, decoracao, bar, cerimonial, planejamento, producao e execucao.
- `Biblioteca`: hub de autoridade intelectual sobre branding, varejo, hospitalidade, eventos, narrativa, posicionamento, percepcao, direcao criativa e construcao de negocios.

## Rotas Publicas

| Rota | Funcao |
| --- | --- |
| `/` | Apresentacao institucional da Paes Consultoria. |
| `/sobre/samuel-carrera-paes` | Perfil autoral de Samuel Carrera Paes. |
| `/visao` | Posicionamento profissional de Samuel Carrera Paes. |
| `/biblioteca` | Artigos, ensaios, pesquisas e reflexoes de autoridade. |
| `/empresas/banal` | Pagina institucional da BANAL. |
| `/empresas/verde-burgo` | Pagina institucional da Verde Burgo. |
| `/projetos/provence-raiz` | Projeto Provence Raiz dentro da Verde Burgo. |
| `/atlas/samuel-carrera-paes` | Mapa editorial de servicos, empresas, cases e artigos. |
| `/servicos/:slug` | Paginas de autoridade por servico/territorio. |
| `/contato` | Contato profissional. |
| `/case/:id` | Nucleos de case de branding, marketing, varejo e comunicacao vinculados a BANAL. |

Rotas antigas preservadas por compatibilidade:

| Rota antiga | Comportamento atual |
| --- | --- |
| `/cases` | Renderiza BANAL, pois os cases antigos pertencem a essa empresa. |
| `/sistema` | Renderiza Biblioteca. |
| `/sistema/:slug` | Renderiza o artigo equivalente em Biblioteca. |
| `/ecossistema` | Renderiza uma leitura institucional da Paes Consultoria com canonical para a raiz. |
| `/banal` | Alias para BANAL. |
| `/verdeburgo` | Alias para Verde Burgo. |

## SEO e Indexacao

O site foi preparado para associar `Samuel Carrera Paes`, `Paes Consultoria`, `BANAL` e `Verde Burgo` a intencoes de busca distintas.

Arquivos e pontos principais:

- `index.html`: titulo, description, canonical, Open Graph, Twitter Card e JSON-LD `Person`/`WebSite`.
- `src/seo.jsx`: SEO dinamico por rota com dominio canonico `https://paesconsultoria.com`.
- `src/seoData.js`: entidades JSON-LD, palavras-chave, utilitarios de URL e dados de autoridade.
- `public/robots.txt`: permite indexacao e declara o sitemap.
- `public/sitemap.xml`: declara as rotas canonicas atuais.
- `public/sitemap-images.xml`: associa imagens publicas a Samuel Carrera Paes, Paes Consultoria, BANAL e Verde Burgo.

## Arquitetura de Codigo

O site foi modularizado para reduzir o peso de `src/App.jsx` e separar dados, infraestrutura e componentes reutilizaveis:

- `src/App.jsx`: orquestracao das paginas, navegação global e renderizacao das rotas.
- `src/data/cases.js`: dados dos nucleos de case, desdobramentos e arquivo de repertorio vinculados a BANAL.
- `src/data/ecosystem.js`: dados de Paes Consultoria, BANAL, Verde Burgo, Provence Raiz, ativos e metodos.
- `src/components/shared.jsx`: componentes compartilhados de imagem, transicao e grade editorial.
- `src/router.js`: roteador leve com suporte a pathname e aliases antigos.
- `src/seo.jsx` e `src/seoData.js`: SEO dinamico e dados estruturados.
- `src/motionConfig.js`: curva de movimento premium e helper para videos sem som em loop.
- `src/index.css`: tokens globais minimos, foco visivel e suporte a reduced motion.

## Conteudo Editorial

A pagina `Inicio` apresenta somente a tese institucional essencial: Paes Consultoria, logos de BANAL e Verde Burgo, Direcao Criativa e Estrategia, e a frase de posicionamento central. A explicacao conceitual fica concentrada em `Minha Visao`.

A pagina `Minha Visao` explica o posicionamento profissional de Samuel Carrera Paes: pensamento sistemico, identidade como estrategia, experiencia e percepcao, excelencia de execucao e uso de tecnologia como ferramenta, nao como identidade.

A pagina `BANAL` apresenta uma empresa com hero, arquivo de repertorio, nucleos estruturados, servicos, explicacao institucional, processo e CTA. Os antigos projetos de marketing, varejo, comunicacao e marca aparecem como nucleos da BANAL, e alguns reúnem desdobramentos confirmados: Porti Natal e Verao; Basquiat, Netflix/Tudum e Mangueira em Campanhas & Collabs; Val Fortunatto Linho como case independente; Paraiso Tropical como territorio BANAL. Outros projetos permanecem em catalogacao editorial.

A pagina `VERDE BURGO` apresenta uma empresa de eventos com solucao completa: buffet, decoracao, bar, cerimonial, planejamento, producao e execucao. A pagina abre com galeria de formatos/projetos, depois servicos, explicacao institucional, metodo e o detalhamento de `Provence Raiz` como primeiro projeto publicado dentro da Verde Burgo.

A pagina `Contato` direciona o usuario para `Contact BANAL` ou `Contact VERDE BURGO`, evitando uma chamada generica de consultoria.

A pagina `Biblioteca` substitui a antiga area `Sistema` e funciona como hub de autoridade:

- `/biblioteca/leitura-de-marca` - Leitura de Marca
- `/biblioteca/curadoria-de-produto` - Curadoria de Produto
- `/biblioteca/narrativa-espacial` - Narrativa Espacial
- `/biblioteca/construcao-de-percepcao` - Construcao de Percepcao
- `/biblioteca/operacao-criativa` - Operacao Criativa
- `/biblioteca/experiencia-fisica` - Experiencia Fisica

## Assets

- `public/brands/banal`: imagens selecionadas do pacote BANAL para simbolo, cena fundadora e pranchas de identidade.
- `public/brands/banal/media`: logo horizontal transparente da BANAL e video em loop da mosca para a pagina institucional da marca.
- `public/brands/verde-burgo`: logos, icones, fundos e elementos selecionados do brand pack da Verde Burgo.
- `public/brands/verde-burgo/media`: video de desenvolvimento usado nos cards futuros da Verde Burgo.
- `assets-source/14_VERDEBURGO/PROVENCE_RAIZ`: imagens originais/editaveis extraidas do PPTX.
- `public/images/14_VERDEBURGO/PROVENCE_RAIZ/02_WEB`: versoes otimizadas usadas pela rota publica `/verdeburgo`.
- `assets-source/14_VERDEBURGO/PROVENCE_RAIZ/10_REFINAMENTO_USUARIO`: imagens enviadas para refinamento editorial, reenquadramento e futura edicao.
- `public/images/14_VERDEBURGO/PROVENCE_RAIZ/03_REFINAMENTO`: versoes web otimizadas das imagens refinadas usadas na rota publica `/verdeburgo`.

## Validacao Local

Antes de publicar alteracoes:

```powershell
npm run lint
npm run build
```

## Deploy

O deploy de producao e feito pela integracao GitHub + Vercel a partir da branch `main`.

Projetos Vercel vinculados:

- `portifolio-samuel`: dominio raiz `paesconsultoria.com`.
- `portifolio-samuel-oo4p`: dominio `www.paesconsultoria.com`.

## Pos-Publicacao

Depois de alteracoes de SEO, validar:

```powershell
Invoke-WebRequest -Uri "https://paesconsultoria.com/" -UseBasicParsing
Invoke-WebRequest -Uri "https://paesconsultoria.com/robots.txt" -UseBasicParsing
Invoke-WebRequest -Uri "https://paesconsultoria.com/sitemap.xml" -UseBasicParsing
```

Em seguida, solicitar indexacao no Google Search Console e Bing Webmaster Tools.

## IndexNow

O site possui uma chave publica IndexNow em:

- `public/9ce105cc8fc09b27ee455038a876fc0a.txt`

Use essa chave para notificar Bing e mecanismos participantes quando rotas importantes forem atualizadas.
