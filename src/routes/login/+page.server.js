import database from "$lib/server/database.js";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  const session = cookies.get("session");
  if (await database.session.get(session)) redirect(303, "/quizes");
}
