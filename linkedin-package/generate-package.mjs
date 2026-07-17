import fs from "node:fs";
import path from "node:path";
import { casesData } from "../src/data/cases.js";
import { practiceAreaCatalog } from "../src/data/practiceAreas.js";
import { sistemaArticleCards } from "../src/sistemaArticleCards.js";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "linkedin-package");
const today = new Date().toISOString().slice(0, 10);
const site = "https://paesconsultoria.com";

const dirs = [
  "data",
  "assets/source",
  "assets/final",
  "assets/previews",
  "review-app/data",
  "review-app/tests",
];
dirs.forEach((dir) => fs.mkdirSync(path.join(out, dir), { recursive: true }));

const csv = (value) => `"${String(value ?? "").replaceAll('"', '""').replace(/\r?\n/g, " ")}"`;
const write = (rel, content) => fs.writeFileSync(path.join(out, rel), content.trimStart() + "\n", "utf8");

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function imgSize(file) {
  try {
    const b = fs.readFileSync(file);
    if (b[0] === 0x89 && b[1] === 0x50) return `${b.readUInt32BE(16)}x${b.readUInt32BE(20)}`;
    if (b[0] === 0xff && b[1] === 0xd8) {
      let o = 2;
      while (o < b.length) {
        const marker = b[o + 1];
        const len = b.readUInt16BE(o + 2);
        if ([0xc0, 0xc1, 0xc2].includes(marker)) return `${b.readUInt16BE(o + 7)}x${b.readUInt16BE(o + 5)}`;
        o += 2 + len;
      }
    }
    if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      if (b.toString("ascii", 12, 16) === "VP8X") return `${1 + b.readUIntLE(24, 3)}x${1 + b.readUIntLE(27, 3)}`;
    }
  } catch {}
  return "";
}

const evidence = [];
let e = 1;
function add(category, claim, origin, proof, confidence = "alto", use = "publicar", notes = "") {
  evidence.push([`E${String(e++).padStart(3, "0")}`, category, claim, origin, proof, confidence, use, notes]);
}

add("identidade", "Samuel Carrera Paes e Paes Consultoria são as entidades centrais do site.", "index.html; src/App.jsx", "Title, meta description, JSON-LD e hero usam Samuel Carrera Paes / Paes Consultoria.");
add("proposta", "A atuação pública reúne direção criativa, imagem, espaço, eventos, varejo, cenografia, campanhas e experiências.", "index.html", "Meta description pública do site.");
add("arquitetura", "A estrutura pública atual é Início, Visão, Portfólio, Sistema/Biblioteca e Contato.", "README.md; DOCUMENTO_APP.md; src/App.jsx", "Documentação e navegação principal.");
add("portfolio", `O portfólio possui ${casesData.length} cases públicos estruturados.`, "src/data/cases.js", casesData.map((c) => c.title).join("; "));
add("biblioteca", `A Biblioteca/Sistema possui ${sistemaArticleCards.length} artigos autorais.`, "src/sistemaArticleCards.js", sistemaArticleCards.map((a) => a.editorialTitle).join("; "));
practiceAreaCatalog.forEach((area) => add("area", `${area.title} contém ${area.caseSlugs.length} cases relacionados.`, "src/data/practiceAreas.js", area.description));
casesData.forEach((c) => add("case", `${c.title} é um case público do portfólio.`, "src/data/cases.js", `${c.category}: ${c.shortTese}`, "alto", "revisar", "Não afirmar ano, métrica ou resultado quantitativo sem prova."));
sistemaArticleCards.forEach((a) => add("artigo", `${a.editorialTitle} é artigo da Biblioteca.`, "src/sistemaArticleCards.js", a.subtitle));

write("data/evidence-map.csv", [
  ["id", "categoria", "afirmacao", "origem", "evidencia", "confianca", "uso_recomendado", "observacoes"],
  ...evidence,
].map((row) => row.map(csv).join(",")).join("\n"));

const assets = walk(path.join(root, "public"))
  .filter((file) => /\.(png|jpe?g|webp|svg|mp4)$/i.test(file))
  .filter((file) => !file.includes("04_PPTX_EXTRACTED"))
  .slice(0, 240)
  .map((file) => {
    const rel = path.relative(root, file).replaceAll("\\", "/");
    const low = rel.toLowerCase();
    const type = low.endsWith(".mp4") ? "video" : low.includes("logo") || low.includes("symbol") ? "logotipo/simbolo" : "imagem";
    const context = low.includes("provence") ? "Provence Raiz" : low.includes("banal") ? "BANAL" : low.includes("val") ? "Val Fortunatto" : low.includes("porti") ? "Porti" : low.includes("social") ? "Social/LinkedIn" : "Portfólio";
    const risk = low.includes("netflix") || low.includes("basquiat") || low.includes("mangueira") ? "revisar marcas de terceiros" : "baixo se usado no contexto público do site";
    return [rel, type, imgSize(file), "", low.endsWith(".png") || low.endsWith(".svg") ? "possível" : "não", context, "apoio visual para LinkedIn", "validar recorte desktop/mobile", risk, "preservar original; usar cópia"];
  });

