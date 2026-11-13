/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENT — services, gallery, testimonials, benefits.
 * ─────────────────────────────────────────────────────────────
 *  HOW TO USE THE CLIENT'S REAL PHOTOGRAPHS
 *  1. Copy photos into /public/images/ (e.g. /public/images/wedding-01.jpg)
 *  2. Replace any `image: px(…)` below with `image: "/images/wedding-01.jpg"`
 *  3. Update `title` / `alt`. Add or remove items freely — the gallery,
 *     filters and lightbox adapt automatically.
 *
 *  The sample photographs below are royalty-free stock images from
 *  Pexels and are for demonstration only.
 */

/** Builds a Pexels CDN URL from a photo id (sample images only). */
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

/* ───────────────────────── Event types (booking form) ───────────────────────── */

export const eventTypes = [
  "Wedding",
  "Birthday Party",
  "Mehndi & Mayun",
  "Engagement",
  "Anniversary",
  "Bridal Shower",
  "Baby Shower",
  "Corporate Event",
  "Private Party / Special Function",
  "Other",
] as const;

/* ───────────────────────── Services ───────────────────────── */

export interface Service {
  title: string;
  /** Pre-selected in the booking form when "Inquire" is clicked */
  eventType: (typeof eventTypes)[number];
  description: string;
  image: string;
  alt: string;
}

export const services: Service[] = [
  {
    title: "Wedding Decoration",
    eventType: "Wedding",
    description:
      "Grand stages, floral arches, aisles and reception styling designed around your love story.",
    image: px(36154338),
    alt: "Elegant indoor wedding ceremony with floral arrangements and soft lighting",
  },
  {
    title: "Birthday Decoration",
    eventType: "Birthday Party",
    description:
      "Playful, polished themes with balloon sculptures, backdrops and dessert tables for every age.",
    image: px(3394219),
    alt: "Gold and blush balloon bouquet against a white wall",
  },
  {
    title: "Mehndi & Mayun",
    eventType: "Mehndi & Mayun",
    description:
      "Vibrant, tradition-rich setups with marigolds, seating lounges, lanterns and colourful drapes.",
    image: px(39820649),
    alt: "Vibrant mehndi stage decorated with marigold flowers and lanterns",
  },
  {
    title: "Engagement Events",
    eventType: "Engagement",
    description:
      "Romantic ring-ceremony décor with candlelit details, rose installations and intimate seating.",
    image: px(29609607),
    alt: "Romantic heart-shaped floral arch with candles",
  },
  {
    title: "Anniversary Celebrations",
    eventType: "Anniversary",
    description:
      "Intimate dinners and milestone parties styled with fresh florals, candlelight and fine tablescapes.",
    image: px(36694424),
    alt: "Elegant romantic dinner table with roses",
  },
  {
    title: "Corporate Events",
    eventType: "Corporate Event",
    description:
      "Refined stage, hall and gala styling that reflects your brand and impresses every guest.",
    image: px(16120243),
    alt: "Luxurious banquet hall with floral centerpieces and stage",
  },
];

/** Smaller offerings shown as chips beneath the service cards */
export const alsoOffered: { label: string; eventType: (typeof eventTypes)[number] }[] = [
  { label: "Bridal Showers", eventType: "Bridal Shower" },
  { label: "Baby Showers", eventType: "Baby Shower" },
  { label: "Private Parties", eventType: "Private Party / Special Function" },
  { label: "Special Functions", eventType: "Private Party / Special Function" },
];

/* ───────────────────────── Gallery ───────────────────────── */

export type GalleryCategory =
  | "weddings"
  | "birthdays"
  | "mehndi"
  | "engagement"
  | "corporate";

export const galleryFilters: { id: "all" | GalleryCategory; label: string }[] = [
  { id: "all", label: "All Events" },
  { id: "weddings", label: "Weddings" },
  { id: "birthdays", label: "Birthdays" },
  { id: "mehndi", label: "Mehndi" },
  { id: "engagement", label: "Engagement" },
  { id: "corporate", label: "Corporate" },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  alt: string;
  /** Controls the tile shape in the masonry grid */
  ratio: "portrait" | "landscape" | "square";
}

