import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "QUIZER",
});

export const getQuestions = () => db.query("SELECT * FROM QUESTIONS");

export const addQuestion = (/** @type {string} */ question) =>
  db.query("INSERT INTO QUESTIONS (question) VALUES (?)", [question]);
