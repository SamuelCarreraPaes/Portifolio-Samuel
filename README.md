# Samuel Carrera Paes - Portfolio

Ecossistema digital oficial de Samuel Carrera Paes / Paes Consultoria, publicado em:

- https://paesconsultoria.com
- https://www.paesconsultoria.com

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Vercel

## SEO e Indexacao

O site foi preparado para associar o nome `Samuel Carrera Paes` ao dominio publico `paesconsultoria.com`.

Arquivos e pontos principais:

- `index.html`: titulo, description, canonical, Open Graph, Twitter Card e JSON-LD `Person`/`WebSite`.
- `src/App.jsx`: SEO dinamico com dominio canonico `https://paesconsultoria.com` e texto visivel com o nome completo.
- `public/robots.txt`: permite indexacao e declara o sitemap.
- `public/sitemap.xml`: declara a homepage canonica.

## Conteudo Editorial

A pagina `Inicio` apresenta Samuel Paes como diretor criativo, consultor criativo e criador de empresas dentro da tese da Geracao dos Realizadores.

A pagina `Visao` explica o ecossistema criativo como metodo, conectando direcao criativa, empresas, marca, eventos, experiencia, comunicacao, operacao, execucao, inteligencia artificial e pensamento estrategico.

A pagina `Ecossistema` substitui a antiga area de cases como porta de entrada para empresas, projetos e biblioteca. A rota publica principal e `/ecossistema`; a rota antiga `/cases` segue funcionando como compatibilidade.

A pagina `BANAL` apresenta a empresa responsavel pela camada de branding, marketing, posicionamento, narrativa, conteudo, campanhas, percepcao de valor e estrategia criativa. Os antigos cases de marketing, varejo, comunicacao e marca passam a aparecer como projetos da BANAL.

A pagina `VERDE BURGO` apresenta a empresa de eventos com solucao completa de buffet, decoracao, bar, cerimonial, planejamento, producao e execucao. Samuel Paes aparece dentro da Verde Burgo como responsavel por direcao criativa, identidade de evento e construcao de linguagem. `Provence Raiz` e apresentado como case/projeto dentro da Verde Burgo, nao como a empresa inteira.

Assets do projeto:

- `public/brands/banal`: imagens selecionadas do pacote BANAL para simbolo, cena fundadora e pranchas de identidade.
- `public/brands/verde-burgo`: logos, icones, fundos e elementos selecionados do brand pack da Verde Burgo.
- `assets-source/14_VERDEBURGO/PROVENCE_RAIZ`: imagens originais/editaveis extraidas do PPTX, separadas tambem por slide.
- `public/images/14_VERDEBURGO/PROVENCE_RAIZ/02_WEB`: versoes otimizadas usadas pela rota publica `/verdeburgo`.
- `assets-source/14_VERDEBURGO/PROVENCE_RAIZ/10_REFINAMENTO_USUARIO`: imagens enviadas para refinamento editorial, reenquadramento e futura edicao.
- `public/images/14_VERDEBURGO/PROVENCE_RAIZ/03_REFINAMENTO`: versoes web otimizadas das imagens refinadas usadas na rota publica `/verdeburgo`.

A pagina `Biblioteca` substitui a antiga area `Sistema` e funciona como espaco para artigos, ensaios, manifestos e pesquisas que sustentam intelectualmente o ecossistema:

- `/biblioteca/leitura-de-marca` - Leitura de Marca
- `/biblioteca/curadoria-de-produto` - Curadoria de Produto
- `/biblioteca/narrativa-espacial` - Narrativa Espacial
- `/biblioteca/construcao-de-percepcao` - Construcao de Percepcao
- `/biblioteca/operacao-criativa` - Operacao Criativa
- `/biblioteca/experiencia-fisica` - Experiencia Fisica

As rotas antigas `/sistema` e `/sistema/:slug` seguem funcionando como compatibilidade, mas os canonicals apontam para `/biblioteca`.

O conteudo foi extraido do material `Sistema_Samuel_Paes_Artigos_Reescritos_Voz_Autoral.docx` e consolidado em `src/sistemaArticles.js`. Cada artigo possui URL limpa, SEO dinamico, tempo estimado de leitura, sumario de secoes, navegacao anterior/proximo e link de retorno ao indice da Biblioteca.

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

O site tambem possui uma chave publica IndexNow em:

- `public/9ce105cc8fc09b27ee455038a876fc0a.txt`

Use essa chave para notificar Bing e mecanismos participantes quando a homepage for atualizada.
