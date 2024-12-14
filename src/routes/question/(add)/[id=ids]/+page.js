import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  const res = await fetch(`/api/questions/${params.id}`);
  if (!res.ok) {
    error(res.status, await res.json());
  }
  const { question, answers } = await res.json();
  const update = async (question, answers) => {
    const { id } = question;
    await fetch(`/api/questions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answers }),
    });
  };
  return { editing: true, question, answers, update };
}
