import Joi from 'joi';
import { emailRegexp } from '../constants/users';

export const registerUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});
