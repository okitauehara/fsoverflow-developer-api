import connection from '../connection/database';
import { UserDB } from '../interfaces/usersInterface';

async function findUser(userBody: UserDB): Promise<boolean> {
  const {
    name,
    classId,
  } = userBody;

  const result = await connection.query(`
    SELECT * FROM users WHERE name = $1 AND class_id = $2 
  `, [name, classId]);
  if (result.rowCount) return null;
  return true;
}

async function insert(userBody: UserDB): Promise<string> {
  const {
    name,
    classId,
    token,
  } = userBody;

  const result = await connection.query(`
    INSERT INTO users
      (name, token, class_id)
    VALUES
      ($1, $2, $3)
    RETURNING token
  `, [name, token, classId]);
  return result.rows[0].token;
}

export {
  findUser,
  insert,
};
