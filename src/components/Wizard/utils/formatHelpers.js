/**
 * Format a value for display based on its field type and content
 * @param {any} value - The value to format
 * @param {object} field - The field definition containing type and options
 * @returns {string} - The formatted value as a string
 */
export const formatValue = (value, field) => {
  if (value === undefined || value === null || value === '') {
    return 'Not specified';
  }
  
  if (Array.isArray(value)) {
    if (field.type === 'multiselect' || field.type === 'checkboxes') {
      // For multiselect/checkboxes, map values to labels
      return value.map(v => {
        const option = field.options?.find(opt => opt.value === v);
        return option ? option.label : v;
      }).join(', ');
    } else if (field.type === 'array') {
      // For array fields, show count
      return `${value.length} items`;
    }
    return value.join(', ');
  }
  
  if (typeof value === 'object') {
    return 'Complex value';
  }
  
  if (field.type === 'select') {
    // For select fields, show the label instead of the value
    const option = field.options?.find(opt => opt.value === value);
    return option ? option.label : value;
  }
  
  if (field.type === 'date') {
    return new Date(value).toLocaleDateString();
  }
  
  return value.toString();
};

/**
 * Recursive function to render field values in the review step
 * @param {string} name - Field name
 * @param {any} value - Field value
 * @param {object} fields - Object containing field definitions
 * @param {string} parentPath - Path to the parent field
 * @returns {object} - Object with renderable information
 */
export const prepareFieldValue = (name, value, fields, parentPath = '') => {
  const field = fields[name];
  
  if (!field) return null;
  
  const currentPath = parentPath ? `${parentPath}.${name}` : name;
  
  if (field.type === 'group') {
    return {
      type: 'group',
      key: currentPath,
      label: field.label,
      children: value && Object.entries(field.fields).map(([childName, childField]) => {
        return prepareFieldValue(childName, value[childName], field.fields, currentPath);
      }).filter(Boolean)
    };
  }
  
  if (field.type === 'array') {
    return {
      type: 'array',
      key: currentPath,
      label: field.label,
      count: value ? value.length : 0,
      items: value && value.map((item, index) => ({
        index,
        fields: Object.entries(field.fields).map(([childName, childField]) => ({
          key: `${currentPath}-${index}-${childName}`,
          label: childField.label,
          value: formatValue(item[childName], childField)
        }))
      }))
    };
  }
  
  return {
    type: 'simple',
    key: currentPath,
    label: field.label,
    value: formatValue(value, field)
  };
};