write("data/assets-manifest.csv", [
  ["arquivo_origem", "tipo", "dimensoes", "proporcao", "transparencia", "contexto_no_site", "uso_sugerido", "recorte_necessario", "risco_de_direitos", "observacoes"],
  ...assets,
].map((row) => row.map(csv).join(",")).join("\n"));

const casesMd = casesData.map((c) => `- **${c.title}** (${c.category}) — ${c.shortTese}`).join("\n");
const articlesMd = sistemaArticleCards.map((a) => `- **${a.editorialTitle}** — ${a.subtitle}`).join("\n");
const areasMd = practiceAreaCatalog.map((a) => `- **${a.title}** — ${a.description} (${a.caseSlugs.length} cases).`).join("\n");

write("00-auditoria-site.md", `# Auditoria do Site e Extração de Verdade — Paes Consultoria

Data: ${today}

## Propósito Aparente

A Paes Consultoria funciona como portfólio autoral de Samuel Carrera Paes. O site sustenta uma atuação ampla em direção criativa, imagem, espaço, varejo, campanhas, eventos, cenografia, produto, experiência física e Biblioteca de pensamento.

## Serviços Oferecidos

${areasMd}

Serviços recorrentes: direção criativa, consultoria criativa, curadoria, styling, campanha, identidade visual, narrativa espacial, visual merchandising, cenografia, exposição de produto, planejamento de experiência, sistemas visuais, sinalização, papelaria e hospitalidade.

## Públicos Atendidos

- Marcas de moda, varejo, produto e experiência.
- Empresas com ponto físico, vitrine, campanha ou operação de loja.
- Eventos e experiências presenciais que precisam de identidade, atmosfera e linguagem 360 graus.
- Parceiros criativos que precisam transformar intenção em presença real.

## Problemas Resolvidos

- Marca com discurso sem confirmação física.
- Produto sem contexto, hierarquia ou narrativa.
- Loja, campanha ou evento sem sistema visual.
- Ideia criativa que não encontra operação e continuidade.

## Diferenciais Declarados

- Pensamento autoral documentado em seis artigos.
- Doze cases públicos estruturados.
- Capacidade de conectar visão, forma, imagem, espaço, experiência e execução.
- Linguagem editorial, premium, minimalista e sofisticada.

## Promessas e Propostas de Valor

- Transformar intenção em presença real.
- Fazer marca, produto, espaço e operação confirmarem a mesma linguagem.
- Construir projetos com clareza, desejo e continuidade.

## Calls to Action

Ver portfólio, ler Biblioteca/Sistema, falar com Samuel, compartilhar página ou case.

## Liderança

Samuel Carrera Paes é a liderança documentada. Não há evidência suficiente para afirmar equipe, tamanho, fundação, métricas ou certificações.

## Cases

${casesMd}

## Artigos

${articlesMd}

## Tom de Voz

Editorial, autoral, crítico, preciso e sensível. Evita propaganda genérica e superlativos sem prova.

## Vocabulário Recorrente

Direção criativa, presença, percepção, sistema, narrativa, repertório, curadoria, espaço, atmosfera, experiência física, visual merchandising, hospitalidade, operação criativa, desejo e linguagem.

## Identidade Visual

Fundo claro quente, contraste preto editorial, serifas em títulos grandes, microtipografia uppercase espaçada, bordas finas, pouca ornamentação e imagens de case como prova visual.

## Fragilidades

- Métricas, datas e depoimentos não devem ser usados sem confirmação.
- Marcas de clientes devem aparecer apenas no contexto já público dos cases.
- O destino LinkedIn ainda deve ser confirmado: perfil pessoal, página empresarial ou ambos.

## Informações que Não Podem Ser Usadas

Prêmios, números, certificações, resultados quantitativos, equipe, datas, cargo oficial e estrutura societária sem evidência.
`);

