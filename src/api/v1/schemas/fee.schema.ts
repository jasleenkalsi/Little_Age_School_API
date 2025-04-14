import Joi from 'joi';

export const feeSchema = Joi.object({
  studentId: Joi.string().required(),
  amount: Joi.number().positive().required(),
  date: Joi.string().isoDate().required(), // or use custom regex for YYYY-MM-DD
});
