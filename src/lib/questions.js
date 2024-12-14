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
  let res = await fetch(`/api/questions/${id}`, { method: "DELETE" });
  if (res.ok) {
    await invalidate("/api/questions");
  } else {
    let { message } = await res.json();
    alert(message);
  }
}

export async function addAnswer(answer, question_id, is_correct) {
  await fetch(`/api/questions/${question_id}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer, is_correct }),
  });
  await invalidate(`/api/questions/${question_id}/answers`);
}

export function validateQuestionandAnswers(question, answers) {
  if (!question.question) {
    return "question is required";
  }

  if (!answers.length) {
    return "answers are required";
  }

  for (const answer of answers) {
    if (!answer.answer) {
      return "answer cannot be empty";
    }
  }

  const n_corrent_ans = answers.reduce(
    (count, answer) => count + (answer.is_correct ? 1 : 0),
    0
  );

  if (!question.multiple_answers && n_corrent_ans > 1) {
    return "single answer should not have multiple answers selected";
  }

  if (!n_corrent_ans) {
    return "at least a answer must be marked correct";
  }
  return 0;
}
