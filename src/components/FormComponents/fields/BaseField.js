import React from 'react';
import { FieldContainer, Label, ErrorMessage, HelpText } from '../styled/FormElements';

/**
 * Base component for all field types that handles common field rendering logic
 * 
 * @param {Object} props - Component props
 * @param {Object} props.field - Field configuration
 * @param {React.ReactNode} props.children - Field input element(s)
 * @param {string} props.error - Error message if any
 * @returns {JSX.Element}
 */
const BaseField = ({ field, children, error }) => {
  return (
    <FieldContainer>
      <Label htmlFor={field.name}>{field.label}</Label>
      {children}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {field.helpText && <HelpText>{field.helpText}</HelpText>}
    </FieldContainer>
  );
};

export default BaseField;
