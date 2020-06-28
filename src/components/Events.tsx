import React from 'react';

import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  List,
  Paper,
  Switch,
  Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';

import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { useEvents } from '@app/contexts/Events';
import { useUser } from '@app/contexts/User';

import Event from './events/Event';
import FormikTextField from './common/FormFields';

import useStyles from './_jss/Events.jss';

const Events: React.FC = () => {
  useDocumentTitle('Events');
  const { user } = useUser();
  const { events, filters } = useEvents();
  const classes = useStyles();

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
        <Paper>
          <p>Howdy, {user.displayName || 'pal'}, this is the events page.</p>
          <p>Also, there are {events ? events.length : '(loading)'} events.</p>
        </Paper>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={5} md={4} className={classes.eventsListOptions}>
          <Paper>
            <Typography className={classes.eventOptionsTitle} variant="h4" component="h1">
              Search Events
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
        <Grid item xs={12} sm={7} md={8} className={classes.eventsListContainer}>
          {events ? (
            <List className={classes.eventList}>
              {events?.map((event, index, arr) => (
                <React.Fragment key={event.id}>
                  <Event event={event} />
                  {index === arr.length - 1 ? null : <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Events;
