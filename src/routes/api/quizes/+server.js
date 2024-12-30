import { json } from "@sveltejs/kit";

import db from "$lib/server/database.js";
import { error } from "@sveltejs/kit";

function jsonParseErrorHandle() {
  return error(400, { message: "invalid object" });
}

export async function GET() {
  const quizes = await db.quizes.getAll();
  return json({ quizes });
}

export async function POST({ request, locals }) {
  const { title } = await request.json().catch(jsonParseErrorHandle);
  if (!title) {
    return error(400, { message: "quiz title is required" });
  }
  if (!locals.user) {
    return error(403, "not logged in");
  }

  const quiz_id = await db.quizes.add(title, locals.user.id);
  return json({ id: quiz_id }, { status: 201 });
}
