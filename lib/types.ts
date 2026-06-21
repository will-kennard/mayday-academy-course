export type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  sections: CourseSection[];
};

export type CourseSection = {
  id: string;
  number: string;
  title: string;
  description: string;
  subsections: CourseSubsection[];
};

export type CourseSubsection = {
  id: string;
  number: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
};

export type CourseLesson = {
  id: string;
  title: string;
  slug: string;
  question: string;
  properExplanation: string;
  simpleExplanation: string;
  example: {
    title: string;
    body: string;
  };
  tags?: string[];
};

export type PublicQuiz = {
  id: string;
  title: string;
  description: string;
  passMark: number;
  questions: PublicQuizQuestion[];
};

export type PublicQuizQuestion = {
  id: string;
  number: number;
  sectionId?: string;
  lessonId?: string;
  question: string;
  answers: QuizAnswer[];
};

export type AnswerId = "a" | "b" | "c" | "d";
export type AnswerLabel = "A" | "B" | "C" | "D";

export type QuizAnswer = {
  id: AnswerId;
  label: AnswerLabel;
  text: string;
};

export type PrivateQuizAnswer = {
  questionId: string;
  correctAnswerId: AnswerId;
  explanation: string;
  lessonId?: string;
};

export type SubmittedQuizAnswer = {
  questionId: string;
  answerId: AnswerId;
};

export type QuizResult = {
  questionId: string;
  selectedAnswerId: string;
  isCorrect: boolean;
  correctAnswerId: string | null;
  explanation: string | null;
};

export type QuizScoreResponse = {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  results: QuizResult[];
};

/**
 * A lesson enriched with its parent section and subsection metadata, plus the
 * route slugs needed to build a link to it.
 */
export type LessonWithContext = {
  lesson: CourseLesson;
  section: CourseSection;
  subsection: CourseSubsection;
  sectionSlug: string;
  lessonSlug: string;
};
