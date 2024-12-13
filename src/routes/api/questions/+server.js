import { json } from "@sveltejs/kit";

import * as db from "$lib/server/database";

export async function GET() {
  const [rows] = await db.getQuestions();
  return json(rows);
}

// export async function POST({ request }) {
//   const { question } = await request.json();
//   await db.addQuestion(question);
//   return new Response(null, { status: 201 });
// }
