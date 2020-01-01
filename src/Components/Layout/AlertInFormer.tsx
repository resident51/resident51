import React, { FunctionComponent } from "react";

import { FieldProps } from 'formik';
import Alert from "react-bootstrap/Alert";

const digObjectByName: (obj: any, name: string | string[]) => string =
  (obj, name) =>
    typeof name === 'string'
      ? obj[name]
      : name.reduce((result, prop) => result && result[prop], obj);

type FormErrorAlertProps = Pick<FieldProps['form'], 'touched' | 'errors'> & {
  name: string | string[]
}

const AlertInFormer: FunctionComponent<FormErrorAlertProps> = (props) => {
  const { errors, touched, name, children } = props;

  const error = digObjectByName(errors, name);
  const touch = digObjectByName(touched, name);

  return (
    <>
      {children}
      {(error && touch)
        ? <Alert variant={"danger"}>{error}</Alert>
        : <div />}
    </>
  );
};

export default AlertInFormer;
