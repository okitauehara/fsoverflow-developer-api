import { AnswerBody, UnansweredQuestionsDB, QuestionBody } from '../interfaces/questionsInterface';
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

async function answer(answerData: AnswerBody): Promise<boolean> {
  const checkQuestion = await questionsRepository.findQuestionById(answerData.questionId);
  if (!checkQuestion) throw new NotFound('Question not found');
  if (checkQuestion.answered) throw new Conflict('Question already answered');

  const result = await questionsRepository.update(answerData);

  return result;
}

async function get(): Promise<UnansweredQuestionsDB[]> {
  const questions = await questionsRepository.findUnansweredQuestions();
  if (!questions) throw new NotFound('Unanswered questions not found');

  const result = questions.map((question) => ({
    ...question,
    submitedAt: formatDate(question.submitedAt),
  }));

  return result;
}

async function getById(questionId: number) {
  const status = await questionsRepository.findQuestionById(questionId);
  if (!status) throw new NotFound('Question not found');

  if (status.answered) {
    const answered = await questionsRepository.findAnsweredQuestionById(questionId);
    const result = {
      ...answered,
      submitedAt: formatDate(answered.submitedAt),
      answeredAt: formatDate(answered.answeredAt),
    };
    return result;
  }
  const unanswered = await questionsRepository.findUnansweredQuestionById(questionId);
  const result = {
    ...unanswered,
    submitedAt: formatDate(unanswered.submitedAt),
  };
  return result;
}

export {
  create,
  answer,
  get,
  getById,
};
