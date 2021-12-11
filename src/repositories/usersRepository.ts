import connection from '../connection/database';
import { UserBody, UserDB } from '../interfaces/usersInterface';

async function findUser(userBody: UserBody) {
  const {
    name,
    classname,
  } = userBody;

  const result = await connection.query(`
    SELECT * FROM users WHERE name = $1 AND classname = $2 
  `, [name, classname]);
  if (result.rowCount) return null;
  return true;
}

async function insert(userBody: UserDB) {
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