write("01-estrategia-linkedin.md", `# Estratégia LinkedIn — Paes Consultoria

## Objetivo Comercial

Transformar o conteúdo do site em presença profissional no LinkedIn para gerar autoridade, repertório público, reconhecimento do nome Samuel Carrera Paes e conversas qualificadas.

## Público

Fundadores, diretores de marca, marketing, varejo, produto, eventos, profissionais de VM, arquitetura de experiência, cerimonial, produção e parceiros criativos.

## Problema Central

Muitas marcas e experiências possuem estética, mas não possuem sistema. A Paes Consultoria organiza leitura, linguagem, matéria, narrativa, operação e execução.

## Proposta de Valor

Samuel Paes transforma intenção em presença por meio de direção criativa aplicada a imagem, espaço, varejo, eventos, campanhas, produto e experiência física.

## Posicionamento Recomendado

**Samuel Carrera Paes é diretor criativo e consultor criativo em presença, imagem, espaço e experiência. A Paes Consultoria organiza cases e pensamento autoral para marcas, varejo, eventos e sistemas visuais.**

## Pilares Editoriais

| Pilar | Função | Formatos | Evidência | CTA |
| --- | --- | --- | --- | --- |
| Pensamento autoral | Sustentar autoridade | Artigos, carrosséis, ensaios curtos | 6 artigos | Ler Biblioteca |
| Portfólio como prova | Materializar atuação | Estudos de caso | 12 cases | Ver case |
| Varejo, espaço e experiência | Atrair marcas físicas | Diagnósticos e checklists | Áreas e cases | Conversar |
| Eventos como sistema visual | Posicionar Provence Raiz | Case e bastidores | Case 12 | Ver Provence Raiz |
| Operação criativa | Mostrar método | Processo e frameworks | Artigo Operação Criativa | Falar com Samuel |

## Mensagens a Repetir

Intenção precisa virar presença. Marca, produto, espaço e operação devem confirmar a mesma linguagem. Experiência física é sistema, não decoração.

## Mensagens a Evitar

"Referência de mercado", "soluções inovadoras", "excelência incomparável", "transformamos sonhos em realidade" e qualquer número não comprovado.
`);

const headlines = [
  "Diretor Criativo e Consultor Criativo | Presença, imagem, espaço, varejo e experiências",
  "Samuel Carrera Paes | Direção criativa para marcas, varejo, eventos e sistemas visuais",
  "Diretor Criativo | Transformo intenção em presença por imagem, espaço e experiência",
  "Consultor Criativo e Diretor de Presença | Marca, produto, espaço e operação",
  "Criador da Paes Consultoria | Direção criativa, portfólio autoral e Biblioteca de pensamento",
];

write("02-perfil-pessoal.md", `# Perfil Pessoal — Samuel Carrera Paes

Destino pendente de confirmação. Não aplicar sem aprovação explícita.

## Headlines

${headlines.map((h, i) => `${i + 1}. ${h}`).join("\n")}

## Recomendada

**${headlines[1]}**

## Sobre

Sou Samuel Carrera Paes, diretor criativo e consultor criativo.

Meu trabalho investiga uma pergunta simples e exigente: como uma intenção se transforma em presença real?

Atuo na interseção entre imagem, marca, espaço, varejo, eventos, produto, narrativa e experiência física. A partir da Paes Consultoria, organizo projetos, sistemas visuais e pensamento autoral para que marcas e experiências deixem de depender apenas de estética e passem a sustentar linguagem, percepção e operação.

O portfólio reúne trabalhos de direção criativa, visual merchandising, campanhas, colaborações, cenografia, identidade aplicada a eventos e sistemas de presença. A Biblioteca aprofunda essa visão em artigos sobre leitura de marca, curadoria de produto, narrativa espacial, construção de percepção, operação criativa e experiência física.

Meu foco não é apenas fazer um projeto parecer melhor. É construir a lógica que faz ele ser percebido com mais clareza, desejo e continuidade.

Portfólio: ${site}

## Versão Curta

Diretor criativo e consultor criativo em imagem, espaço, varejo, eventos e sistemas visuais. Crio projetos que transformam intenção em presença real.

## Experiência Paes Consultoria

Cargo sugerido: Diretor Criativo / Consultor Criativo.

Descrição: atuação autoral em direção criativa, consultoria criativa, imagem, espaço, varejo, eventos, campanhas, produto, experiência física e sistemas visuais.

## Serviços

Direção criativa; consultoria criativa; visual merchandising; curadoria; campanhas; cenografia; experiência física; sistemas visuais para eventos; Biblioteca e pensamento autoral.

## Destaques

${site}
${site}/cases
${site}/sistema
${site}/case/provence-raiz-sistema-visual

## Dados a Confirmar

Cargo oficial, datas, cidade, formação, telefone, e-mail público, links sociais e permissões de uso de marcas de clientes.
`);

