"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

/**
 * Responsive image helper.
 *  • Pexels sample photos are resized by the Pexels CDN (no server work needed).
 *  • Local photos in /public/images work as-is. For best performance export
 *    them at ~2000px wide and compress them (≈ 200–400 KB each).
 */
function loader({ src, width }: ImageLoaderProps) {
  if (src.includes("images.pexels.com")) {
    const url = new URL(src);
    ["h", "fit", "dpr"].forEach((k) => url.searchParams.delete(k));
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    url.searchParams.set("w", String(width));
    return url.toString();
  }
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}

export function SiteImage(props: Omit<ImageProps, "loader">) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props
  return <Image {...props} loader={loader} />;
}
