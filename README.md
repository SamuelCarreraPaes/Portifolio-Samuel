# Samuel Carrera Paes - Portfolio

Portfolio oficial de Samuel Carrera Paes / Paes Consultoria, publicado em:

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
