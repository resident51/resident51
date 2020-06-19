import React, { useEffect, useMemo } from 'react';

import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { NavigationItem, UtilityItem } from '@app/types';

import { useModal } from '@app/contexts/Modal';

import { useSlideMenuState } from './SlideMenuContext';

import useStyles from './_jss/SlideMenu.jss';

/**
 * List item for the navigation list in the slide menu
 */
interface NavListItemProps extends NavigationItem {
  onRequestOpen: () => void;
  onRequestClose: () => void;
  isDrawerOpen: boolean;
}

const NavListItem: React.FC<NavListItemProps> = props => {
  const {
    id,
    subItemList,
    path,
    onRequestClose,
    onRequestOpen,
    isDrawerOpen,
    isVisible,
    icon,
    text,
  } = props;
  const history = useHistory();
  const menuState = useSlideMenuState();
  const classes = useStyles();
  const hasSubList = !!subItemList?.length;
  const sublistOpen = !!menuState?.expandedNavItems.includes(id);
  const isSelected: boolean = ((): boolean => {
    // If this is the active nav item return true
    if (menuState?.activeNavItem && menuState?.activeNavItem?.path === path) return true;
    // If the drawer is open and this isn't the active nav item return false
    if (isDrawerOpen) return false;
    // If the drawer is closed and this is the parent of the active nav item return true
    if (menuState?.activeNavItem?.parents.includes(id)) return true;
    return false;
  })();

  const handleClick = (): void => {
    if (!isDrawerOpen) {
      onRequestOpen();
    } else if (hasSubList) {
      if (sublistOpen) {
        menuState?.collapseNavItem(id);
      } else {
        menuState?.expandNavItem(id);
      }
    } else if (path) {
      history.push(path);
      onRequestClose();
    }
  };

  const expandButton = isDrawerOpen && sublistOpen ? <ExpandLess /> : <ExpandMore />;

  const subList: React.ReactNode = useMemo(
    () =>
      hasSubList ? (
        <Collapse in={isDrawerOpen ? sublistOpen : false} timeout="auto">
          <List className={classes.nestedListItem} disablePadding>
            {subItemList
              ?.map(item => (
                <NavListItem
                  key={item.id}
                  {...item}
                  onRequestOpen={onRequestOpen}
                  onRequestClose={onRequestClose}
                  isDrawerOpen={isDrawerOpen}
                />
              ))
              .filter(Boolean)}
          </List>
        </Collapse>
      ) : null,
    [
      hasSubList,
      isDrawerOpen,
      sublistOpen,
      classes.nestedListItem,
      subItemList,
      onRequestOpen,
      onRequestClose,
    ],
  );

  useEffect(() => {
    if (isDrawerOpen && menuState?.activeNavItem?.parents.includes(id)) {
      menuState.expandNavItem(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen]);

  if (isVisible && !isVisible()) {
    return null;
  }

  return (
    <>
      <ListItem onClick={handleClick} selected={isSelected} button>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={isDrawerOpen ? text : `${text.substring(0, 4)}...`} />
        {hasSubList ? expandButton : null}
      </ListItem>
      {subList}
    </>
  );
};

/**
 * List item for the utility list in the slide menu
 */
interface UtilityListItemProps extends UtilityItem {
  menuClosingAction: () => void;
}
const UtilityListItem: React.FC<UtilityListItemProps> = props => {
  const modalContext = useModal();

  const handleClick = (): void => {
    if (props.clickBehavior === 'disclose') {
      if (props.disclosureComponent) {
        props.menuClosingAction();
        modalContext.disclose(props.disclosureComponent);
      }
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
