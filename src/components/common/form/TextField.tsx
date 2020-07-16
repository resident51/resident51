import React, { useCallback } from 'react';

import clsx from 'clsx';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import { useField } from 'formik';

import useStyles from './_jss/TextField.jss';

type TextFieldProps = Omit<MuiTextFieldProps,'onBlur' | 'value' | 'error' | 'helperText'> & {
  name: string; // make name a required prop since formik needs it
  reserveHelperTextSpace?: boolean;
};

const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const { required, label, reserveHelperTextSpace = true, onChange: onChangeCallback, ...additionalProps } = props;
  const classes = useStyles();
  const [field, meta] = useField(props.name);
  const formattedLabel = required && typeof label === 'string' ? `${label}*` : label;
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
    <MuiTextField
      ref={ref}
      variant="outlined"
      {...additionalProps}
      className={clsx(classes.formikTextField, props.className)}
      FormHelperTextProps={{
        classes: {
          ...props.FormHelperTextProps?.classes,
          root: classes.formikTextFieldHelper,
        },
      }}
      required={false}
      label={formattedLabel}
      onChange={onChange}
      onBlur={field.onBlur}
      value={field.value}
      error={meta.touched && !!meta.error}
      helperText={(meta.touched && meta.error) || defaultHelperText}
    />
  );
});

// eslint-disable-next-line
export type { TextFieldProps };
export default TextField;
