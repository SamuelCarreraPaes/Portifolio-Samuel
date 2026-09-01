# Matriz de QA responsivo — Portfólio

Data da execução: 31/08/2026  
Superfície validada: build local em `http://127.0.0.1:5198`  
Escopo: `/cases` e os 18 cases publicados nas cinco disciplinas.

## Índice do portfólio

| Viewport | Overflow horizontal | Título da disciplina | Imagens quebradas | Resultado |
| --- | --- | --- | --- | --- |
| 320 × 568 | não | sem overflow | 0 | aprovado |
| 390 × 844 | não | sem overflow | 0 | aprovado |
| 820 × 1180 | não | sem overflow | 0 | aprovado |
| 1440 × 1000 | não | sem overflow | 0 | aprovado |
| 1920 × 1080 | não | sem overflow | 0 | aprovado |

O título “Visual Merchandising”, que anteriormente produzia 27 px de rolagem horizontal em 320 px, foi reescalonado e passou sem overflow.

## Interação e acessibilidade

- carrossel focável como região;
- setas esquerda/direita do teclado alteram o case ativo;
- botões de seleção exibem número e nome do case;
- botões laterais mantêm alvo mínimo de 48 × 48 px;
- anúncio textual do case ativo usa `aria-live`;
- transições respeitam `prefers-reduced-motion`;
- componente de imagem não duplica `role="img"` e `alt` no estado normal;
- hero dos cases usa carregamento prioritário;
- console sem warnings ou erros no fechamento da auditoria.

## Direção de arte das capas

| Case | Mobile | Desktop | Regra |
| --- | --- | --- | --- |
| R Lovers | original vertical 750 × 1000 | capa editorial derivada 1200 × 627 | `cover` no mobile; `scale-down` no desktop |
| HEXA | original vertical 849 × 1000 | capa editorial derivada 1200 × 627 | `cover` no mobile; `scale-down` no desktop |
| BANAL | assinatura vertical 1254 × 1254 | prancha do sistema 1536 × 1024 | `scale-down`, sem crop destrutivo |
| Casarão Medeiros | apresentação fornecida em relevo seco | papelaria institucional fornecida | `cover` com proporção 3:2 no case; crop editorial específico nas capas |

As capas editoriais derivadas são identificadas na interface e não são apresentadas como fotografias originais.

## Páginas de case

As 18 rotas visíveis foram abertas em 320 × 568. Resultado agregado:

- 18 rotas carregadas;
- 0 rotas com overflow horizontal;
- 0 imagens de abertura quebradas;
- 0 rotas presas no estado de carregamento;
- H1 presente em todas as páginas.

As galerias usam canvases padronizados — 4:5 no mobile e 3:2 a partir do mobile amplo — com `scale-down` para raster e `contain` para SVG. A imagem inteira é preservada sem upscale forçado.

## ROOM 329

- oito imagens disponíveis utilizadas: uma abertura e sete capítulos;
- sete legendas e alt texts específicos;
- sequência curatorial: apresentação, vestígios, arquitetura, personagens, continuidade e fechamento;
- proveniência de output construído com IA permanece explícita.

## Limites da validação

- contraste foi revisado visualmente, sem varredura automatizada de todas as combinações;
- não há dependência Playwright no repositório; a inspeção visual foi executada no navegador local e a cobertura estrutural permanente fica em `npm run test:portfolio-ui`;
- métricas Lighthouse de produção não foram executadas, porque não houve deploy nesta rodada.
