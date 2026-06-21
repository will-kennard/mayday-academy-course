"use client";

import { useMemo, useState } from "react";
import type {
  AnswerId,
  PublicQuiz,
  QuizResult,
  QuizScoreResponse,
} from "@/lib/types";
import { recordQuizResult } from "@/lib/progress";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizResults from "@/components/quiz/QuizResults";

type SelectedAnswers = Record<string, AnswerId>;

export default function Quiz({ quiz }: { quiz: PublicQuiz }) {
  const [selected, setSelected] = useState<SelectedAnswers>({});
  const [scoreResult, setScoreResult] = useState<QuizScoreResponse | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const answeredCount = Object.keys(selected).length;
  const total = quiz.questions.length;
  const submitted = scoreResult !== null;

  const resultsByQuestion = useMemo(() => {
    const map = new Map<string, QuizResult>();
    scoreResult?.results.forEach((result) => {
      map.set(result.questionId, result);
    });
    return map;
  }, [scoreResult]);

  function handleSelect(questionId: string, answerId: AnswerId) {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [questionId]: answerId }));
  }

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);

    const answers = Object.entries(selected).map(([questionId, answerId]) => ({
      questionId,
      answerId,
    }));

    try {
      const response = await fetch("/api/quiz/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Could not score the quiz.");
      }

      const data = (await response.json()) as QuizScoreResponse;
      setScoreResult(data);
      recordQuizResult(data.percentage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not score the quiz."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetake() {
    setSelected({});
    setScoreResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const allAnswered = answeredCount === total;

  return (
    <div className="space-y-6">
      {submitted && scoreResult ? (
        <QuizResults
          result={scoreResult}
          passMark={quiz.passMark}
          onRetake={handleRetake}
        />
      ) : (
        <div className="sticky top-16 z-10 rounded-xl border border-border bg-surface/90 p-4 backdrop-blur">
          <QuizProgress answered={answeredCount} total={total} />
        </div>
      )}

      <div className="space-y-4">
        {quiz.questions.map((question) => (
          <QuizQuestion
            key={question.id}
            question={question}
            selectedAnswerId={selected[question.id]}
            result={resultsByQuestion.get(question.id)}
            submitted={submitted}
            onSelect={(answerId) => handleSelect(question.id, answerId)}
          />
        ))}
      </div>

      {!submitted && (
        <div className="rounded-xl border border-border bg-surface p-5">
          {error && (
            <p className="mb-3 rounded-lg bg-warning-soft p-3 text-sm text-warning">
              {error}
            </p>
          )}
          {!allAnswered && (
            <p className="mb-3 text-sm text-muted">
              Answer all {total} questions to submit. {total - answeredCount}{" "}
              remaining.
            </p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {submitting ? "Scoring..." : "Submit quiz"}
          </button>
        </div>
      )}
    </div>
  );
}
