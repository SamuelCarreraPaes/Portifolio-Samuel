# Final Production Hardening

Data: 2026-06-12  
Branch: `codex/final-production-hardening`  
Escopo: estabilizacao tecnica do site Samuel Carrera Paes / Paes Consultoria sem redesign e sem troca de stack.

## Inventario antes de alterar

- Projeto de producao: React, Vite, Tailwind CSS, Framer Motion, Lucide React e Vercel.
- Arquivos de producao principais: `src/App.jsx`, `src/components/shared.jsx`, `src/router.js`, `src/seo.jsx`, `src/seoData.js`, `src/data/cases.js`, `src/data/ecosystem.js`, `scripts/generate-seo-assets.mjs`, `index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/sitemap-images.xml`, `public/llms.txt`.
- SEO publico preservado: canonical principal, sitemap, image sitemap, robots, `llms.txt`, JSON-LD e aliases.
- Backups/logs identificados: `index.backup-*.html`, `src/App.backup-*.jsx`, `src/index.backup-*.css`, `src/*.bak-*`, `preview-*.log`, `preview-*.err.log`, `src/Ctrl + S.txt`.
- Assets fonte identificados: `assets-source/`.
- Assets publicos sensiveis a performance: `public/images/`, `public/brands/`, `public/social/`.
- Configuracoes relevantes: `.gitignore`, `.vercelignore`, `vite.config.js`, `tailwind.config.js`, `vercel.json`.

## Decisoes aplicadas

- O projeto nao foi reconstruido.
- A stack nao foi alterada.
- A identidade visual/editorial foi preservada.
- Backups, logs e assets fonte nao foram apagados; foram apenas isolados de Git/deploy por ignore.
- O arquivo vazio rastreado `src/Ctrl + S.txt` foi removido por nao ter funcao de producao.
- O favicon foi apontado para asset existente (`/favicon.svg`) para remover 404.
- Foi criada uma 404 utilitaria para rotas sem correspondencia.
- O rewrite generico da Vercel foi substituido por rewrites explicitos das rotas publicas conhecidas, preservando aliases e permitindo 404 HTTP real para caminhos desconhecidos.
- O menu mobile recebeu fechamento por Escape, foco inicial, ciclo de Tab e retorno de foco.
- A navegacao ativa recebeu `aria-current`.
- O fallback de clipboard foi robustecido no contato.
- `ImageWithFallback` passou a aceitar `srcSet`, `sizes`, dimensoes e sources sem quebrar chamadas existentes.
- `PageTransition` passou a respeitar `prefers-reduced-motion` via Framer Motion.

## Validacao esperada

- `npm run seo`
- `npm run lint`
- `npm run build`
- Abrir `/rota-inexistente-teste`
- Abrir `/favicon.svg`
- Testar menu mobile com Tab, Shift+Tab e Escape
- Testar copiar WhatsApp/e-mail no contato

## Pendencias controladas

- Otimizacao profunda de imagens publicas ainda deve ser feita em fase propria, com conversao WebP/AVIF e revisao visual.
- Route registry unico segue como melhoria P1/P2 para reduzir divergencia entre router, SEO e sitemap.
- Refatoracao do `src/App.jsx` segue recomendada, mas deve acontecer em PRs pequenos e sem mudanca visual.
