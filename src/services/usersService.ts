import { v4 as uuid } from 'uuid';
import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import { UserBody } from '../interfaces/usersInterface';
import * as usersRepository from '../repositories/usersRepository';
import * as questionsRepository from '../repositories/questionsRepository';

async function create(userBody: UserBody): Promise<string> {
  const {
    name,
    classname,
  } = userBody;

  const getClassId = await questionsRepository.findClassByName(classname);
  if (!getClassId) throw new NotFound('The class name does not belong to any registered class');

  const checkConflict = await usersRepository.findUser({
    name,
    classId: getClassId,
  });
  if (!checkConflict) throw new Conflict('User already registered');

  const token: string = uuid();
  const result = await usersRepository.insert({
    name,
    classId: getClassId,
    token,
  });

  return result;
}

export {
  create,
};
