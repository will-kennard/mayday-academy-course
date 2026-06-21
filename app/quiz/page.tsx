import type { Metadata } from "next";
import quizContent from "@/data/quiz-content.json";
import type { PublicQuiz } from "@/lib/types";
import Quiz from "@/components/quiz/Quiz";

const quiz = quizContent.quiz as PublicQuiz;

export const metadata: Metadata = {
  title: "Accounting and Month-End Quiz",
  description:
    "Test your understanding of accounting basics, month end and Mayday product workflows.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
          {quiz.title}
        </h1>
        <p className="mt-3 leading-relaxed text-muted">{quiz.description}</p>
        <p className="mt-2 text-sm text-muted">
          {quiz.questions.length} questions &middot; pass mark {quiz.passMark}%
        </p>
      </header>

      <Quiz quiz={quiz} />
    </div>
  );
}
