import * as db from "$lib/server/database";

export async function POST({ request, params }) {
  const { id: question_id } = params;
  const { answer, is_correct } = await request.json();
  await db.addAnswer(answer, question_id, is_correct);
  return new Response(null, { status: 201 });
}
