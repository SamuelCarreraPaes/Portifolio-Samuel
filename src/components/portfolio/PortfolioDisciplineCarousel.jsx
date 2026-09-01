import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeftCircle, ArrowRightCircle, ArrowUpRight } from "lucide-react";

import { formatPortfolioTerm, getPortfolioCover } from "../../portfolioPresentation";
import { ImageWithFallback } from "./ImageWithFallback";

const PREMIUM_EASE = [0.22, 1, 0.36, 1];

export function PortfolioDisciplineCarousel({ category, categoryIndex, categoryCases, onOpenCase }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeCase = categoryCases[activeIndex];

  if (!activeCase) return null;

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + categoryCases.length) % categoryCases.length);
  };

  const handleRegionKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  const previousIndex = (activeIndex - 1 + categoryCases.length) % categoryCases.length;
  const nextIndex = (activeIndex + 1) % categoryCases.length;
  const cover = getPortfolioCover(activeCase);

  return (
    <section
      id={category.id}
      className="scroll-mt-32 border-b border-stone-900/10 py-24 md:py-32 lg:py-40"
      aria-labelledby={`${category.id}-title`}
    >
      <header className="mb-12 max-w-6xl md:mb-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone-400">
            {String(categoryIndex + 1).padStart(2, "0")} / Disciplina
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">
            {categoryCases.length} {categoryCases.length === 1 ? "case" : "cases"}
          </span>
        </div>
        <h2
          id={`${category.id}-title`}
          className="max-w-full break-words font-serif text-[clamp(2.5rem,12.5vw,4.5rem)] leading-[0.82] tracking-[-0.05em] text-stone-950 text-balance md:max-w-[13ch] md:text-[clamp(4.5rem,9vw,8.75rem)] md:leading-[0.78] md:tracking-[-0.055em]"
        >
          {category.label}
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-start md:gap-12">
          <p className="font-serif text-2xl leading-tight text-stone-900 md:text-4xl">{category.title}</p>
          <p className="max-w-3xl text-base font-light leading-relaxed text-stone-600 md:text-lg">{category.description}</p>
        </div>
      </header>

      <div
        className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-4"
        role="region"
        aria-roledescription="carrossel"
        aria-label={`Cases de ${category.label}. Use as setas esquerda e direita para navegar.`}
        tabIndex={0}
        onKeyDown={handleRegionKeyDown}
      >
        <p className="sr-only" aria-live="polite">
          Case {activeIndex + 1} de {categoryCases.length}: {activeCase.title}
        </p>

        <div className={`relative aspect-[4/5] overflow-hidden rounded-sm shadow-sm sm:aspect-[3/2] lg:aspect-[16/9] ${cover.frameClassName}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${activeIndex + 1} de ${categoryCases.length}: ${activeCase.title}`}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: PREMIUM_EASE }}
              className="absolute inset-0"
            >
              <button
                type="button"
                onClick={() => onOpenCase(activeCase)}
                aria-label={`Abrir case ${activeCase.title}`}
                className="group h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                <ImageWithFallback
                  src={cover.mobileSrc}
                  desktopSrc={cover.desktopSrc}
                  mode="cover"
                  loading={categoryIndex === 0 ? "eager" : "lazy"}
                  fetchPriority={categoryIndex === 0 ? "high" : "auto"}
                  sizes="(min-width: 1440px) 1440px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 48px)"
                  alt={`Capa do case ${activeCase.title}`}
                  fitClassName={cover.fitClassName}
                  positionClassName={cover.positionClassName}
                  imageClassName="ease-out group-hover:scale-[1.02]"
                  fallbackLabel={activeCase.title}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-stone-950/5" aria-hidden="true" />
                <span className="absolute bottom-5 left-5 rounded-full bg-[#F4F0E9]/92 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-stone-900 backdrop-blur md:bottom-8 md:left-8">
                  Abrir case
                </span>
              </button>
            </motion.div>
          </AnimatePresence>

          <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-wrap gap-2 md:left-8 md:top-8">
            <span className="rounded-full bg-[#F4F0E9]/92 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-stone-900 backdrop-blur">
              {activeCase.projectFamily || activeCase.territory}
            </span>
            {activeCase.interventionLabel && (
              <span className="rounded-full bg-stone-950/85 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                {activeCase.interventionLabel}
              </span>
            )}
            {cover.sourceNote && (
              <span className="hidden rounded-full bg-[#F4F0E9]/92 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-stone-700 backdrop-blur sm:inline-flex">
                Capa editorial
              </span>
            )}
          </div>

          {categoryCases.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 z-20 flex -translate-y-1/2 justify-between md:inset-x-8">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={`Case anterior: ${categoryCases[previousIndex].title}`}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-stone-950/65 text-white shadow-lg backdrop-blur transition-colors hover:bg-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ArrowLeftCircle className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label={`Próximo case: ${categoryCases[nextIndex].title}`}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-stone-950/65 text-white shadow-lg backdrop-blur transition-colors hover:bg-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ArrowRightCircle className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          )}

          <span className="absolute bottom-5 right-5 z-10 rounded-full bg-stone-950/70 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-white backdrop-blur md:bottom-8 md:right-8" aria-hidden="true">
            {String(activeIndex + 1).padStart(2, "0")} / {String(categoryCases.length).padStart(2, "0")}
          </span>
        </div>

        {cover.sourceNote && <p className="mt-3 max-w-3xl text-[10px] font-light leading-relaxed text-stone-500">{cover.sourceNote}</p>}

        <div className="grid gap-8 border-b border-stone-900/10 py-8 md:grid-cols-[1.25fr_0.75fr] md:items-end md:py-10">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400">{formatPortfolioTerm(activeCase.territory)}</p>
            <h3 className="max-w-4xl font-serif text-3xl leading-[0.95] tracking-tight text-stone-950 text-balance md:text-5xl">{activeCase.title}</h3>
            <p className="mt-5 max-w-3xl text-sm font-light leading-relaxed text-stone-600 md:text-base">{activeCase.shortTese}</p>
          </div>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <p className="max-w-md text-left text-xs font-light leading-relaxed text-stone-500 md:text-right">
              Papel de Samuel: {activeCase.role} · {activeCase.deliverables}
            </p>
            <button
              type="button"
              onClick={() => onOpenCase(activeCase)}
              className="inline-flex min-h-11 items-center gap-2 border-b border-stone-900/25 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-800 transition-colors hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              Ver case completo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {categoryCases.length > 1 && (
          <div className="mt-5 flex max-w-full gap-2 overflow-x-auto pb-2" aria-label={`Selecionar case de ${category.label}`}>
            {categoryCases.map((caseItem, index) => (
              <button
                key={caseItem.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Mostrar ${caseItem.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                  index === activeIndex
                    ? "border-stone-950 bg-stone-950 text-white"
                    : "border-stone-900/15 text-stone-500 hover:border-stone-900/50 hover:text-stone-900"
                }`}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="max-w-[13rem] truncate normal-case tracking-normal">{caseItem.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
