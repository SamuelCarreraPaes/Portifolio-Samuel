# G1 — Arquitetura do portfólio

## Princípio

O portfólio deixa de ser uma grade filtrável e passa a ser uma publicação editorial organizada por disciplinas. Empresas, famílias de projeto e cases continuam semanticamente diferentes.

## Categorias e cases visíveis

### Visual Merchandising

1. Porti — Visual Merchandising
2. Denim & Paraíso Tropical
3. HEXA
4. R Lovers
5. Campanhas & Collabs

### Identidade Visual

1. Ateliê Bambini
2. Casarão Medeiros
3. BANAL
4. Provence Raiz — Identidade Visual

### Cenografia

1. Porti — Cenografia de Natal
2. Porti — Cenografia de Verão
3. Provence Raiz — Pilastras Cenográficas
4. Provence Raiz — Luminária Carretel
5. Provence Raiz — Gaiola Cenográfica

### Decoração

1. Provence Raiz — Direção de Atmosfera

### IA & Alma

1. ROOM 329
2. PAIS
3. Irene 1945

## Famílias

- `Porti`: Visual Merchandising, Natal e Verão.
- `Provence Raiz`: Identidade, Pilastras, Luminária Carretel, Gaiola e Direção de Atmosfera.
- `IA & Alma`: ROOM 329, PAIS e Irene 1945.

As famílias permitem navegação cruzada sem duplicar a mesma página em categorias diferentes.

## Arquivo preservado e não listado

- Val Fortunatto — Brand Transition.
- Val Fortunatto Linho — Produto Próprio.
- Vintage Denim — rota individual histórica.
- Paraíso Tropical — rota individual histórica.
- Rouge & Gold — pendente de decisão curatorial.
- Outerwear — pendente de decisão curatorial.

Os itens não listados permanecem acessíveis por suas rotas históricas e preservados no repositório. Não participam do índice editorial novo.

## Compatibilidade

- A rota pública `/ia-com-alma` permanece estável; somente o nome visível muda para `IA & Alma`.
- `/case/porti-expansao-fisica-cenografia` permanece como slug legado do novo case Porti — Visual Merchandising.
- `/case/provence-raiz-sistema-visual` permanece canônica para a identidade Provence Raiz.
- Rotas de Val, Denim e Paraíso permanecem existentes, embora não listadas.
- Aliases de BANAL e Provence permanecem preservados.

## Componentes

- `Cases`: índice por disciplina, sem filtros planos e sem numeração de card.
- `CaseDetail`: padrão editorial compartilhado, com mídia, proveniência e navegação por disciplina.
- `ProvenceRaizCaseDetail`: preservado incrementalmente para a identidade Provence, reduzido aos capítulos de identidade, papelaria, sinalização e hospitalidade.
- `IAComAlma`: rota de produto/metodologia, não componente da barra contextual de cases.

## Regras de preservação

- Originais nunca são sobrescritos.
- Assets não confirmados não recebem autoria ou implantação inventadas.
- Simulações e renders são descritos como tais.
- Conteúdo novo textual usa apenas evidência do repositório.
- Reconstruções materiais aguardam G4.
- Mudanças de SEO atualizam registry, sitemap, image sitemap e páginas estáticas.
