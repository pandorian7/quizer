export function load() {
  const update = async (question, answers) => {
    const { id } = question;
    await fetch(`/api/questions/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answers }),
    });
  };
  return {
    editing: false,
    question: { id: null, question: "" },
    answers: [],
    update,
  };
}
