import articleMarkdown from "./content/articles/a-roda-da-moda-linkedin.md?raw";

const cleanInlineMarkdown = (value) => value
  .replace(/\*\*(.*?)\*\*/g, "$1")
  .replace(/\*(.*?)\*/g, "$1")
  .trim();

function paragraphsFromLines(lines) {
  return lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((paragraph) => cleanInlineMarkdown(paragraph.replace(/\s*\n\s*/g, " ")))
    .filter(Boolean);
}

function parseArticleMarkdown(markdown) {
  const [body] = markdown.split(/\r?\n---\s*(?:\r?\n|$)/);
  const lines = body.replace(/\r/g, "").split("\n");
  const titleIndex = lines.findIndex((line) => line.startsWith("# "));
  const subtitleIndex = lines.findIndex((line, index) => index > titleIndex && line.startsWith("## "));
  const firstSectionIndex = lines.findIndex((line, index) => index > subtitleIndex && line.startsWith("## "));

  const lead = paragraphsFromLines(lines.slice(subtitleIndex + 1, firstSectionIndex));
  const sections = [];
  let currentSection = null;
  let currentSubsection = null;
  let paragraphBuffer = [];

  const flushParagraphs = () => {
    if (!paragraphBuffer.length || !currentSection) return;
    const target = currentSubsection || currentSection;
    target.paragraphs.push(...paragraphsFromLines(paragraphBuffer));
    paragraphBuffer = [];
  };

  for (const line of lines.slice(firstSectionIndex)) {
    if (line.startsWith("## ")) {
      flushParagraphs();
      currentSection = {
        heading: cleanInlineMarkdown(line.slice(3)),
        paragraphs: [],
        subsections: [],
      };
      sections.push(currentSection);
      currentSubsection = null;
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraphs();
      currentSubsection = {
        heading: cleanInlineMarkdown(line.slice(4)),
        paragraphs: [],
      };
      currentSection?.subsections.push(currentSubsection);
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraphs();

  return {
    editorialTitle: cleanInlineMarkdown(lines[titleIndex].slice(2)),
    subtitle: cleanInlineMarkdown(lines[subtitleIndex].slice(3)),
    lead,
    sections,
  };
}

const parsedArticle = parseArticleMarkdown(articleMarkdown);

export const sistemaFashionArticle = {
  num: "07",
  slug: "a-roda-da-moda",
  title: "IA na Moda",
  phrase: "Velocidade com Direção",
  ...parsedArticle,
  short: "A moda já construiu uma máquina de renovação do desejo; a inteligência artificial pode ampliar sua velocidade, experimentação e capacidade de adaptação. Quanto maior a abundância de geração, porém, maior o valor de critérios capazes de organizar essas possibilidades, preservar identidade, garantir fidelidade de produto e transformar velocidade em decisão de marca.",
  metaDescription: "Como a inteligência artificial pode ampliar a capacidade criativa da moda sem substituir identidade, estratégia, julgamento e direção humana.",
  quote: "A IA produz possibilidades. A criatividade as transforma em decisões de marca.",
  keywords: [
    "inteligência artificial na moda",
    "varejo da moda",
    "campanhas com inteligência artificial",
    "identidade de marca",
    "direção criativa",
  ],
  sources: [
    {
      label: "Fédération de la Haute Couture et de la Mode",
      detail: "Calendários oficiais e coordenação da Paris Fashion Week e Haute Couture Week.",
      href: "https://www.fhcm.paris/en/the-events-of-fhcm",
    },
    {
      label: "Deloitte — Digital Media Trends 2025",
      detail: "Pesquisa sobre consumo de mídia e relevância dos conteúdos sociais para a Geração Z.",
      href: "https://www.deloitte.com/us/en/insights/industry/technology/digital-media-trends-consumption-habits-survey/2025.html",
    },
    {
      label: "SHEIN Group — A Pioneering Model for On-Demand Fashion",
      detail: "Descrição institucional do modelo sob demanda, dos pequenos lotes e da cadeia digitalizada.",
      href: "https://www.sheingroup.com/wp-content/uploads/2023/10/On-Demand-Fashion.pdf",
    },
    {
      label: "Sea Limited — Fourth Quarter and Full Year 2025 Results",
      detail: "Resultados oficiais da Shopee referentes a 2025.",
      href: "https://cdn.sea.com/investor/4Q2025/JcKns4LaJC8bxcQdJwXz/2026.03.03%20Sea%20Fourth%20Quarter%20and%20Full%20Year%202025%20Results%20Deck.pdf",
    },
    {
      label: "McKinsey & Business of Fashion — The State of Fashion 2026",
      detail: "Leitura setorial sobre valor, pressão econômica e adoção de IA generativa na moda.",
      href: "https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion",
    },
    {
      label: "Reuters — Zalando uses AI to speed up marketing campaigns, cut costs",
      detail: "Cobertura sindicada sobre IA generativa nos fluxos de produção visual da Zalando.",
      href: "https://finance.yahoo.com/news/zalando-uses-ai-speed-marketing-070427441.html",
    },
    {
      label: "U.S. Copyright Office — Copyright and Artificial Intelligence, Part 2",
      detail: "Relatório sobre autoria humana e copyrightabilidade de materiais criados com assistência de IA.",
      href: "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
    },
  ],
};
