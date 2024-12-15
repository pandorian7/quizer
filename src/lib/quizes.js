import * as db from "$lib/server/database";

export async function quizExists(id) {
  return db.quizExists(id);
}
