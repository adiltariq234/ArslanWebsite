"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/config/content";
import { EASE } from "./ui/Motion";
import { SectionHeading } from "./ui/SectionHeading";
import { QuoteIcon, StarIcon } from "./ui/Icons";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="grain overflow-hidden bg-blush/30 py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title={
            <>
              Kind words from{" "}
              <em className="font-light italic text-gold-dark">happy hosts</em>
            </>
          }
          text="The greatest compliment is a celebration remembered fondly."
        />

        <ul className="no-scrollbar -mx-5 mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.12 }}
              className="glass relative flex w-[85%] shrink-0 snap-center flex-col rounded-3xl p-8 shadow-[0_20px_50px_-30px_rgba(42,39,36,0.35)] sm:w-auto sm:p-9"
            >
              <QuoteIcon className="h-9 w-9 text-gold/70" />
              <div
                className="mt-5 flex gap-1 text-gold"
                role="img"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, s) => (
                  <StarIcon key={s} width={16} height={16} />
                ))}
              </div>
              <figure className="flex flex-1 flex-col"><blockquote className="mt-5 flex-1 font-display text-[1.35rem] font-normal italic leading-[1.5] text-charcoal">
                “{t.quote}”
              </blockquote>
              <div className="mt-8 flex items-center gap-4 border-t border-charcoal/10 pt-6">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-champagne font-display text-xl text-gold-dark"
                >
                  {t.name.replace("Sample Client — ", "").charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium tracking-wide text-charcoal">
                    {t.name}
                  </span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-ink-soft">
                    {t.event}
                  </span>
                </span>
              </div>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
