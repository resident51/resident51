import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import { useUser } from '../../Contexts/User';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

interface NavDrawerProps {
  toggleDrawerOpen: (
    open: boolean,
  ) => (event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
  isNavOpen: boolean;
}

const NavDrawer: React.FC<NavDrawerProps> = ({ toggleDrawerOpen, isNavOpen }) => {
  const { user } = useUser();
  const classes = useStyles();

  return (
    <Drawer anchor="left" open={isNavOpen} onClose={toggleDrawerOpen(false)}>
      <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={toggleDrawerOpen(false)}
        onKeyDown={toggleDrawerOpen(false)}
      >
        <List>
          <ListItem button>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>{<MailIcon />}</ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
        </List>
        {user.permissions > 1 ? (
          <React.Fragment>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
                <ListItemText primary="Administration" />
              </ListItem>
            </List>
          </React.Fragment>
        ) : null}
      </div>
    </Drawer>
  );
};

export default NavDrawer;
