import React, { ReactNode } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';
import { useField } from 'formik';

type FormikTextFieldProps = TextFieldProps & {
  name: string; // make name a required prop since formik needs it
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const FormikTextField: React.FC<FormikTextFieldProps> = props => {
  const { required, label, onChange } = props;
  const [field, meta] = useField(props.name);
  const formattedLabel: ReactNode | undefined =
    required && typeof label === 'string' ? `${label}*` : label;

  const onChangeWithFormik = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (onChange) {
      onChange(event);
    }
    field.onChange(event);
  };
  return (
    <TextField
      variant="outlined"
      {...props}
      required={false}
      label={formattedLabel}
      onChange={onChangeWithFormik}
      onBlur={field.onBlur}
      value={field.value}
      error={meta.touched && !!meta.error}
      helperText={meta.error}
    />
  );
};

export default FormikTextField;
