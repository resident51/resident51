import { ReactElement } from 'react';

export interface NavigationItem {
  id: string;
  text: string;
  icon?: ReactElement;
  path?: string;
  isVisible?: () => boolean;
  subItemList?: NavigationItem[];
}

export interface UtilityItem {
  id: string;
  text: string;
  icon?: ReactElement;
  clickBehavior: 'disclose' | 'link';
  disclosureComponent?: ReactElement;
  url?: string;
}

export interface NavItemParents {
  [key: string]: {
    path: string;
    parents: string[];
  };
}

export interface SlideMenuCtx {
  expandedNavItems: string[];
  activeNavItem?: {
    id: string;
    path: string;
    parents: string[];
  };
  expandNavItem: (id: string) => void;
  collapseNavItem: (id: string) => void;
}
