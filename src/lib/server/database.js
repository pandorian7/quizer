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

export const addQuestion = (/** @type {string} */ question) =>
  db.query("INSERT INTO QUESTIONS (question) VALUES (?)", [question]);

export const deleteQuestion = (/** @type {number} */ id) =>
  db.query("DELETE FROM QUESTIONS WHERE id = ?", [id]);

export const addAnswer = (answer, question_id, is_correct) =>
  db.query(
    "INSERT INTO ANSWERS (answer, question_id, is_correct) VALUES (?, ?, ?)",
    [answer, question_id, is_correct]
  );

export const getAnswers = (question_id) =>
  db.query("SELECT id, answer, is_correct FROM ANSWERS WHERE question_id = ?", [
    question_id,
  ]);
