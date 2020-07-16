import React, { useCallback, useState } from 'react';

import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';

import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { useEvents } from '@app/contexts/services/Events';

import EventList, { EventSortMethod, eventSortMethods } from './events/EventList';
import { FormikTextField } from './common/FormFields';

import useStyles from './_jss/Events.jss';

const Events: React.FC = () => {
  useDocumentTitle('Events');
  const { events, filters } = useEvents();
  const classes = useStyles();

  const [sortMethod, setSortMethod] = useState<EventSortMethod>('date');
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortMethodChange = useCallback((_: Record<string, any>, method: EventSortMethod) => {
    setSortMethod(method);
  }, []);

  const {
    searchFilter,
    onSearchFilterChange,
    showPublicEvents,
    togglePublicEvents,
    showPrivateEvents,
    togglePrivateEvents,
  } = filters;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const input = event.target.value;
    if (input.length === 0) {
      onSearchFilterChange({ filter: '' });
    }
  };

  return (
    <Grid container spacing={3} className={classes.eventsRoot}>
      <Grid item xs={12} className={classes.eventsListContainer}>
        <Typography variant="h2" component="h2">
          Schol-Hall Events
        </Typography>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6} md={5} className={classes.eventsListOptions}>
          <Paper>
            <Typography className={classes.eventOptionsTitle} variant="h4" component="h1">
              Find an Event
            </Typography>
            {/* <Divider /> */}
            <Box className={classes.eventOptions}>
              <Box className={classes.eventSearchBoxContainer}>
                <Formik initialValues={{ filter: searchFilter }} onSubmit={onSearchFilterChange}>
                  <Form>
                    <FormikTextField
                      label="Search events"
                      name="filter"
                      onChange={onChange}
                      className={classes.eventSearchBox}
                    />
                  </Form>
                </Formik>
              </Box>
              {/* <Divider /> */}
              {/* <Typography className={classes.eventOptionsTitle} variant="h6" component="h1">
                Search by Type
              </Typography> */}
              <Grid container spacing={3} className={classes.publicFilters}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showPublicEvents}
                        onChange={togglePublicEvents}
                        name="show-public-events"
                      />
                    }
                    labelPlacement="top"
                    label="Public events"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showPrivateEvents}
                        onChange={togglePrivateEvents}
                        name="show-public-events"
                      />
                    }
                    labelPlacement="top"
                    label="Private events"
                  />
                </Grid>
              </Grid>
              <Divider />
              <Typography className={classes.eventOptionsTitle} variant="h6" component="h1">
                Event Type
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={12}
          sm={6}
          md={7}
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Paper className={classes.sortMethods}>
              {/* <Typography variant="h6" component="h4">
                Sort by
              </Typography> */}
              <Tabs
                value={sortMethod}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleSortMethodChange}
                aria-label="event sort method tabs"
                centered
              >
                {eventSortMethods.map(method => {
                  const label = ((): string => {
                    const labelPrefix = sortMethod === method ? 'Sort by ' : '';
                    const methodFormal = method[0].toUpperCase() + method.slice(1);
                    return `${labelPrefix}${methodFormal}`;
                  })();
                  return (
                    <Tab key={method} className={classes.sortTab} value={method} label={label} />
                  );
                })}
              </Tabs>
            </Paper>
          </Grid>
          <Grid item>
            <EventList events={events} sortMethod={sortMethod} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Events;
