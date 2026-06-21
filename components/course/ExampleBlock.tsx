import type { CourseLesson } from "@/lib/types";

export default function ExampleBlock({
  example,
}: {
  example: CourseLesson["example"];
}) {
  return (
    <section className="rounded-xl border border-accent/30 bg-accent-soft p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        An example
      </p>
      <h2 className="font-poppins mt-2 text-lg font-semibold tracking-tight">
        {example.title}
      </h2>
      <p className="mt-2 leading-relaxed text-foreground/90">{example.body}</p>
    </section>
  );
}
