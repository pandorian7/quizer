import { json } from "@sveltejs/kit";

import * as db from "$lib/server/database";

export async function GET() {
  const [rows] = await db.getQuestions();
  return json(rows);
}

export async function POST({ request }) {
  const { question, answers } = await request.json();

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
  return new Response(null, { status: 201 });
}
