import PropTypes, { InferProps } from 'prop-types';
import React, { useMemo } from 'react';

import { Divider, Drawer, List } from '@material-ui/core';

import { NavigationItem, UtilityItem } from 'types';

import { NavListItem, UtilityListItem } from './SlideMenuItems';
import { navigationItems, utilityItems } from './NavigationItems';

import useStyles from './SlideMenu.jss';

/**
 * Slide menu disclosed in the drawer. Contains navigation and utility lists.
 */
const SlideMenuProps = {
  /**
   * Determines whether the menu drawer is open
   */
  open: PropTypes.bool.isRequired,
  /**
   * Callback for when a closing action is taken. function().
   */
  onRequestClose: PropTypes.func.isRequired,
};

const SlideMenu: React.FC<InferProps<typeof SlideMenuProps>> = props => {
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

SlideMenu.propTypes = SlideMenuProps;

export default SlideMenu;