export const galleryItems: GalleryItem[] = [
  { id: "w1", title: "Garden Floral Arch Ceremony", category: "weddings", image: px(14703685), alt: "Outdoor wedding venue with white floral arches and chairs", ratio: "landscape" },
  { id: "b1", title: "Blush & Gold Balloon Bouquet", category: "birthdays", image: px(3394219), alt: "Gold and pink balloons forming a decorative bouquet", ratio: "portrait" },
  { id: "m1", title: "Marigold Mehndi Stage", category: "mehndi", image: px(39820649), alt: "Indian wedding stage decorated with marigolds and lanterns", ratio: "portrait" },
  { id: "e1", title: "Heart Arch by Candlelight", category: "engagement", image: px(29609607), alt: "Heart-shaped floral arch with candles", ratio: "portrait" },
  { id: "c1", title: "Grand Banquet Hall Styling", category: "corporate", image: px(16120243), alt: "Banquet hall with floral centerpiece tables and stage", ratio: "landscape" },
  { id: "w2", title: "Pastel Ceremony Setup", category: "weddings", image: px(37828118), alt: "Outdoor ceremony with white and pastel floral decor", ratio: "landscape" },
  { id: "b2", title: "Pink Teddy Birthday Corner", category: "birthdays", image: px(31972320), alt: "Pink teddy bear balloon with birthday balloons", ratio: "portrait" },
  { id: "m2", title: "Royal Red & Gold Mandap", category: "mehndi", image: px(33417234), alt: "Opulent outdoor venue with red and gold decorations under a floral canopy", ratio: "landscape" },
  { id: "w3", title: "Chandelier Reception Hall", category: "weddings", image: px(20499528), alt: "Banquet hall decorated with chandeliers and flowers", ratio: "landscape" },
  { id: "e2", title: "Rose Proposal Archway", category: "engagement", image: px(36836185), alt: "Outdoor proposal setup with roses and a heart archway", ratio: "portrait" },
  { id: "c2", title: "Themed Gala Evening", category: "corporate", image: px(35042459), alt: "Event hall set for a themed dinner with elegant lighting", ratio: "landscape" },
  { id: "b3", title: "First Birthday in Pink", category: "birthdays", image: px(32355099), alt: "Pink themed first birthday outdoor decoration", ratio: "portrait" },
  { id: "w4", title: "Candlelit Table Florals", category: "weddings", image: px(29040932), alt: "Wedding table with white floral centerpiece and candles", ratio: "landscape" },
  { id: "m3", title: "Festive Marigold Canopy", category: "mehndi", image: px(36652869), alt: "Marigold garlands hanging outdoors", ratio: "landscape" },
  { id: "e3", title: "Mirror & Floral Garland Corner", category: "engagement", image: px(39060710), alt: "White chair with floral garland and decorative mirror", ratio: "portrait" },
  { id: "c3", title: "Garden-Inspired Banquet", category: "corporate", image: px(17057020), alt: "Banquet hall with round tables and indoor trees", ratio: "landscape" },
  { id: "w5", title: "Blossom-Lined Reception", category: "weddings", image: px(17315479), alt: "Wedding venue with blossoming trees and floral arrangements", ratio: "landscape" },
  { id: "c4", title: "Starlit Stage & Florals", category: "corporate", image: px(37975405), alt: "Event stage with spotlights and floral arrangements under a starry canopy", ratio: "landscape" },
];

/* ───────────────────────── Why choose us ───────────────────────── */

export type IconName =
  | "sparkle"
  | "palette"
  | "shield"
  | "eye"
  | "tag"
  | "heart";

export const benefits: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "sparkle",
    title: "Creative Decoration Concepts",
    text: "Fresh, original ideas — never copy-and-paste setups — tailored to your venue and vision.",
  },
  {
    icon: "palette",
    title: "Customized Event Themes",
    text: "From colour palettes to custom backdrops, every theme is designed uniquely for you.",
  },
  {
    icon: "shield",
    title: "Professional Execution",
    text: "A dedicated team handles setup, timing and teardown so you can simply enjoy the day.",
  },
  {
    icon: "eye",
    title: "Attention to Every Detail",
    text: "Table styling, lighting, florals, signage — each element is checked until it is perfect.",
  },
  {
    icon: "tag",
    title: "Affordable Packages",
    text: "Transparent, flexible packages that respect your budget without compromising on beauty.",
  },
  {
    icon: "heart",
    title: "Customer Satisfaction",
    text: "Your joy is our measure of success — we stay with you from first idea to final goodbye.",
  },
];

/* ───────────────────────── Process (About section) ───────────────────────── */

export const processSteps = [
  { title: "Consult", text: "We listen to your story, style and budget." },
  { title: "Design", text: "Mood boards and a decor plan made just for you." },
  { title: "Create", text: "Our team builds and styles the venue with care." },
  { title: "Celebrate", text: "You enjoy the moment — we handle everything else." },
];

/* ───────────────────────── Testimonials ───────────────────────── */
/* SAMPLE REVIEWS — replace with real customer feedback. */

export interface Testimonial {
  name: string;
  event: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sample Client — Ayesha & Omar",
    event: "Wedding Reception",
    quote:
      "From the very first meeting they understood exactly what we wanted. The stage looked even more beautiful than the mood board, and our guests couldn't stop taking photographs.",
    rating: 5,
  },
  {
    name: "Sample Client — Sara K.",
    event: "Mehndi & Mayun",
    quote:
      "The colours, the lighting, the cosy seating — everything felt warm and festive. The team was calm, polite and finished setting up well before the guests arrived.",
    rating: 5,
  },
  {
    name: "Sample Client — Daniel R.",
    event: "Corporate Gala",
    quote:
      "Professional from planning to teardown. The decor reflected our brand perfectly and our clients complimented the atmosphere all evening.",
    rating: 5,
  },
  {
    name: "Sample Client — Mariam T.",
    event: "Birthday Celebration",
    quote:
      "My daughter's birthday corner was a dream — soft pinks, golden balloons, and so many thoughtful little details. Truly stress-free for us as parents.",
    rating: 5,
  },
  {
    name: "Sample Client — Hassan & Noor",
    event: "Engagement",
    quote:
      "Intimate, romantic and elegant. They worked within our budget and still delivered a setting that felt luxurious. Highly recommended.",
    rating: 5,
  },
  {
    name: "Sample Client — Lina M.",
    event: "Anniversary Dinner",
    quote:
      "A surprise 25th anniversary dinner that my husband still talks about. Candles, roses, music — everything was beautifully arranged.",
    rating: 5,
  },
];
