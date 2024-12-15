import { json, error } from "@sveltejs/kit";

import db from "$lib/server/database";
import { validateQuestionandAnswers } from "$lib/quizer";

export async function GET() {
  const [rows] = await db.questions.getAll();
  return json(rows);
}

export async function POST({ request }) {
  const { question, answers } = await request.json();

  let err = validateQuestionandAnswers(question, answers);

  if (err) {
    error(400, { message: err });
  }

  for (const answer of answers) {
    delete answer.id;
  }
  let question_id = await db.questions.add(
    question.question,
    question.multiple_answers
  );
  for (const answer of answers) {
    await db.answers.add(answer.answer, question_id, answer.is_correct);
  }
  return new json({ id: question_id }, { status: 201 });
}
