import { siteConfig } from "@/config/site";

/** Text/ornament logo. Set `siteConfig.logo` to use an image instead. */
export function Logo({ light = false }: { light?: boolean }) {
  if (siteConfig.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={siteConfig.logo} alt={siteConfig.name} className="h-10 w-auto" />;
  }
  return (
    <span className="flex items-center gap-3">
      <svg
        viewBox="0 0 40 40"
        className={`h-9 w-9 transition-colors duration-500 ${light ? "text-gold-light" : "text-gold-dark"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18.5" />
        <path d="M20 8c1.6 6.4 4 9 12 12-8 3-10.4 5.6-12 12-1.6-6.4-4-9-12-12 8-3 10.4-5.6 12-12Z" />
        <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.4rem] font-medium tracking-wide transition-colors duration-500 ${
            light ? "text-ivory" : "text-charcoal"
          }`}
        >
          {siteConfig.name}
        </span>
        <span
          className={`mt-1 text-[0.58rem] uppercase tracking-[0.34em] transition-colors duration-500 ${
            light ? "text-ivory/70" : "text-ink-soft"
          }`}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </span>
  );
}
