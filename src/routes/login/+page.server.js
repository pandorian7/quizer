import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
  const session = cookies.get("session");
  if (session) redirect(303, "/quizes");
}
