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
