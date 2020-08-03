import React from 'react';

import { MenuItem } from '@material-ui/core';

import TextField, { TextFieldProps } from './TextField';

interface FormikSelectFieldOption {
  id: string;
  display: string;
}

type FormikSelectFieldProps = Omit<TextFieldProps, 'select'> & {
  /**
   * Select dropdown options
   */
  options: Array<FormikSelectFieldOption | string>;
};

const FormikSelectField: React.FC<FormikSelectFieldProps> = props => {
  const { options, ...textFieldProps } = props;

  return (
    <TextField {...textFieldProps} select>
      {options.map((option, i) => {
        const { id, display } = option as FormikSelectFieldOption;
        const optionString = option as string;
        return (
          <MenuItem key={id || i} value={id || optionString}>
            {display || optionString}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default FormikSelectField;
