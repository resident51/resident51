import React from 'react';

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useUser } from '../../Contexts/User';

interface HeaderProps {
  onDrawerOpen: (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>,
  ) => void;
}

const Header: React.FC<HeaderProps> = ({ onDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);

  const { user } = useUser();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const authButton = user.uid ? (
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
  ) : (
    <Link to="/login" style={{ textDecoration: 'none' }}>
      <Button variant="outlined">Login</Button>
    </Link>
  );

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" style={{ color: 'white' }}>
              Resident 51
            </Typography>
          </Link>
          <div style={{ flexGrow: 1 }} />
          {authButton}
        </Toolbar>
        {renderMenu}
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
