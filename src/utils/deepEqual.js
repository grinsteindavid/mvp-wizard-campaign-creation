/**
 * Deep equality comparison between two values
 * Optimized for comparing objects, arrays, and primitive values
 * @param {*} obj1 - First value to compare
 * @param {*} obj2 - Second value to compare
 * @returns {boolean} - Whether the values are deeply equal
 */
export const isEqual = (obj1, obj2) => {
  // Quick reference check for performance
  if (obj1 === obj2) return true;
  
  // Handle null/undefined
  if (!obj1 || !obj2) return false;
  if (typeof obj1 !== typeof obj2) return false;
  
  // For arrays
  if (Array.isArray(obj1)) {
    if (!Array.isArray(obj2) || obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false;
    }
    return true;
  }
  
  // For objects (not null, arrays are handled above)
  if (typeof obj1 === 'object') {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!obj2.hasOwnProperty(key) || !isEqual(obj1[key], obj2[key])) return false;
    }
    return true;
  }
  
  // For primitives
  return obj1 === obj2;
};

/**
 * Memoization helper that can be used with React memo
 * to perform deep comparisons between props
 * @param {Function} propsAreEqual - Function that compares specific props
 * @returns {Function} - Function to use with React.memo
 */
export const createDeepEqualityCheck = (propsAreEqual) => {
  return (prevProps, nextProps) => {
    // Call the provided comparison function with isEqual
    return propsAreEqual(prevProps, nextProps, isEqual);
  };
};
