import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { SlideMenuCtx } from '@app/types';

import { navigationItemParentMap } from './NavigationItems';

interface ActiveNavItem {
  id: string;
  path: string;
  parents: string[];
}

const defaultSlideMenuContext = {
  expandedNavItems: [],
  expandNavItem: (id: string) => {},
  collapseNavItem: (id: string) => {},
}
export const SlideMenuContext = createContext<SlideMenuCtx>(defaultSlideMenuContext);
export const useSlideMenuState = (): SlideMenuCtx => useContext(SlideMenuContext);

const SlideMenuProvider: React.FC = props => {
  const [expandedNavItems, setExpandedNavItems] = useState<string[]>([]);
  const [activeNavItem, setActiveNavItem] = useState<ActiveNavItem | undefined>();
  const history = useHistory();

  const addExpandedNavItem = useCallback((id: string): void => {
    setExpandedNavItems(prevExpandedNavItems => {
      if (prevExpandedNavItems.includes(id)) {
        return prevExpandedNavItems;
      }
      return [...prevExpandedNavItems, id];
    });
  }, []);

  const removeExpandedNavItem = useCallback((id: string): void => {
    setExpandedNavItems(prevExpandedNavItems => {
      if (!prevExpandedNavItems.includes(id)) {
        return prevExpandedNavItems;
      }
      return prevExpandedNavItems.filter(item => item !== id);
    });
  }, []);

  useEffect(() => {
    const unlisten = history.listen(location => {
      const activeItemKey = Object.keys(navigationItemParentMap).find(
        key => navigationItemParentMap[key].path === location.pathname,
      );
      const activeItem = activeItemKey
        ? {
            id: activeItemKey,
            ...navigationItemParentMap[activeItemKey],
          }
        : undefined;
      setExpandedNavItems(activeItem?.parents ? [...activeItem.parents] : []);
      setActiveNavItem(activeItem);
    });

    return unlisten;
  }, [addExpandedNavItem, history]);

  const contextValue = useMemo(
    () => ({
      expandedNavItems,
      activeNavItem,
      expandNavItem: addExpandedNavItem,
      collapseNavItem: removeExpandedNavItem,
    }),
    [activeNavItem, addExpandedNavItem, expandedNavItems, removeExpandedNavItem],
  );

  return (
    <SlideMenuContext.Provider value={contextValue}>{props.children}</SlideMenuContext.Provider>
  );
};

export default SlideMenuProvider;
