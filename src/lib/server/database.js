import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "QUIZER",
});

export const getQuestions = () => db.query("SELECT * FROM QUESTIONS");

export const getQuestion = (/** @type {number} */ id) =>
  db.query("SELECT * FROM QUESTIONS WHERE id = ?", [id]);

export const addQuestion = async (
  /** @type {string} */ question,
  multiple_answers
) => {
  await db.query(
    "INSERT INTO QUESTIONS (question, multiple_answers) VALUES (?, ?)",
    [question, multiple_answers]
  );
  let res = await db.query("SELECT LAST_INSERT_ID() as id");
  let question_id = res[0][0].id;
  return question_id;
};

export const deleteQuestion = async (/** @type {number} */ id) => {
  let res = await db.query(
    "SELECT EXISTS (SELECT 1 FROM QUESTIONS WHERE id = ? ) AS RowExists",
    id
  );
  let { RowExists } = res[0][0];
  if (RowExists) {
    await db.query("DELETE FROM QUESTIONS WHERE id = ?", [id]);
    return 1;
  } else {
    return 0;
  }
};

export const addAnswer = (answer, question_id, is_correct) =>
  db.query(
    "INSERT INTO ANSWERS (answer, question_id, is_correct) VALUES (?, ?, ?)",
    [answer, question_id, is_correct]
  );

export const getAnswers = (question_id) =>
  db.query("SELECT id, answer, is_correct FROM ANSWERS WHERE question_id = ?", [
    question_id,
  ]);

export const updateQuestion = (id, question, multiple_answers) =>
  db.query(
    "UPDATE QUESTIONS SET question = ? ,multiple_answers= ?  WHERE id = ?",
    [question, multiple_answers, id]
  );

export const deleteAnswer = (id) =>
  db.query("DELETE FROM ANSWERS WHERE id = ?", [id]);

export const updateAnswer = (id, answer, is_correct) =>
  db.query("UPDATE ANSWERS SET answer = ?, is_correct = ? WHERE id = ?", [
    answer,
    is_correct,
    id,
  ]);
