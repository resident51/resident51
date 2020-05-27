import { ReactNode } from 'react';

interface NavigationItem {
  id: string;
  text: string;
  icon?: ReactNode;
  path?: string;
  isVisible?: () => boolean;
  subItemList?: NavigationItem[];
}

interface UtilityItem {
  id: string;
  text: string;
  icon?: ReactNode;
  clickBehavior: 'disclose' | 'link';
  disclosureComponent?: ReactNode;
  url?: string;
}

interface NavItemParents {
  [key: string]: {
    path: string;
    parents: string[];
  };
}

// eslint-disable-next-line
export type { NavigationItem, UtilityItem, NavItemParents }
