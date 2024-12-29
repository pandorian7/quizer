import { error } from "@sveltejs/kit";

import db from "$lib/server/database.js";
import auth from "$lib/server/auth.js";

export async function POST({ request }) {
  const data = await request.json().catch(() => error(400, "invalid object"));
  const { username, password } = data;
  if (!username || !password) {
    error(400, "username and password required");
  }

  if (await db.user.exists(username)) {
    return error(400, "username taken");
  }

  await auth.user.create(username, password);

  return new Response(null, { status: 200 });
}
