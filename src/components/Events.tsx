import React, { useState } from 'react';

import clsx from 'clsx';
import { Button, Container, IconButton, Paper } from '@material-ui/core';
import {
  List as ListIcon,
  Search as SearchIcon,
  ViewComfy as ViewComfyIcon,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { useEvents } from '@app/contexts/services/Events';

import EventSearch from './events/EventSearch';
import EventTimeline from './events/EventTimeline';

import useStyles from './_jss/Events.jss';

const Events: React.FC = () => {
  useDocumentTitle('Events');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showingList, setShowingList] = useState(true);

  const history = useHistory();

  const { events, filters } = useEvents();
  const { searchFilter, onSearchFilterChange } = filters;

  const classes = useStyles();

  return (
    <div className={classes.eventsRoot}>
      <Container className={classes.eventsNavHeader}>
        <Paper
          className={clsx(classes.eventViewToggle, {
            [classes.buttonIsToggled]: isSearchOpen,
          })}
        >
          <IconButton onClick={(): void => setIsSearchOpen(value => !value)}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Paper className={classes.eventViewToggle}>
          <IconButton onClick={(): void => setShowingList(value => !value)}>
            {showingList ? <ViewComfyIcon /> : <ListIcon />}
          </IconButton>
        </Paper>
        <Button
          variant="contained"
          onClick={(): void => history.push('/events/create')}
          className={clsx(classes.createEventButton)}
        >
          Create Event
        </Button>
      </Container>
      <EventSearch
        isOpen={isSearchOpen}
        searchFilter={searchFilter}
        onSearchFilterChange={onSearchFilterChange}
      />
      {events && events.length ? <EventTimeline events={events} /> : 'loading'}
    </div>
  );
};

export default Events;
