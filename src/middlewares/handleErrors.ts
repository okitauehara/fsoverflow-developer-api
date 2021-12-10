import { NextFunction, Request, Response } from 'express';

export default async function handleErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).send(err.message);
  next();
}
