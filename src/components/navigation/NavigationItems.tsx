import React from 'react';

import {
  BusinessCenter as BusinessCenterIcon,
  CalendarToday,
  Feedback as FeedbackIcon,
  GitHub as GithubIcon,
} from '@material-ui/icons';

import { NavItemParents, NavigationItem, UtilityItem } from '@app/types';

const navigationItems: NavigationItem[] = [
  {
    id: 'events',
    text: 'Events',
    icon: <CalendarToday />,
    subItemList: [
      {
        id: 'events-view',
        text: 'View Events',
        path: '/events',
      },
      {
        id: 'events-create',
        text: 'Create an Event',
        path: '/events/create',
      },
    ],
  },
  {
    id: 'hall-admin',
    text: 'Manage your Hall',
    icon: <BusinessCenterIcon />,
    subItemList: [
      {
        id: 'example-sub-item',
        text: 'Example Sub Item',
        subItemList: [
          {
            id: 'another',
            text: 'Another Example Sub Item',
            path: '/1/2/3',
          },
        ],
      },
    ],
  },
];

const utilityItems: UtilityItem[] = [
  {
    id: 'feedback',
    text: 'Feedback',
    icon: <FeedbackIcon />,
    clickBehavior: 'disclose',
    disclosureComponent: <div>Feedback</div>,
  },
  {
    id: 'report-bugs',
    text: 'Report Bugs',
    icon: <GithubIcon />,
    clickBehavior: 'link',
    url: 'https://github.com/resident51/resident51/issues/new',
  },
];

const navigationItemParentMap: NavItemParents = {};
const collectParents = (item: NavigationItem, parents: string[]): void => {
  if ((!item.subItemList || !item.subItemList?.length) && item.path) {
    navigationItemParentMap[item.id] = { path: item.path, parents };
  } else {
    item.subItemList?.forEach((_item: NavigationItem) =>
      collectParents(_item, [...parents, item.id]),
    );
  }
};
navigationItems.forEach((item: NavigationItem): void => collectParents(item, []));

export { navigationItems, navigationItemParentMap, utilityItems };
