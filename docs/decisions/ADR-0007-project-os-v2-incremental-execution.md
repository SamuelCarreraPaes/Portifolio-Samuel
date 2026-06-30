# ADR-0007 - Execucao incremental do Project OS V2

## Status

Aprovada em 2026-06-30.

## Contexto

O prompt solicitou a execucao das fases 0 a 13 do Project OS sem refatoracao Big Bang. O `App.jsx` segue monolitico e funcional, com alto risco de regressao caso fosse reescrito de uma vez.

## Decisao

Executar uma rodada incremental que:

- cria smoke test;
- extrai dados locais simples;
- formaliza rotas;
- componentiza CTAs principais;
- documenta tokens, SEO, analytics, CMS futuro e IA futura;
- preserva todas as rotas, aliases, SEO, CTAs, navegacao e identidade visual.

## Consequencias

- O projeto fica mais governavel e testavel.
- O `App.jsx` diminui de responsabilidade, mas ainda nao e dividido em paginas.
- A proxima rodada pode extrair shell/paginas com menor risco.

## Rollback

Reverter o commit desta rodada. Como as mudancas sao incrementais, o site volta ao `App.jsx` anterior sem perda de dados externos.
