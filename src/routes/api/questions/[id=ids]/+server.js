import { validateQuestionandAnswers } from "$lib/quizer";
import db from "$lib/server/database";

import { json, error } from "@sveltejs/kit";

export async function DELETE({ params }) {
  const { id } = params;
  let deleted = await db.questions.delete(+id);
  if (deleted) {
    return new Response(null, { status: 204 });
  } else {
    error(404, { message: "question does not exist" });
  }
}

export async function GET({ params }) {
  const { id } = params;
  const res = {};
  const [qrows] = await db.questions.get(+id);

  if (!qrows.length) {
    error(404, { message: "question does not exist" });
  }

  const [ansrows] = await db.answers.get(+id);
  res.question = qrows[0];
  res.answers = ansrows;
  return json(res);
}

export async function PUT({ params, request }) {
  const { id } = params;

  const exists = db.questions.exists(id);

  if (!exists) {
    error(404, { message: "question does not exist" });
  }

  const { question, answers } = await request.json();

  const msg = validateQuestionandAnswers(question, answers);

  if (msg) {
    error(400, { message: msg });
  }

  await db.questions.update(
    +id,
    question.question,
    question.multiple_answers,
    question.duration
  );
  const existingAnswers = await db.answers.get(+id);
  const existingAnswerIds = existingAnswers.map((row) => row.id);
  const newAnswerIds = answers.map((ans) => ans.id);
  const toDelete = existingAnswerIds.filter((id) => !newAnswerIds.includes(id));
  const toModify = existingAnswers.filter((row) =>
    newAnswerIds.includes(row.id)
  );
  const toAdd = answers.filter((ans) => !existingAnswerIds.includes(ans.id));
  for (const id of toDelete) {
    await db.answers.delete(id);
  }
  for (const ans of toModify) {
    const { id, answer, is_correct } = answers.find((a) => a.id === ans.id);
    await db.answers.update(id, answer, is_correct);
  }
  for (const ans of toAdd) {
    await db.answers.add(ans.answer, +id, ans.is_correct);
  }
  return new Response(null, { status: 204 });
}
