"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { SiteImage } from "./ui/SiteImage";
import { EASE } from "./ui/Motion";

const ticker = [
  "Weddings",
  "Birthdays",
  "Mehndi & Mayun",
  "Engagements",
  "Anniversaries",
  "Bridal & Baby Showers",
  "Corporate Events",
  "Private Parties",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const line = (delay: number) => ({
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease: EASE, delay },
  });

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Welcome"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.div
          className="absolute inset-0 -top-[8%] h-[116%]"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <SiteImage
            src={siteConfig.images.hero}
            alt="Elegant outdoor wedding ceremony with white floral arches"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/35 to-charcoal/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-28 pt-36 sm:px-8"
      >
        <motion.p
          {...line(0.3)}
          className="flex items-center gap-4 text-[0.72rem] font-medium uppercase tracking-[0.38em] text-gold-light"
        >
          <span className="h-px w-10 bg-gold-light/70" />
          {siteConfig.tagline}
        </motion.p>

        <h1 className="mt-7 max-w-4xl font-display text-[2.9rem] font-light leading-[1.02] text-ivory sm:text-7xl lg:text-[6.4rem]">
          <motion.span className="block" {...line(0.45)}>
            We Make Every
          </motion.span>
          <motion.span className="block" {...line(0.6)}>
            Moment <em className="font-light italic text-gold-light">Extraordinary.</em>
          </motion.span>
        </h1>

        <motion.p
          {...line(0.85)}
          className="mt-7 max-w-xl text-lg font-light leading-relaxed text-ivory/85 sm:text-xl"
        >
          Turning your special occasions into unforgettable memories.
        </motion.p>

        <motion.div {...line(1.05)} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#gallery"
            className="glass-dark group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-500 hover:bg-ivory hover:text-charcoal"
          >
            Explore Our Work
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#booking"
            className="btn-gold inline-flex items-center justify-center rounded-full px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.22em] text-charcoal"
          >
            Book Your Event
          </a>
        </motion.div>
      </motion.div>

      {/* Ticker */}
      <div className="glass-dark absolute inset-x-0 bottom-0 z-10 overflow-hidden border-x-0 border-b-0 py-4">
        <div className="marquee flex w-max gap-12 whitespace-nowrap" aria-hidden="true">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-display text-xl italic text-ivory/80"
            >
              {t}
              <span className="text-gold-light">✦</span>
            </span>
          ))}
        </div>
        <p className="sr-only">
          Weddings, birthdays, mehndi and mayun, engagements, anniversaries, showers, corporate
          events and private parties.
        </p>
      </div>
    </section>
  );
}
