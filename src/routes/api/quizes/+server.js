import { json } from "@sveltejs/kit";

import * as db from "$lib/server/database.js";
import { error } from "@sveltejs/kit";
import { invalidate } from "$app/navigation";

function jsonParseErrorHandle() {
  return error(400, { message: "invalid object" });
}

export async function GET() {
  const quizes = await db.getQuizes();
  return json({ quizes });
}

export async function POST({ request }) {
  const { title } = await request.json().catch(jsonParseErrorHandle);
  if (!title) {
    return error(400, { message: "quiz title is required" });
  }
  const quiz_id = await db.addQuiz(title);
  invalidate("/api/quizes");
  return json({ id: quiz_id }, { status: 201 });
}
