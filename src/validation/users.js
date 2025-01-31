import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(32),
  email: Joi.string().email(),
  gender: Joi.string().valid('male', 'female'),
  dailyNorm: Joi.number().integer(),
});
