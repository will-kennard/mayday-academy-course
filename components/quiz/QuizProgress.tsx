"use client";

export default function QuizProgress({
  answered,
  total,
}: {
  answered: number;
  total: number;
}) {
  const percentage = total === 0 ? 0 : Math.round((answered / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Your progress</span>
        <span className="text-muted">
          {answered} of {total} answered
        </span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-brand transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
