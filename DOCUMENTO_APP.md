# Documento do App — Paes Consultoria

## Atualizacao — Fase 2 Visual do Ecossistema

A Fase 2 torna a arquitetura publica mais visivel no proprio site. A homepage passa a apresentar a tese de ecossistema criativo autoral, a Paes Consultoria passa a ser descrita como nucleo que transforma visao em empresas, a BANAL ganha leitura por territorios de atuacao, a Verde Burgo ganha bloco comercial de entrega completa de eventos e a Biblioteca passa a aparecer explicitamente como hub intelectual.

Documento de entrega relacionado:

- `docs/phase-2-visual-ecosystem.md`

## 1. Objetivo

O site `paesconsultoria.com` foi reposicionado para apresentar a Paes Consultoria como nucleo estrategico e criativo central.

A estrutura deixa de comunicar um portfolio tradicional ou um conjunto abstrato de empresas. A homepage agora funciona como uma abertura institucional limpa, em que a Paes Consultoria aparece como visao central e BANAL/VERDE BURGO aparecem como marcas originadas por essa visao.

## 2. Tese Central

```text
PAES CONSULTORIA = VISAO CENTRAL
BANAL = ESPECIALIZACAO EM MARCA, VAREJO E POSICIONAMENTO
VERDE BURGO = ESPECIALIZACAO EM EVENTOS E EXPERIENCIAS
```

O elo entre as empresas nao e categoria de mercado. O elo e:

- direcao criativa;
- identidade;
- metodologia;
- autoria;
- visao estrategica;
- execucao;
- criterio autoral.

## 3. Estrutura Publica

Navegacao atual:

```text
SP / Paes Consultoria
Minha Visao
Biblioteca
Contato
[BANAL logo]
[VERDE BURGO logo]
```

As empresas aparecem como entidades de marca, nao apenas como itens de menu.

## 4. Rotas

| Rota | Funcao |
| --- | --- |
| `/` | Apresentacao institucional da Paes Consultoria. |
| `/visao` | Posicionamento profissional de Samuel Carrera Paes. |
| `/biblioteca` | Hub de artigos, ensaios, pesquisas e autoridade intelectual. |
| `/banal` | Pagina institucional da BANAL. |
| `/verdeburgo` | Pagina institucional da Verde Burgo. |
| `/contato` | Contato profissional. |
| `/case/:id` | Projetos de marca, marketing, comunicacao e varejo vinculados a BANAL. |

Rotas antigas preservadas por compatibilidade:

| Rota antiga | Comportamento |
| --- | --- |
| `/cases` | Renderiza BANAL. |
| `/sistema` | Renderiza Biblioteca. |
| `/sistema/:slug` | Renderiza artigo equivalente em Biblioteca. |
| `/ecossistema` | Renderiza leitura institucional da Paes Consultoria com canonical para a raiz. |

## 5. Paes Consultoria

A Paes Consultoria desenvolve negocios, marcas, experiencias e projetos por meio de uma visao estrategica e criativa unificada.

Hero atual:

```text
PAES CONSULTORIA
[BANAL] [VERDE BURGO]
Direcao Criativa e Estrategia
Desenvolvemos negocios, marcas, experiencias e projetos por meio de uma visao estrategica e criativa unificada.
```

A explicacao conceitual saiu da homepage e foi concentrada em `Minha Visao`.

## 6. Samuel Carrera Paes

Samuel aparece como:

```text
Diretor Criativo e Consultor Criativo
```

Esse titulo e explicado por:

- pensamento multidisciplinar;
- direcao criativa;
- pensamento sistemico;
- visao estrategica;
- mentalidade de execucao;
- curiosidade como ferramenta profissional.

Tecnologia e inteligencia artificial podem aparecer como ferramentas de repertorio e prototipagem, mas nao como identidade principal.

## 7. BANAL

BANAL e uma empresa.

