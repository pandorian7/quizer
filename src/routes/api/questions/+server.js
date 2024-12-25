import { json, error } from "@sveltejs/kit";

import db from "$lib/server/database";
import { validateQuestionandAnswers } from "$lib/quizer";
import QuestoinBox from "$lib/Components/QuestoinBox.svelte";

export async function GET() {
  const [rows] = await db.questions.getAll();
  return json(rows);
}

export async function POST({ request }) {
  const { question, answers, quiz_id } = await request
    .json()
    .catch(() => error(400, { message: "invalid object" }));

  if (!quiz_id) {
    error(400, { message: "quiz_id is required" });
  }

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
  await db.questions.addToQuiz(quiz_id, question_id);
  for (const answer of answers) {
    await db.answers.add(answer.answer, question_id, answer.is_correct);
  }
  return new json({ id: question_id }, { status: 201 });
}
