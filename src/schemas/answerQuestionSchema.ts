import joi from 'joi';

const answerQuestionSchema = joi.object({
  answer: joi.string().min(3).required(),
});

export default answerQuestionSchema;
