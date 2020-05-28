import React, { useMemo, useState } from 'react';

import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { NavigationItem, UtilityItem } from '../../types';

import { navigationItems, utilityItems } from './NavigationItems';

const menuState = {
  expandedNavItems: new Set<string>(),
};

const drawerWidth = 300;
const useStyles = makeStyles((theme: Theme) => ({
  overlayAppBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbarOffset: theme.mixins.toolbar,
  rainbowOffset: {
    height: '5px',
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
  },
  nestedListItem: {
    paddingLeft: theme.spacing(3),
  },
  menuListContainer: {
    flexGrow: 1,
    display: 'flex',
    flexFlow: 'column',
    overflow: 'hidden',
  },
  navListContainer: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'auto',
  },
  utilityListContainer: {
    flexShrink: 0,
    marginTop: theme.spacing(2),
  },
}));

interface NavListItemProps extends NavigationItem {
  menuClosingAction: () => void;
}
const NavListItem: React.FC<NavListItemProps> = props => {
  const [open, setOpen] = useState<boolean>(menuState.expandedNavItems.has(props.id));
  const classes = useStyles();
  const history = useHistory();
  const hasSubList = !!props.subItemList?.length;
  const isSelected: boolean = history.location.pathname === props.path;

  if (typeof props.isVisible === 'function' && !props.isVisible()) {
    return null;
  }

  const handleClick = (): void => {
    if (hasSubList) {
      if (open) {
        menuState.expandedNavItems.delete(props.id);
        setOpen(false);
      } else {
        menuState.expandedNavItems.add(props.id);
        setOpen(true);
      }
    } else {
      if (typeof props.path === 'string') {
        history.push(props.path);
        props.menuClosingAction();
      }
    }
  };

  const expandButton = open ? <ExpandLess /> : <ExpandMore />;

  const subList: React.ReactNode = hasSubList ? (
    <Collapse in={open} timeout="auto">
      <List className={classes.nestedListItem} disablePadding>
        {props.subItemList
          ?.map((item: NavigationItem) => (
            <NavListItem key={item.id} {...item} menuClosingAction={props.menuClosingAction} />
          ))
          .filter(Boolean)}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      <ListItem onClick={handleClick} selected={isSelected} button>
        {props.icon ? <ListItemIcon>{props.icon}</ListItemIcon> : null}
        <ListItemText primary={props.text} />
        {hasSubList ? expandButton : null}
      </ListItem>
      {subList}
    </>
  );
};

interface UtilityListItemProps extends UtilityItem {
  menuClosingAction: () => void;
}
const UtilityListItem: React.FC<UtilityListItemProps> = props => {
  const handleClick = (): void => {
    if (props.clickBehavior === 'disclose') {
      // open modal
      props.menuClosingAction();
    } else if (props.clickBehavior === 'link') {
      if (props.url) {
        props.menuClosingAction();
        window.open(props.url, '_blank');
      }
    }
  };

  return (
    <ListItem onClick={handleClick} button>
      {props.icon ? <ListItemIcon>{props.icon}</ListItemIcon> : null}
      <ListItemText primary={props.text} />
    </ListItem>
  );
};

interface SlideMenuProps {
  open: boolean;
  onRequestClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = props => {
  const { open, onRequestClose } = props;
  const classes = useStyles();

  const navigationList: React.ReactNode = useMemo(
    () =>
      navigationItems
        .map((item: NavigationItem) => (
          <NavListItem key={item.id} {...item} menuClosingAction={onRequestClose} />
        ))
        .filter(Boolean),
    [onRequestClose],
  );

  const utilityList: React.ReactNode = useMemo(
    () =>
      utilityItems.map((item: UtilityItem) => (
        <UtilityListItem key={item.id} {...item} menuClosingAction={onRequestClose} />
      )),
    [onRequestClose],
  );

  return (
    <Drawer
      open={open}
      onClose={onRequestClose}
      className={classes.drawer}
      classes={{ paper: classes.drawer }}
    >
      <div className={classes.rainbowOffset} />
      <div className={classes.toolbarOffset} />
      <div className={classes.menuListContainer}>
        <div className={classes.navListContainer}>
          <List>{navigationList}</List>
        </div>
        <Divider variant="middle" />
        <div className={classes.utilityListContainer}>
          <List dense>{utilityList}</List>
        </div>
      </div>
    </Drawer>
  );
};

export default SlideMenu;
