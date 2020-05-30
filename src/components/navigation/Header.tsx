import React, { useCallback, useEffect, useState } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import AuthAction from './AuthActionButton';
import SlideMenu from './SlideMenu';

import useStyles from './Header.jss';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const history = useHistory();
  const classes = useStyles();

  const handleMenuButtonClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDrawerOpen(prevState => !prevState);
  }, []);

  const handleProfileMenuOpen = useCallback(
    (target: EventTarget & HTMLButtonElement) => setAnchorEl(target),
    [],
  );
  const handleProfileMenuClose = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  const handleDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  useEffect(() => history.listen(handleDrawerClose), [history, handleDrawerClose]);

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <AppBar position="fixed" className={classes.overlayAppBar} onClick={handleDrawerClose}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={handleMenuButtonClick}>
            {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography component="h1" variant="h6" onClick={(): void => history.push('/')}>
            Resident51
          </Typography>
          <AuthAction handleProfileMenuOpen={handleProfileMenuOpen} menuId={menuId} />
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
        </Menu>
      </AppBar>
      <div className={classes.toolbarOffset} />
      <SlideMenu
        open={drawerOpen}
        onRequestOpen={handleDrawerOpen}
        onRequestClose={handleDrawerClose}
      />
    </>
  );
};

export default Header;
