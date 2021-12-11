import { Request, Response, NextFunction } from 'express';
import { UserBody } from '../interfaces/usersInterface';
import * as usersService from '../services/usersService';
import postUserSchema from '../schemas/postUserSchema';
import Conflict from '../errors/Conflict';

async function postUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
  const userBody: UserBody = req.body;

  try {
    const { error } = postUserSchema.validate(userBody);
    if (error) return res.status(400).send('The request body contains invalid elements');

    const result = await usersService.create(userBody);
    return res.status(201).send({
      token: result,
    });
  } catch (err) {
    if (err instanceof Conflict) return res.status(409).send(err.message);
    next(err);
  }
}

export {
  postUser,
};
