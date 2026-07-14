# Samuel Carrera Paes / Paes Consultoria

Site oficial e portfólio autoral de Samuel Carrera Paes.

## Estado Atual

Esta versão recupera a leitura anterior do site: Samuel Paes / Paes Consultoria no centro, com navegação enxuta por:

- Início
- Visão
- Cases
- Sistema
- Contato

A arquitetura pública de empresas, com BANAL e Verde Burgo como páginas protagonistas, foi retirada da experiência principal. As URLs antigas continuam aceitas como aliases seguros para evitar links quebrados:

| URL antiga | Destino renderizado |
| --- | --- |
| `/banal` | `/cases` |
| `/empresas/banal` | `/cases` |
| `/verdeburgo` | `/cases` |
| `/empresas/verde-burgo` | `/cases` |
| `/projetos/provence-raiz` | `/case/provence-raiz-sistema-visual` |
| `/biblioteca` | `/sistema` |
| `/biblioteca/:slug` | `/sistema/:slug` |
| `/ecossistema` | `/visao` |
| `/paes-consultoria` | `/visao` |
| `/sobre/samuel-carrera-paes` | `/visao` |

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- lucide-react

## Scripts

```powershell
npm run smoke
npm run lint
npm run build
npm run dev
```

## Catálogo De Cases

Os 12 cases públicos são definidos uma única vez em `src/data/cases.js`. O módulo concentra título, slug, categoria, descrição, tags, narrativa, entregáveis, impacto qualitativo, mídia e metadados de SEO.

- URLs canônicas: `/case/:slug`
- Compatibilidade mantida: `/case/case-01` até `/case/case-12`
- Destaques da Home: PORTI, Campanhas & Collabs e Provence Raiz
- Métricas, anos e depoimentos permanecem omitidos enquanto não houver comprovação documental
- `npm run smoke` valida quantidade, slugs, ordem dos destaques, rotas e sitemap

## SEO

O SEO público volta a priorizar:

- Samuel Carrera Paes
- Samuel Paes
- Paes Consultoria
- Consultoria Paes
- direção criativa
- consultoria criativa
- portfólio criativo
- direção de arte
- cenografia
- eventos
- experiência física
- pesquisa visual
- branding
- marketing
- campanhas
- varejo
- visual merchandising

Arquivos principais:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/sitemap-images.xml`
- `src/seoData.js`
- `src/seoRegistry.js`
- `src/data/cases.js`
- `scripts/generate-seo-assets.mjs`

## Regras De Segurança

- Não ler nem expor `.env`, tokens ou secrets.
- Não usar `VITE_` para segredo.
- Não apagar backups ou assets não rastreados sem decisão explícita.
- Publicar em preview antes de produção.
- Rodar `npm run smoke`, `npm run lint` e `npm run build` antes de publicar.
