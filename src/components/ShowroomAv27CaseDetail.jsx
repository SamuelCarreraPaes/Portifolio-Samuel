import { ArrowLeftCircle, ArrowRightCircle, ArrowUpRight } from "lucide-react";

import {
  showroomAv27Decisions,
  showroomAv27Images,
  showroomAv27Journeys,
  showroomAv27MaintenanceChecks,
  showroomAv27OperationalLegend,
  showroomAv27ReadingSystem,
  showroomAv27StrategySections,
} from "../data/showroomAv27Case";
import { DynamicSEO } from "../seo";
import { ImageWithFallback, PageTransition } from "./shared";

function shareCase({ title, text }) {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title, text, url }).catch(() => {});
    return;
  }

  navigator.clipboard?.writeText(url);
}

export function ShowroomAv27CaseDetail({ c, navigate, totalCases, previousCaseId, nextCaseId, isLast }) {
  const recordMedia = c.media.filter((mediaItem) => mediaItem.src.includes("/photos/"));
  const mapFigures = [
    {
      eyebrow: "01 · Planta operacional",
      title: "Arquitetura, mobiliário e pontos de decisão.",
      text: "A planta localiza a estrutura física do showroom: setores, mobiliário, circulação e marcadores operacionais. A legenda preserva a leitura do desenho sem sobrecarregar a imagem.",
      image: showroomAv27Images.plantaOperacional,
      alt: "Planta operacional do showroom Alto Verão 2027 com mobiliário e pontos numerados.",
      items: showroomAv27OperationalLegend,
    },
    {
      eyebrow: "02 · Mapa de jornadas",
      title: "Recepção, exploração, venda consultiva e complemento.",
      text: "O mapa de jornadas traduz a leitura espacial em intenção comercial. Ele não mede comportamento: organiza caminhos prováveis e papéis de cada zona na experiência.",
      image: showroomAv27Images.mapaJornadas,
      alt: "Mapa de jornadas comerciais do showroom Alto Verão 2027 com fluxos coloridos.",
      items: showroomAv27Journeys,
    },
  ];

  return (
    <PageTransition>
      <DynamicSEO
        title={c.seo.title}
        description={c.seo.description}
        image={c.seo.ogImage}
        url={c.seo.canonicalPath}
        schemaType="CreativeWork"
      />

      <article className="mx-auto max-w-[92rem] px-6 pt-12 pb-24 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
          <button type="button" onClick={() => navigate("cases")} className="min-h-10 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">Portfólio</button>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-stone-700">Showroom Alto Verão 2027</span>
        </nav>

        <header className="grid gap-10 border-b border-stone-900/10 pb-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Case {c.number}/{totalCases} · Store Experience · Visual Merchandising</span>
            <h1 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-[-0.02em] text-stone-950 text-balance md:text-[6.5rem]">{c.title}</h1>
            <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-stone-600 text-balance">{c.originalDescription}</p>
          </div>

          <dl className="grid gap-5 border-y border-stone-900/10 py-8 sm:grid-cols-2">
            {[
              ["Cliente / contexto", c.client],
              ["Papel", c.role],
              ["Território", c.territory],
              ["Entregáveis", c.deliverables.join(" · ")],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">{label}</dt>
                <dd className="text-sm font-light leading-relaxed text-stone-900">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <figure className="my-16 overflow-hidden rounded-sm border border-stone-900/10 bg-stone-200/40 shadow-sm">
          <ImageWithFallback src={c.thumb} alt={`Imagem principal do case ${c.title}`} loading="eager" mode="natural" fetchPriority="high" />
          <figcaption className="border-t border-stone-900/10 px-4 py-3 text-xs font-light leading-relaxed text-stone-500">Imagem de abertura do case: presença de produto, materialidade e leitura comercial do showroom.</figcaption>
        </figure>

        <section className="grid gap-10 py-20 md:grid-cols-[0.85fr_1.15fr]" aria-labelledby="av27-executive-title">
          <div>
            <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Síntese executiva</span>
            <h2 id="av27-executive-title" className="font-serif text-4xl leading-tight text-stone-950 text-balance md:text-6xl">Quando a coleção muda, o espaço não pode perder sua lógica.</h2>
          </div>
          <div className="space-y-6 text-lg font-light leading-relaxed text-stone-700">
            <p>A implantação foi tratada como uma readaptação operacional: atualizar coleção sem dissolver percurso, presença de marca e leitura por famílias, ocasiões e pontos de decisão.</p>
            <p>A entrega consolida uma arquitetura comercial capaz de reduzir ruído visual, tornar a navegação mais fluida e organizar a percepção da coleção por famílias, ocasiões e pontos de decisão.</p>
            <p>A cartografia não substitui a montagem. Ela registra a lógica que permite atualizar o showroom sem perder leitura, percurso e presença comercial.</p>
          </div>
        </section>

        <section className="border-y border-stone-900/10 py-16" aria-labelledby="av27-decisions-title">
          <div className="mb-10 grid gap-6 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Decisões centrais</span>
              <h2 id="av27-decisions-title" className="font-serif text-4xl leading-tight text-stone-950">A montagem virou um conjunto claro de prioridades.</h2>
            </div>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-stone-600">As decisões abaixo organizam o que deve permanecer legível quando a coleção muda: chegada, centro de marca, ocasião de uso, sazonalidade, permanência e complemento.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-stone-900/10 bg-stone-900/10 md:grid-cols-3">
            {showroomAv27Decisions.map(([title, text], index) => (
              <section key={title} className="bg-[#F4F0E9] p-6">
                <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-2xl leading-tight text-stone-950">{title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-stone-600">{text}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="grid gap-12 py-20 lg:grid-cols-[0.7fr_1.3fr]" aria-labelledby="av27-reading-title">
          <div>
            <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Sistema de leitura</span>
            <h2 id="av27-reading-title" className="font-serif text-4xl leading-tight text-stone-950 text-balance md:text-5xl">Da arquitetura à ação comercial.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {showroomAv27ReadingSystem.map(([title, text], index) => (
              <section key={title} className="border-t border-stone-900/15 pt-5">
                <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-xl leading-tight text-stone-950">{title}</h3>
                <p className="mt-4 text-xs font-light leading-relaxed text-stone-600">{text}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="space-y-16 py-8" aria-labelledby="av27-maps-title">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Mapas desagrupados</span>
              <h2 id="av27-maps-title" className="font-serif text-4xl leading-tight text-stone-950 text-balance md:text-6xl">Cada mapa tem função, leitura e apoio próprios.</h2>
            </div>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-stone-600">Separar a planta operacional do mapa de jornadas evita que dois instrumentos diferentes disputem atenção na mesma dobra: um localiza a arquitetura, o outro interpreta a intenção comercial do percurso.</p>
          </div>

          {mapFigures.map((figure) => (
            <section key={figure.title} className="grid gap-8 border-t border-stone-900/10 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <figure className="overflow-hidden rounded-sm border border-stone-900/10 bg-white shadow-sm">
                <ImageWithFallback src={figure.image} alt={figure.alt} mode="natural" imageClassName="bg-white" />
              </figure>
              <div>
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">{figure.eyebrow}</span>
                <h3 className="font-serif text-3xl leading-tight text-stone-950">{figure.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-stone-600">{figure.text}</p>
                <dl className="mt-8 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                  {figure.items.map(([key, value]) => (
                    <div key={`${figure.title}-${key}`} className="grid grid-cols-[3rem_1fr] border-t border-stone-900/10 pt-3">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">{key}</dt>
                      <dd className="text-xs font-light leading-relaxed text-stone-700">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          ))}
        </section>

        <section className="mt-20 border-y border-stone-900/10 py-16" aria-labelledby="av27-strategy-title">
          <div className="mb-12 grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Estratégias aplicadas</span>
              <h2 id="av27-strategy-title" className="font-serif text-4xl leading-tight text-stone-950 text-balance md:text-5xl">Critérios para montar, ler e atualizar o showroom.</h2>
            </div>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-stone-600">A estratégia transforma leitura espacial em decisão prática: onde concentrar presença, onde preservar respiro e como atualizar produto sem perder a gramática comercial do showroom.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showroomAv27StrategySections.map(([title, objective, care]) => (
              <section key={title} className="rounded-sm border border-stone-900/10 p-6">
                <h3 className="font-serif text-2xl leading-tight text-stone-950">{title}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-700">{objective}</p>
                <p className="mt-5 border-t border-stone-900/10 pt-4 text-xs font-light leading-relaxed text-stone-500"><strong className="font-bold uppercase tracking-[0.18em] text-stone-700">Cuidado</strong><br />{care}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="py-20" aria-labelledby="av27-records-title">
          <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Registros selecionados</span>
              <h2 id="av27-records-title" className="font-serif text-4xl leading-tight text-stone-950 text-balance md:text-6xl">Fotografia como evidência de implantação.</h2>
            </div>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-stone-600">A seleção visual documenta pontos de exposição e relações comerciais suficientes para consultar o sistema sem transformar o case em relatório integral.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {recordMedia.map((mediaItem, index) => (
              <figure key={mediaItem.src} className={`group overflow-hidden rounded-sm border border-stone-900/10 bg-stone-200/40 shadow-sm ${index % 5 === 0 ? "md:col-span-2" : ""}`}>
                <ImageWithFallback src={mediaItem.src} alt={mediaItem.alt} mode="natural" imageClassName="group-hover:scale-[1.015] transition-transform duration-[1.5s] ease-out" />
                <figcaption className="border-t border-stone-900/10 px-4 py-3 text-xs font-light leading-relaxed text-stone-500">{mediaItem.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-y border-stone-900/10 py-16 md:grid-cols-[0.8fr_1.2fr]" aria-labelledby="av27-maintenance-title">
          <div>
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400">Manutenção da cartografia</span>
            <h2 id="av27-maintenance-title" className="font-serif text-4xl leading-tight text-stone-950 text-balance">O que deve permanecer quando a coleção mudar.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {showroomAv27MaintenanceChecks.map(([title, text]) => (
              <section key={title} className="border-t border-stone-900/10 pt-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500">{title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-stone-700">{text}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-20 bg-stone-950 px-7 py-16 text-stone-50 md:px-12 md:py-20" aria-labelledby="av27-impact-title">
          <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Ficha do case</span>
          <h2 id="av27-impact-title" className="max-w-4xl font-serif text-4xl leading-tight text-balance md:text-6xl">Visual Merchandising como sistema.</h2>
          <p className="mt-8 max-w-3xl text-base font-light leading-relaxed text-stone-300">{c.impact.publicText}</p>
          <button type="button" onClick={() => shareCase({ title: c.title, text: c.originalDescription })} className="mt-10 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Compartilhar case <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </section>

        <nav aria-label="Paginação de Cases" className="mt-16 flex flex-col gap-4 border-t border-stone-900/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={() => navigate("cases")} className="inline-flex min-h-11 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">
            <ArrowLeftCircle className="h-5 w-5" aria-hidden="true" /> Voltar aos cases
          </button>
          {previousCaseId && (
            <button type="button" onClick={() => navigate(`case/${previousCaseId}`)} className="inline-flex min-h-11 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">
              Case anterior <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          {!isLast && nextCaseId && (
            <button type="button" onClick={() => navigate(`case/${nextCaseId}`)} className="inline-flex min-h-11 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950 transition-colors hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900">
              Próximo case <ArrowRightCircle className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </nav>
      </article>
    </PageTransition>
  );
}
