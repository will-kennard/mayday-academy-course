import { NextResponse } from "next/server";
import { scoreQuiz, QuizValidationError } from "@/lib/quiz";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null || !("answers" in body)) {
    return NextResponse.json(
      { error: "Request must include an `answers` array." },
      { status: 400 }
    );
  }

  try {
    const result = scoreQuiz((body as { answers: unknown }).answers);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof QuizValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Something went wrong while scoring the quiz." },
      { status: 500 }
    );
  }
}
