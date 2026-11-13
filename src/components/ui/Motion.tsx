"use client";

import { motion, MotionConfig, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { SiteImage } from "./SiteImage";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Respects the visitor's "reduce motion" OS setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
}

/** Fades & lifts content in as it scrolls into view (once). */
export function Reveal({ children, delay = 0, y = 28, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface RevealImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  delay?: number;
  priority?: boolean;
  /** "up" reveals from the bottom, "left" from the left edge */
  from?: "up" | "left";
  imgClassName?: string;
}

/** Curtain-style image reveal with a gentle zoom-out. */
export function RevealImage({
  src,
  alt,
  sizes,
  className = "",
  delay = 0,
  priority,
  from = "up",
  imgClassName = "",
}: RevealImageProps) {
  const hidden = from === "up" ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)";
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      >
        <SiteImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      </motion.div>
    </motion.div>
  );
}
