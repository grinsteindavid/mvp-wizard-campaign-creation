import Joi from 'joi';

// Base schema for common fields across all traffic sources
const baseSchema = {
  campaignName: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Campaign name is required',
    'string.min': 'Campaign name must be at least 3 characters',
    'string.max': 'Campaign name cannot exceed 50 characters'
  })
};

export default baseSchema;
