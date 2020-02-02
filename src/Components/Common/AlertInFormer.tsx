import React from 'react';

import { FieldProps } from 'formik';
import Alert from 'react-bootstrap/Alert';

/**
 * Dig into formik's `errors` and `touched` objects by using either a string
 * as a prop name or an array of successive prop names
 * @param obj an object, eg { prop1: 8, prop2: { prop2a: 88 } }
 * @param name prop name or array of successive prop names, eg 'prop1' or ['prop2', 'prop2a']
 * @returns the value of the object dig or undefined
 */
const digObjectByName: (
  obj: any, // eslint-disable-line
  name: string | string[],
) => string | undefined = (obj, name) =>
  typeof name === 'string' ? obj[name] : name.reduce((result, prop) => result && result[prop], obj);

type FormErrorAlertProps = Pick<FieldProps['form'], 'touched' | 'errors'> & {
  name: string | string[];
};
const AlertInFormer: React.FC<FormErrorAlertProps> = props => {
  const { errors, touched, name, children } = props;

  const error = digObjectByName(errors, name);
  const touch = digObjectByName(touched, name);

  return (
    <>
      {children}
      {error && touch ? <Alert variant={'danger'}>{error}</Alert> : <div />}
    </>
  );
};

export default AlertInFormer;
