# Documento do App — Paes Consultoria

## 1. Objetivo

O site `paesconsultoria.com` foi reposicionado para apresentar a Paes Consultoria como nucleo estrategico e criativo central.

A estrutura deixa de comunicar um conjunto abstrato de empresas e passa a comunicar uma consultoria madura, clara e institucional, capaz de originar negocios, marcas, experiencias, projetos e solucoes.

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
- Samuel Carrera Paes.

## 3. Estrutura Publica

Navegacao atual:

```text
Inicio
Minha Visao
Biblioteca
BANAL
VERDE BURGO
Contato
```

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

A homepage responde a pergunta:

> O que conecta negocios que operam em mercados diferentes?

A resposta do site e:

- direcao;
- identidade;
- experiencia;
- execucao;
- coerencia;
- percepcao de valor.

A Paes Consultoria desenvolve negocios, marcas, experiencias e projetos por meio de uma visao estrategica e criativa unificada.

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
- estrategia criativa.

Estrutura da pagina:

- hero;
- posicionamento;
- servicos;
- processo;
- cases;
- CTA.

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
- posicionamento;
- servicos;
- metodo;
- formatos de evento;
- projetos;
- CTA.

Importante:

```text
Verde Burgo = empresa de eventos
Provence Raiz = projeto/referencia dentro da Verde Burgo
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
| `src/App.jsx` | Rotas, componentes, SEO dinamico e conteudo principal. |
| `index.html` | SEO base, metatags e dados estruturados. |
| `public/sitemap.xml` | Sitemap canonico. |
| `README.md` | Documentacao tecnica. |
| `public/brands/banal` | Assets da BANAL. |
| `public/brands/verde-burgo` | Assets da Verde Burgo. |

## 11. SEO

O SEO passa a ser centrado em:

- Paes Consultoria;
- Samuel Carrera Paes;
- direcao criativa;
- consultoria criativa;
- branding e marketing para BANAL;
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

## 13. Proximos Passos

1. Refinar assets editoriais da Verde Burgo.
2. Expandir cases BANAL por tipo de desafio.
3. Criar novos artigos da Biblioteca com foco em autoridade consultiva.
4. Preparar subdominios futuros:
   - `banal.paesconsultoria.com`
   - `verdeburgo.paesconsultoria.com`
