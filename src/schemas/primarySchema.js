import Joi from 'joi';
import baseSchema from './baseSchema';

// Primary data source validation schema builder
const createPrimarySchema = () => Joi.object({
  ...baseSchema,
  dailyBudget: Joi.number().min(5).required().messages({
    'number.base': 'Daily budget must be a number',
    'number.min': 'Daily budget must be at least $5',
    'any.required': 'Daily budget is required'
  }),
  bidStrategy: Joi.string().valid('cpc', 'cpm', 'cpv').required().messages({
    'any.only': 'Please select a valid bid strategy',
    'any.required': 'Bid strategy is required'
  }),
  keywords: Joi.string().required().messages({
    'string.empty': 'Keywords are required'
  }),
  categoryGroups: Joi.array().min(1).items(
    Joi.object({
      name: Joi.string().required().messages({
        'string.empty': 'Category group name is required'
      }),
      cpc: Joi.number().min(0.01).required().messages({
        'number.base': 'Max CPC must be a number',
        'number.min': 'Max CPC must be at least $0.01',
        'any.required': 'Max CPC is required'
      })
    })
  ).required().messages({
    'array.min': 'At least one category group is required',
    'any.required': 'Category groups are required'
  })
});

export default createPrimarySchema;
