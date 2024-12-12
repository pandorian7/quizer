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

export async function addAnswer(answer, question_id, is_correct) {
  await fetch(`/api/questions/${question_id}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer, is_correct }),
  });
  await invalidate(`/api/questions/${question_id}/answers`);
}
