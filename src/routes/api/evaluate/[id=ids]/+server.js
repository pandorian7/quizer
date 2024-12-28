import { json, error } from "@sveltejs/kit";

import db from "$lib/server/database";
import evaluate from "$lib/server/evaluate";

export async function POST({ params, fetch, request }) {
  const { id } = params;

  const exists = await db.quizes.exists(id);

  if (!exists) {
    return error(404, { message: "quiz does not exist" });
  }

  const quiz = await fetch(`/api/quizes/${id}`).then((res) => res.json());

  const response = await request
    .json()
    .catch(() => error(400, { message: "invalid object" }));

  const evaluation = evaluate(quiz, response);

  return json(evaluation);
}
