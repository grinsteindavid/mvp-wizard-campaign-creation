import Joi from 'joi';

// Base schema for common fields across all data sources
const baseSchema = {
  projectName: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Project name is required',
    'string.min': 'Project name must be at least 3 characters',
    'string.max': 'Project name cannot exceed 50 characters'
  })
};

export default baseSchema;
