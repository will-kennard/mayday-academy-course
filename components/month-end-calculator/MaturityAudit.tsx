"use client";

import {
  MATURITY_QUESTIONS,
  type MaturityAnswers,
} from "@/lib/month-end-calculator";

export default function MaturityAudit({
  answers,
  onChange,
  answeredCount,
}: {
  answers: MaturityAnswers;
  onChange: (next: MaturityAnswers) => void;
  answeredCount: number;
}) {
  return (
    <div className="border-t border-border pt-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        Part 2 · {answeredCount}/4 answered
      </p>
      <h2 className="font-poppins mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
        How mature is your close?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Cost is one half of the picture. These four questions place your process
        against the range we see across finance teams and practices. Answer as
        honestly as you&apos;d answer a colleague, not an auditor.
      </p>

      <div className="mt-6 space-y-6">
        {MATURITY_QUESTIONS.map((question, questionIndex) => (
          <fieldset key={question.id}>
            <legend className="text-sm font-semibold text-heading">
              <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-brand">
                Q{questionIndex + 1}
              </span>
              {question.prompt}
            </legend>
            <div className="mt-3 space-y-2">
              {question.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === optionIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      const next = [...answers] as MaturityAnswers;
                      next[questionIndex] = optionIndex;
                      onChange(next);
                    }}
                    className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left text-sm transition-colors ${
                      selected
                        ? "border-brand bg-brand-soft"
                        : "border-border bg-surface hover:bg-surface-muted"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-bold ${
                        selected
                          ? "bg-brand text-white"
                          : "bg-surface-muted text-muted"
                      }`}
                    >
                      {optionIndex}
                    </span>
                    <span className="leading-relaxed text-heading">{option}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
