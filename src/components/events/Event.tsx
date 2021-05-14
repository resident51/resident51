import React, { useCallback } from 'react';

import clsx from 'clsx';
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
  Edit as EditIcon,
  EmojiFlags,
  Info,
  InsertInvitation,
  Public,
  Restaurant,
} from '@material-ui/icons';

import { EventR51, SignedInUser, SignedOutUser } from '@app/types';

import { eventTypes } from '@app/constants';
import { useModal } from '@app/contexts/ui/Modal';
import { useUser } from '@app/contexts/services/User';

import EventDetails from './EventDetails';

import useStyles from './_jss/Event.jss';

const canUpdateEvent = (user: SignedInUser | SignedOutUser | undefined): boolean =>
  !!user?.signedIn;

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
  suppressDetailsModal?: boolean;
}
const Event: React.FC<EventProps> = ({ event, suppressDetailsModal = false }) => {
  const { name, dateTime, type } = event;
  const { user } = useUser();
  const { disclose, dismiss } = useModal();
  const classes = useStyles();
  const EventIcon = eventTypeIcon[type](classes[type]); // make less ugly

  const canUpdate = canUpdateEvent(user);

  const onEventClick = useCallback(() => {
    if (!suppressDetailsModal) {
      const options = { disableIndirectDismissal: false };
      disclose(<EventDetails event={event} onClose={dismiss} canUpdate={canUpdate} />, options);
    }
  }, [disclose, dismiss, event, suppressDetailsModal, canUpdate]);

  const dateTimeMoment = moment(dateTime);
  const dateText = dateTimeMoment.format('MMM Do');
  const timeText = dateTimeMoment.format('h:mm A');
  const secondaryText = `${dateText} - ${timeText}`;

  return (
    <ListItem
      onClick={onEventClick}
      className={clsx({ [classes.eventPointer]: !suppressDetailsModal })}
    >
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
              <EditIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default Event;
