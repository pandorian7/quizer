import { json } from "@sveltejs/kit";

import * as db from "$lib/server/database";

export async function GET() {
  //   const [rows] = await db.db.query("SELECT * FROM QUESTIONS");
  const [rows] = await db.getQuestions();
  return json(rows);
}

export async function POST({ request }) {
  const { question } = await request.json();
  db.addQuestion(question);
  return new Response(null, { status: 201 });
}
