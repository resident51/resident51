import React from "react";

import { useFormikContext } from "formik";
import { Prompt } from "react-router-dom";

const PromptIfDirty: React.FC = () => {
  const formik = useFormikContext();
  return (
    <Prompt
      when={formik.dirty && formik.submitCount === 0}
      message="Are you sure you want to leave? You have unsaved changes."
    />
  );
};

export default PromptIfDirty;
