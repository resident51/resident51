import React, { useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { Divider, Drawer, List, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import SlideMenuProvider from './SlideMenuContext';
import { NavListItem, UtilityListItem } from './SlideMenuItems';
import { navigationItems, utilityItems } from './NavigationItems';

import useStyles from './_jss/SlideMenu.jss';

/**
 * Slide menu disclosed in the drawer. Contains navigation and utility lists.
 */
interface SlideMenuProps {
  /**
   * Determines whether the menu drawer is open
   */
  open: boolean;
  /**
   * Callback for when an opening action is taken. function().
   */
  onRequestOpen: () => void;
  /**
   * Callback for when a closing action is taken. function().
   */
  onRequestClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = props => {
  const { open, onRequestOpen, onRequestClose } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const drawerClass = clsx(classes.drawer, {
    [classes.drawerOpen]: !isMobile && open,
    [classes.drawerClose]: !isMobile && !open,
  });
  const navListClass = clsx(classes.navListContainer, { [classes.navListClose]: !open });

  const updateDrawerZIndex = useCallback(
    (ref: HTMLElement | null) => {
      if (ref) {
        ref.style.zIndex = `${theme.zIndex.appBar - 1}`;
      }
    },
    [theme.zIndex.appBar],
  );

  const navigationList: React.ReactNode = useMemo(
    () =>
      navigationItems
        .map(item => (
          <NavListItem
            key={item.id}
            {...item}
            onRequestOpen={onRequestOpen}
            onRequestClose={onRequestClose}
            isDrawerOpen={open}
          />
        ))
        .filter(Boolean),
    [onRequestClose, onRequestOpen, open],
  );

  const utilityList: React.ReactNode = useMemo(
    () =>
      utilityItems.map(item => (
        <UtilityListItem key={item.id} {...item} menuClosingAction={onRequestClose} />
      )),
    [onRequestClose],
  );

  return (
    <SlideMenuProvider>
      <Drawer
        open={isMobile ? open : true}
        ref={updateDrawerZIndex}
        onClose={onRequestClose}
        className={drawerClass}
        classes={{ paper: drawerClass }}
        BackdropProps={{ open }}
        ModalProps={{
          open: isMobile ? open : true,
          disableAutoFocus: !open,
          disableEnforceFocus: !open,
          disableScrollLock: !open,
        }}
        PaperProps={open ? undefined : { elevation: 2 }}
      >
        <div className={classes.toolbarOffset} />
        <div className={classes.menuListContainer}>
          <div className={navListClass}>
            <List>{navigationList}</List>
          </div>
          <Divider variant={open ? 'middle' : 'fullWidth'} />
          <div className={classes.utilityListContainer}>
            <List dense>{utilityList}</List>
          </div>
        </div>
      </Drawer>
    </SlideMenuProvider>
  );
};

export default SlideMenu;
