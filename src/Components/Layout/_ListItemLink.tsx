import React, { useMemo } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { useStyles } from '../../hooks/useStyles';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  secondary?: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ icon, to, primary, secondary }) => {
  const classes = useStyles();

  const renderLink = useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button classes={{ gutters: clsx(classes.gutters) }} component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} secondary={secondary || null} />
      </ListItem>
    </li>
  );
};

export default ListItemLink;
