import React from "react";

import Alert from "react-bootstrap/Alert";

const FormError = (
  errorCheck: { errors: any, touched: any},
  name: string
) => {
  const { errors, touched } = errorCheck;

  return (
    errors[name] && touched[name] && (
      <Alert variant={"danger"}>{errors[name]}</Alert>
    )
  )
};

export default FormError;
