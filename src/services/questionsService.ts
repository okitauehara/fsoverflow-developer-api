import { Answer, UnansweredQuestion, QuestionBody } from '../interfaces/questionsInterface';
import * as questionsRepository from '../repositories/questionsRepository';
import NotFound from '../errors/NotFound';
import Conflict from '../errors/Conflict';
import formatDate from '../utils/formatDate';

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

async function answer(answerData: Answer): Promise<boolean> {
  const checkQuestion = await questionsRepository.findQuestionById(answerData.questionId);
  if (!checkQuestion) throw new NotFound('Question not found');
  if (checkQuestion.answered) throw new Conflict('Question already answered');

  const result = await questionsRepository.update(answerData);

  return result;
}

async function get(): Promise<UnansweredQuestion[]> {
  const questions = await questionsRepository.findUnansweredQuestions();
  if (!questions) throw new NotFound('Unanswered questions not found');

  const result = questions.map((question) => ({
    id: question.id,
    question: question.question,
    student: question.student,
    class: question.class,
    submitedAt: formatDate(question.submitedAt),
  }));

  return result;
}

export {
  create,
  answer,
  get,
};
