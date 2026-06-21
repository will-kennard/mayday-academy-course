import "server-only";

import quizContent from "@/data/quiz-content.json";
import quizAnswers from "@/data/quiz-answers.json";
import type {
  PublicQuiz,
  PrivateQuizAnswer,
  SubmittedQuizAnswer,
  QuizResult,
  QuizScoreResponse,
} from "@/lib/types";

const quiz = quizContent.quiz as PublicQuiz;
const answerKey = quizAnswers.answers as PrivateQuizAnswer[];

/**
 * Public quiz data only. Safe to send to the client because it never contains
 * correct answer ids or explanations.
 */
export function getQuiz(): PublicQuiz {
  return quiz;
}

const validQuestionIds = new Set(quiz.questions.map((q) => q.id));
const answerKeyByQuestionId = new Map(
  answerKey.map((answer) => [answer.questionId, answer])
);

export class QuizValidationError extends Error {}

/**
 * Validate and normalise an incoming list of submitted answers.
 *
 * Rules enforced (per the brief):
 * - the payload must be an array
 * - submitted question ids must exist in the quiz
 * - duplicate question ids are ignored (first one wins)
 * - the number of answers cannot exceed the number of quiz questions
 */
function normaliseSubmittedAnswers(
  input: unknown
): SubmittedQuizAnswer[] {
  if (!Array.isArray(input)) {
    throw new QuizValidationError("`answers` must be an array.");
  }

  if (input.length > quiz.questions.length) {
    throw new QuizValidationError(
      "More answers were submitted than there are questions."
    );
  }

  const seen = new Set<string>();
  const normalised: SubmittedQuizAnswer[] = [];

  for (const item of input) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof (item as Record<string, unknown>).questionId !== "string" ||
      typeof (item as Record<string, unknown>).answerId !== "string"
    ) {
      throw new QuizValidationError(
        "Each answer must include a questionId and answerId."
      );
    }

    const { questionId, answerId } = item as {
      questionId: string;
      answerId: string;
    };

    if (!validQuestionIds.has(questionId)) {
      throw new QuizValidationError(`Unknown questionId: ${questionId}`);
    }

    if (seen.has(questionId)) {
      continue;
    }

    seen.add(questionId);
    normalised.push({
      questionId,
      answerId: answerId as SubmittedQuizAnswer["answerId"],
    });
  }

  return normalised;
}

/**
 * Score submitted answers against the server-only answer key. Returns the score,
 * percentage, pass/fail status and per-question feedback. This is the only place
 * the answer key is read.
 */
export function scoreQuiz(input: unknown): QuizScoreResponse {
  const submittedAnswers = normaliseSubmittedAnswers(input);

  const results: QuizResult[] = submittedAnswers.map((submitted) => {
    const key = answerKeyByQuestionId.get(submitted.questionId);

    if (!key) {
      return {
        questionId: submitted.questionId,
        selectedAnswerId: submitted.answerId,
        isCorrect: false,
        correctAnswerId: null,
        explanation: null,
      };
    }

    return {
      questionId: submitted.questionId,
      selectedAnswerId: submitted.answerId,
      isCorrect: submitted.answerId === key.correctAnswerId,
      correctAnswerId: key.correctAnswerId,
      explanation: key.explanation,
    };
  });

  const score = results.filter((result) => result.isCorrect).length;
  const total = quiz.questions.length;
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  return {
    score,
    total,
    percentage,
    passed: percentage >= quiz.passMark,
    results,
  };
}
