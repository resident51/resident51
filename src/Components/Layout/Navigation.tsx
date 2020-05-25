import React from 'react';

import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Announcement from '@material-ui/icons/AnnouncementRounded';
import CalendarToday from '@material-ui/icons/CalendarTodaySharp';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { useUser } from '../../Contexts/User';

import ListItemLink from './_ListItemLink';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const Header: React.FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();
  const classes = useStyles();
  const theme = useTheme();

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
    <div className={classes.root}>
      <CssBaseline />
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
          <Typography variant="h6" style={{ color: 'white' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              Resident 51
            </Link>
          </Typography>
          <div style={{ flexGrow: 1 }} />
          {authButton}
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
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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

export default Header;
