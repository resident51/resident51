import React from 'react';

import clsx from 'clsx';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core';

import useStyles from './_jss/Link.jss';

interface LinkProps extends MuiLinkProps {
  component?: React.ElementType;
  disabled?: boolean;
}

const Link: React.FC<LinkProps> = props => {
  const { children, className, disabled, ...additionalProps } = props;
  const classes = useStyles();

  return (
    <MuiLink
      tabIndex={0}
      {...additionalProps}
      className={clsx(className, classes.rootLink, disabled && classes.disabledLink)}
    >
      {children}
    </MuiLink>
  );
};

export default Link;
