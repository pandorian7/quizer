import { error } from "@sveltejs/kit";

import auth from "$lib/server/auth.js";

export async function POST({ request, cookies }) {
  const data = await request.json().catch(() => error(400, "invalid object"));
  const { username, password } = data;
  if (!username || !password) {
    return error(400, "username and password required");
  }
  const user = await auth.user.get(username, password);
  if (user) {
    cookies.set("session", user.username, { path: "/" });
    return new Response(null, { status: 200 });
  } else {
    return error(401, "Username or Password Invalid");
  }
}
