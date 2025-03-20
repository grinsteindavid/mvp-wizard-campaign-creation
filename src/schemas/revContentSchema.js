import Joi from 'joi';
import baseSchema from './baseSchema';

// RevContent validation schema builder
const createRevContentSchema = () => Joi.object({
  ...baseSchema,
  targetUrl: Joi.string().uri().required().messages({
    'string.uri': 'Target URL must be a valid URL',
    'string.empty': 'Target URL is required',
    'any.required': 'Target URL is required'
  }),
  bidAmount: Joi.number().min(0.01).required().messages({
    'number.base': 'Bid amount must be a number',
    'number.min': 'Bid amount must be at least $0.01',
    'any.required': 'Bid amount is required'
  }),
  dailyBudget: Joi.number().min(5).required().messages({
    'number.base': 'Daily budget must be a number',
    'number.min': 'Daily budget must be at least $5',
    'any.required': 'Daily budget is required'
  }),
  targeting: Joi.object({
    countries: Joi.array().min(1).items(Joi.string()).required().messages({
      'array.min': 'At least one country must be selected',
      'any.required': 'Countries are required'
    }),
    devices: Joi.array().items(Joi.string()).min(1).messages({
      'array.min': 'At least one device must be selected'
    })
  }).required()
});

export default createRevContentSchema;
