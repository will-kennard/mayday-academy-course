import courseContent from "@/data/course-content.json";
import type { Course, CourseSection, LessonWithContext } from "@/lib/types";

const course = courseContent.course as Course;

export function getCourse(): Course {
  return course;
}

export function getAllSections(): CourseSection[] {
  return course.sections;
}

export function getSectionBySlug(sectionSlug: string): CourseSection | undefined {
  return course.sections.find((section) => section.id === sectionSlug);
}

/**
 * Count the total number of lessons in a section across all its subsections.
 */
export function getSectionLessonCount(section: CourseSection): number {
  return section.subsections.reduce(
    (total, subsection) => total + subsection.lessons.length,
    0
  );
}

/**
 * Flatten every lesson in the course into a single ordered list, keeping a
 * reference to each lesson's parent section and subsection.
 */
export function getAllLessons(): LessonWithContext[] {
  const lessons: LessonWithContext[] = [];

  for (const section of course.sections) {
    for (const subsection of section.subsections) {
      for (const lesson of subsection.lessons) {
        lessons.push({
          lesson,
          section,
          subsection,
          sectionSlug: section.id,
          lessonSlug: lesson.slug,
        });
      }
    }
  }

  return lessons;
}

/**
 * Find a single lesson by its section slug and lesson slug, including its
 * surrounding section/subsection context.
 */
export function getLessonBySlug(
  sectionSlug: string,
  lessonSlug: string
): LessonWithContext | undefined {
  const section = getSectionBySlug(sectionSlug);
  if (!section) return undefined;

  for (const subsection of section.subsections) {
    const lesson = subsection.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) {
      return {
        lesson,
        section,
        subsection,
        sectionSlug,
        lessonSlug,
      };
    }
  }

  return undefined;
}

/**
 * Return the previous and next lessons relative to a given lesson, following
 * the natural course order. Either value may be null at the course boundaries.
 */
export function getAdjacentLessons(
  sectionSlug: string,
  lessonSlug: string
): {
  previous: LessonWithContext | null;
  next: LessonWithContext | null;
} {
  const allLessons = getAllLessons();
  const index = allLessons.findIndex(
    (l) => l.sectionSlug === sectionSlug && l.lessonSlug === lessonSlug
  );

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? allLessons[index - 1] : null,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : null,
  };
}

/**
 * Return the first lesson in the course, used for the "Start course" CTA.
 */
export function getFirstLesson(): LessonWithContext | undefined {
  return getAllLessons()[0];
}

/**
 * Find a lesson directly by its id (used to link quiz feedback back to lessons).
 */
export function getLessonById(
  lessonId: string
): LessonWithContext | undefined {
  return getAllLessons().find((l) => l.lesson.id === lessonId);
}

/**
 * Return the lesson reference for a given quiz lessonId, falling back to a
 * lookup by slug across all sections when ids and slugs differ.
 */
export function findLessonForReference(
  lessonId?: string
): LessonWithContext | undefined {
  if (!lessonId) return undefined;
  return (
    getLessonById(lessonId) ??
    getAllLessons().find((l) => l.lessonSlug === lessonId)
  );
}
