import React from 'react';

import moment from 'moment';
import { Close as CloseIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { Divider, IconButton, Tooltip, Typography } from '@material-ui/core';

import { EventR51 } from '@app/types';

import { eventTypes } from '@app/constants';

import useStyles from './_jss/EventDetails.jss';

interface EventDetailsProps {
  event: EventR51;
  onClose: () => void;
  canUpdate: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose, canUpdate }) => {
  const classes = useStyles();

  const dateTimeMoment = moment(event.dateTime);
  const dateText = dateTimeMoment.format('dddd, MMMM Do');
  const timeText = dateTimeMoment.format('h:mm A');

  const publicText = `${event.publicStatus.type === 'public' ? 'Public' : 'Private'} event`;
  const lastEdit = `Modified ${moment(event.lastEdit).fromNow()}`;

  return (
    <div className={classes.detailsRoot}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <div className={classes.detailsContainer}>
        <div className={classes.detailsHeader}>
          <Typography className={classes.title} variant="h5">
            {event.name}
          </Typography>
          <div className={classes.detailsSubheader}>
            <Typography variant="body1">{timeText}</Typography>
            <Typography variant="body1">{dateText}</Typography>
          </div>
          <Divider variant="fullWidth" className={classes.hr2} />
        </div>
        <div className={classes.detailsSubheader}>
          <Typography className={classes.underHeader} variant="body2">
            {event.location}
          </Typography>
          <Typography className={classes.underHeader} variant="body2">
            {eventTypes[event.type].formal}
          </Typography>
        </div>
        <div className={classes.eventDescription}>
          <Typography variant="body1">{event.description}</Typography>
        </div>
        <div className={classes.detailsSubheader}>
          <Typography className={classes.secondary} variant="caption">
            {publicText}
          </Typography>
          <Typography className={classes.secondary} variant="caption">
            {lastEdit}
          </Typography>
        </div>
        {canUpdate && (
          <div className={classes.eventActions}>
            <Tooltip title="Edit">
              <IconButton className={classes.editButton}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton className={classes.deleteButton}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
