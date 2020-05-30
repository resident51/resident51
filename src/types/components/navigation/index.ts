import { ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  text: string;
  icon?: ReactNode;
  path?: string;
  isVisible?: () => boolean;
  subItemList?: NavigationItem[];
}

export interface UtilityItem {
  id: string;
  text: string;
  icon?: ReactNode;
  clickBehavior: 'disclose' | 'link';
  disclosureComponent?: ReactNode;
  url?: string;
}

export interface NavItemParents {
  [key: string]: {
    path: string;
    parents: string[];
  };
}

export interface SlideMenuState {
  expandedNavItems: string[];
  activeNavItem?: {
    id: string;
    path: string;
    parents: string[];
  };
  expandNavItem: (id: string) => void;
  collapseNavItem: (id: string) => void;
}

export type SlideMenuCtx = SlideMenuState | null;
