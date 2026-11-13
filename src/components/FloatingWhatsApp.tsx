"use client";

import { motion } from "framer-motion";
import { buildWhatsAppMessage, whatsappLink } from "@/lib/inquiry";
import { WhatsAppIcon } from "./ui/Icons";

/** Persistent WhatsApp shortcut, bottom-right on every screen size. */
export function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLink(buildWhatsAppMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f8a4c] text-white shadow-xl shadow-charcoal/30 sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}
