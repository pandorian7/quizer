// questions

import { invalidate } from "$app/navigation";

async function addQuestion(question, answers, quiz_id) {
  await fetch("/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answers, quiz_id }),
  });
  await invalidate("/api/questions");
}

async function updateQuestion(question, answers, id) {
  await fetch(`/api/questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answers }),
  });
}

async function removeQuestion(id) {
  let res = await fetch(`/api/questions/${id}`, { method: "DELETE" });
  if (res.ok) {
    await invalidate("/api/questions");
  } else {
    let { message } = await res.json();
    alert(message);
  }
}

// answers

async function addAnswer(answer, question_id, is_correct) {
  await fetch(`/api/questions/${question_id}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer, is_correct }),
  });
  await invalidate(`/api/questions/${question_id}/answers`);
}

// quizes

async function getQuizes() {
  let res = await fetch("/api/quizes");
  return await res.json();
}

async function getQuizQuestions(id) {
  let res = await fetch(`/api/quizes/${id}/questions`);
  return await res.json();
}

async function updateQuiz(id, title) {
  const res = await fetch(`/api/quizes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    let { message } = await res.json();
    throw new Error(message);
  }
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

export default {
  questions: {
    add: addQuestion,
    remove: removeQuestion,
    update: updateQuestion,
  },
  answers: {
    add: addAnswer,
  },
  quizes: {
    getAll: getQuizes,
    getQuestions: getQuizQuestions,
    update: updateQuiz,
  },
  validateQuestionandAnswers,
};
