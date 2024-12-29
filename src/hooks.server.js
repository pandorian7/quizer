import db from "$lib/server/database";

export async function handle({ event, resolve }) {
  const session = event.cookies.get("session");
  const user = await db.session.get(session);
  if (!user) db.session.delete(session);
  event.locals.user = user;
  return resolve(event);
}
