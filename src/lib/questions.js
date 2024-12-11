import { invalidate } from "$app/navigation";

/**
 * @param {string} question
 */
export async function add(question) {
  await fetch("/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  await invalidate("/api/questions");
}

/**
 * @param {string} id
 */
export async function remove(id) {
  await fetch(`/api/questions/${id}`, { method: "DELETE" });
  await invalidate("/api/questions");
}