Nao e uma categoria, uma secao ou um servico isolado.

Posicionamento:

> BANAL ajuda negocios a se tornarem mais claros, desejaveis e valiosos por meio de identidade, comunicacao, posicionamento e direcao estrategica.

Camadas:

- branding;
- marketing;
- comunicacao;
- varejo;
- posicionamento;
- narrativa;
- conteudo;
- campanhas;
- collabs;
- estrategia criativa.

Estrutura da pagina:

- hero;
- arquivo de repertorio;
- nucleos estruturados de case;
- servicos;
- explicacao institucional;
- processo;
- CTA.

Leitura de repertorio:

```text
Os 11 cards publicados sao nucleos estruturados.
Eles nao representam a totalidade do repertorio da BANAL.
Alguns nucleos sao cases independentes; outros reúnem desdobramentos internos.
```

Desdobramentos confirmados:

- Porti = Natal e Verao.
- Campanhas & Collabs = Basquiat, Netflix/Tudum e Mangueira.
- Val Fortunatto Linho permanece como case independente.
- Paraiso Tropical pertence ao territorio BANAL.
- Existem outros projetos alem destes nucleos e eles devem entrar em catalogacao editorial antes de virar pagina publica.

## 8. VERDE BURGO

Verde Burgo e uma empresa de eventos.

Ela resolve a vida de quem quer fazer uma festa por meio de:

- buffet;
- decoracao;
- bar;
- cerimonial;
- planejamento;
- producao;
- execucao;
- fornecedores;
- montagem;
- bastidores.

O diferencial e a direcao criativa aplicada aos eventos. Ela torna comida, bar, cerimonia, decoracao, ambientacao, papelaria e atendimento parte de uma mesma linguagem.

Estrutura da pagina:

- hero;
- projetos;
- servicos;
- explicacao institucional;
- metodo;
- Provence Raiz como projeto em detalhe;
- CTA.

Importante:

```text
Verde Burgo = empresa de eventos
Provence Raiz = primeiro projeto publicado/referencia dentro da Verde Burgo
```

## 9. Biblioteca

A Biblioteca funciona como hub de autoridade intelectual.

Temas:

- branding;
- varejo;
- hospitalidade;
- eventos;
- narrativa;
- posicionamento;
- percepcao;
- direcao criativa;
- construcao de negocios.

## 10. Implementacao Tecnica

Stack:

- React;
- Vite;
- Tailwind CSS;
- Framer Motion;
- Lucide React;
- GitHub;
- Vercel.

Arquivos centrais:

| Arquivo | Funcao |
| --- | --- |
| `src/App.jsx` | Orquestracao das paginas, renderizacao das rotas e navegacao global. |
| `src/data/cases.js` | Dados dos nucleos de case, desdobramentos e repertorio vinculado a BANAL. |
| `src/data/ecosystem.js` | Dados de BANAL, Verde Burgo, Provence Raiz, ativos e metodos. |
| `src/components/shared.jsx` | Componentes reutilizaveis de imagem, transicao e grade editorial. |
| `src/router.js` | Roteador leve baseado em pathname/hash, preservando aliases publicos. |
| `src/seo.jsx` | Componente de SEO dinamico por rota. |
| `src/seoData.js` | Constantes, entidades JSON-LD e utilitarios de URL para autoridade/indexacao. |
| `src/motionConfig.js` | Curva de animacao premium e helper de video em loop sem som. |
| `src/index.css` | Tokens globais minimos, foco visivel, base de layout e reduced motion. |
| `index.html` | SEO base, metatags e dados estruturados. |
| `public/sitemap.xml` | Sitemap canonico. |
| `README.md` | Documentacao tecnica. |
| `public/brands/banal` | Assets da BANAL. |
| `public/brands/banal/media` | Logo horizontal transparente e video da mosca em loop. |
| `public/brands/verde-burgo` | Assets da Verde Burgo. |
| `public/brands/verde-burgo/media` | Video de desenvolvimento usado nos cards futuros da Verde Burgo. |

