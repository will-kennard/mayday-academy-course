"use client";

import type { AnswerId, PublicQuizQuestion, QuizResult } from "@/lib/types";
import QuizAnswerOption from "@/components/quiz/QuizAnswerOption";

export default function QuizQuestion({
  question,
  selectedAnswerId,
  result,
  submitted,
  onSelect,
}: {
  question: PublicQuizQuestion;
  selectedAnswerId: AnswerId | undefined;
  result: QuizResult | undefined;
  submitted: boolean;
  onSelect: (answerId: AnswerId) => void;
}) {
  return (
    <div
      id={`question-${question.number}`}
      className="scroll-mt-24 rounded-xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-semibold text-brand">
          Question {question.number}
        </span>
        {submitted && result && (
          <span
            className={`text-xs font-semibold uppercase tracking-wide ${
              result.isCorrect ? "text-accent" : "text-warning"
            }`}
          >
            {result.isCorrect ? "Correct" : "Incorrect"}
          </span>
        )}
      </div>
      <p className="mt-2 text-base font-medium leading-relaxed">
        {question.question}
      </p>

      <div className="mt-4 space-y-2.5">
        {question.answers.map((answer) => {
          const isSelected = selectedAnswerId === answer.id;
          let state:
            | "default"
            | "selected"
            | "correct"
            | "incorrect"
            | "missed" = isSelected ? "selected" : "default";

          if (submitted && result) {
            if (answer.id === result.correctAnswerId) {
              state = "correct";
            } else if (isSelected && !result.isCorrect) {
              state = "incorrect";
            } else {
              state = "default";
            }
          }

          return (
            <QuizAnswerOption
              key={answer.id}
              answer={answer}
              selected={isSelected}
              state={state}
              disabled={submitted}
              onSelect={() => onSelect(answer.id)}
            />
          );
        })}
      </div>

      {submitted && result?.explanation && (
        <p className="mt-4 rounded-lg bg-surface-muted p-4 text-sm leading-relaxed text-muted">
          {result.explanation}
        </p>
      )}
    </div>
  );
}
