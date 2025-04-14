import Joi from 'joi';

export const attendanceSchema = Joi.object({
  studentId: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  status: Joi.string().valid('Present', 'Absent', 'Late').required(),
});
