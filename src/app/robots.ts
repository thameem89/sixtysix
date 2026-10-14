import type { MetadataRoute } from "next";
import { salonConfig } from "@/data/salon";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(salonConfig.siteUrl
      ? { sitemap: `${salonConfig.siteUrl}/sitemap.xml` }
      : {}),
  };
}
