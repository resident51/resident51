import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import uniqid from 'uniqid';
import zxcvbn from 'zxcvbn';
import { IconButton, InputAdornment, InputBaseComponentProps } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import { useField } from 'formik';

import useLast from '@app/hooks/useLast';

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

const MaskedInputField: React.FC<InputBaseComponentProps> = props => {
  const {
    component: Component,
    inputRef,
    value: _value,
    onChange,
    mask: _mask,
    ...otherProps
  } = props;
  // Have to cast these here because mui typechecking freaks if you extend InputBaseComponentProps
  const value = _value as string;
  const mask = _mask as boolean;
  const lastValue = useLast(value);
  const [maskedValue, setMaskedValue] = useState(value);
  const timer = useRef<number>();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (!mask) {
        onChange?.(event);
        return;
      }
      const updatedValue = event.target.value;
      if (updatedValue.length > value.length) {
        event.target.value = value + updatedValue.substring(value.length);
      } else {
        event.target.value = value.substring(0, updatedValue.length);
      }
      onChange?.(event);
    },
    [mask, onChange, value],
  );

  useLayoutEffect(() => {
    if (!lastValue) {
      setMaskedValue(value);
    } else if (lastValue.length < value.length) {
      const partialMask = lastValue.replace(/[^•]/g, '•') + value.substring(lastValue.length);
      clearTimeout(timer.current);
      setMaskedValue(partialMask);
    } else {
      setMaskedValue(value.replace(/[^•]/g, '•'));
    }

    timer.current = window.setTimeout(
      () => setMaskedValue(partialMask => partialMask.replace(/[^•]/g, '•')),
      1000,
    );
  }, [lastValue, value]);

  return (
    <Component
      ref={inputRef}
      {...otherProps}
      onChange={handleChange}
      value={mask ? maskedValue : value}
      type="text"
    />
  );
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
      const { score } = zxcvbn(field.value);
      type StrengthBarClass =
        | 'strengthBar0'
        | 'strengthBar1'
        | 'strengthBar2'
        | 'strengthBar3'
        | 'strengthBar4';
      const strengthBarEl = document.getElementById(strengthBarId.current);
      const strengthBarClasses = clsx(
        classes.strengthBar,
        !!field.value && classes[`strengthBar${score}` as StrengthBarClass],
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
  }, [classes, field.value, strengthMeter]);

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
      InputProps={{
        endAdornment: visibilitySwitch && inputAdornment,
        className: visibilitySwitch ? classes.inputContainer : '',
        inputComponent: MaskedInputField,
        inputProps: {
          component: 'input',
          mask: !visible,
          value: field.value,
          onChange: field.onChange,
        },
      }}
    />
  );
};

export default PasswordField;
