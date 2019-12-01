import React from "react"; //, { useState }

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const WebsiteForm = ({ values, errors, touched }) => (
  <Form>
    <h1>Site</h1>
    <div>
      {touched.subject && errors.subject && <p>{errors.subject}</p>}
      <Field type="text" name="subject" placeholder="Subject" />
    </div>
    <div>
      {touched.feedback && errors.feedback && <p>{errors.feedback}</p>}
      <Field type="textarea" name="feedback" placeholder="Your submission..." />
    </div>
    <button type="submit">Submit</button>
  </Form>
);

const WebsiteForm_Formik = withFormik({
  mapPropsToValues() {
    return {
      subject: "",
      feedback: ""
    };
  },
  validationSchema: Yup.object().shape({
    subject: Yup.string().required(),
    feedback: Yup.string().required()
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(WebsiteForm);

export default WebsiteForm_Formik;
