import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Collapse, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { FieldProps } from 'formik';

import { HALLS } from '@app/constants';

import TextField from '../../common/form/TextField';
import { EventFormValues } from '../EventForm';

import useStyles from './_jss/Location.jss';

const locs = [...HALLS, 'Crawford Building', 'Complex-wide', 'Virtual'];

const EventLocationInput: React.FC<FieldProps<EventFormValues>> = props => {
  const { values } = props.form;
  const { field } = props;
  const locationInitial = useRef(values.location);
  const otherInput = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  // `otherText` is its own variable because we want the input text
  // to remain populated even if another option is clicked.
  const [otherEnabled, setOtherEnabled] = useState(false);
  const [otherText, setOtherText] = useState('');

  // On first render, get initial location input and set first state
  useEffect(() => {
    const otherIsChecked = Boolean(
      locationInitial.current && !locs.includes(locationInitial.current),
    );

    setOtherEnabled(otherIsChecked);
    setOtherText(otherIsChecked ? locationInitial.current : '');
  }, []);

  useLayoutEffect(() => {
    if (otherInput.current && otherEnabled) {
      otherInput.current.focus();
    }
  }, [otherEnabled]);

  return (
    <FormControl className={classes.fullWidth}>
      <RadioGroup className={classes.fullWidth} row aria-label="location" name="location">
        <div className={classes.locationContainer}>
          {locs.map(location => (
            <FormControlLabel
              id={`event-location-${location}`}
              key={location}
              value={location}
              label={location}
              labelPlacement="end"
              control={
                <Radio
                  name="location"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    field.onChange(e);
                    setOtherEnabled(false);
                  }}
                  required
                  checked={!otherEnabled && values.location === location}
                  color="primary"
                />
              }
            />
          ))}
          <FormControlLabel
            id={`event-location-other`}
            value={otherText /* field.onChange is passed otherText when selecting 'other' */}
            label="Other"
            labelPlacement="end"
            control={
              <Radio
                name="location"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  field.onChange(e);
                  setOtherEnabled(true);
                }}
                required
                checked={otherEnabled}
                color="primary"
              />
            }
          />
        </div>
        <Collapse in={otherEnabled} className={classes.otherInput}>
          <TextField
            name="location"
            inputRef={otherInput}
            className={classes.otherInput}
            label="Location"
            inputProps={{
              maxLength: 50,
              value: otherText,
              placeholder: 'Examples: "Strong Hall", "Memorial Stadium"',
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setOtherText(e.target.value);
            }}
            required
          />
        </Collapse>
      </RadioGroup>
    </FormControl>
  );
};

export default EventLocationInput;
