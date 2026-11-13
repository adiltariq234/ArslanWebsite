/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one file to edit for business details.
 * ─────────────────────────────────────────────────────────────
 *  Everything marked "PLACEHOLDER" must be replaced with the
 *  client's real information before launch.
 *
 *  You can also set these through environment variables:
 *    NEXT_PUBLIC_SITE_URL          e.g. https://www.example.com
 *    NEXT_PUBLIC_WHATSAPP_NUMBER   digits only, with country code
 */

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export const siteConfig = {
  /** Business name shown in navbar, footer & metadata */
  name: "Arslan Tent Catering Services",
  /** Short line shown under the name in the logo */
  tagline: "Event Decoration & Management",
  description:
    "Premium event decoration and management for weddings, birthdays, mehndi & mayun, engagements, anniversaries, showers and corporate events. Book a consultation today.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /**
   * Optional logo image (e.g. "/images/logo.svg" placed in /public/images).
   * Leave empty to use the elegant text logo.
   */
  logo: "",

  contact: {
    /** PLACEHOLDER — shown on the site, also used for tap-to-call */
    phone: "+00 000 000 0000",
    /**
     * WhatsApp number, DIGITS ONLY with country code.
     * Client's number 03247841456 → 923247841456.
     * While empty, WhatsApp opens with the
     * message pre-filled and lets the visitor choose a contact.
     */
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923247841456",
    /** PLACEHOLDER */
    email: "hello@yourdomain.com",
    /** PLACEHOLDER */
    address: ["Your Studio Address", "City, Country"],
    /**
     * Paste the `src` URL of a Google Maps embed here
     * (Google Maps → Share → Embed a map → copy the src="…" value).
     * While empty, an elegant placeholder is shown instead.
     */
    mapEmbedUrl: "",
    /** Link opened by the "Get directions" button (Google Maps share link) */
    mapLink: "https://www.google.com/maps",
  },

  /** PLACEHOLDER — these point to each network's home page until real profiles are added */
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/" },
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "Pinterest", href: "https://www.pinterest.com/" },
    { name: "YouTube", href: "https://www.youtube.com/" },
  ] as const,

  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],

  /** Images used outside the gallery. Swap for /images/your-photo.jpg */
  images: {
    hero: px(14703685),
    about: px(37828118),
    aboutSecondary: px(32679547),
    booking: px(29040932),
    og: px(14703685),
  },
} as const;

export type SiteConfig = typeof siteConfig;
