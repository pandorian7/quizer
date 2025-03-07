import mysql from "mysql2/promise";

import { HOST, USER, PASSWORD, DATABASE } from "$env/static/private";

let db;

const mysqlConfig = {
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  connectionLimit: 1,
};

export function initDB() {
  db = mysql.createPool(mysqlConfig);
}

const getQuestions = () => db.query("SELECT * FROM QUESTIONS");

const getQuestion = (/** @type {number} */ id) =>
  db.query("SELECT * FROM QUESTIONS WHERE id = ?", [id]);

const addQuestion = async (
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
const QuestionaddToQuiz = async (quiz_id, question_id) =>
  await db.query(
    "INSERT INTO QUIZ_QUESTIONS (quiz_id, question_id) VALUES (?, ?)",
    [quiz_id, question_id]
  );

const questionExists = async (id) => {
  let res = await db.query(
    "SELECT EXISTS (SELECT 1 FROM QUESTIONS WHERE id = ? ) AS RowExists",
    [id]
  );
  let { RowExists } = res[0][0];
  return RowExists;
};

const deleteQuestion = async (/** @type {number} */ id) => {
  let exists = await questionExists(id);
  if (exists) {
    await db.query("DELETE FROM QUESTIONS WHERE id = ?", [id]);
    return 1;
  } else {
    return 0;
  }
};

const addAnswer = (answer, question_id, is_correct) =>
  db.query(
    "INSERT INTO ANSWERS (answer, question_id, is_correct) VALUES (?, ?, ?)",
    [answer, question_id, is_correct]
  );

const getAnswers = (question_id) =>
  db
    .query("SELECT id, answer, is_correct FROM ANSWERS WHERE question_id = ?", [
      question_id,
    ])
    .then((res) => res[0]);

const updateQuestion = (id, question, multiple_answers, duration) =>
  db.query(
    "UPDATE QUESTIONS SET question = ? ,multiple_answers= ?, duration = ?  WHERE id = ?",
    [question, multiple_answers, duration, id]
  );

const deleteAnswer = (id) => db.query("DELETE FROM ANSWERS WHERE id = ?", [id]);

const updateAnswer = (id, answer, is_correct) =>
  db.query("UPDATE ANSWERS SET answer = ?, is_correct = ? WHERE id = ?", [
    answer,
    is_correct,
    id,
  ]);

const getQuizes = async () =>
  (
    await db.query(
      "select qs.*, us.username from QUIZES as qs JOIN USERS as us on qs.owner_id = us.id"
    )
  )[0];

const addQuiz = async (title, owner_id) => {
  await db.query("INSERT INTO QUIZES (title, owner_id) VALUES (?, ?)", [
    title,
    owner_id,
  ]);
  let res = await db.query("SELECT LAST_INSERT_ID() as id");
  let quiz_id = res[0][0].id;
  return quiz_id;
};

const getQuiz = async (id) => {
  return (await db.query("SELECT * FROM QUIZES WHERE id = ?", [id]))[0][0];
};

const quizExists = async (id) => {
  let res = await db.query(
    "SELECT EXISTS (SELECT 1 FROM QUIZES WHERE id = ? ) AS RowExists",
    [id]
  );
  let { RowExists } = res[0][0];
  return RowExists;
};

const updateQuiz = (id, title, description, points) =>
  db.query(
    "UPDATE QUIZES SET title = ?, description = ?, points = ? WHERE id = ?",
    [title, description, points, id]
  );

const deleteQuiz = (id) => db.query("DELETE FROM QUIZES WHERE id = ?", [id]);

const getQuizQuestions = (id) =>
  db
    .query(
      "select qs.id, qs.question, qs.multiple_answers, qs.duration from QUESTIONS as qs join QUIZ_QUESTIONS as qq on qs.id = qq.question_id where qq.quiz_id = ?",
      [id]
    )
    .then((res) => res[0]);

const createUser = async (username, password_hash) => {
  await db.query("INSERT INTO USERS (username, password_hash) VALUES (?, ?)", [
    username,
    password_hash,
  ]);
  let res = await db.query("SELECT LAST_INSERT_ID() as id");
  let user_id = res[0][0].id;
  return user_id;
};

const userExists = async (username) => {
  let res = await db.query(
    "SELECT EXISTS (SELECT 1 FROM USERS WHERE username = ? ) AS RowExists",
    [username]
  );
  let { RowExists } = res[0][0];
  return RowExists;
};

const getUser = async (username, password_hash) => {
  let res = await db.query(
    "SELECT id, username FROM USERS WHERE username = ? AND password_hash = ?",
    [username, password_hash]
  );
  const results = res[0];
  if (results.length) {
    let user = results[0];
    return user;
  } else {
    return null;
  }
};

const createSession = async (user_id, session_hash) => {
  await db.query("INSERT INTO SESSIONS (user_id, token) VALUES (?, ?)", [
    user_id,
    session_hash,
  ]);
  return session_hash;
};

const deleteSession = async (session_hash) =>
  await db.query("DELETE FROM SESSIONS WHERE token = ?", [session_hash]);

const userFromSession = async (session_hash) => {
  const res = (
    await db.query(
      "SELECT USERS.username, USERS.id AS id FROM USERS JOIN SESSIONS ON USERS.id = SESSIONS.user_id WHERE SESSIONS.token = ?;",
      [session_hash]
    )
  )[0];
  if (res.length) {
    return res[0];
  } else {
    return null;
  }
};

export default {
  questions: {
    getAll: getQuestions,
    get: getQuestion,
    add: addQuestion,
    addToQuiz: QuestionaddToQuiz,
    exists: questionExists,
    delete: deleteQuestion,
    update: updateQuestion,
  },
  answers: {
    add: addAnswer,
    get: getAnswers,
    update: updateAnswer,
    delete: deleteAnswer,
  },
  quizes: {
    getAll: getQuizes,
    get: getQuiz,
    add: addQuiz,
    exists: quizExists,
    update: updateQuiz,
    delete: deleteQuiz,
    getQuestions: getQuizQuestions,
  },
  user: {
    create: createUser,
    exists: userExists,
    get: getUser,
  },
  session: {
    create: createSession,
    get: userFromSession,
    delete: deleteSession,
  },
};
