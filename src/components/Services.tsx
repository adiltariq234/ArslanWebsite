"use client";

import { motion } from "framer-motion";
import { alsoOffered, services } from "@/config/content";
import { prefillInquiry } from "@/lib/inquiry";
import { EASE, Reveal } from "./ui/Motion";
import { SectionHeading } from "./ui/SectionHeading";
import { SiteImage } from "./ui/SiteImage";
import { ArrowIcon } from "./ui/Icons";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="Our Services"
          title={
            <>
              Decor for every{" "}
              <em className="font-light italic text-gold-dark">celebration</em>
            </>
          }
          text="Whatever the occasion, we design immersive settings that look stunning, feel personal and run seamlessly."
        />

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.li
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.12 }}
              whileHover={{ y: -8 }}
              className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-ivory shadow-[0_10px_40px_-25px_rgba(42,39,36,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(42,39,36,0.4)]"
            >
              <div className="relative aspect-[4/3.4] overflow-hidden">
                <SiteImage
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="glass absolute left-4 top-4 rounded-full px-3.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-charcoal">
                  0{i + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-3xl font-medium leading-tight text-charcoal">
                  {service.title}
                </h3>
                <span className="mt-4 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-24" />
                <p className="mt-4 flex-1 leading-relaxed text-ink-soft">{service.description}</p>
                <button
                  type="button"
                  onClick={() => prefillInquiry(service.eventType)}
                  aria-label={`Inquire about ${service.title}`}
                  className="mt-7 inline-flex items-center gap-3 self-start rounded-full border border-charcoal/20 px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-charcoal transition-all duration-500 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                >
                  Inquire Now
                  <ArrowIcon width={16} height={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-ink-soft">
            Also available
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {alsoOffered.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => prefillInquiry(item.eventType)}
                  className="rounded-full border border-gold/50 bg-blush/40 px-6 py-2.5 font-display text-lg italic text-charcoal transition-colors duration-300 hover:bg-blush"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
