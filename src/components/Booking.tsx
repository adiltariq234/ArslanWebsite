"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { eventTypes } from "@/config/content";
import { siteConfig } from "@/config/site";
import {
  PREFILL_EVENT,
  buildWhatsAppMessage,
  whatsappLink,
  type InquiryValues,
} from "@/lib/inquiry";
import { Reveal, RevealImage } from "./ui/Motion";
import { SectionHeading } from "./ui/SectionHeading";
import { WhatsAppIcon } from "./ui/Icons";

type Errors = Partial<Record<keyof InquiryValues, string>>;
type Status = "idle" | "sending" | "success" | "error";

const empty: Required<InquiryValues> = {
  name: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  budget: "",
  message: "",
};

const field =
  "w-full rounded-xl border border-charcoal/15 bg-ivory/80 px-4 py-3.5 text-base text-charcoal placeholder:text-charcoal/35 transition focus:border-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/15 aria-[invalid=true]:border-red-400";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.22em] text-charcoal/70"
      >
        {label}
        {required && <span className="text-gold-dark"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function Booking() {
  const [values, setValues] = useState<Required<InquiryValues>>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Pre-select the event type when a service card "Inquire" button is used
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const eventType = (e as CustomEvent<{ eventType?: string }>).detail?.eventType;
      if (eventType) {
        setValues((v) => ({ ...v, eventType }));
        setErrors((er) => ({ ...er, eventType: undefined }));
        setStatus((s) => (s === "success" ? "idle" : s));
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const set =
    (key: keyof InquiryValues) =>
    (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const validate = (): Errors => {
    const er: Errors = {};
    if (values.name.trim().length < 2) er.name = "Please enter your name.";
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 7 || !/^[+\d\s\-().]+$/.test(values.phone.trim()))
      er.phone = "Please enter a valid phone number.";
    if (!values.eventType) er.eventType = "Please choose an event type.";
    return er;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      const first = Object.keys(er)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        errors?: Errors;
      };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.error ?? "Please check the highlighted fields.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError("Network error. Please try again or message us on WhatsApp.");
      setStatus("error");
    }
  }

  const waHref = whatsappLink(buildWhatsAppMessage(values));

  return (
    <section
      id="booking"
      aria-labelledby="booking-title"
      className="relative overflow-hidden bg-champagne py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blush/60 blur-[110px]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left — copy + WhatsApp */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="booking-title"
            align="left"
            eyebrow="Book Your Event"
            title={
              <>
                Let&apos;s create something{" "}
                <em className="font-light italic text-gold-dark">unforgettable</em>
              </>
            }
            text="Share a few details and we will get back to you with ideas, availability and a tailored quote. Prefer a quick chat? Message us directly on WhatsApp."
          />

          <Reveal delay={0.2} className="mt-9">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#1f8a4c] px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-white shadow-lg shadow-[#1f8a4c]/25 transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#177a40] sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Book via WhatsApp
            </a>
            <p className="mt-3 text-sm text-ink-soft">
              Opens WhatsApp with your details pre-filled — just press send.
            </p>
          </Reveal>

          <RevealImage
            src={siteConfig.images.booking}
            alt="Elegant candlelit wedding table with white floral centerpiece"
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="mt-12 hidden aspect-[16/10] rounded-2xl lg:block"
          />
        </div>

        {/* Right — form */}
        <Reveal y={40}>
          <div className="glass rounded-[2rem] p-6 shadow-[0_40px_80px_-40px_rgba(42,39,36,0.45)] sm:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold-dark">
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <h3 className="mt-6 font-display text-4xl font-light text-charcoal">
                    Thank you, {values.name.split(" ")[0]}!
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
                    Your inquiry has been received. We will contact you shortly to discuss your
                    event.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f8a4c] px-7 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#177a40]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Continue on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setValues(empty);
                        setStatus("idle");
                      }}
                      className="rounded-full border border-charcoal/20 px-7 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-charcoal transition hover:bg-charcoal hover:text-ivory"
                    >
                      New Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-5 sm:grid-cols-2"
                  aria-label="Event booking inquiry form"
                >
                  <h3 className="font-display text-3xl font-light text-charcoal sm:col-span-2">
                    Tell us about your event
                  </h3>

                  <Field id="f-name" label="Your Name" required error={errors.name}>
                    <input
                      id="f-name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={set("name")}
                      placeholder="Full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "f-name-error" : undefined}
                      className={field}
                    />
                  </Field>

                  <Field id="f-phone" label="Phone Number" required error={errors.phone}>
                    <input
                      id="f-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      value={values.phone}
                      onChange={set("phone")}
                      placeholder="+00 000 000 0000"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "f-phone-error" : undefined}
                      className={field}
                    />
                  </Field>

                  <Field id="f-eventType" label="Event Type" required error={errors.eventType}>
                    <select
                      id="f-eventType"
                      name="eventType"
                      value={values.eventType}
                      onChange={set("eventType")}
                      aria-invalid={!!errors.eventType}
                      aria-describedby={errors.eventType ? "f-eventType-error" : undefined}
                      className={field}
                    >
                      <option value="">Select an event…</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="f-eventDate" label="Event Date" error={errors.eventDate}>
                    <input
                      id="f-eventDate"
                      name="eventDate"
                      type="date"
                      min={today}
                      value={values.eventDate}
                      onChange={set("eventDate")}
                      className={field}
                    />
                  </Field>

                  <Field id="f-location" label="Event Location">
                    <input
                      id="f-location"
                      name="location"
                      value={values.location}
                      onChange={set("location")}
                      placeholder="Venue or city"
                      className={field}
                    />
                  </Field>

                  <Field id="f-budget" label="Estimated Budget">
                    <input
                      id="f-budget"
                      name="budget"
                      value={values.budget}
                      onChange={set("budget")}
                      placeholder="e.g. 150,000"
                      className={field}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field id="f-message" label="Additional Requirements">
                      <textarea
                        id="f-message"
                        name="message"
                        rows={4}
                        value={values.message}
                        onChange={set("message")}
                        placeholder="Theme, colours, guest count, inspiration…"
                        className={`${field} resize-none`}
                      />
                    </Field>
                  </div>

                  {/* Honeypot (hidden from people) */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="f-website">Website</label>
                    <input
                      id="f-website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2"
                    >
                      {serverError}
                    </p>
                  )}

                  <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-gold inline-flex flex-1 items-center justify-center rounded-full px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.22em] text-charcoal disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Send Inquiry"}
                    </button>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1f8a4c]/50 px-7 py-4 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-[#1f8a4c] transition hover:bg-[#1f8a4c] hover:text-white"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                  <p className="text-xs text-ink-soft sm:col-span-2">
                    Fields marked * are required. We never share your details.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
