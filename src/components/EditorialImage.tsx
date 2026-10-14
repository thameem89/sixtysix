"use client";
import Image from "next/image";
import { useState } from "react";
import { siteImages } from "@/data/siteImages";
export default function EditorialImage({
  imageKey,
  sizes = "100vw",
  priority = false,
  position,
  className = "",
}: {
  imageKey: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const image = siteImages[imageKey];
  if (!image) return null;
  return (
    <div
      className={`editorial-image ${className} ${failed ? "image-unavailable" : ""}`}
    >
      <Image
        src={failed ? "/images/launch-poster.webp" : image.src}
        alt={failed ? "SIXTY SIX — editorial image coming soon" : image.alt}
        fill
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        style={{ objectPosition: position || image.position }}
        onError={() => {
          if (!failed) setFailed(true);
        }}
      />
      {failed && <span>THE SIXTY SIX EDITORIAL</span>}
    </div>
  );
}
