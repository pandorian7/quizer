import * as db from "$lib/server/database";

export async function DELETE({ params }) {
  const { id } = params;
  //handle not a number
  await db.deleteQuestion(+id);
  return new Response(null, { status: 204 });
}
