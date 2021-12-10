import connection from '../connection/database';
import { QuestionDB } from '../interfaces/questionsInterface';

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
    student,
    tags,
  } = questionBody;
  const result = await connection.query(`
    INSERT INTO questions
      (question, student, tags)
    VALUES
      ($1, $2, $3)
    RETURNING id
  `, [question, student, tags]);
  return result.rows[0].id;
}

export {
  findUserByName,
  findClassByName,
  insert,
};
