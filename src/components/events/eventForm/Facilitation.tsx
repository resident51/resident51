import React from 'react';

import { FieldProps } from 'formik';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';

import TextField from '../../common/form/TextField';
import { EventFormValues } from '../EventForm';

const orgs = [
  ['hall', 'My Hall'],
  ['ASHC', 'ASHC'],
  ['staff', 'Hall Staff'],
  ['committee', 'Schol-Hall Committee'],
  ['campus', 'The University'],
  ['other', 'Another Organization'],
];

const EventFacilitationInput: React.FC<FieldProps<EventFormValues>> = props => {
  const { values } = props.form;
  const { field } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Organizers</FormLabel>
      <RadioGroup row aria-label="facilitation" name="facilitation" defaultValue="top">
        {orgs.map(([code, formal]) => (
          <FormControlLabel
            key={code}
            id={`event-facilitation-${code}`}
            value={code}
            label={formal}
            labelPlacement="end"
            control={
              <Radio
                name="facilitation.organizationType"
                checked={values.facilitation.organizationType === code}
                onChange={field.onChange}
                color="primary"
                required
              />
            }
          />
        ))}
      </RadioGroup>
      {(values.facilitation.organizationType === 'other' ||
        values.facilitation.organizationType === 'committee') && (
        <FormControl component="fieldset">
          <TextField
            name="facilitation.organizationName"
            label={
              values.facilitation.organizationType === 'committee'
                ? 'Which committee?'
                : 'What organization?'
            }
            inputProps={{
              maxLength: 50,
              placeholder:
                values.facilitation.organizationType === 'committee'
                  ? 'Examples: "Environmental Committee", "Community Service Committee"'
                  : 'Examples: "Alumni Association", "KJHK"',
            }}
            required
          />
        </FormControl>
      )}
    </FormControl>
  );
};

export default EventFacilitationInput;
