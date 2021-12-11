import joi from 'joi';

const postUserSchema = joi.object({
  name: joi.string().min(3).required(),
  classname: joi.string().max(2).alphanum().required(),
});

export default postUserSchema;
