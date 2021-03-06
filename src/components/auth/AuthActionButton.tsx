import React, { useCallback, useEffect, useState } from 'react';

import { AccountCircle, MoreVert } from '@material-ui/icons';
import { Button, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { LoadingOverlay } from '@app/contexts/ui/LoadingOverlay';
import { useModal } from '@app/contexts/ui/Modal';
import { useSnackbar } from '@app/contexts/ui/Snackbar';
import { useUser } from '@app/contexts/services/User';

import AuthModal from '../auth/AuthModal';
import IconButtonMenu from '../common/IconButtonMenu';

import useStyles from './_jss/AuthActionButton.jss';

const AuthActionButton: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:400px)');
  const { disclose } = useModal();
  const { user, signOut } = useUser();
  const snackbarContext = useSnackbar();
  const history = useHistory();

  const discloseAuthModal = useCallback(
    (option: 'sign-in' | 'sign-up', dismissCallback?: () => void): void => {
      disclose(<AuthModal initialVariant={option} />, {
        disablePaper: true,
        disableTransition: true,
        onDismiss: dismissCallback,
      });
    },
    [disclose],
  );
  const handleSignIn = useCallback(() => discloseAuthModal('sign-in'), [discloseAuthModal]);
  const handleSignUp = useCallback(() => discloseAuthModal('sign-up'), [discloseAuthModal]);

  const handleSignOut = useCallback(async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (e) {
      snackbarContext.enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }
    setLoading(false);
  }, [signOut, snackbarContext]);

  /**
   * Disclose a sign in modal when a <rootUrl>/?signIn url is accessed.
   * Useful for callbacks from firebase auth functions.
   */
  useEffect(() => {
    const {
      location: { pathname, search },
    } = history;
    const queryParams = new URLSearchParams(search.substring(1));

    // Wait until user is initialized
    if (!user) {
      return;
    }

    if (pathname === '/' && queryParams.get('signIn') !== null && user?.signedIn === false) {
      discloseAuthModal('sign-in', () => {
        history.replace({ search: '' });
      });
    } else if (queryParams.get('signIn') !== null) {
      history.replace({ search: '' });
    }
  }, [discloseAuthModal, handleSignIn, history, user]);

  return (
    <>
      <LoadingOverlay open={isLoading} />
      {((): React.ReactNode => {
        if (user === undefined) {
          // Don't show a button until we know if the user is or isn't logged in.
          return null;
        } else if (user.signedIn) {
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
              <Button className={classes.signInButton} color="inherit" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleSignUp}>
                Sign Up
              </Button>
            </div>
          );
        }
      })()}
    </>
  );
};

export default AuthActionButton;
