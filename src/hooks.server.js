export async function handle({ event, resolve }) {
  const session = event.cookies.get("session");
  const user = { username: session };
  event.locals.user = session ? user : null;
  return resolve(event);
}
