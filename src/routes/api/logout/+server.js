import { redirect } from "@sveltejs/kit";

import auth from "$lib/server/auth.js";

export async function POST({ cookies }) {
  const session = cookies.get("session", { path: "/" });
  await auth.session.delete(session);
  cookies.delete("session", { path: "/" });
  return redirect(301, "/login");
}
