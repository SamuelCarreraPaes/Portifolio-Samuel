# IA & Alma — arquitetura editorial e técnica

Status: implementação local em evolução. Não implica publicação, commit ou alteração dos originais recuperados.

## Premissa

IA & Alma não é uma categoria de imagens geradas. É a frente autoral da Paes Consultoria em que a tecnologia generativa opera sob direção humana, repertório, intenção e critério editorial.

Fórmula de comunicação: **Produto real. Direção humana. Tecnologia generativa. Critério editorial.**

## Arquitetura de navegação

```text
Início (Samuel Paes)
  ├─ Portfólio
  │   └─ ROOM 329 — case de prova editorial
  └─ IA & Alma (/ia-com-alma)
      ├─ Manifesto e proposta de valor
      ├─ Sistema de construção visual
      ├─ Worldbuilding e continuidade
      ├─ Prova: ROOM 329
      ├─ Narrativas: PAIS e Irene 1945
      └─ Formas de atuação e contato
```

- `/ia-com-alma` é a rota canônica do novo eixo.
- `/comercial` continua atendida como rota legada e aponta semanticamente para a rota canônica.
- `ROOM 329` é uma peça de portfólio, não uma página explicativa sobre IA; a leitura deve ser de campanha de moda e narrativa visual.

## Modelo de conteúdo

O percurso da página segue: **manifesto → proposta de valor → prova → formas de atuação → contato**.

As formas de atuação são: campanha, sistema visual, continuidade e direção/consultoria. Não há métricas, resultados comerciais ou alegações de clientes sem fonte publicada.

## Ativos e proveniência

Os oito arquivos do case ROOM 329 estão em `public/images/15_IA_COM_ALMA/02_ROOM_329/`. As sete imagens de PAIS estão em `03_PAIS/`, e as dez imagens selecionadas de Irene 1945, em `04_IRENE_1945/`. Foram copiadas sem recorte, geração ou upscale a partir dos arquivos recuperados da conversa. Cada diretório possui um `SOURCE.md` com proveniência e limitação: são cópias recuperadas da conversa, não uma alegação de masters de câmera.

BANAL e Ateliê Bambini permanecem preservados no pacote de recuperação como fontes estratégicas; ainda não foram incorporados como novas páginas nesta rodada.

## Critérios de aceite desta etapa

- rota canônica, rota legada e SEO coerentes;
- cases ROOM 329, PAIS e Irene 1945 navegáveis, indexáveis e presentes nos sitemaps;
- imagem real recuperada, sem substituição por geração;
- responsividade e acessibilidade preservadas pelo sistema existente;
- lint, smoke e build executados antes de considerar a etapa pronta.
