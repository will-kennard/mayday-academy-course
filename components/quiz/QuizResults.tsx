"use client";

import type { QuizScoreResponse } from "@/lib/types";

export default function QuizResults({
  result,
  passMark,
  onRetake,
}: {
  result: QuizScoreResponse;
  passMark: number;
  onRetake: () => void;
}) {
  const { score, total, percentage, passed } = result;

  return (
    <div
      className={`rounded-2xl border p-8 text-center ${
        passed
          ? "border-accent/40 bg-accent-soft"
          : "border-warning/40 bg-warning-soft"
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">
        {passed ? "You passed" : "Not quite there yet"}
      </p>
      <p className="mt-3 text-5xl font-bold tracking-tight">{percentage}%</p>
      <p className="mt-2 text-muted">
        You scored {score} out of {total}. The pass mark is {passMark}%.
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
        {passed
          ? "Great work. Review the feedback below to reinforce anything you want to lock in."
          : "Review the explanations below, revisit the lessons, and try again when you are ready."}
      </p>
      <button
        type="button"
        onClick={onRetake}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg border border-border bg-surface px-6 text-sm font-semibold transition-colors hover:bg-surface-muted"
      >
        Retake the quiz
      </button>
    </div>
  );
}
