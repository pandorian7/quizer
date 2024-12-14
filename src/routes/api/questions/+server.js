import { json, error } from "@sveltejs/kit";

import * as db from "$lib/server/database";

export async function GET() {
  const [rows] = await db.getQuestions();
  return json(rows);
}

export async function POST({ request }) {
  const { question, answers } = await request.json();

  if (!question.question) {
    error(400, { message: "question is required" });
  }

  if (!answers.length) {
    error(400, { message: "answers are required" });
  }

  for (const answer of answers) {
    if (!answer.answer) {
      error(400, { message: "answer cannot be empty" });
    }
  }

  for (const answer of answers) {
    delete answer.id;
  }
  let question_id = await db.addQuestion(
    question.question,
    question.multiple_answers
  );
  for (const answer of answers) {
    await db.addAnswer(answer.answer, question_id, answer.is_correct);
  }
  return new json({ id: question_id }, { status: 201 });
}
