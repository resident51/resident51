import React, { useCallback, useEffect } from 'react';

import { AccountCircle, MoreVert } from '@material-ui/icons';
import { Button, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { useLoadingOverlay } from '@app/contexts/ui/LoadingOverlay';
import { useModal } from '@app/contexts/ui/Modal';
import { useSnackbar } from '@app/contexts/ui/Snackbar';
import { useUser } from '@app/contexts/services/User';

import AuthModal from '../auth/AuthModal';
import IconButtonMenu from '../common/IconButtonMenu';

import useStyles from './_jss/AuthActionButton.jss';

const AuthActionButton: React.FC = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:400px)');
  const modalContext = useModal();
  const { user, signOut } = useUser();
  const enqueueSnackbar = useSnackbar();
  const { openOverlay, closeOverlay } = useLoadingOverlay();
  const history = useHistory();

  const discloseAuthModal = useCallback(
    (option: 'sign-in' | 'sign-up', dismissCallback?: () => void): void => {
      modalContext?.disclose(<AuthModal initialVariant={option} />, {
        disablePaper: true,
        disableTransition: true,
        onDismiss: dismissCallback,
      });
    },
    [modalContext],
  );
  const handleSignIn = useCallback(() => discloseAuthModal('sign-in'), [discloseAuthModal]);
  const handleSignUp = useCallback(() => discloseAuthModal('sign-up'), [discloseAuthModal]);

  const handleSignOut = useCallback(async () => {
    openOverlay();
    try {
      await signOut();
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }
    closeOverlay();
  }, [signOut, enqueueSnackbar, openOverlay, closeOverlay]);

  useEffect(() => {
    const {
      location: { pathname, search },
    } = history;
    const queryParams = new URLSearchParams(search.substring(1));
    if (pathname === '/' && queryParams.get('signIn') !== null && user === null) {
      discloseAuthModal('sign-in', () => {
        history.replace({ search: '' });
      });
    } else if (queryParams.get('signIn') !== null) {
      history.replace({ search: '' });
    }
  }, [discloseAuthModal, handleSignIn, history, user]);

  if (user === undefined) {
    // Don't show a button until we know if the user is or isn't logged in.
    return null;
  } else if (user) {
    return (
      <IconButtonMenu
        className={classes.authActionButton}
        icon={<AccountCircle />}
        label="User menu"
        MenuProps={{ classes: { list: classes.floatingMenuList } }}
        edge="end"
      >
        <IconButtonMenu.Item>Profile</IconButtonMenu.Item>
        <IconButtonMenu.Item>My Account</IconButtonMenu.Item>
        <IconButtonMenu.Item onClick={handleSignOut}>Sign Out</IconButtonMenu.Item>
      </IconButtonMenu>
    );
  } else {
    if (isMobile) {
      return (
        <IconButtonMenu
          className={classes.authActionButton}
          icon={<MoreVert />}
          label="Sign In/Sign Up"
          MenuProps={{ classes: { list: classes.floatingMenuList } }}
          edge="end"
        >
          <IconButtonMenu.Item onClick={handleSignIn}>Sign In</IconButtonMenu.Item>
          <IconButtonMenu.Item onClick={handleSignUp}>Sign Up</IconButtonMenu.Item>
        </IconButtonMenu>
      );
    }
    return (
      <div className={classes.authActionButton}>
        <Button color="inherit" onClick={handleSignIn}>
          Sign In
        </Button>
        <Button variant="outlined" color="inherit" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    );
  }
};

export default AuthActionButton;
