import { Response, Request, NextFunction } from 'express';
import { QuestionBody } from '../interfaces/questionsInterface';
import * as questionsService from '../services/questionsService';
import postQuestionSchema from '../schemas/postQuestionSchema';
import NotFound from '../errors/NotFound';
import answerQuestionSchema from '../schemas/answerQuestionSchema';
import Conflict from '../errors/Conflict';

async function postQuestion(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
  const questionBody: QuestionBody = req.body;

  try {
    const { error } = postQuestionSchema.validate(questionBody);
    if (error) return res.status(400).send('The request body contains invalid elements');

    const result = await questionsService.create(questionBody);
    return res.status(201).send({
      id: result,
    });
  } catch (err) {
    if (err instanceof NotFound) return res.status(404).send(err.message);
    next(err);
  }
}

async function postAnswer(req: Request, res: Response, next: NextFunction) {
  const { userId } = res.locals;
  const questionId = Number(req.params.id);
  const { answer } = req.body;

  try {
    const { error } = answerQuestionSchema.validate({ answer });
    if (error) return res.status(400).send('The request body contains invalid elements');

    await questionsService.answer({ userId, questionId, answer });
    return res.sendStatus(200);
  } catch (err) {
    if (err instanceof NotFound) return res.status(404).send(err.message);
    if (err instanceof Conflict) return res.status(409).send(err.message);
    next(err);
  }
}

export {
  postQuestion,
  postAnswer,
};
