import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/quiz", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
