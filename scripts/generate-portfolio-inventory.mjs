import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getCaseSlug, loadCasesData } from "./case-seo-data.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(root, "docs", "portfolio-rebuild");

const scanRoots = [
  path.join(root, "public", "images"),
  path.join(root, "public", "brands"),
  path.join(root, "assets-source"),
];

const caseFolderRules = [
  [/public\/images\/01_VAL_FORTUNATTO\//i, "case-01"],
  [/public\/images\/02_VAL_FORTUNATTO_LINHO\//i, "case-02"],
  [/public\/images\/03_ATELIE_BAMBINI\//i, "case-03"],
  [/public\/images\/04_R_LOVERS\//i, "case-04"],
  [/public\/images\/05_PORTI_PRIMAVERA\//i, "case-05"],
  [/public\/images\/05_PORTI_NATAL\//i, "case-19"],
  [/public\/images\/05_PORTI_VERAO\//i, "case-20"],
  [/public\/images\/06_HEXA\//i, "case-06"],
  [/public\/images\/07_CAMPANHAS_COLLABS\//i, "case-07"],
  [/public\/images\/08_ROUGE_GOLD\//i, "case-08"],
  [/public\/images\/09_OUTERWEAR\//i, "case-09"],
  [/public\/images\/10_VINTAGE_DENIM\//i, "case-10"],
  [/public\/images\/11_PARAISO_TROPICAL\//i, "case-11"],
  [/(public\/images|assets-source)\/14_VERDEBURGO\/PROVENCE_RAIZ\//i, "case-12"],
  [/public\/images\/15_IA_COM_ALMA\/02_ROOM_329\//i, "case-13"],
  [/public\/images\/15_IA_COM_ALMA\/03_PAIS\//i, "case-14"],
  [/public\/images\/15_IA_COM_ALMA\/04_IRENE_1945\//i, "case-15"],
  [/public\/brands\/banal\//i, "case-16"],
  [/public\/images\/16_IDENTIDADES\/02_CASARAO_MEDEIROS\//i, "case-17"],
];

const provenanceRules = [
  {
    test: /public\/images\/03_ATELIE_BAMBINI\/02_RECUPERADO_CHATGPT\//i,
    classification: "original existente",
    provenance: "Copia recuperada de conversa do ChatGPT; SOURCE.md registra comparacao de hashes. Master anterior ao upload nao confirmado.",
    risk: "baixo, desde que nao seja descrito como master de camera ou arquivo anterior ao upload",
  },
  {
    test: /public\/images\/15_IA_COM_ALMA\/(02_ROOM_329|03_PAIS|04_IRENE_1945)\//i,
    classification: "original existente",
    provenance: "Output existente recuperado de conversa do ChatGPT; SOURCE.md local registra a origem da copia. Master anterior ao upload nao confirmado.",
    risk: "baixo para uso editorial; manter declaracao de recuperacao",
  },
  {
    test: /public\/images\/16_IDENTIDADES\/02_CASARAO_MEDEIROS\/01_DERIVADOS_PDF\//i,
    classification: "reconstrução",
    provenance: "Derivado renderizado de paginas do guideline PDF recuperado; SOURCE.md registra fonte, SHA-256 e paginas.",
    risk: "medio; material-fonte parcial e nao vetor original, portanto nao apresentar como aplicacao fisica",
  },
  {
    test: /public\/images\/16_IDENTIDADES\/02_CASARAO_MEDEIROS\/02_RECONSTRUCAO_GRAFICA\//i,
    classification: "reconstrução",
    provenance: "Reconstrucao grafica autorizada no G4-001, recomposta a partir das seis paginas raster do guideline recuperado; SOURCE.md registra metodo e limites.",
    risk: "medio; nunca apresentar como vetor original ou como aplicacao fisica executada",
  },
  {
    test: /public\/images\/05_PORTI_(NATAL|VERAO)\/02_SIMULACAO_TECNICA\//i,
    classification: "simulação",
    provenance: "Simulacao tecnica editorial nova, autorizada apos confirmacao de ausencia das fotografias tecnicas originais; SOURCE.md registra referencias, prompt, ferramenta e hash.",
    risk: "medio; nao apresentar como documento historico de fabricacao ou fotografia da execucao",
  },
  {
    test: /assets-source\/14_VERDEBURGO\/PROVENCE_RAIZ\//i,
    classification: "original existente",
    provenance: "Arquivo preservado no pacote-fonte local do projeto; manifestos internos registram funcao e dimensoes, mas a origem anterior ao pacote nao esta documentada.",
    risk: "medio; tratar como fonte do pacote e nao como fotografia de execucao",
  },
  {
    test: /public\/images\/14_VERDEBURGO\/PROVENCE_RAIZ\//i,
    classification: "origem incerta",
    provenance: "Asset de apresentacao existente no repositorio. Manifestos registram arquivo e dimensoes, mas nao comprovam autoria, metodo de producao ou implantacao fisica.",
    risk: "alto se descrito como execucao fisica; rotular render, estudo, moodboard, prancha ou simulacao conforme o nome e a evidencia",
  },
  {
    test: /public\/brands\/banal\//i,
    classification: "origem incerta",
    provenance: "Asset existente no repositorio para BANAL; nao ha SOURCE.md no diretorio publico confirmando a origem anterior.",
    risk: "medio; nao atribuir contexto, cliente ou processo alem do que esta documentado no case",
  },
  {
    test: /public\/images\/social\//i,
    classification: "reconstrução",
    provenance: "Derivado social gerado pelo pipeline local a partir do case publicado.",
    risk: "baixo; nao usar como prova primaria do projeto",
  },
];

function normalizePath(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(absolutePath));
    if (entry.isFile()) files.push(absolutePath);
  }

  return files;
}

function readWebpDimension(buffer) {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") return null;
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const type = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (type === "VP8X" && dataOffset + 10 <= buffer.length) {
      return {
        width: 1 + buffer.readUIntLE(dataOffset + 4, 3),
        height: 1 + buffer.readUIntLE(dataOffset + 7, 3),
      };
    }

    if (type === "VP8L" && dataOffset + 5 <= buffer.length && buffer[dataOffset] === 0x2f) {
      const bits = buffer.readUInt32LE(dataOffset + 1);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }

    if (type === "VP8 " && dataOffset + 10 <= buffer.length) {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }

    offset += 8 + size + (size % 2);
  }

  return null;
}

function readImageDimension(buffer) {
  if (buffer.length >= 24 && buffer[0] === 0x89 && buffer.toString("ascii", 1, 4) === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    const sofMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
    let offset = 2;

    while (offset + 4 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      while (buffer[offset] === 0xff) offset += 1;
      const marker = buffer[offset];
      offset += 1;
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker >= 0xd0 && marker <= 0xd7) continue;
      const segmentLength = buffer.readUInt16BE(offset);

      if (sofMarkers.has(marker) && offset + 7 < buffer.length) {
        return { height: buffer.readUInt16BE(offset + 3), width: buffer.readUInt16BE(offset + 5) };
      }

      offset += segmentLength;
    }
  }

  return readWebpDimension(buffer);
}

function inferAssetType(relativePath) {
  const extension = path.extname(relativePath).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(extension)) return "image";
  if ([".mp4", ".mov", ".webm"].includes(extension)) return "video";
  if ([".json", ".md", ".txt"].includes(extension)) return "document";
  return "other";
}

function getProvenance(relativePath) {
  const rule = provenanceRules.find((candidate) => candidate.test.test(relativePath));
  if (rule) return rule;

  if (/public\/images\/(0[1-9]|1[0-3])_/i.test(relativePath)) {
    return {
      classification: "origem incerta",
      provenance: "Asset historico de apresentacao existente no repositorio; nao foi localizado SOURCE.md especifico.",
      risk: "medio; confirmar origem antes de atribuir autoria, data, implantacao ou resultado",
    };
  }

  return {
    classification: "origem incerta",
    provenance: "Proveniencia nao confirmada no repositorio.",
    risk: "medio; nao publicar alegacoes de origem sem evidencia adicional",
  };
}

function getCaseIds(relativePath, cases, usedPaths) {
  const ids = new Set();
  const publicPath = relativePath.startsWith("public/") ? `/${relativePath.slice("public/".length)}` : null;

  if (publicPath && usedPaths.has(publicPath)) {
    for (const caseId of usedPaths.get(publicPath)) ids.add(caseId);
  }

  for (const [pattern, caseId] of caseFolderRules) {
    if (pattern.test(relativePath)) ids.add(caseId);
  }

  for (const caseItem of cases) {
    if (relativePath === `public/images/social/linkedin/${getCaseSlug(caseItem)}.jpg`) ids.add(caseItem.id);
  }

  return [...ids];
}

function getNarrativeUse(relativePath, publicPath, cases) {
  const uses = [];
  for (const caseItem of cases) {
    if (caseItem.thumb === publicPath) uses.push({ caseId: caseItem.id, role: "hero/capa" });
    if (caseItem.ogImage === publicPath) uses.push({ caseId: caseItem.id, role: "social/SEO" });
    if (caseItem.gallery?.includes(publicPath)) uses.push({ caseId: caseItem.id, role: "galeria" });
  }

  if (!uses.length && /SOURCE\.md$/i.test(relativePath)) uses.push({ caseId: null, role: "proveniencia" });
  if (!uses.length && /manifest/i.test(relativePath)) uses.push({ caseId: null, role: "manifesto tecnico" });
  if (!uses.length) uses.push({ caseId: null, role: "acervo disponivel / ainda nao associado" });
  return uses;
}

function qualityLabel(dimensions, assetType) {
  if (assetType !== "image") return "nao aplicavel";
  if (!dimensions) return "resolucao nao lida";
  const shortestSide = Math.min(dimensions.width, dimensions.height);
  if (shortestSide >= 1600) return "alta";
  if (shortestSide >= 900) return "media";
  return "baixa ou uso restrito";
}

const cases = await loadCasesData(root);
const usedPaths = new Map();

for (const caseItem of cases) {
  for (const assetPath of [caseItem.thumb, caseItem.ogImage, ...(caseItem.gallery || [])].filter(Boolean)) {
    if (!usedPaths.has(assetPath)) usedPaths.set(assetPath, new Set());
    usedPaths.get(assetPath).add(caseItem.id);
  }
}

const allFiles = [];
for (const scanRoot of scanRoots) {
  allFiles.push(...await listFiles(scanRoot));
}

const manifest = [];
const hashes = new Map();

for (const absolutePath of allFiles.sort()) {
  const relativePath = normalizePath(absolutePath);
  const fileStat = await stat(absolutePath);
  const buffer = await readFile(absolutePath);
  const sha256 = createHash("sha256").update(buffer).digest("hex");
  const assetType = inferAssetType(relativePath);
  const dimensions = assetType === "image" ? readImageDimension(buffer) : null;
  const publicPath = relativePath.startsWith("public/") ? `/${relativePath.slice("public/".length)}` : null;
  const provenance = getProvenance(relativePath);
  const duplicatePaths = hashes.get(sha256) || [];

  const item = {
    assetId: `asset-${String(manifest.length + 1).padStart(4, "0")}`,
    caseIds: getCaseIds(relativePath, cases, usedPaths),
    path: relativePath,
    publicPath,
    assetType,
    extension: path.extname(relativePath).toLowerCase(),
    bytes: fileStat.size,
    width: dimensions?.width || null,
    height: dimensions?.height || null,
    quality: qualityLabel(dimensions, assetType),
    narrativeUse: getNarrativeUse(relativePath, publicPath, cases),
    classification: provenance.classification,
    provenance: provenance.provenance,
    representationRisk: provenance.risk,
    sha256,
    duplicates: duplicatePaths,
  };

  manifest.push(item);
  hashes.set(sha256, [...duplicatePaths, relativePath]);
}

const caseInventory = cases.map((caseItem) => {
  const assets = manifest.filter((asset) => asset.caseIds.includes(caseItem.id));
  return {
    id: caseItem.id,
    slug: getCaseSlug(caseItem),
    title: caseItem.title,
    disciplineCurrent: caseItem.category,
    route: `/case/${getCaseSlug(caseItem)}`,
    texts: {
      shortTese: Boolean(caseItem.shortTese),
      directorsNote: Boolean(caseItem.directorsNote),
      blocks: caseItem.blocks?.length || 0,
    },
    assets: {
      associated: assets.length,
      gallery: caseItem.gallery?.length || 0,
      images: assets.filter((asset) => asset.assetType === "image").length,
      videos: assets.filter((asset) => asset.assetType === "video").length,
      provenanceConfirmedOrDocumented: assets.filter((asset) => asset.classification !== "origem incerta").length,
      provenanceUnconfirmed: assets.filter((asset) => asset.classification === "origem incerta").length,
    },
    component: caseItem.id === "case-12" ? "ProvenceRaizCaseDetail" : "CaseDetail",
    status: "existente no working tree antes da reconstrucao editorial",
  };
});

const summary = {
  generatedAt: new Date().toISOString(),
  repository: root,
  scope: scanRoots.map(normalizePath),
  casesFound: cases.length,
  assetsFound: manifest.length,
  imagesFound: manifest.filter((item) => item.assetType === "image").length,
  videosFound: manifest.filter((item) => item.assetType === "video").length,
  documentsFound: manifest.filter((item) => item.assetType === "document").length,
  provenanceUnconfirmed: manifest.filter((item) => item.classification === "origem incerta").length,
  duplicatedAssets: manifest.filter((item) => item.duplicates.length > 0).length,
  fourthG4LockDocumented: false,
  fourthG4LockNote: "Nenhuma quarta trava foi localizada no repositorio. O inventario aplica apenas necessidade comprovada, fidelidade e proveniencia, alem do gate humano solicitado.",
};

await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, "G0_CASE_INVENTORY.json"), `${JSON.stringify({ summary, cases: caseInventory }, null, 2)}\n`, "utf8");
await writeFile(path.join(outputDirectory, "G2_ASSET_MANIFEST.json"), `${JSON.stringify({ summary, assets: manifest }, null, 2)}\n`, "utf8");

const markdownRows = caseInventory.map((caseItem) => (
  `| ${caseItem.id} | ${caseItem.title.replaceAll("|", "\\|")} | ${caseItem.assets.associated} | ${caseItem.assets.videos} | ${caseItem.assets.provenanceUnconfirmed} | ${caseItem.route} |`
));

const markdown = `# Inventario tecnico do portfolio\n\n` +
  `Gerado em: ${summary.generatedAt}\n\n` +
  `- Cases encontrados: ${summary.casesFound}\n` +
  `- Assets inventariados: ${summary.assetsFound}\n` +
  `- Imagens: ${summary.imagesFound}\n` +
  `- Videos: ${summary.videosFound}\n` +
  `- Documentos/manifestos: ${summary.documentsFound}\n` +
  `- Itens com proveniencia nao confirmada: ${summary.provenanceUnconfirmed}\n` +
  `- Quarta trava G4 documentada: nao localizada\n\n` +
  `| ID | Case atual | Assets associados | Videos | Origem incerta | Rota atual |\n` +
  `| --- | --- | ---: | ---: | ---: | --- |\n` +
  `${markdownRows.join("\n")}\n\n` +
  `O manifesto detalhado, incluindo dimensoes, SHA-256, duplicacoes, classificacao e risco de representacao, esta em \`G2_ASSET_MANIFEST.json\`.\n`;

await writeFile(path.join(outputDirectory, "G0_INVENTARIO_RESUMIDO.md"), markdown, "utf8");

console.log(`Portfolio inventory generated: ${summary.casesFound} cases, ${summary.assetsFound} assets.`);
