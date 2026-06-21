"use client";

import { useProgress } from "@/lib/progress";

export default function CourseProgressSummary({
  totalLessons,
}: {
  totalLessons: number;
}) {
  const progress = useProgress();

  const completed = progress.completedLessons.length;

  // Progressive enhancement: hide the panel until a learner has made progress.
  if (completed === 0 && !progress.quizCompleted) return null;

  const percentage =
    totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100);

  return (
    <div className="mb-8 rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">Your progress</span>
        <span className="text-muted">
          {completed} of {totalLessons} lessons
          {progress.quizCompleted && progress.quizScore !== null
            ? ` \u00b7 quiz ${progress.quizScore}%`
            : ""}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
