import React from 'react';

import { Prompt } from 'react-router-dom';
import { useFormikContext } from 'formik';

const PromptIfDirty: React.FC = () => {
  const formik = useFormikContext();
  const { dirty, submitCount, errors } = formik;
  const hasErrors = Object.keys(errors).length > 0;
  const hasNotSubmitted = submitCount === 0;
  return (
    <Prompt
      when={dirty && (hasNotSubmitted || hasErrors)}
      message="Are you sure you want to leave? You have unsaved changes."
    />
  );
};

export default PromptIfDirty;
