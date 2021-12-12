import connection from '../connection/database';
import { Answer, Question, QuestionDB } from '../interfaces/questionsInterface';

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

async function findQuestionById(questionId: number): Promise<Question> {
  const result = await connection.query(`
    SELECT * FROM questions WHERE id = $1
  `, [questionId]);
  if (!result.rowCount) return null;
  return result.rows[0];
}

async function update(answerData: Answer): Promise<boolean> {
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

async function findUnansweredQuestions() {

}

export {
  findUserByName,
  findClassByName,
  insert,
  findQuestionById,
  update,
  findUnansweredQuestions,
};
