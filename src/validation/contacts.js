import Joi from 'joi';

export const postContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name must have at most {#limit} characters',
    'any.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must have at least {#limit} characters',
    'string.max': 'Phone number must have at most {#limit} characters',
    'any.empty': 'Phone number cannot be empty',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type must be a string',
      'any.empty': 'Contact type cannot be empty',
      'any.only': 'Contact type must be one of the value: work, home, personal',
      'any.required': 'Contact type is required',
    }),
});

export const patchContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
