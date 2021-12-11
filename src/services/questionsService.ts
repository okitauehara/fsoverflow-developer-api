import { QuestionBody } from '../interfaces/questionsInterface';
import * as questionsRepository from '../repositories/questionsRepository';
import NotFound from '../errors/NotFound';

async function create(questionBody: QuestionBody): Promise<number> {
  const {
    question,
    student,
    classname,
    tags,
  } = questionBody;

  const getUserId = await questionsRepository.findUserByName(student);
  if (!getUserId) throw new NotFound('The student name does not belong to any registered user');

  const getClassId = await questionsRepository.findClassByName(classname);
  if (!getClassId) throw new NotFound('The class name does not belong to any registered class');

  const result = await questionsRepository.insert({
    question,
    studentId: getUserId,
    tags,
  });

  return result;
}

export {
  create,
};
