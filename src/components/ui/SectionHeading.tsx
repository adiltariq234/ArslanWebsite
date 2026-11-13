import type { ReactNode } from "react";
import { Reveal } from "./Motion";

interface Props {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  tone = "light",
  id,
}: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <Reveal>
        <p
          className={`flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.32em] ${
            align === "center" ? "justify-center" : ""
          } ${dark ? "text-gold-light" : "text-gold-dark"}`}
        >
          <span className={`h-px w-8 ${dark ? "bg-gold-light/60" : "bg-gold/60"}`} />
          {eyebrow}
          <span
            className={`h-px w-8 ${align === "left" ? "hidden" : ""} ${
              dark ? "bg-gold-light/60" : "bg-gold/60"
            }`}
          />
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={`mt-5 font-display text-4xl font-light leading-[1.08] sm:text-5xl lg:text-[3.4rem] ${
            dark ? "text-ivory" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {text ? (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              dark ? "text-ivory/70" : "text-ink-soft"
            }`}
          >
            {text}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
