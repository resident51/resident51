import React, { useLayoutEffect, useRef } from 'react';

import clsx from 'clsx';
import { Box, Collapse, IconButton, Paper } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import { Form, Formik } from 'formik';

import { FormikTextField } from '../common/FormFields';

import useStyles from './_jss/EventSearch.jss';

interface EventSearchProps {
  searchFilter: string;
  onSearchFilterChange: (input: { filter: string }) => void;
  isOpen: boolean;
}

const EventSearch: React.FC<EventSearchProps> = props => {
  const { searchFilter, onSearchFilterChange, isOpen } = props;
  const classes = useStyles();
  const searchInput = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (searchInput.current && isOpen) {
      searchInput.current.focus();
    }
  }, [isOpen]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const input = event.target.value;
    if (input.length === 0) {
      onSearchFilterChange({ filter: '' });
    }
  };

  return (
    <Collapse in={isOpen}>
      <Paper square className={classes.eventSearchFilter}>
        <Box className={classes.eventSearchBoxContainer}>
          <Formik
            initialValues={{ filter: searchFilter }}
            onSubmit={onSearchFilterChange}
            onReset={(): void => onSearchFilterChange({ filter: '' })}
          >
            {({ resetForm, values }): React.ReactElement => {
              const clear = (): void => resetForm({ values: { filter: '' } });
              return (
                <Form>
                  <FormikTextField
                    label="Search events"
                    inputRef={searchInput}
                    name="filter"
                    onChange={onChange}
                    className={classes.eventSearchBox}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          className={clsx({
                            [classes.hideClearSearch]: values.filter.length === 0,
                          })}
                          onClick={clear}
                        >
                          <ClearIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Paper>
    </Collapse>
  );
};

export default EventSearch;
