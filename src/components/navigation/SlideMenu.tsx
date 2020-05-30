import React, { ReactNode, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { Divider, Drawer, List, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { NavigationItem, UtilityItem } from '@app/types';

import SlideMenuProvider from './SlideMenuContext';
import { NavListItem, UtilityListItem } from './SlideMenuItems';
import { navigationItems, utilityItems } from './NavigationItems';

import useStyles from './SlideMenu.jss';

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
  const drawerClass: string = clsx(classes.drawer, {
    [classes.drawerOpen]: !isMobile && open,
    [classes.drawerClose]: !isMobile && !open,
  });
  const navListClass: string = clsx(classes.navListContainer, { [classes.navListClose]: !open });

  const updateRootStyles = useCallback(
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
        .map((item: NavigationItem) => (
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
      utilityItems.map((item: UtilityItem) => (
        <UtilityListItem key={item.id} {...item} menuClosingAction={onRequestClose} />
      )),
    [onRequestClose],
  );

  return (
    <SlideMenuProvider>
      <Drawer
        open={isMobile ? open : true}
        ref={updateRootStyles}
        onClose={onRequestClose}
        className={drawerClass}
        classes={{ paper: drawerClass }}
        BackdropProps={{ open: open }}
        ModalProps={{
          open: isMobile ? open : true,
          disableAutoFocus: !open,
          disableEnforceFocus: !open,
        }}
        PaperProps={open ? undefined : { elevation: 2 }}
        transitionDuration={!isMobile ? 0 : undefined}
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
