import * as db from "$lib/server/database";

import { json } from "@sveltejs/kit";

export async function DELETE({ params }) {
  const { id } = params;
  //handle not a number
  await db.deleteQuestion(+id);
  return new Response(null, { status: 204 });
}

export async function GET({ params }) {
  const { id } = params;
  const res = {};
  const [qrows] = await db.getQuestion(+id);
  const [ansrows] = await db.getAnswers(+id);
  res.question = qrows[0];
  res.answers = ansrows;
  return json(res);
}

export async function PUT({ params, request }) {
  const { id } = params;
  const { question, answers } = await request.json();
  await db.updateQuestion(+id, 0, question);
  const existingAnswers = (await db.getAnswers(+id))[0];
  const existingAnswerIds = existingAnswers.map((row) => row.id);
  const newAnswerIds = answers.map((ans) => ans.id);
  const toDelete = existingAnswerIds.filter((id) => !newAnswerIds.includes(id));
  const toModify = existingAnswers.filter((row) =>
    newAnswerIds.includes(row.id)
  );
  const toAdd = answers.filter((ans) => !existingAnswerIds.includes(ans.id));
  for (const id of toDelete) {
    await db.deleteAnswer(id);
  }
  for (const ans of toModify) {
    const { id, answer, is_correct } = answers.find((a) => a.id === ans.id);
    await db.updateAnswer(id, answer, is_correct);
  }
  for (const ans of toAdd) {
    await db.addAnswer(ans.answer, +id, ans.is_correct);
  }
  return new Response(null, { status: 204 });
}
