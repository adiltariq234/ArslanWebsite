import { siteConfig } from "@/config/site";

export const PREFILL_EVENT = "inquiry:prefill";

/** Scrolls to the booking form and pre-selects an event type. */
export function prefillInquiry(eventType?: string) {
  if (typeof window === "undefined") return;
  if (eventType) {
    window.dispatchEvent(
      new CustomEvent(PREFILL_EVENT, { detail: { eventType } }),
    );
  }
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

export interface InquiryValues {
  name?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  budget?: string;
  message?: string;
}

/** Builds the pre-filled WhatsApp message from whatever the visitor has typed. */
export function buildWhatsAppMessage(values: InquiryValues = {}) {
  const lines = [
    `Hello ${siteConfig.name}! I'd like to inquire about your event decoration services.`,
    "",
  ];
  const add = (label: string, value?: string) => {
    if (value && value.trim()) lines.push(`${label}: ${value.trim()}`);
  };
  add("Name", values.name);
  add("Phone", values.phone);
  add("Event type", values.eventType);
  add("Event date", values.eventDate);
  add("Location", values.location);
  add("Estimated budget", values.budget);
  add("Requirements", values.message);
  if (lines.length === 2) lines.push("Please share your packages and availability.");
  lines.push("", "Thank you!");
  return lines.join("\n");
}

/** wa.me link. Without a configured number WhatsApp lets the user pick a contact. */
export function whatsappLink(message: string) {
  const digits = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`;
}
