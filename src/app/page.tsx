import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { siteConfig } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventPlanner",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: siteConfig.images.og,
  makesOffer: [
    "Wedding Decoration",
    "Birthday Decoration",
    "Mehndi & Mayun Decoration",
    "Engagement Decoration",
    "Anniversary Decoration",
    "Corporate Event Decoration",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
