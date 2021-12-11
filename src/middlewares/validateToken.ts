import { Request, Response, NextFunction } from 'express';
import * as usersRepository from '../repositories/usersRepository';
import NotFound from '../errors/NotFound';
import TokenError from '../errors/TokenError';
import { User } from '../interfaces/usersInterface';

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token || token.length !== 36) throw new TokenError('Missing or invalid token');

    const result = await usersRepository.findUserByToken(token);
    if (!result) throw new NotFound('This token does not belong to any registered user');

    const userInfo: User = result;
    res.locals.userInfo = userInfo;
    next();
  } catch (err) {
    if (err instanceof TokenError) return res.status(401).send(err.message);
    if (err instanceof NotFound) return res.status(404).send(err.message);
    next(err);
  }
}
