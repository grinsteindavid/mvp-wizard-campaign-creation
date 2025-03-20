import { 
  TextField,
  TextAreaField,
  SelectField,
  MultiSelectField,
  CheckboxField,
  CheckboxesField,
  RadioField,
  fieldTypeMap
} from './index';

import TextFieldComponent from './TextField';
import TextAreaFieldComponent from './TextAreaField';
import SelectFieldComponent from './SelectField';
import MultiSelectFieldComponent from './MultiSelectField';
import CheckboxFieldComponent from './CheckboxField';
import CheckboxesFieldComponent from './CheckboxesField';
import RadioFieldComponent from './RadioField';

describe('Field Components Index', () => {
  test('exports all field components correctly', () => {
    expect(TextField).toBe(TextFieldComponent);
    expect(TextAreaField).toBe(TextAreaFieldComponent);
    expect(SelectField).toBe(SelectFieldComponent);
    expect(MultiSelectField).toBe(MultiSelectFieldComponent);
    expect(CheckboxField).toBe(CheckboxFieldComponent);
    expect(CheckboxesField).toBe(CheckboxesFieldComponent);
    expect(RadioField).toBe(RadioFieldComponent);
  });

  test('fieldTypeMap maps field types to correct components', () => {
    expect(fieldTypeMap.text).toBe(TextField);
    expect(fieldTypeMap.number).toBe(TextField);
    expect(fieldTypeMap.email).toBe(TextField);
    expect(fieldTypeMap.url).toBe(TextField);
    expect(fieldTypeMap.date).toBe(TextField);
    expect(fieldTypeMap.textarea).toBe(TextAreaField);
    expect(fieldTypeMap.select).toBe(SelectField);
    expect(fieldTypeMap.multiselect).toBe(MultiSelectField);
    expect(fieldTypeMap.checkbox).toBe(CheckboxField);
    expect(fieldTypeMap.checkboxes).toBe(CheckboxesField);
    expect(fieldTypeMap.radio).toBe(RadioField);
  });

  test('fieldTypeMap contains all supported field types', () => {
    const expectedFieldTypes = [
      'text', 'number', 'email', 'url', 'date',
      'textarea', 'select', 'multiselect',
      'checkbox', 'checkboxes', 'radio'
    ];
    
    const actualFieldTypes = Object.keys(fieldTypeMap);
    
    expect(actualFieldTypes).toHaveLength(expectedFieldTypes.length);
    expectedFieldTypes.forEach(type => {
      expect(fieldTypeMap[type]).toBeDefined();
    });
  });
});
