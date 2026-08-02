export const deliveryPortal = {
  slug: "showroom-av2027",
  route: "entregas/showroom-av2027",
  title: "Showroom Alto Verão 2027",
  kicker: "Portal de entrega",
  client: "Trade Reserva",
  showroom: "TW Gestão de Marcas",
  scope: "Visual Merchandising, cartografia operacional e registro fotográfico",
  author: "Samuel Carrera Paes · Paes Consultoria",
  description:
    "Entrega final organizada para consulta: relatório estratégico, fotografias de registro e vídeo complementar da implantação do showroom.",
  accessNote:
    "Esta página é uma entrega reservada. Ela não aparece no menu principal e foi configurada para não ser indexada por mecanismos de busca.",
  summary: [
    "O relatório documenta a lógica que sustenta a montagem: leitura comercial, percurso, pontos de exposição, jornadas e critérios de manutenção.",
    "As fotografias funcionam como evidência visual da implantação e podem ser consultadas pela equipe para arquivo, apresentação e futuras atualizações.",
    "O vídeo complementar apoia a leitura dinâmica do espaço, especialmente para revisão interna e alinhamento com quem não acompanhou a montagem presencialmente.",
  ],
  files: [
    {
      id: "relatorio",
      label: "Relatório final",
      type: "PDF",
      meta: "31 páginas · estratégia, planta, jornadas e registros",
      status: "Preparado para Vercel Blob",
      href: "",
    },
    {
      id: "fotos",
      label: "Fotografias organizadas",
      type: "ZIP",
      meta: "Curadoria de imagens em alta para consulta e arquivo",
      status: "Preparado para Vercel Blob",
      href: "",
    },
    {
      id: "video",
      label: "Vídeo complementar",
      type: "MP4",
      meta: "Leitura dinâmica solicitada pelo showroom",
      status: "Aguardando arquivo final",
      href: "",
    },
  ],
  checkpoints: [
    ["01", "Leitura", "Arquitetura, coleção, mobiliário e restrições existentes."],
    ["02", "Jornada", "Percursos comerciais organizados por intenção de visita."],
    ["03", "Estratégia", "Critérios para chegada, centro de marca, sazonalidade e permanência."],
    ["04", "Registro", "Evidências fotográficas para memória e manutenção visual."],
  ],
};
