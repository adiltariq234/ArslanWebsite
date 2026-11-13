import { siteConfig } from "@/config/site";
import { services } from "@/config/content";
import { telLink } from "@/lib/inquiry";
import { Logo } from "./Logo";
import { socialIcons } from "./ui/Icons";

export function Footer() {
  const { contact, socials, nav } = siteConfig;
  const links = [...nav, { label: "Book Now", href: "#booking" }];

  return (
    <footer className="bg-charcoal pb-8 pt-20 text-ivory/75">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 border-b border-ivory/10 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr]">
          <div>
            <a href="#home" aria-label={`${siteConfig.name} — back to top`}>
              <Logo light />
            </a>
            <p className="mt-6 max-w-xs leading-relaxed text-ivory/60">
              Designing beautiful, personal celebrations — from intimate gatherings to grand
              weddings and corporate galas.
            </p>
            <ul className="mt-7 flex gap-3">
              {socials.map((s) => {
                const Icon = socialIcons[s.name];
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.name} on ${s.name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-all duration-500 hover:-translate-y-1 hover:border-gold-light hover:bg-gold hover:text-charcoal"
                    >
                      {Icon && <Icon />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-2xl text-ivory">Quick Links</h2>
            <ul className="mt-6 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-gold-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-2xl text-ivory">Services</h2>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="transition-colors hover:text-gold-light">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ivory">Get in Touch</h2>
            <ul className="mt-6 space-y-3 leading-relaxed">
              <li>
                <a href={telLink()} className="transition-colors hover:text-gold-light">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-gold-light"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-sm text-ivory/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <a href="#home" className="uppercase tracking-[0.25em] transition-colors hover:text-gold-light">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