write("03-pagina-empresa.md", `# Página Empresarial — Paes Consultoria

Destino pendente de confirmação. Não criar página automaticamente.

## Tagline

Direção criativa para transformar intenção em presença.

## Sobre

A Paes Consultoria é o espaço autoral de Samuel Carrera Paes para direção criativa, consultoria criativa, imagem, espaço, varejo, campanhas, eventos e sistemas visuais.

O trabalho parte de uma leitura: marcas, produtos e experiências não ganham valor apenas por parecerem bonitos. Eles precisam sustentar presença. Isso exige linguagem, repertório, matéria, narrativa, operação e execução.

O portfólio reúne cases de varejo, visual merchandising, campanhas, colaborações, cenografia, lançamento de produto, identidade aplicada a eventos e experiência física. A Biblioteca organiza artigos e ensaios que sustentam esse pensamento.

A Paes Consultoria existe para transformar intenção em presença real.

## Especialidades

Direção criativa; consultoria criativa; imagem; espaço; varejo; visual merchandising; curadoria de produto; campanhas; colaborações; cenografia; eventos; experiência física; identidade visual; narrativa espacial; percepção de valor; operação criativa; sistemas visuais.

## Primeiro Post Fixado

A Paes Consultoria passa a se apresentar publicamente como aquilo que organiza o trabalho de Samuel Carrera Paes: um portfólio autoral em direção criativa, imagem, espaço e experiência.

Aqui, marca, produto, varejo, campanha, evento, cenografia e Biblioteca não aparecem como áreas soltas. Elas fazem parte de uma mesma pergunta: como transformar intenção em presença real?

Conheça: ${site}
`);

write("design-tokens.json", JSON.stringify({
  primitive: {
    color: { paper: "#f3eee7", paperSoft: "#fffaf2", ink: "#111111", muted: "#6f6a62", green: "#263d32", copper: "#8a5a38", blue: "#245071", dark: "#11100e" },
    space: { 100: 8, 200: 16, 300: 24, 400: 32, 500: 48 },
    type: { serif: "Georgia, Times New Roman, serif", sans: "Arial, sans-serif" },
    radius: { small: 2, medium: 6 }
  },
  semantic: {
    color: { background: "{primitive.color.paper}", text: "{primitive.color.ink}", muted: "{primitive.color.muted}", action: "{primitive.color.green}" }
  },
  component: {
    linkedinProfileBanner: { width: 1584, height: 396 },
    linkedinCompanyCover: { width: 1128, height: 191 },
    postSquare: { width: 1200, height: 1200 },
    carouselPage: { width: 1080, height: 1350 }
  }
}, null, 2));

write("04-design-system-linkedin.md", `# Design System Compacto LinkedIn

## Especificações de Mídia

Referências de uso corrente e ajuda do LinkedIn: perfil pessoal 1584 x 396 px; capa de página empresarial 1128 x 191 px; posts quadrados 1200 x 1200 px; carrossel 1080 x 1350 px por página. Como o LinkedIn pode alterar recortes por interface, validar na própria tela antes de salvar.

## Regras

- Fundo claro quente como base.
- Preto editorial para autoridade.
- Títulos serifados, corpo sans.
- Bordas finas, pouco radius e sombras discretas.
- Texto curto em imagem; conteúdo completo na legenda.
- Alt text obrigatório.
- Não depender de informação essencial apenas na imagem.

Ver tokens em \`design-tokens.json\`.
`);

