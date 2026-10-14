import type { MetadataRoute } from "next";
import { salonConfig } from "@/data/salon";
export default function sitemap(): MetadataRoute.Sitemap {
  return salonConfig.siteUrl
    ? ["", "/services"].map((path) => ({
        url: salonConfig.siteUrl + path,
        changeFrequency: "monthly",
        priority: path ? 0.8 : 1,
      }))
    : [];
}
