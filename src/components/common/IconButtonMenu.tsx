import React, { useCallback, useMemo, useRef, useState } from 'react';

import uniqid from 'uniqid';
import {
  IconButton,
  IconButtonProps,
  MenuProps as MaterialMenuProps,
  Menu,
  MenuItem,
} from '@material-ui/core';

interface IconButtonMenuProps extends IconButtonProps {
  children: React.ReactElement | React.ReactElement[];
  /**
   * Icon to be displayed in the icon button
   */
  icon: React.ReactElement;
  /**
   * Label describing the menu
   */
  label: string;
  /**
   * Props to be forwarded on to the `Menu` component
   */
  MenuProps?: Omit<MaterialMenuProps, 'open' | 'anchorEl' | 'getContentAnchorEl'>;
}
interface IconButtonMenuSubComponents {
  Item: typeof MenuItem;
}

const IconButtonMenu: React.FC<IconButtonMenuProps> & IconButtonMenuSubComponents = props => {
  const { children, icon, label, MenuProps, ...otherProps } = props;
  const [open, setOpen] = useState(false);
  const iconButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useRef(uniqid('menu-'));

  const handleMenuOpen = useCallback(() => setOpen(true), []);

  const handleMenuClose = useCallback(
    (event, reason) => {
      MenuProps?.onClose?.(event, reason);
      setOpen(false);
    },
    [MenuProps],
  );

  const menuItems = useMemo(() => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onClick: (..._args: unknown[]) => {
            setOpen(false);
            child.props?.onClick?.(..._args);
          },
        });
      }
      return child;
    });
  }, [children]);

  return (
    <>
      <IconButton
        {...otherProps}
        aria-controls={menuId.current}
        aria-haspopup="true"
        aria-label={label}
        ref={iconButtonRef}
        onClick={handleMenuOpen}
      >
        {icon}
      </IconButton>
      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        {...MenuProps}
        open={open}
        anchorEl={iconButtonRef.current}
        getContentAnchorEl={null}
        onClose={handleMenuClose}
      >
        {menuItems}
      </Menu>
    </>
  );
};

IconButtonMenu.Item = MenuItem;

export default IconButtonMenu;
