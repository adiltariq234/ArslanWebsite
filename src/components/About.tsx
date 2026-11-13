"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { processSteps } from "@/config/content";
import { Reveal, RevealImage } from "./ui/Motion";
import { SectionHeading } from "./ui/SectionHeading";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-title"
      className="grain overflow-hidden bg-ivory py-24 sm:py-32"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        {/* Imagery */}
        <div className="relative mx-auto w-full max-w-xl pb-16 lg:mx-0 lg:max-w-none">
          <RevealImage
            src={siteConfig.images.about}
            alt="Beautifully styled outdoor ceremony with floral decor"
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="aspect-[4/5] w-[82%] rounded-t-[999px] rounded-b-2xl"
          />
          <motion.div
            style={{ y: floatY }}
            className="absolute -bottom-2 right-0 w-[52%]"
          >
            <RevealImage
              src={siteConfig.images.aboutSecondary}
              alt="Luxurious reception table with floral decor"
              sizes="(min-width: 1024px) 24vw, 45vw"
              delay={0.25}
              className="aspect-[4/5] rounded-2xl border-[6px] border-ivory shadow-2xl shadow-charcoal/20"
            />
          </motion.div>
          <Reveal delay={0.5} className="absolute left-[4%] top-[58%] hidden sm:block">
            <div className="glass rounded-2xl px-6 py-5 shadow-xl shadow-charcoal/10">
              <p className="font-display text-3xl italic leading-none text-gold-dark">
                Crafted with love
              </p>
              <p className="mt-2 text-[0.7rem] uppercase tracking-[0.25em] text-ink-soft">
                Every celebration, uniquely yours
              </p>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            id="about-title"
            align="left"
            eyebrow="About Us"
            title={
              <>
                Where vision becomes{" "}
                <em className="font-light italic text-gold-dark">a beautiful reality</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-base leading-[1.85] text-ink-soft sm:text-lg">
              <p>
                {siteConfig.name} is a creative event decoration and management studio devoted to
                designing celebrations that feel personal, polished and unforgettable. From
                intimate gatherings to grand weddings, we shape every space with imagination,
                craftsmanship and heart.
              </p>
              <p>
                Our experienced team obsesses over the details — the flow of florals, the warmth of
                lighting, the texture of fabrics — and delivers every setup with calm,
                professional precision. Our promise is simple: your celebration should feel
                effortless for you, and extraordinary for your guests.
              </p>
            </div>
          </Reveal>

          <ol className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-charcoal/10 pt-10 sm:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.title}
                className="list-none"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-display text-4xl font-light text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
