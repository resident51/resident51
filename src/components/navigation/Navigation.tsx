import React, { useCallback, useEffect, useState } from 'react';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import AuthAction from '../auth/AuthActionButton';

import SlideMenu from './SlideMenu';

import useStyles from './_jss/Navigation.jss';

const Navigation: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const history = useHistory();
  const classes = useStyles();

  const handleMenuButtonClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDrawerOpen(prevState => !prevState);
  }, []);

  const handleDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  useEffect(() => history.listen(handleDrawerClose), [history, handleDrawerClose]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.overlayAppBar} onClick={handleDrawerClose}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={handleMenuButtonClick}>
            {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            className={classes.title}
            onClick={(): void => history.push('/')}
          >
            Resident51
          </Typography>
          <AuthAction />
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarOffset} />
      <SlideMenu
        open={drawerOpen}
        onRequestOpen={handleDrawerOpen}
        onRequestClose={handleDrawerClose}
      />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Navigation;
