import React, { ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import uniqid from 'uniqid';
import zxcvbn, { ZXCVBNScore } from 'zxcvbn';
import { IconButton, InputAdornment, MenuItem, TextField, TextFieldProps } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import { useField } from 'formik';

import useStyles from './_jss/FormFields.jss';

type FormikTextFieldProps = Omit<
  TextFieldProps,
  'onChange' | 'onBlur' | 'value' | 'error' | 'helperText'
> & {
  name: string; // make name a required prop since formik needs it
  reserveHelperTextSpace?: boolean;
};

const FormikTextField: React.FC<FormikTextFieldProps> = React.forwardRef((props, ref) => {
  const { required, label, reserveHelperTextSpace = true, ...additionalProps } = props;
  const classes = useStyles();
  const [field, meta] = useField(props.name);
  const formattedLabel: ReactNode | undefined =
    required && typeof label === 'string' ? `${label}*` : label;
  const defaultHelperText = reserveHelperTextSpace ? ' ' : undefined;

  return (
    <TextField
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
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      error={meta.touched && !!meta.error}
      helperText={(meta.touched && meta.error) || defaultHelperText}
    />
  );
});

type FormikPasswordProps = Omit<FormikTextFieldProps, 'inputRef' | 'InputProps' | 'type'> & {
  /**
   * Determines whether to display a password strength meter under the field
   */
  strengthMeter?: boolean;
  /**
   * Determines whether to display a visibility toggle switch in the field
   */
  visibilitySwitch?: boolean;
};

const FormikPasswordField: React.FC<FormikPasswordProps> = props => {
  const { strengthMeter, visibilitySwitch, ...textFieldProps } = props;
  const { name } = textFieldProps;
  const [visible, setVisible] = useState<boolean>(false);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const strengthBarId = useRef<string>(uniqid('password-strength-'));
  const [field] = useField(name);
  const classes = useStyles();

  const toggleVisibility = useCallback(() => {
    setVisible(prevVisible => !prevVisible);
  }, []);

  useLayoutEffect(() => {
    if (strengthMeter && fieldRef.current) {
      const score: ZXCVBNScore = zxcvbn(field.value).score;
      const strengthBarEl = document.getElementById(strengthBarId.current);
      const strengthBarClasses = clsx(
        classes.strengthBar,
        !!field.value && (classes as Record<string, string>)[`strengthBar${score}`],
      );
      if (!strengthBarEl) {
        const strengthBarContainer = document.createElement('div');
        strengthBarContainer.id = strengthBarId.current;
        strengthBarContainer.className = classes.strengthBarContainer;

        const strengthBarChild = document.createElement('div');
        strengthBarChild.className = strengthBarClasses;

        strengthBarContainer.appendChild(strengthBarChild);
        fieldRef.current.querySelector('fieldset')?.append(strengthBarContainer);
      } else {
        strengthBarEl.children[0].className = strengthBarClasses;
      }
    }
  });

  const inputAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={toggleVisibility} edge="end">
        {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormikTextField
      label="Password"
      required
      {...textFieldProps}
      ref={fieldRef}
      type={visible ? 'text' : 'password'}
      InputProps={
        visibilitySwitch
          ? { endAdornment: inputAdornment, className: classes.inputContainer }
          : undefined
      }
    />
  );
};

interface FormikSelectFieldOption {
  id: string;
  display: string;
}
type FormikSelectFieldProps = Omit<FormikTextFieldProps, 'select'> & {
  /**
   * Select dropdown options
   */
  options: Array<FormikSelectFieldOption | string>;
};
const FormikSelectField: React.FC<FormikSelectFieldProps> = props => {
  const { options, ...textFieldProps } = props;

  return (
    <FormikTextField {...textFieldProps} select>
      {options.map((option, i) => {
        const { id, display } = option as FormikSelectFieldOption;
        const optionString = option as string;
        return (
          <MenuItem key={id || i} value={id || optionString}>
            {display || optionString}
          </MenuItem>
        );
      })}
    </FormikTextField>
  );
};

export { FormikTextField, FormikPasswordField, FormikSelectField };