## 11. SEO

O SEO passa a ser centrado em:

- Paes Consultoria;
- Samuel Carrera Paes;
- direcao criativa;
- consultoria criativa;
- branding, marketing, campanhas, collabs, varejo e repertorio expandido para BANAL;
- eventos, buffet, decoracao, bar e cerimonial para Verde Burgo.

## 12. Validacao Esperada

Antes de publicar:

- `npm run lint`;
- `npm run build`;
- validacao desktop;
- validacao mobile;
- checagem de console;
- checagem de imagens quebradas;
- checagem de canonical;
- checagem de sitemap.

## 13. Contato

A pagina de contato direciona o usuario para a frente correta:

- `Contact BANAL`: marca, marketing, comunicacao, varejo, posicionamento e percepcao de valor.
- `Contact VERDE BURGO`: eventos, festas, buffet, decoracao, bar, cerimonial e producao.

## 14. Proximos Passos

1. Refinar assets editoriais da Verde Burgo.
2. Expandir cases BANAL por tipo de desafio.
3. Criar novos artigos da Biblioteca com foco em autoridade consultiva.
4. Preparar subdominios futuros:
   - `banal.paesconsultoria.com`
   - `verdeburgo.paesconsultoria.com`

## 15. Plano de Entrega Atual

A entrega atual deve ser feita em PRs pequenos a partir da branch `codex/entity-seo-ecosystem`, com preview Vercel antes de qualquer publicacao em producao.

Sequencia recomendada:

1. Baseline e controle de risco: registrar rotas, aliases, criterios de aceite e estado tecnico.
2. Refator estrutural sem mudanca visual: reduzir o monolito de `src/App.jsx` extraindo dados, SEO, roteador e componentes compartilhados.
3. Design system e consistencia: remover CSS emergencial, reduzir `!important`, normalizar foco, motion e dimensoes de marca.
4. Clareza narrativa: garantir Paes Consultoria como nucleo, BANAL como empresa de marca/marketing, Verde Burgo como empresa de eventos completos e Provence Raiz como projeto.
5. SEO e autoridade: revisar canonical, JSON-LD, sitemap, image sitemap, `robots.txt` e `llms.txt`.
6. QA final: validar rotas, build, lint, mobile, desktop, console e imagens.

## 16. Rotas e Aliases que Nao Podem Quebrar

Rotas principais:

- `/`
- `/sobre/samuel-carrera-paes`
- `/visao`
- `/empresas/banal`
- `/empresas/verde-burgo`
- `/projetos/provence-raiz`
- `/biblioteca`
- `/biblioteca/geracao-dos-realizadores`
- `/case/case-01`
- `/atlas/samuel-carrera-paes`
- `/contato`

Aliases preservados:

- `/cases`
- `/sistema`
- `/sistema/:slug`
- `/ecossistema`
- `/banal`
- `/verdeburgo`

## 17. Criterios de Aceite

Antes de publicar:

- `npm run lint` precisa passar.
- `npm run build` precisa passar.
- A navegacao por teclado precisa funcionar em menu, cards, CTAs e rotas principais.
- O foco visivel precisa permanecer claro.
- A navbar deve manter o simbolo SP / Paes Consultoria.
- BANAL e Verde Burgo devem estar visual e semanticamente separadas.
- Verde Burgo deve comunicar empresa de eventos completos: buffet, decoracao, bar, cerimonial, planejamento, producao e execucao.
- Provence Raiz deve aparecer como projeto dentro da Verde Burgo.
- Biblioteca deve funcionar como hub intelectual de artigos, ensaios, pesquisas e manifestos.
- Canonical, JSON-LD, sitemap e image sitemap devem continuar coerentes com `https://paesconsultoria.com/`.
- Nenhum segredo, token ou `.env` deve ser lido ou exposto.
