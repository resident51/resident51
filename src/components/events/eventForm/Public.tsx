import React, { useState } from 'react';

import {
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { FieldProps } from 'formik';

import { Hall, SignedInUser } from '@app/types';

import { HALLS } from '@app/constants';
import { useUser } from '@app/contexts/services/User';

import { EventFormValues } from '../EventForm';

import useStyles from './_jss/Public.jss';

const types = [
  ['public', 'Open to anyone'],
  ['halls', 'Multiple halls'],
  ['hall', 'My hall'],
];

const EventPublicInput: React.FC<FieldProps<EventFormValues>> = props => {
  const { values } = props.form;
  const { field } = props;
  const classes = useStyles();

  const [selected, setSelected] = useState<Hall[]>(values.publicStatus.halls);
  const { user } = useUser();

  const signedInUser = user as SignedInUser; // make this suck less balls later

  const userHall = signedInUser.hall;

  return (
    <FormControl component="fieldset" className={classes.fullWidth}>
      <FormLabel component="legend">Event Attendees</FormLabel>
      <RadioGroup
        className={classes.publicTypes}
        row
        aria-label="position"
        name="position"
        defaultValue="top"
      >
        {types.map(([code, formal]) => (
          <FormControlLabel
            key={code}
            id={`event-public-${code}`}
            value={code}
            label={formal}
            labelPlacement="end"
            control={
              <Radio
                name="publicStatus.type"
                checked={values.publicStatus.type === code}
                onChange={field.onChange}
                color="primary"
                required
              />
            }
          />
        ))}
      </RadioGroup>
      <Collapse in={values.publicStatus.type === 'halls'}>
        {values.publicStatus.type === 'halls' && (
          <FormControl component="fieldset" className={classes.fullWidth}>
            <FormLabel component="legend">Which halls?</FormLabel>
            <FormGroup aria-label="position" className={classes.hallSelection}>
              {HALLS.map(hall => (
                <FormControlLabel
                  key={hall}
                  value={hall}
                  id={`public-select-hall-${hall}`}
                  label={hall}
                  labelPlacement="end"
                  control={
                    <Checkbox
                      name="publicStatus.halls"
                      checked={userHall === hall || selected.includes(hall)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        // If this hall is already in selected, remove it, else add it.
                        const toChange: Hall[] = selected.includes(hall)
                          ? selected.filter(v => v !== hall)
                          : [...selected, e.target.value as Hall];

                        field.onChange(e);
                        setSelected(toChange);
                      }}
                      disabled={userHall === hall}
                      color="primary"
                    />
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        )}
      </Collapse>
    </FormControl>
  );
};

export default EventPublicInput;
