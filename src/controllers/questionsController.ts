import { Response, Request } from 'express';
import { QuestionBody } from '../interfaces/questionsInterface';
import * as questionsService from '../services/questionsService';
import postQuestionSchema from '../schemas/postQuestionSchema';
import NotFound from '../errors/NotFound';

async function postQuestion(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  const questionBody: QuestionBody = req.body;

  try {
    const { error } = postQuestionSchema.validate(questionBody);
    if (error) return res.status(400).send('The request body contains invalid elements');

    const result = await questionsService.create(questionBody);
    return res.status(201).send({
      id: result,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof NotFound) return res.status(404).send(error.message);
    return res.status(500).send(`Error on Questions: Unable to post question - ${error.message}`);
  }
}

export {
  postQuestion,
};
