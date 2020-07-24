import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import uniqid from 'uniqid';
import zxcvbn, { ZXCVBNScore } from 'zxcvbn';
import { IconButton, InputAdornment } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import { useField } from 'formik';

import TextField, { TextFieldProps } from './TextField';

import useStyles from './_jss/PasswordField.jss';

type PasswordFieldProps = Omit<TextFieldProps, 'inputRef' | 'InputProps' | 'type'> & {
  /**
   * Determines whether to display a password strength meter under the field
   */
  strengthMeter?: boolean;
  /**
   * Determines whether to display a visibility toggle switch in the field
   */
  visibilitySwitch?: boolean;
};

const PasswordField: React.FC<PasswordFieldProps> = props => {
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
    <TextField
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

export default PasswordField;
