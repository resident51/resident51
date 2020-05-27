import React, { useMemo, useState } from 'react';

import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import { NavigationItem, UtilityItem } from '../../types';

import history from './history';
import { navigationItemParentMap } from './NavigationItems';

import useStyles from './SlideMenu.jss';

const menuState = {
  expandedNavItems: new Set<string>(),
};
history.listen(location => {
  const activeItem = Object.values(navigationItemParentMap).find(
    item => item.path === location.pathname,
  );
  if (activeItem) {
    activeItem.parents.forEach(parent => menuState.expandedNavItems.add(parent));
  }
});

/**
 * List item for the navigation list in the slide menu
 */
interface NavListItemProps extends NavigationItem {
  menuClosingAction: () => void;
}
const NavListItem: React.FC<NavListItemProps> = props => {
  const [open, setOpen] = useState<boolean>(menuState.expandedNavItems.has(props.id));
  const classes = useStyles();
  const hasSubList = !!props.subItemList?.length;
  const isSelected: boolean = history.location.pathname === props.path;

  const handleClick = (): void => {
    if (hasSubList) {
      if (open) {
        menuState.expandedNavItems.delete(props.id);
        setOpen(false);
      } else {
        menuState.expandedNavItems.add(props.id);
        setOpen(true);
      }
    } else if (props.path) {
      history.push(props.path);
      props.menuClosingAction();
    }
  };

  const expandButton = open ? <ExpandLess /> : <ExpandMore />;

  const subList: React.ReactNode = useMemo(
    () =>
      hasSubList ? (
        <Collapse in={open} timeout="auto">
          <List className={classes.nestedListItem} disablePadding>
            {props.subItemList
              ?.map((item: NavigationItem) => (
                <NavListItem key={item.id} {...item} menuClosingAction={props.menuClosingAction} />
              ))
              .filter(Boolean)}
          </List>
        </Collapse>
      ) : null,
    [classes.nestedListItem, hasSubList, open, props.menuClosingAction, props.subItemList],
  );

  if (props.isVisible && !props.isVisible()) {
    return null;
  }

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

/**
 * List item for the utiltiy list in the slide menu
 */
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

export { NavListItem, UtilityListItem };
