import Joi from 'joi';

export const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  grade: Joi.string().required(),
  section: Joi.string().required(),
});
