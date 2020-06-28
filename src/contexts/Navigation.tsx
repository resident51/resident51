import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { NavigationCtx } from '@app/types';

import { navigationItemParentMap } from '@app/components/navigation//NavigationItems';

interface ActiveNavItem {
  id: string;
  path: string;
  parents: string[];
}

export const NavigationContext = createContext<NavigationCtx>({} as NavigationCtx);
export const useNavigation = (): NavigationCtx => useContext(NavigationContext);

const NavigationProvider: React.FC = props => {
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
    setExpandedNavItems(prevExpandedNavItems => prevExpandedNavItems.filter(item => item !== id));
  }, []);

  useEffect(() => {
    console.log(history.location.pathname);
    const activeItemKey = Object.keys(navigationItemParentMap).find(
      key => navigationItemParentMap[key].path === history.location.pathname,
    );
    const activeItem = activeItemKey
      ? {
          id: activeItemKey,
          ...navigationItemParentMap[activeItemKey],
        }
      : undefined;
    setExpandedNavItems(activeItem?.parents ? [...activeItem.parents] : []);
    setActiveNavItem(activeItem);
  }, [history.location.pathname]);

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
    <NavigationContext.Provider value={contextValue}>{props.children}</NavigationContext.Provider>
  );
};

export default NavigationProvider;
