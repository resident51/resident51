import React, { useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';
import { Alert } from '@material-ui/lab';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  LinearProgress,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';

import Link from '../common/Link';

import useStyles from './_jss/AuthContentContainer.jss';

interface AuthContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * An error message
   */
  error?: string;
  /**
   * Data for the content header
   */
  header: {
    title: string;
    icon: React.ReactNode;
    iconColor?: 'primary' | 'secondary';
    subtitle?: string;
  };
  /**
   * Clickable text to display under body content
   */
  bottomText?: string;
  /**
   * Determines whether the loading state is on for the container
   */
  isLoading?: boolean;
  /**
   * Callback triggered when a closing action is taken
   */
  onClose: () => void;
  /**
   * Callback triggered when the bottom text is clicked
   */
  onBottomTextClick?: () => void;
}

const AuthContentContainer = React.forwardRef<unknown, AuthContentContainerProps>((props, ref) => {
  const {
    children,
    className,
    error,
    header,
    bottomText,
    isLoading,
    onClose,
    onBottomTextClick,
    ...domProps
  } = props;
  const [errorOpen, setErrorOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const setWidth = useCallback(loadingRef => {
    if (loadingRef) {
      loadingRef.style.width = getComputedStyle(loadingRef.parentElement).width;
    }
  }, []);

  useEffect(() => {
    setErrorOpen(!!error);
  }, [error]);

  return (
    <Card {...domProps} className={clsx(classes.authCard, className)} ref={ref}>
      {isLoading ? (
        <div className={classes.authLoadingIndicator} ref={setWidth}>
          <LinearProgress variant="query" />
        </div>
      ) : null}
      <CardHeader
        className={classes.headerRoot}
        title={
          <div className={classes.headerContainer}>
            <Avatar
              className={classes.headerAvatar}
              style={{
                backgroundColor: header.iconColor && theme.palette[header.iconColor].main,
              }}
            >
              {header.icon}
            </Avatar>
            <span>{header.title}</span>
            <IconButton
              className={clsx(classes.closeButton)}
              onClick={onClose}
              disabled={isLoading}
            >
              <CloseIcon />
            </IconButton>
          </div>
        }
        subheader={header.subtitle}
      />
      <CardContent className={classes.cardContent}>
        {errorOpen && (
          <Alert
            className={classes.errorAlert}
            variant="filled"
            severity="error"
            onClose={(): void => setErrorOpen(false)}
          >
            {error}
          </Alert>
        )}
        {children}
        {bottomText ? (
          <Link
            className={classes.bottomText}
            component="span"
            onClick={onBottomTextClick}
            disabled={isLoading}
          >
            {bottomText}
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
});

export default AuthContentContainer;
