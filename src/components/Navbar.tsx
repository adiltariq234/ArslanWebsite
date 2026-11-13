"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { CloseIcon } from "./ui/Icons";

const sectionIds = ["home", "about", "services", "gallery", "contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock scroll & close with Escape while the mobile menu is open
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "glass border-x-0 border-t-0 border-b-charcoal/5 py-3 shadow-[0_8px_30px_-18px_rgba(42,39,36,0.35)]"
          : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label={`${siteConfig.name} — home`} onClick={close}>
          <Logo light={!solid} />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {siteConfig.nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`group relative py-1 text-[0.8rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                  solid
                    ? "text-charcoal/80 hover:text-gold-dark"
                    : "text-ivory/90 hover:text-gold-light"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
          <a
            href="#booking"
            className="btn-gold rounded-full px-6 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-charcoal"
          >
            Book Now
          </a>
        </nav>

        <button
          type="button"
          className={`relative flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
            solid ? "text-charcoal" : "text-ivory"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <CloseIcon />
          ) : (
            <span className="flex w-6 flex-col gap-[7px]" aria-hidden="true">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-3/4 self-end bg-current" />
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-5 pb-8 pt-6 sm:px-8">
              {siteConfig.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5 }}
                  className="border-b border-charcoal/10"
                >
                  <a
                    href={item.href}
                    onClick={close}
                    className="block py-4 font-display text-3xl font-light text-charcoal"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-6">
                <a
                  href="#booking"
                  onClick={close}
                  className="btn-gold block rounded-full px-6 py-3.5 text-center text-sm font-medium uppercase tracking-[0.2em] text-charcoal"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
