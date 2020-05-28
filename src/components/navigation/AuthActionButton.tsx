import React, { useCallback } from 'react';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';

import Login from '../auth/Login';
import { ModalCtx } from '../../types';
import { useModal } from '../../contexts/ui/ModalProvider';
import { useUser } from '../../contexts/User';

import useStyles from './AuthActionButton.jss';

interface AuthActionButtonProps {
  menuId: string;
  handleProfileMenuOpen: (target: EventTarget & HTMLButtonElement) => void;
}
const AuthActionButton: React.FC<AuthActionButtonProps> = ({ menuId, handleProfileMenuOpen }) => {
  const classes = useStyles();
  const modalContext: ModalCtx = useModal();
  const { user, isLoggingIn } = useUser();

  const handleLoginClick = useCallback(() => {
    modalContext?.disclose({
      content: <Login onClose={modalContext.dismiss} />,
    });
  }, [modalContext]);

  const handleProfileClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      handleProfileMenuOpen(event.currentTarget);
    },
    [handleProfileMenuOpen],
  );

  const userIsLoggedIn = Boolean(user.uid);

  if (isLoggingIn) {
    // Don't show a button until we know if the user is or isn't logged in.
    return null;
  } else if (userIsLoggedIn) {
    return (
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileClick}
        className={clsx([classes.authActionButton])}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    );
  } else {
    return (
      <Button className={clsx([classes.authActionButton])} onClick={handleLoginClick}>
        Login
      </Button>
    );
  }
};

export default AuthActionButton;
