# G3 — Protótipos por disciplina

Data: 2026-08-29

Os protótipos reutilizam `CaseDetail`, `ImageWithFallback`, `DynamicSEO`, `CaseShareActions` e a paginação existente. Não foi criado um segundo sistema de cases.

## Visual Merchandising — Porti

- **Rota:** `/case/porti-visual-merchandising`
- **Motivo:** demonstra organização de produto e percurso com seis imagens coerentes de uma mesma série.
- **Padrão validado:** hero, tese, ficha técnica, nota de direção, quatro blocos editoriais, galeria, proveniência, relações da disciplina e paginação.
- **Compatibilidade:** o slug anterior `/case/porti-expansao-fisica-cenografia` continua resolvendo para o mesmo conteúdo.

## Identidade Visual — BANAL

- **Rota:** `/case/banal-identidade-de-agencia-criativa`
- **Motivo:** é o case de identidade com maior diversidade imediata de mídia pública — nove pranchas, duas marcas e um vídeo.
- **Padrão validado:** identidade narrada como sistema, galeria ampliada, mídia em movimento, texto factual, proveniência e ausência total do documento rejeitado.

## Cenografia — Provence Raiz / Pilastras

- **Rota:** `/case/provence-raiz-pilastras-cenograficas`
- **Motivo:** a série contém conceito, conjunto, vista explodida, corte e aplicação, permitindo demonstrar uma narrativa técnica sem afirmar fabricação ou implantação.
- **Padrão validado:** objeto cenográfico autônomo, cinco imagens, legendas de função e limite documental explícito.

## Decoração — Provence Raiz / Direção de Atmosfera

- **Rota:** `/case/provence-raiz-direcao-de-atmosfera`
- **Motivo:** reúne moodboards, materialidade e estudos de ambiente, separando direção de atmosfera da identidade visual e dos objetos cenográficos.
- **Padrão validado:** hero, narrativa, dez estudos, identificação de renders/moodboards e proveniência.

## IA & Alma — PAIS

- **Rota:** `/case/pais-presenca-e-heranca`
- **Motivo:** é uma narrativa curta, emocional e sequencial, adequada para validar leitura em desktop e celular sem confundir o case com a página de produto `/ia-com-alma`.
- **Padrão validado:** novo hero solicitado, sequência editorial, identificação de output construído com IA e origem da cópia recuperada.

## Gate editorial demonstrado — Casarão Medeiros

- **Rota:** `/case/casarao-medeiros-identidade-visual`
- **Estado final:** G4-001 aprovado; três pranchas SVG reconstruídas e identificadas no próprio case, com originais preservados.
- **Atualização posterior — 1º de setembro de 2026:** as três reconstruções foram retiradas por solicitação do usuário. O case publicado passa a usar somente as dez apresentações JPG fornecidas posteriormente.
- **Função no padrão:** demonstra como uma reconstrução autorizada pode melhorar a apresentação sem perder rastreabilidade nem se passar por fonte original.

## Critérios de aceite aplicados

- Um `h1` por página e hierarquia de headings coerente.
- Ausência de overflow horizontal nos tamanhos auditados.
- Alt text presente nas imagens renderizadas.
- Fallback de imagem preservado.
- Mídia e páginas acessíveis por URL direta.
- Relações por disciplina sem duplicar fontes.
- Proveniência exibida no case quando necessária.
- Reconstruções e simulações relevantes só entram após G4 e permanecem identificadas no código, na interface e no manifesto.
