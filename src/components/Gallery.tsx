"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  galleryFilters,
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from "@/config/content";
import { EASE } from "./ui/Motion";
import { SectionHeading } from "./ui/SectionHeading";
import { SiteImage } from "./ui/SiteImage";
import { ChevronIcon, CloseIcon } from "./ui/Icons";

const ratioClass: Record<GalleryItem["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function Gallery() {
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const items = useMemo(
    () =>
      filter === "all"
        ? galleryItems
        : galleryItems.filter((i) => i.category === filter),
    [filter],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  const current = openIndex !== null ? items[openIndex] : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="bg-ivory py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="gallery-title"
          eyebrow="Portfolio"
          title={
            <>
              Moments we have{" "}
              <em className="font-light italic text-gold-dark">brought to life</em>
            </>
          }
          text="A glimpse of the celebrations we have designed. Filter by occasion and tap any photograph to view it larger."
        />

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter gallery by event type"
          className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          {galleryFilters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className="relative shrink-0 rounded-full px-6 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300"
              >
                {active && (
                  <motion.span
                    layoutId="gallery-pill"
                    className="absolute inset-0 rounded-full bg-charcoal"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative ${
                    active ? "text-ivory" : "text-charcoal/70 hover:text-gold-dark"
                  }`}
                >
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Masonry grid */}
        <motion.ul
          key={filter}
          className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.97 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
              className="mb-5 break-inside-avoid"
            >
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setOpenIndex(i);
                }}
                aria-label={`View larger: ${item.title}`}
                className={`group relative block w-full overflow-hidden rounded-2xl bg-champagne ${ratioClass[item.ratio]}`}
              >
                <SiteImage
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="block text-[0.65rem] uppercase tracking-[0.3em] text-gold-light">
                    {galleryFilters.find((f) => f.id === item.category)?.label}
                  </span>
                  <span className="mt-1 block font-display text-2xl text-ivory">
                    {item.title}
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-10 text-center text-sm text-ink-soft">
          Sample imagery shown. Real event photographs will appear here.
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/95 p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close image"
              autoFocus
              className="glass-dark absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-ivory transition hover:bg-ivory hover:text-charcoal sm:right-8 sm:top-8"
            >
              <CloseIcon />
            </button>
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="glass-dark absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-ivory transition hover:bg-ivory hover:text-charcoal sm:left-8"
                >
                  <ChevronIcon dir="left" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="glass-dark absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-ivory transition hover:bg-ivory hover:text-charcoal sm:right-8"
                >
                  <ChevronIcon dir="right" />
                </button>
              </>
            )}
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex max-h-full w-full max-w-5xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[68vh] w-full">
                <SiteImage
                  src={current.image}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="rounded-xl object-contain"
                />
              </div>
              <figcaption className="mt-5 text-center">
                <span className="block font-display text-3xl text-ivory">{current.title}</span>
                <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.3em] text-gold-light">
                  {(openIndex ?? 0) + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
