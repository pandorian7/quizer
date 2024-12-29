// from chagtgpt
import db from "./database";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function getUser(username, password) {
  const password_hash = await hashPassword(password);
  return db.user.get(username, password_hash);
}

export default { password: { hash: hashPassword }, user: { get: getUser } };
