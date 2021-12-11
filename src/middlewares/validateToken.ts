import { Request, Response, NextFunction } from 'express';
import connection from '../connection/database';
import NotFound from '../errors/NotFound';
import TokenError from '../errors/TokenError';
import { User } from '../interfaces/usersInterface';

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token || token.length !== 36) throw new TokenError('Missing or invalid token');

    const result = await connection.query(
      `
      SELECT
        users.id,
        users.name,
        users.token,
        classes.class
      FROM users
      JOIN classes
        ON users.class_id = classes.id
      WHERE users.token = $1`,
      [token],
    );
    if (!result.rowCount) throw new NotFound('This token does not belong to any registered user');

    const userInfo: User = result.rows[0];
    res.locals.userInfo = userInfo;
    next();
  } catch (err) {
    if (err instanceof TokenError) return res.status(401).send(err.message);
    if (err instanceof NotFound) return res.status(404).send(err.message);
    next(err);
  }
}