const posts = [
  ["POST 01", "autoridade", "Samuel Carrera Paes: portfólio como sistema", "Um portfólio não precisa ser apenas galeria.", "Estou reorganizando meu trabalho a partir de uma ideia: intenção só vira valor quando ganha presença. No meu portfólio, direção criativa, varejo, campanhas, eventos, espaço e Biblioteca aparecem como partes de um mesmo sistema.", "Conheça o portfólio em paesconsultoria.com", "banner-final"],
  ["POST 02", "educação", "Marca não é discurso: é confirmação", "Antes da vitrine, existe uma pergunta mais profunda.", "Uma marca pode dizer que é sofisticada, autoral ou desejável. Mas o espaço, o produto, a luz, o toque e a operação confirmam ou desmentem essa promessa.", "Ler artigo Leitura de Marca", "post-02"],
  ["POST 03", "case", "Val Fortunatto: transição sem ruptura", "Reposicionar não é apagar uma marca. É mudar a lente.", "No case Val Fortunatto Brand Transition, a direção criativa trabalhou curadoria, styling, campanha e percepção para renovar a leitura pública sem negar a elegância que já sustentava a marca.", "Ver case", "post-03"],
  ["POST 04", "diagnóstico", "Curadoria é arquitetura da escolha", "Mostrar tudo pode esconder o essencial.", "Curadoria de produto não é simplesmente reduzir quantidade. É construir uma lógica de leitura para que o cliente encontre sentido, comparação e desejo.", "Salvar para revisar sua exposição", "educacional"],
  ["POST 05", "case", "Porti: expansão física como presença", "Vitrine não é enfeite sazonal quando organiza percepção.", "O case Porti reúne expansão física, visual merchandising, cenografia e implantação. A questão não era apenas montar vitrines, mas sustentar coerência entre comunicação, loja e operação.", "Ver Porti", "post-03"],
  ["POST 06", "educação", "Tela informa. Espaço confirma.", "O físico ainda tem uma vantagem.", "No varejo e nos eventos, o físico coloca corpo, escala, matéria, luz, som e memória no mesmo campo. A experiência não precisa competir com a velocidade digital; precisa entregar presença.", "Conhecer cases de experiência", "servico"],
  ["POST 07", "case", "Provence Raiz: evento como sistema visual", "Uma festa bem feita não é apenas decoração.", "Provence Raiz trata o evento como linguagem 360 graus: identidade, papelaria, sinalização, hospitalidade, arquitetura cenográfica, flor e luz em continuidade.", "Ver Provence Raiz", "carousel-02"],
  ["POST 08", "educação", "Narrativa espacial: a loja como argumento", "O espaço não é fundo para o produto.", "Quando a loja organiza atenção, percurso, pausa e descoberta, ela deixa de ser depósito bonito e passa a funcionar como argumento físico da marca.", "Ler Narrativa Espacial", "educacional"],
  ["POST 09", "processo", "Operação criativa sustenta a forma", "Uma ideia boa precisa sobreviver ao uso real.", "Direção criativa não termina na montagem. Se a equipe não consegue manter, substituir e repetir a linguagem, a forma perde força com a rotina.", "Ler Operação Criativa", "post-04"],
  ["POST 10", "relacionamento", "O que observo primeiro em um projeto", "Nem sempre começo pela estética.", "Antes de definir forma, procuro entender contexto, público, repertório, restrições, operação e o tipo de presença que o projeto precisa sustentar.", "Me conte qual presença seu projeto precisa construir", "institucional"],
  ["POST 11", "case", "Campanhas e collabs: traduzir universos", "Colaboração não é sobre juntar logos.", "Campanhas e collabs exigem mediação: cultura, entretenimento, produto e varejo precisam conversar sem apagar a identidade de cada universo.", "Ver campanhas e collabs", "post-03"],
  ["POST 12", "conversão", "Vamos conversar sobre presença?", "Se o seu projeto já tem intenção, talvez falte sistema.", "A Paes Consultoria pode ajudar a organizar linguagem, espaço, imagem, narrativa e execução para que marcas, eventos e experiências sejam percebidos com mais clareza.", "Acesse paesconsultoria.com", "contato"],
];

write("05-calendario-30-dias.csv", [
  ["data_sugerida", "pilar", "objetivo", "publico", "formato", "titulo", "gancho", "ideia_central", "evidencia", "CTA", "ativo", "status", "observacoes"],
  ...posts.map((p, i) => {
    const d = new Date(); d.setDate(d.getDate() + i * 2);
    return [d.toISOString().slice(0, 10), p[1], "presença e autoridade", "decisores e parceiros criativos", "post", p[2], p[3], p[4], "site local", p[5], p[6], "rascunho", "revisar antes de publicar"];
  })
].map((row) => row.map(csv).join(",")).join("\n"));

