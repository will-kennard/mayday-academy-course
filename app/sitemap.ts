import type { MetadataRoute } from "next";
import { getAllSections, getAllLessons } from "@/lib/course";
import { getAllTerms } from "@/lib/glossary";
import { absoluteUrl, routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(routes.home()),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl(routes.course()),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(routes.glossary()),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const sectionEntries: MetadataRoute.Sitemap = getAllSections().map(
    (section) => ({
      url: absoluteUrl(routes.section(section.id)),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const lessonEntries: MetadataRoute.Sitemap = getAllLessons().map((lesson) => ({
    url: absoluteUrl(routes.lesson(lesson.sectionSlug, lesson.lessonSlug)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const glossaryEntries: MetadataRoute.Sitemap = getAllTerms().map((term) => ({
    url: absoluteUrl(routes.glossaryTerm(term.slug)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // The quiz (/quiz) and the scoring API are intentionally excluded.
  return [
    ...staticEntries,
    ...sectionEntries,
    ...lessonEntries,
    ...glossaryEntries,
  ];
}
