import Joi from 'joi';

export const addWaterSchema = Joi.object({
  drinkedWater: Joi.number().min(1).max(5000).required().messages({
    'number.base': 'Must be a number',
    'any.required': 'required field',
    'number.min': 'Must be greater than or equal to 1',
    'number.max': 'Must be less than or equal to 5000',
  }),

  drinkTime: Joi.string()
    .required()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    .messages({
      'string.base': 'Must be a string',
      'string.pattern.base': 'Must be in the format YYYY-MM-DD HH:mm',
      'any.required': 'required field',
    }),
});

export const updateWaterSchema = Joi.object({
  drinkedWater: Joi.number().min(1).max(5000).messages({
    'number.base': 'Must be a number',
    'number.min': 'Must be greater than or equal to 1',
    'number.max': 'Must be less than or equal to 5000',
  }),

  drinkTime: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    .messages({
      'string.base': 'Must be a string',
      'string.pattern.base': 'Must be in the format YYYY-MM-DD HH:mm',
    }),
});

export const dateSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Must be in the format YYYY-MM-DD',
      'any.required': 'required field',
    }),
});

export const monthSchema = Joi.object({
  yearMonth: Joi.string()
    .pattern(/^\d{4}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Must be in the format YYYY-MM',
      'any.required': 'required field',
    }),
});
