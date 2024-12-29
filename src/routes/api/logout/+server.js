import { redirect } from "@sveltejs/kit";

export async function POST({ cookies }) {
  cookies.delete("session", { path: "/" });
  return redirect(301, "/login");
}
