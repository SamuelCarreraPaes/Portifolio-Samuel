import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PREMIUM_EASE } from "../motionConfig";

export function ImageWithFallback({
  src,
  alt,
  imageClassName = "",
  fallbackLabel,
  loading = "lazy",
  mode = "natural",
  sources = [],
  srcSet,
  sizes,
  width,
  height,
  fetchPriority
}) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isNatural = mode === "natural";
  const isContain = mode === "contain";

  return (
    <div
      role={error ? "img" : undefined}
      aria-label={error ? alt || fallbackLabel : undefined}
      className={`w-full bg-stone-200/40 flex items-center justify-center ${isNatural ? 'h-auto relative' : 'h-full relative overflow-hidden'}`}
    >
      {!error ? (
        <picture>
          {sources.map((source) => (
            <source key={`${source.type || "source"}-${source.srcSet}`} {...source} />
          ))}
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt || fallbackLabel}
            loading={loading}
            decoding="async"
            width={width}
            height={height}
            fetchPriority={fetchPriority}
            onLoad={() => setIsLoaded(true)}
            onError={() => setError(true)}
            className={`w-full transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isNatural ? "h-auto block object-contain" : `h-full absolute inset-0 ${isContain ? "object-contain" : "object-cover"}`
            } object-center ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } ${imageClassName}`}
          />
        </picture>
      ) : (
        <div className={`flex flex-col items-center justify-center p-6 text-center z-0 bg-stone-200/60 ${isNatural ? 'aspect-[4/5]' : 'absolute inset-0'}`}>
          <span className="text-[10px] text-stone-500 uppercase tracking-[0.25em] font-semibold">{fallbackLabel}</span>
        </div>
      )}
    </div>
  );
}

export const PageTransition = ({ children, className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.99 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: PREMIUM_EASE }}
      className={`min-h-screen pt-24 pb-32 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export function EditorialConnectionGrid({ eyebrow = "CONEXÕES", title, description, items, links, navigate }) {
  const gridItems = items || links || [];
  const titleId = `${eyebrow.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}-title`;

  return (
    <section className="border-t border-stone-900/10 py-16" aria-labelledby={title ? titleId : undefined}>
      <header className="mb-10 max-w-4xl">
        <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">{eyebrow}</span>
        {title && (
          <h2 id={titleId} className="font-serif text-3xl leading-tight text-stone-950 md:text-5xl text-balance">
            {title}
          </h2>
        )}
        {description && (
          <p className="mt-6 max-w-3xl text-base font-light leading-relaxed text-stone-600 md:text-lg">
            {description}
          </p>
        )}
      </header>
      <nav className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label={eyebrow}>
        {gridItems.map((item) => (
          <button
            key={item.route}
            type="button"
            onClick={() => navigate(item.route)}
            className="group min-h-36 border border-stone-900/10 bg-white/25 p-6 text-left transition-colors duration-500 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">{item.eyebrow || "Conexão"}</span>
            <span className="mt-4 block font-serif text-2xl leading-tight text-stone-950 group-hover:text-stone-600">{item.title || item.label}</span>
            {item.text && <span className="mt-4 block text-sm font-light leading-relaxed text-stone-600">{item.text}</span>}
          </button>
        ))}
      </nav>
    </section>
  );
}
