"use client";

import {
  markLessonComplete,
  markLessonIncomplete,
  useProgress,
} from "@/lib/progress";

export default function LessonProgress({ lessonId }: { lessonId: string }) {
  const progress = useProgress();
  const complete = progress.completedLessons.includes(lessonId);

  function toggle() {
    if (complete) {
      markLessonIncomplete(lessonId);
    } else {
      markLessonComplete(lessonId);
    }
  }

  return (
    <div className="mt-8 flex items-center justify-center">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={complete}
        className={
          complete
            ? "inline-flex h-11 items-center gap-2 rounded-lg border border-accent bg-accent-soft px-5 text-sm font-semibold text-accent transition-colors"
            : "inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-semibold transition-colors hover:bg-surface-muted"
        }
      >
        <span aria-hidden>{complete ? "\u2713" : "\u25CB"}</span>
        {complete ? "Lesson completed" : "Mark lesson as complete"}
      </button>
    </div>
  );
}
