import { useState } from "react";

export function ImageWithFallback({
  src,
  desktopSrc,
  alt,
  imageClassName = "",
  containerClassName = "",
  fallbackLabel,
  loading = "lazy",
  fetchPriority = "auto",
  mode = "natural",
  sizes = "100vw",
  fitClassName,
  positionClassName = "object-center",
}) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isNatural = mode === "natural";
  const resolvedFitClassName = fitClassName || (isNatural ? "object-contain" : "object-cover");
  const accessibleName = alt || fallbackLabel || "Imagem do projeto";

  return (
    <div
      className={`relative flex w-full items-center justify-center bg-stone-200/40 ${
        isNatural ? "h-auto" : "h-full overflow-hidden"
      } ${containerClassName}`}
    >
      {!error ? (
        <picture className={isNatural ? "block w-full" : "absolute inset-0 block h-full w-full"}>
          {desktopSrc && desktopSrc !== src && <source media="(min-width: 640px)" srcSet={desktopSrc} />}
          <img
            src={src}
            alt={accessibleName}
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
            sizes={sizes}
            onLoad={() => setIsLoaded(true)}
            onError={() => setError(true)}
            className={`w-full transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none ${
              isNatural ? "block h-auto" : "absolute inset-0 h-full"
            } ${resolvedFitClassName} ${positionClassName} ${
              isLoaded ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"
            } ${imageClassName}`}
          />
        </picture>
      ) : (
        <div
          role="img"
          aria-label={accessibleName}
          className={`z-0 flex flex-col items-center justify-center bg-stone-200/60 p-6 text-center ${
            isNatural ? "aspect-[4/5] w-full" : "absolute inset-0"
          }`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">
            {fallbackLabel || "Imagem indisponível"}
          </span>
        </div>
      )}
    </div>
  );
}
