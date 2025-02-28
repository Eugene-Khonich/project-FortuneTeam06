import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).max(64).required(),
  newPassword: Joi.string().min(8).max(64).required(),
  sessionId: Joi.string(),
});
