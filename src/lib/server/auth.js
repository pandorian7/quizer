// from chagtgpt
import db from "./database";

async function hashValue(value) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function getUser(username, password) {
  const password_hash = await hashValue(password);
  return db.user.get(username, password_hash);
}

async function createUser(username, password) {
  if (await db.user.exists(username)) {
    throw new Error("user exists");
  }
  const password_hash = await hashValue(password);
  const user_id = await db.user.create(username, password_hash);
  return user_id;
}

async function createSession(userId) {
  const uuid = crypto.randomUUID();
  const sessionHash = await hashValue(uuid);
  await db.session.create(userId, sessionHash);
  return sessionHash;
}

async function deleteSession(sesstion_hash) {
  return await db.session.delete(sesstion_hash);
}

export default {
  generate: { hash: hashValue },
  user: { get: getUser, create: createUser },
  session: { create: createSession, delete: deleteSession },
};
