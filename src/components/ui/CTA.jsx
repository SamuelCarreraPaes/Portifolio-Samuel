const CTA_VARIANTS = {
  primary: "sp-primary-cta rounded-sm text-[10px] font-bold uppercase tracking-[0.22em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245071]",
  secondary: "sp-secondary-cta w-fit rounded-sm text-[10px] font-bold uppercase tracking-[0.22em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245071]",
  dark: "inline-flex w-fit items-center justify-center gap-3 border border-[#F4F0E9]/25 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F4F0E9] transition-colors hover:border-[#F4F0E9]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E9] rounded-sm",
};

export function CTAButton({
  children,
  onClick,
  analyticsId,
  variant = "primary",
  icon,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      data-analytics-id={analyticsId}
      className={`${CTA_VARIANTS[variant] || CTA_VARIANTS.primary} ${className}`.trim()}
    >
      {children}
      {icon}
    </button>
  );
}
