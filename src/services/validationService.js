import Joi from 'joi';

// Base schema for common fields across all traffic sources
const baseSchema = {
  campaignName: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Campaign name is required',
    'string.min': 'Campaign name must be at least 3 characters',
    'string.max': 'Campaign name cannot exceed 50 characters'
  })
};

// Google Ads validation schema builder
const createGoogleSchema = () => Joi.object({
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
  adGroups: Joi.array().min(1).items(
    Joi.object({
      name: Joi.string().required().messages({
        'string.empty': 'Ad group name is required'
      }),
      cpc: Joi.number().min(0.01).required().messages({
        'number.base': 'Max CPC must be a number',
        'number.min': 'Max CPC must be at least $0.01',
        'any.required': 'Max CPC is required'
      })
    })
  ).required().messages({
    'array.min': 'At least one ad group is required',
    'any.required': 'Ad groups are required'
  })
});

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

// Yahoo validation schema builder
const createYahooSchema = () => Joi.object({
  ...baseSchema,
  campaignObjective: Joi.string().valid('visits', 'awareness', 'conversions').required().messages({
    'any.only': 'Please select a valid campaign objective',
    'any.required': 'Campaign objective is required'
  }),
  startDate: Joi.date().iso().required().messages({
    'date.base': 'Start date must be a valid date',
    'any.required': 'Start date is required'
  }),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).allow(null, '').messages({
    'date.base': 'End date must be a valid date',
    'date.min': 'End date must be after start date'
  }),
  budget: Joi.object({
    amount: Joi.number().min(10).required().messages({
      'number.base': 'Budget amount must be a number',
      'number.min': 'Budget amount must be at least $10',
      'any.required': 'Budget amount is required'
    }),
    type: Joi.string().valid('daily', 'lifetime').required().messages({
      'any.only': 'Please select a valid budget type',
      'any.required': 'Budget type is required'
    })
  }).required(),
  bidding: Joi.object({
    strategy: Joi.string().valid('manual', 'auto').required().messages({
      'any.only': 'Please select a valid bid strategy',
      'any.required': 'Bid strategy is required'
    }),
    amount: Joi.when('strategy', {
      is: 'manual',
      then: Joi.number().min(0.01).required().messages({
        'number.base': 'Bid amount must be a number',
        'number.min': 'Bid amount must be at least $0.01',
        'any.required': 'Bid amount is required for manual bidding'
      }),
      otherwise: Joi.any().allow(null, '')
    })
  }).required()
});

// Map of traffic sources to their validation schema creators
const schemaCreators = {
  google: createGoogleSchema,
  revcontent: createRevContentSchema,
  yahoo: createYahooSchema
};

// Validate campaign data based on traffic source
export const validateCampaign = (trafficSource, campaignData) => {
  const createSchema = schemaCreators[trafficSource];
  
  if (!createSchema) {
    return {
      isValid: false,
      errors: { general: 'Invalid traffic source' }
    };
  }

  try {
    // Create a fresh schema each time to avoid any potential issues with schema reuse
    const schema = createSchema();
    const { error } = schema.validate(campaignData, { abortEarly: false });
    
    if (error) {
      const errors = {};
      
      error.details.forEach((detail) => {
        const path = detail.path.join('.');
        errors[path] = detail.message;
      });
      
      return {
        isValid: false,
        errors
      };
    }
    
    return {
      isValid: true,
      errors: {}
    };
  } catch (err) {
    return {
      isValid: false,
      errors: { general: 'Validation error occurred' }
    };
  }
};

// Validate a specific field
export const validateField = (trafficSource, fieldName, value, formData = {}) => {
  const createSchema = schemaCreators[trafficSource];
  
  if (!createSchema) {
    return {
      isValid: false,
      error: 'Invalid traffic source'
    };
  }

  try {
    // Create the full schema
    const fullSchema = createSchema();
    
    // Extract the specific field schema if it's a top-level field
    const fieldSchema = fullSchema.extract(fieldName);
    
    if (!fieldSchema) {
      // Handle nested fields (e.g., 'budget.amount')
      const parts = fieldName.split('.');
      if (parts.length > 1) {
        const parentField = parts[0];
        const childField = parts[1];
        
        // Extract the parent schema
        const parentSchema = fullSchema.extract(parentField);
        
        if (parentSchema && parentSchema.extract) {
          // Try to extract the child schema
          const childSchema = parentSchema.extract(childField);
          
          if (childSchema) {
            const { error } = childSchema.validate(value);
            return {
              isValid: !error,
              error: error ? error.message : null
            };
          }
        }
      }
      
      return {
        isValid: true,
        error: null
      };
    }
    
    // Validate the field
    const { error } = fieldSchema.validate(value);
    
    return {
      isValid: !error,
      error: error ? error.message : null
    };
  } catch (err) {
    return {
      isValid: false,
      error: 'Validation error occurred'
    };
  }
};
