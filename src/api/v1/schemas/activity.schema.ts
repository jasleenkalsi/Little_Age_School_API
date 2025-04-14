import Joi from 'joi';

export const activitySchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  description: Joi.string().allow(''),
  createdBy: Joi.string().required(),
  participants: Joi.array().items(Joi.string()).required(),
});
