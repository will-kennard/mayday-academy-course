import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllSections,
  getSectionBySlug,
  getSectionLessonCount,
} from "@/lib/course";
import { absoluteUrl, routes } from "@/lib/routes";
import SectionPage from "@/components/course/SectionPage";

type SectionParams = { sectionSlug: string };

export function generateStaticParams(): SectionParams[] {
  return getAllSections().map((section) => ({ sectionSlug: section.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<SectionParams>;
}): Promise<Metadata> {
  const { sectionSlug } = await params;
  const section = getSectionBySlug(sectionSlug);

  if (!section) {
    return { title: "Section not found" };
  }

  const lessonCount = getSectionLessonCount(section);

  return {
    title: section.title,
    description: `${section.description} ${lessonCount} lessons in this section of the Mayday Academy accounting and month-end course.`,
    alternates: {
      canonical: absoluteUrl(routes.section(section.id)),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<SectionParams>;
}) {
  const { sectionSlug } = await params;
  const section = getSectionBySlug(sectionSlug);

  if (!section) {
    notFound();
  }

  return <SectionPage section={section} />;
}
