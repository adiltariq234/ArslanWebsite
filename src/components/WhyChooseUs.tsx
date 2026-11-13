"use client";

import { motion } from "framer-motion";
import { benefits } from "@/config/content";
import { EASE } from "./ui/Motion";
import { SectionHeading } from "./ui/SectionHeading";
import { BenefitIcon } from "./ui/Icons";

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-charcoal py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-gold/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-blush-deep/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="why-title"
          tone="dark"
          eyebrow="Why Choose Us"
          title={
            <>
              The art of{" "}
              <em className="font-light italic text-gold-light">flawless celebration</em>
            </>
          }
          text="Beautiful decor is only the beginning. Here is what makes planning with us calm, creative and completely worth it."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.li
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.1 }}
              className="group relative bg-charcoal p-9 transition-colors duration-500 hover:bg-charcoal-soft sm:p-11"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold-light transition-all duration-500 group-hover:scale-110 group-hover:border-gold-light group-hover:bg-gold/10">
                <BenefitIcon name={b.icon} />
              </span>
              <h3 className="mt-7 font-display text-[1.7rem] font-medium leading-snug text-ivory">
                {b.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ivory/65">{b.text}</p>
              <span
                aria-hidden="true"
                className="absolute right-8 top-8 font-display text-5xl font-light text-ivory/[0.06]"
              >
                0{i + 1}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
