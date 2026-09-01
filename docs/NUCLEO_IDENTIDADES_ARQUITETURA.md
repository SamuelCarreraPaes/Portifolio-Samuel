# Núcleo de identidades — decisão editorial

## Escopo

O portfólio passa a apresentar BANAL, Provence Raiz e Casarão Medeiros em um núcleo editorial comum: três projetos em que identidade é tratada como sistema de presença.

## Autoridade das fontes

1. A instrução direta do usuário é a autoridade principal para o enquadramento de BANAL: trata-se de um case de identidade, não de uma marca de bebida e não de uma página de empresa nesta camada do site.
2. O arquivo recuperado `BANAL.pdf` foi rejeitado pelo usuário como documento conceitualmente incorreto. Ele e as imagens associadas foram preservados para rastreabilidade, mas excluídos do conteúdo publicado.
3. O case BANAL usa apenas pranchas já existentes no repositório que identificam explicitamente BANAL como agência de marketing, estratégia e desejo.
4. Provence Raiz mantém seu case consolidado como sistema visual de evento e experiência.
5. Casarão Medeiros usa páginas derivadas do guideline recuperado de 24 páginas. Mockups e orientações são descritos como proposta, não como implantação comprovada.

## Arquitetura de informação

- Coleção visível em `/cases`: `NÚCLEO / IDENTIDADES`.
- Case BANAL: `/case/banal-identidade-de-agencia-criativa`.
- Case Provence Raiz: `/case/provence-raiz-sistema-visual`.
- Case Casarão Medeiros: `/case/casarao-medeiros-identidade-visual`.
- Rotas legadas `/banal` e `/empresas/banal` apontam para o case de identidade BANAL.
- A rota legada `/projetos/provence-raiz` aponta para o slug canônico do case Provence Raiz.

## Restrições editoriais

- Não apresentar BANAL como bebida, embalagem comercial ou categoria de produto.
- Não usar o `BANAL.pdf` rejeitado como evidência de conceito.
- Não transformar render, moodboard, mockup ou guideline em resultado físico comprovado.
- Não inventar métricas, clientes, datas, produção ou implantação.
- Preservar os materiais recuperados e registrar derivados e hashes.
