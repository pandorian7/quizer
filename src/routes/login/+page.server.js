import database from "$lib/server/database.js";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies, url }) {
  const session = cookies.get("session");
  let from = url.searchParams.get("from");
  if (!from) from = "/quizes";
  if (await database.session.get(session)) redirect(303, "/quizes");
  return { from };
}
