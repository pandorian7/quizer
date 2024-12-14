import { goto } from "$app/navigation";

export function load() {
  const update = async (question, answers) => {
    // const { id } = question;
    let res = await fetch(`/api/questions/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answers }),
    });
    let { id } = await res.json();
    goto(`/question/${id}`);
  };
  return {
    editing: false,
    question: { id: null, question: "", multiple_answers: 0 },
    answers: [],
    update,
  };
}
