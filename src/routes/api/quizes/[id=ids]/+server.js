import { error, json } from "@sveltejs/kit";

import * as quiz from "$lib/quizes";
import * as db from "$lib/server/database";

export async function GET({ params }) {
  const { id } = params;
  const exists = await quiz.quizExists(id);
  if (!exists) {
    error(404, { message: "quiz does not exist" });
  } else {
    const res = await db.getQuiz(id);
    return json(res);
  }
}