write("06-posts-finais.md", `# 12 Posts Finais\n\n${posts.map((p) => `## ${p[0]} — ${p[2]}\n\n**Pilar:** ${p[1]}\n\n**Gancho:** ${p[3]}\n\n**Corpo:** ${p[4]}\n\n**CTA:** ${p[5]}\n\n**Visual:** ${p[6]}\n\n**Alt text:** Card editorial da Paes Consultoria sobre ${p[2]}.\n\n**Fonte:** site local, cases e Biblioteca.\n\n**Risco:** revisar contexto e autorização antes de publicar.\n`).join("\n")}`);

const carousels = [
  ["CARROSSEL 01", "Marca como sistema de percepção", ["Marca não é o que se declara", "O cliente lê sinais antes de ler discurso", "Luz, produto, matéria e atendimento confirmam a promessa", "Se os sinais contradizem, a percepção quebra", "Direção criativa transforma intenção em critério", "Leia Leitura de Marca na Biblioteca"]],
  ["CARROSSEL 02", "Evento como comunicação 360 graus", ["Uma festa também comunica", "Buffet, bar, decoração e cerimonial não são camadas isoladas", "Identidade orienta papelaria, sinalização e hospitalidade", "Atmosfera depende de matéria, luz e percurso", "Provence Raiz mostra esse sistema", "Ver case completo"]],
  ["CARROSSEL 03", "Curadoria não é tirar produto", ["Curadoria é arquitetura da escolha", "Excesso pode virar ruído", "Vazio sem argumento vira pose", "Produto precisa de família, ritmo e contexto", "A escolha ganha valor quando ganha leitura", "Leia Curadoria de Produto"]],
  ["CARROSSEL 04", "Do pensamento ao case", ["Como uma intenção vira presença?", "Diagnóstico lê contexto", "Linguagem transforma leitura em forma", "Sistema conecta imagem, espaço e operação", "Case confirma pensamento no mundo real", "Conheça os 12 cases"]],
];
write("07-carrosseis.md", `# Roteiros de Carrossel\n\n${carousels.map((c) => `## ${c[0]} — ${c[1]}\n\n${c[2].map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\n**CTA:** Conhecer portfólio ou Biblioteca.\n\n**Alt text:** ${c[2].join(" / ")}.\n`).join("\n")}`);

write("08-banco-de-ideias.md", `# Banco de Ideias\n\n- Uma pergunta antes da forma.\n- O que uma loja confessa sem perceber.\n- Eventos como sistema visual.\n- Biblioteca em fragmentos.\n- Cases em uma decisão.\n- IA não substitui repertório; acelera tradução quando existe direção.\n- Cinco sinais de ruído em uma vitrine.\n- Quando uma experiência física perde continuidade.\n`);

write("09-plano-de-metricas.md", `# Plano de Métricas\n\nMedir: visitas ao perfil, cliques no site, cliques em cases, salvamentos, comentários relevantes, compartilhamentos, conversas comerciais iniciadas, desempenho por pilar e formato.\n\nRotina: revisão em 7, 15 e 30 dias. Não há baseline validado; primeiro ciclo é aprendizagem.\n`);
write("data/content-tracking.csv", [["data", "post_id", "pilar", "formato", "impressoes", "visitas_perfil", "cliques_site", "salvamentos", "comentarios_relevantes", "compartilhamentos", "conversas_iniciadas", "observacoes"]].map((r) => r.map(csv).join(",")).join("\n"));

const assetMeta = [
  ["banner-final", 1584, 396, "Samuel Carrera Paes", "Direção criativa para transformar intenção em presença", false],
  ["banner-var-01", 1584, 396, "Paes Consultoria", "Portfólio autoral", false],
  ["banner-var-02", 1584, 396, "Intenção em presença", "Imagem · espaço · experiência", true],
  ["post-01", 1200, 1200, "Intenção precisa virar presença", "Paes Consultoria", false],
  ["post-02", 1200, 1200, "Marca é o que o espaço confirma", "Leitura de Marca", false],
  ["post-03", 1200, 1200, "12 cases publicados", "Portfólio autoral", false],
  ["post-04", 1200, 1200, "Sem operação, direção criativa vira intenção não sustentada", "Operação Criativa", true],
  ["carousel-01", 1080, 1350, "Marca como sistema de percepção", "Carrossel educativo", false],
  ["carousel-02", 1080, 1350, "Evento como comunicação 360 graus", "Provence Raiz", true],
  ["institucional", 1200, 1200, "Paes Consultoria", "Direção criativa", false],
  ["servico", 1200, 1200, "Imagem · espaço · experiência", "Serviços", false],
  ["educacional", 1200, 1200, "Biblioteca", "O pensamento que sustenta a prática", false],
  ["contato", 1200, 1200, "Vamos transformar intenção em presença?", "paesconsultoria.com", true],
];

function svg(name, width, height, title, subtitle, dark) {
  const bg = dark ? "#11100e" : "#f3eee7";
  const fg = dark ? "#fffaf2" : "#111111";
  const muted = dark ? "#d8d0c4" : "#6f6a62";
  const size = width > 1300 ? 72 : 64;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<rect width="${width}" height="${height}" fill="${bg}"/>
<rect x="42" y="42" width="${width - 84}" height="${height - 84}" fill="none" stroke="${dark ? "#fffaf222" : "#11111122"}" stroke-width="2"/>
<text x="76" y="92" fill="${muted}" font-family="Arial" font-size="18" font-weight="700" letter-spacing="6">PAES CONSULTORIA</text>
<text x="76" y="${height / 2}" fill="${fg}" font-family="Georgia" font-size="${size}" font-weight="700">${title}</text>
<text x="76" y="${height / 2 + 52}" fill="${muted}" font-family="Arial" font-size="24">${subtitle}</text>
<text x="${width - 76}" y="${height - 64}" text-anchor="end" fill="${muted}" font-family="Arial" font-size="18">paesconsultoria.com</text>
</svg>`;
}
assetMeta.forEach((a) => write(`assets/source/${a[0]}.svg`, svg(...a)));
write("assets/ASSET_INDEX.md", `# Índice dos Ativos\n\n${assetMeta.map((a) => `- **${a[0]}**: source \`assets/source/${a[0]}.svg\`, final \`assets/final/${a[0]}.png\`, alt text: card Paes Consultoria com ${a[3]}.`).join("\n")}`);

write("APROVACAO_LINKEDIN.md", `# Aprovação LinkedIn — Paes Consultoria\n\n## Diagnóstico\n\nO site sustenta Samuel Carrera Paes como centro de um portfólio autoral amplo, com Paes Consultoria como estrutura pública de cases, visão, Biblioteca e contato.\n\n## Posicionamento Recomendado\n\nSamuel Carrera Paes é diretor criativo e consultor criativo em presença, imagem, espaço e experiência.\n\n## Headline Recomendada\n\n${headlines[1]}\n\n## Pilares\n\nPensamento autoral; portfólio como prova; varejo, espaço e experiência; eventos como sistema visual; operação criativa.\n\n## Ativos Produzidos\n\n${assetMeta.map((a) => `- assets/final/${a[0]}.png`).join("\n")}\n\n## Posts\n\n${posts.map((p) => `- ${p[0]}: ${p[2]}`).join("\n")}\n\n## Não Alterar Sem Aprovação\n\nSenha, e-mail de login, telefone, privacidade, URL pública, mensagens, conexões, seguidores, cargo, datas, formação e posts.\n\n## Interface de Revisão\n\nAbrir \`linkedin-package/review-app/index.html\`.\n\n## Checkpoint Exato\n\n**APROVADO PARA APLICAR O PERFIL NO LINKEDIN**\n`);

write("README.md", `# LinkedIn Package — Paes Consultoria\n\nAbra \`linkedin-package/review-app/index.html\` para revisar.\n\nArquivos: auditoria, estratégia, perfil pessoal, página empresarial, design system, calendário, posts, carrosséis, banco de ideias, métricas, ativos e relatório de aprovação.\n\nNada deve ser aplicado no LinkedIn antes da frase exata:\n\n**APROVADO PARA APLICAR O PERFIL NO LINKEDIN**\n`);

const data = { generatedAt: today, headlines, posts: posts.map((p) => ({ id: p[0], pilar: p[1], title: p[2], hook: p[3], body: p[4], cta: p[5], asset: p[6], status: "rascunho" })), carousels: carousels.map((c) => ({ id: c[0], title: c[1], pages: c[2] })), assets: assetMeta.map((a) => ({ id: a[0], title: a[3], final: `assets/final/${a[0]}.png`, source: `assets/source/${a[0]}.svg` })), evidenceCount: evidence.length, assetCount: assets.length };
write("review-app/data/review-data.js", `window.PAES_LINKEDIN_REVIEW = ${JSON.stringify(data, null, 2)};`);
write("review-app/index.html", `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Revisão LinkedIn — Paes Consultoria</title><link rel="stylesheet" href="styles.css"></head><body><a class="skip" href="#conteudo">Pular para conteúdo</a><header><p class="eyebrow">LinkedIn Package</p><h1>Revisão Paes Consultoria</h1><nav aria-label="Categorias"><a href="#perfil">Perfil</a><a href="#ativos">Ativos</a><a href="#posts">Posts</a><a href="#carrosseis">Carrosséis</a><a href="#aprovacao">Aprovação</a></nav></header><main id="conteudo"><section class="hero"><h2>Pacote revisável antes de qualquer aplicação pública.</h2><p>Baseado no site local. Nada será aplicado sem aprovação explícita.</p><div class="stats"><span><strong id="statPosts"></strong> posts</span><span><strong id="statAssets"></strong> ativos</span><span><strong id="statEvidence"></strong> evidências</span></div></section><section id="perfil" class="panel"><h2>Perfil proposto</h2><ul id="headlineList"></ul></section><section id="ativos" class="panel"><h2>Ativos visuais</h2><button id="copyAssets" type="button">Copiar lista</button><div id="assetGrid" class="grid"></div></section><section id="posts" class="panel"><h2>Posts</h2><label>Filtrar pilar <select id="pillarFilter"><option value="all">Todos</option></select></label><div id="postList"></div></section><section id="carrosseis" class="panel"><h2>Carrosséis</h2><div id="carouselList"></div></section><section id="aprovacao" class="panel dark"><h2>Checkpoint</h2><p><strong>APROVADO PARA APLICAR O PERFIL NO LINKEDIN</strong></p><label for="notes">Observações</label><textarea id="notes"></textarea><button id="saveNotes" type="button">Salvar observações locais</button><p id="status" role="status" aria-live="polite"></p></section></main><script src="data/review-data.js"></script><script src="app.js"></script></body></html>`);
write("review-app/styles.css", `:root{--paper:#f3eee7;--ink:#111;--muted:#6f6a62;--line:rgba(17,17,17,.16);--dark:#11100e;--soft:#fffaf2;--focus:#245071}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:Arial,sans-serif;line-height:1.5}.skip{position:absolute;left:1rem;top:1rem;background:var(--ink);color:var(--soft);padding:.75rem;transform:translateY(-180%)}.skip:focus{transform:none}header{position:sticky;top:0;background:rgba(243,238,231,.94);border-bottom:1px solid var(--line);padding:1rem 1.5rem;z-index:3}nav{display:flex;gap:.7rem;flex-wrap:wrap}a,button,select,textarea{font:inherit}a,button{min-height:44px}a{color:inherit}button{border:1px solid var(--line);background:var(--ink);color:var(--soft);padding:.75rem 1rem}a:focus-visible,button:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid var(--focus);outline-offset:3px}main{max-width:1200px;margin:auto;padding:2rem 1.5rem}.eyebrow{text-transform:uppercase;letter-spacing:.24em;font-size:.72rem;color:var(--muted);font-weight:700}h1,h2,h3{font-family:Georgia,serif;line-height:.95}h1{font-size:clamp(2rem,6vw,4.5rem)}h2{font-size:clamp(2rem,5vw,4rem)}.hero,.panel{border:1px solid var(--line);padding:clamp(1.25rem,4vw,3rem);margin-bottom:1.5rem}.stats,.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem}.stats span,.card,.post{border:1px solid var(--line);padding:1rem;background:rgba(255,250,242,.45)}.grid img{width:100%;aspect-ratio:16/9;object-fit:cover;background:#ddd}.post{margin-top:1rem}.dark{background:var(--dark);color:var(--soft)}textarea{display:block;width:100%;min-height:8rem;margin:.5rem 0 1rem;padding:1rem}@media(max-width:700px){header{position:static}.hero,.panel{padding:1rem}}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}`);
write("review-app/app.js", `const data=window.PAES_LINKEDIN_REVIEW;statPosts.textContent=data.posts.length;statAssets.textContent=data.assets.length;statEvidence.textContent=data.evidenceCount;data.headlines.forEach(h=>{const li=document.createElement('li');li.textContent=h;headlineList.appendChild(li)});data.assets.forEach(a=>{const c=document.createElement('article');c.className='card';c.innerHTML='<img src="../'+a.final+'" alt="Ativo '+a.title+'"><h3>'+a.title+'</h3><p>'+a.source+'</p>';assetGrid.appendChild(c)});[...new Set(data.posts.map(p=>p.pilar))].forEach(p=>{const o=document.createElement('option');o.value=p;o.textContent=p;pillarFilter.appendChild(o)});function render(){postList.innerHTML='';data.posts.filter(p=>pillarFilter.value==='all'||p.pilar===pillarFilter.value).forEach(p=>{const el=document.createElement('article');el.className='post';el.innerHTML='<h3>'+p.id+' · '+p.title+'</h3><p><strong>'+p.hook+'</strong></p><p>'+p.body+'</p><p>CTA: '+p.cta+'</p><button type="button" data-copy="'+p.id+'">Copiar</button>';postList.appendChild(el)})}pillarFilter.addEventListener('change',render);render();document.addEventListener('click',async e=>{const b=e.target.closest('[data-copy]');if(!b)return;const p=data.posts.find(x=>x.id===b.dataset.copy);await navigator.clipboard.writeText(p.hook+'\\n\\n'+p.body+'\\n\\n'+p.cta);status.textContent='Copiado: '+p.id});data.carousels.forEach(c=>{const el=document.createElement('article');el.className='post';el.innerHTML='<h3>'+c.id+' · '+c.title+'</h3><ol>'+c.pages.map(p=>'<li>'+p+'</li>').join('')+'</ol>';carouselList.appendChild(el)});copyAssets.onclick=async()=>{await navigator.clipboard.writeText(data.assets.map(a=>a.title+': '+a.final).join('\\n'));status.textContent='Lista de ativos copiada'};saveNotes.onclick=()=>{localStorage.setItem('paesLinkedinNotes',notes.value);status.textContent='Observações salvas'};notes.value=localStorage.getItem('paesLinkedinNotes')||'';`);
write("review-app/tests/review-smoke.mjs", `import fs from 'node:fs';import path from 'node:path';const root=path.resolve(import.meta.dirname,'..');const html=fs.readFileSync(path.join(root,'index.html'),'utf8');const data=fs.readFileSync(path.join(root,'data','review-data.js'),'utf8');for(const t of ['Revisão Paes Consultoria','Ativos visuais','Posts','APROVADO PARA APLICAR O PERFIL NO LINKEDIN']){if(!html.includes(t))throw new Error('Ausente: '+t)}if(!data.includes('PAES_LINKEDIN_REVIEW'))throw new Error('Dados ausentes');console.log('review-app smoke ok');`);

console.log("linkedin-package generated");
