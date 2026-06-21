import type { CourseSection } from "@/lib/types";
import SectionCard from "@/components/course/SectionCard";

export default function SectionList({
  sections,
}: {
  sections: CourseSection[];
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map((section) => (
        <li key={section.id} className="h-full">
          <SectionCard section={section} />
        </li>
      ))}
    </ul>
  );
}
