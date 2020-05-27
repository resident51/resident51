import React from 'react';

import Announcement from '@material-ui/icons/AnnouncementRounded';
import AppBar from '@material-ui/core/AppBar';
import CalendarToday from '@material-ui/icons/CalendarTodaySharp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useStyles } from '../../hooks/useStyles';
import { useUser } from '../../contexts/User';

import AuthActionButton from './_AuthActionButton';
import ListItemLink from './_ListItemLink';

const Navigation: React.FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();
  const classes = useStyles();

  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.navigationLinkText}>
            <Typography variant="h6">Resident 51</Typography>
          </Link>
          <div className={classes.toolbarSpacer} />
          <AuthActionButton menuId={menuId} handleProfileMenuOpen={handleProfileMenuOpen} />
        </Toolbar>
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
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItemLink to="/" primary="Announcements" icon={<Announcement />} />
          <ListItemLink to="/events" primary="Events" icon={<CalendarToday />} />
          <ListItemLink to="/feedback" primary="Feedback" icon={<MailIcon />} />
        </List>
        {user.permissions > 1 ? (
          <React.Fragment>
            <Divider />
            <List>
              <ListItemLink to="/administration" primary="Administration" icon={<SettingsIcon />} />
            </List>
          </React.Fragment>
        ) : null}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Navigation;
