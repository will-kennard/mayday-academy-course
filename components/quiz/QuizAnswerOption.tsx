"use client";

import type { QuizAnswer } from "@/lib/types";

type State = "default" | "selected" | "correct" | "incorrect" | "missed";

function stateClasses(state: State): string {
  switch (state) {
    case "selected":
      return "border-brand bg-brand-soft";
    case "correct":
      return "border-accent bg-accent-soft";
    case "incorrect":
      return "border-warning bg-warning-soft";
    case "missed":
      return "border-accent bg-accent-soft/60";
    default:
      return "border-border bg-surface hover:bg-surface-muted";
  }
}

export default function QuizAnswerOption({
  answer,
  selected,
  state,
  disabled,
  onSelect,
}: {
  answer: QuizAnswer;
  selected: boolean;
  state: State;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left text-sm transition-colors disabled:cursor-default ${stateClasses(
        state
      )}`}
    >
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-bold ${
          state === "default"
            ? "bg-surface-muted text-muted"
            : "bg-surface text-foreground"
        }`}
      >
        {answer.label}
      </span>
      <span className="flex-1 leading-relaxed">{answer.text}</span>
      {state === "correct" && (
        <span aria-hidden className="text-accent">
          &#10003;
        </span>
      )}
      {state === "incorrect" && (
        <span aria-hidden className="text-warning">
          &#10007;
        </span>
      )}
    </button>
  );
}
