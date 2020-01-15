import React from "react";

import Form from "react-bootstrap/Form";
import { FieldProps } from "formik";

import { WebsiteFeedbackFormValues } from "../Website";
import AlertInFormer from "../../Layout/AlertInFormer";

const Subject: React.FC<FieldProps<WebsiteFeedbackFormValues>> = props => {
  const {
    form: { values, touched, errors },
    field
  } = props;

  return (
    <AlertInFormer errors={errors} touched={touched} name="subject">
      <Form.Group controlId="subject">
        <Form.Label>Subject:</Form.Label>
        <Form.Control
          name="subject"
          required
          type="text"
          maxLength={100}
          onChange={field.onChange}
          value={values.subject}
          placeholder="Summarize your feedback"
        />
        <Form.Text className="text-muted">
          Limit 100 Characters ({100 - (values.subject ? values.subject.length : 0)} remaining)
        </Form.Text>
      </Form.Group>
    </AlertInFormer>
  );
};

export default Subject;
