import React from 'react';

import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { FieldProps } from 'formik';

import { EventType } from '@app/types';

import { eventTypes } from '@app/constants';

import { EventFormValues } from '../EventForm';

import useStyles from './_jss/Type.jss';

const EventTypeInput: React.FC<FieldProps<EventFormValues>> = ({ form, field }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.fullWidth}>
      <RadioGroup className={classes.fullWidth} row aria-label="type" name="type">
        <div className={classes.typeContainer}>
          {Object.keys(eventTypes).map(type => {
            const formal = eventTypes[type as EventType].formal;
            return (
              <Box key={type}>
                <FormControlLabel
                  id={`event-type-${type}`}
                  key={type}
                  value={type}
                  control={
                    <Radio
                      name="type"
                      onChange={field.onChange}
                      required
                      checked={form.values.type === type}
                      color="primary"
                    />
                  }
                  label={formal}
                  labelPlacement="end"
                />
              </Box>
            );
          })}
        </div>
      </RadioGroup>
    </FormControl>
  );
};

export default EventTypeInput;
