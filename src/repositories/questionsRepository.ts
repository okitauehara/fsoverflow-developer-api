import connection from '../connection/database';
import {
  AnswerBody, QuestionDB, QuestionStatusDB, UnansweredQuestionsDB,
} from '../interfaces/questionsInterface';

async function findUserByName(student: string): Promise<number> {
  const result = await connection.query(`
    SELECT id FROM users WHERE name = $1
  `, [student]);
  if (!result.rowCount) return null;
  return result.rows[0].id;
}

async function findClassByName(classname: string): Promise<number> {
  const result = await connection.query(`
    SELECT id FROM classes WHERE class = $1
  `, [classname]);
  if (!result.rowCount) return null;
  return result.rows[0].id;
}

async function insert(questionBody: QuestionDB): Promise<number> {
  const {
    question,
    studentId,
    tags,
  } = questionBody;
  const result = await connection.query(`
    INSERT INTO questions
      (question, student, tags)
    VALUES
      ($1, $2, $3)
    RETURNING id
  `, [question, studentId, tags]);
  return result.rows[0].id;
}

async function findQuestionById(questionId: number): Promise<QuestionStatusDB> {
  const result = await connection.query(`
    SELECT answered FROM questions WHERE id = $1
  `, [questionId]);
  if (!result.rowCount) return null;
  return result.rows[0];
}

async function update(answerData: AnswerBody): Promise<boolean> {
  const {
    userId,
    questionId,
    answer,
  } = answerData;
  await connection.query(`
    UPDATE questions 
      SET "answeredAt" = CURRENT_TIMESTAMP, "answeredBy" = $1, answer = $2, answered = true
    WHERE id = $3
  `, [userId, answer, questionId]);
  return true;
}

async function findUnansweredQuestions(): Promise<UnansweredQuestionsDB[]> {
  const result = await connection.query(`
    SELECT
      questions.id,
      questions.question,
      users.name AS student,
      classes.class,
      questions."submitedAt"
    FROM questions
    JOIN users
      ON questions.student = users.id
    JOIN classes
      ON users.class_id = classes.id
    WHERE answered = false
  `);
  if (!result.rowCount) return null;
  return result.rows;
}

async function findAnsweredQuestionById(questionId: number) {
  const result = await connection.query(`
    SELECT
      questions.question,
      users.name AS student,
      classes.class,
      questions.tags,
      questions.answered,
      questions."submitedAt",
      questions."answeredAt",
      "userWhoReplied".name AS "answeredBy",
      questions.answer
    FROM questions
    JOIN users
      ON questions.student = users.id
    JOIN classes
      ON users.class_id = classes.id
    JOIN users AS "userWhoReplied"
      ON questions."answeredBy" = "userWhoReplied".id
    WHERE questions.id = $1
  `, [questionId]);
  if (!result.rowCount) return null;
  return result.rows[0];
}

async function findUnansweredQuestionById(questionId: number) {
  const result = await connection.query(`
    SELECT
      questions.question,
      users.name AS student,
      classes.class,
      questions.tags,
      questions.answered,
      questions."submitedAt"
    FROM questions
    JOIN users
      ON questions.student = users.id
    JOIN classes
      ON users.class_id = classes.id
    WHERE questions.id = $1
  `, [questionId]);
  if (!result.rowCount) return null;
  return result.rows[0];
}

export {
  findUserByName,
  findClassByName,
  insert,
  findQuestionById,
  update,
  findUnansweredQuestions,
  findAnsweredQuestionById,
  findUnansweredQuestionById,
};
