"use client";

import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppMessage, telLink, whatsappLink } from "@/lib/inquiry";
import { Reveal } from "./ui/Motion";
import { SectionHeading } from "./ui/SectionHeading";
import {
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
  socialIcons,
} from "./ui/Icons";

function Item({
  icon,
  label,
  children,
  href,
  external,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
        {icon}
      </span>
      <span>
        <span className="block text-[0.68rem] font-medium uppercase tracking-[0.25em] text-ink-soft">
          {label}
        </span>
        <span className="mt-1 block text-lg leading-snug text-charcoal">{children}</span>
      </span>
    </>
  );
  const cls = "group flex items-center gap-5";
  return href ? (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function Contact() {
  const { contact, socials } = siteConfig;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-ivory py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title={
            <>
              Visit, call or{" "}
              <em className="font-light italic text-gold-dark">say hello</em>
            </>
          }
          text="We would love to hear about your celebration. Reach out in whichever way suits you best."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col justify-between rounded-[2rem] bg-cream p-8 sm:p-12">
            <div className="space-y-9">
              <Item icon={<PhoneIcon />} label="Phone" href={telLink()}>
                {contact.phone}
              </Item>
              <Item
                icon={<WhatsAppIcon className="h-6 w-6" />}
                label="WhatsApp"
                href={whatsappLink(buildWhatsAppMessage())}
                external
              >
                {contact.whatsappNumber ? `+${contact.whatsappNumber}` : "Chat with us on WhatsApp"}
              </Item>
              <Item icon={<MailIcon />} label="Email" href={`mailto:${contact.email}`}>
                {contact.email}
              </Item>
              <Item icon={<PinIcon />} label="Studio Address">
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Item>
            </div>

            <div className="mt-12 border-t border-charcoal/10 pt-8">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.25em] text-ink-soft">
                Follow Our Work
              </p>
              <ul className="mt-4 flex gap-3">
                {socials.map((s) => {
                  const Icon = socialIcons[s.name];
                  return (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${siteConfig.name} on ${s.name}`}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"
                      >
                        {Icon && <Icon />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[2rem] border border-charcoal/10 bg-champagne">
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  title={`Map showing the location of ${siteConfig.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(185,147,97,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(185,147,97,0.18) 1px, transparent 1px)",
                      backgroundSize: "44px 44px",
                    }}
                  />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-gold-dark shadow-xl">
                    <PinIcon width={30} height={30} />
                  </span>
                  <p className="relative mt-6 font-display text-3xl text-charcoal">
                    Google Maps goes here
                  </p>
                  <p className="relative mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
                    Paste your Google Maps embed link into{" "}
                    <code className="rounded bg-ivory px-1.5 py-0.5 text-xs">
                      siteConfig.contact.mapEmbedUrl
                    </code>{" "}
                    to show your studio location.
                  </p>
                </div>
              )}
              <a
                href={contact.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass absolute bottom-5 left-5 rounded-full px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-charcoal transition hover:bg-ivory"
              >
                Get Directions
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
