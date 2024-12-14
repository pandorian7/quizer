import { json, error } from "@sveltejs/kit";

import * as db from "$lib/server/database";
import { validateQuestionandAnswers } from "$lib/questions.js";

export async function GET() {
  const [rows] = await db.getQuestions();
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
  let question_id = await db.addQuestion(
    question.question,
    question.multiple_answers
  );
  for (const answer of answers) {
    await db.addAnswer(answer.answer, question_id, answer.is_correct);
  }
  return new json({ id: question_id }, { status: 201 });
}
