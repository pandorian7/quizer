import { error, json } from "@sveltejs/kit";

import db from "$lib/server/database";

export async function GET({ params }) {
  const { id } = params;
  const exists = await db.quizes.exists(id);
  if (!exists) {
    error(404, { message: "quiz does not exist" });
  } else {
    const res = await db.quizes.get(id);
    return json(res);
  }
}

export async function PUT({ params, request }) {
  const { id } = params;

  if (!(await db.quizes.exists(id))) {
    return error(404, { message: "quiz does not exist" });
  }

  const { title } = await request
    .json()
    .catch(() => error(400, { message: "invalid object" }));

  if (!title) {
    return error(400, { message: "quiz title is required" });
  }
  await db.quizes.update(id, title);
  return json({ id });
}

export async function DELETE({ params }) {
  const { id } = params;
  if (!(await db.quizes.exists(id))) {
    return error(404, { message: "quiz does not exist" });
  }
  db.quizes.delete(id);
  return json({ id });
}
