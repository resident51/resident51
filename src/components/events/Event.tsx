import React from 'react';

import moment from 'moment';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import {
  Eco,
  Edit,
  EmojiFlags,
  Info,
  InsertInvitation,
  Public,
  Restaurant,
} from '@material-ui/icons';

import { EventR51 } from '@app/types';

import { canUpdateEvent } from '@app/utils';
import { useEvents } from '@app/contexts/Events';
import { useUser } from '@app/contexts/User';

import useStyles from './_jss/Event.jss';

interface EventTypeIcon {
  [type: string]: (className: string) => React.ReactElement;
}
const eventTypeIcon: EventTypeIcon = {
  social: className => <InsertInvitation className={className} />,
  meeting: className => <Info className={className} />,
  meal: className => <Restaurant className={className} />,
  community: className => <Eco className={className} />,
  alumni: className => <Public className={className} />,
  campus: className => <EmojiFlags className={className} />,
};

interface EventProps {
  event: EventR51;
}
const Event: React.FC<EventProps> = ({ event }) => {
  const { name, dateTime, type } = event;
  const { user } = useUser();
  const { eventTypes } = useEvents();
  const classes = useStyles();
  const EventIcon = eventTypeIcon[type](classes[type]); // make less ugly

  const dateTimeMoment = moment(dateTime);
  const dateText = dateTimeMoment.format('MMM Do');
  const timeText = dateTimeMoment.format('h:mm A');
  const secondaryText = `${dateText} - ${timeText}`;

  const canUpdate = canUpdateEvent(event.publicStatus, user);
  return (
    <ListItem>
      <Tooltip title={eventTypes[type].formal}>
        <ListItemAvatar>
          <Avatar className={classes[type]}>{EventIcon}</Avatar>
        </ListItemAvatar>
      </Tooltip>
      <ListItemText
        primary={name}
        secondary={secondaryText}
        secondaryTypographyProps={{ className: classes.secondaryText }}
      />
      {canUpdate && (
        <ListItemSecondaryAction>
          <Tooltip title="Edit event">
            <IconButton edge="end" aria-label="comments">
              <Edit />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default Event;
