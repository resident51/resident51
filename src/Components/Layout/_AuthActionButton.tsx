import React from 'react';

import { Link } from 'react-router-dom';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useUser } from '../../Contexts/User';
import { useStyles } from '../../Hooks/useStyles';

interface AuthActionProps {
  menuId: string;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const AuthActionButton: React.FC<AuthActionProps> = ({ menuId, handleProfileMenuOpen }) => {
  const classes = useStyles();
  const { user, isLoggingIn } = useUser();
  const userIsLoggedIn = Boolean(user.uid);

  if (userIsLoggedIn) {
    return (
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    );
  } else if (isLoggingIn) {
    return null;
  } else {
    return (
      <Link to="/login" className={classes.navigationLinkText}>
        <Button className={clsx(classes.loginButton)}>Login</Button>
      </Link>
    );
  }
};

export default AuthActionButton;
