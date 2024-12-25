import db from "$lib/server/database";
import { json, error } from "@sveltejs/kit";

export async function GET({ params, fetch }) {
  let { id } = params;
  id = Number(id);
  if (!(await db.quizes.exists(id))) {
    return error(404, "quiz not found");
  }
  const { title } = await db.quizes.get(id);
  const questions = (await db.quizes.getQuestions(id))[0];
  let answersP = questions.map(({ id }) =>
    fetch(`/api/questions/${id}`).then((res) => res.json())
  );

  // console.log(answers);

  // for (let i=0; i<questions.length; i++) {
  //   questions[i].answers = await db.questions.getAnswers(questions[i].id);
  // }

  return json({ id, title, questions, answerw });
}
