import React, { ReactNode, useCallback } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';
import { useField } from 'formik';

type FormikTextFieldProps = Omit<TextFieldProps, 'onBlur' | 'value' | 'error' | 'helperText'> & {
  name: string; // make name a required prop since formik needs it
  reserveHelperTextSpace?: boolean;
};

export const FormikTextField: React.FC<FormikTextFieldProps> = props => {
  const {
    required,
    label,
    reserveHelperTextSpace = true,
    onChange: onChangeCallback,
    ...additionalProps
  } = props;
  const [field, meta] = useField(props.name);
  const formattedLabel: ReactNode | undefined =
    required && typeof label === 'string' ? `${label}*` : label;
  const defaultHelperText = reserveHelperTextSpace ? ' ' : undefined;

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (onChangeCallback) {
        onChangeCallback(e);
      }
      field.onChange(e);
    },
    [onChangeCallback, field],
  );

  return (
    <TextField
      variant="outlined"
      {...additionalProps}
      required={false}
      label={formattedLabel}
      onChange={onChange}
      onBlur={field.onBlur}
      value={field.value}
      error={meta.touched && !!meta.error}
      helperText={(meta.touched && meta.error) || defaultHelperText}
    />
  );
};
