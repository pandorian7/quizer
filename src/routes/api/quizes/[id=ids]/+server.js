import { error, json } from "@sveltejs/kit";

import db from "$lib/server/database";

async function ensurePermissions(user, quiz_id) {
  if (!user) {
    error(403, "user is not logged in");
  }

  const quiz = await db.quizes.get(quiz_id);

  if (user.id !== quiz.owner_id) {
    error(401, "this quiz is not owned by the user");
  }
}

export async function GET({ params }) {
  const { id } = params;
  const exists = await db.quizes.exists(id);
  if (!exists) {
    error(404, { message: "quiz does not exist" });
  } else {
    const res = await db.quizes.get(id);
    res.questions = await db.quizes.getQuestions(id);
    const promises = res.questions.map(async (q, i) =>
      (async function () {
        res.questions[i].answers = await db.answers.get(q.id);
      })()
    );
    await Promise.all(promises);
    return json(res);
  }
}

export async function PUT({ params, request, locals }) {
  const { id } = params;

  await ensurePermissions(locals.user, id);

  if (!(await db.quizes.exists(id))) {
    return error(404, { message: "quiz does not exist" });
  }

  const { title, description, points } = await request
    .json()
    .catch(() => error(400, { message: "invalid object" }));
  if (!title) {
    return error(400, { message: "quiz title is required" });
  }
  await db.quizes.update(id, title, description, points);
  return json({ id });
}

export async function DELETE({ params, locals }) {
  const { id } = params;

  await ensurePermissions(locals.user, id);

  if (!(await db.quizes.exists(id))) {
    return error(404, { message: "quiz does not exist" });
  }
  await db.quizes.delete(id);
  return json({ id });
}
