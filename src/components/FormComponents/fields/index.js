import TextField from './TextField';
import TextAreaField from './TextAreaField';
import SelectField from './SelectField';
import MultiSelectField from './MultiSelectField';
import CheckboxField from './CheckboxField';
import CheckboxesField from './CheckboxesField';
import RadioField from './RadioField';

export {
  TextField,
  TextAreaField,
  SelectField,
  MultiSelectField,
  CheckboxField,
  CheckboxesField,
  RadioField
};

// Field type to component mapping
export const fieldTypeMap = {
  text: TextField,
  number: TextField,
  email: TextField,
  url: TextField,
  date: TextField,
  textarea: TextAreaField,
  select: SelectField,
  multiselect: MultiSelectField,
  checkbox: CheckboxField,
  checkboxes: CheckboxesField,
  radio: RadioField
};
