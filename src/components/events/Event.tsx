import React from 'react';

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Eco, EmojiFlags, Info, InsertInvitation, Public, Restaurant } from '@material-ui/icons';

import { EventR51 } from '@app/types';

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
  const { name, description, type } = event;
  const classes = useStyles();
  const EventIcon = eventTypeIcon[type](classes[type]);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes[type]}>{EventIcon}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={description + description}
        secondaryTypographyProps={{ className: classes.secondaryText }}
      />
    </ListItem>
  );
};

export default Event;
