import { redirect } from "@sveltejs/kit";

export async function load({ locals: { user }, url }) {
  if (!user) redirect(302, "/login?from=" + url.pathname);
}
