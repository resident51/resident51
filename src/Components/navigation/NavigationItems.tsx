import React from 'react';

import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import FeedbackIcon from '@material-ui/icons/Feedback';
import GithubIcon from '@material-ui/icons/GitHub';

interface NavigationItem {
  id: string;
  text: string;
  icon?: React.ReactNode;
  path: string;
  isVisible?: boolean | (() => boolean);
  subItemList?: NavigationItem[];
}

interface UtilityItem {
  id: string;
  text: string;
  icon?: React.ReactNode;
  clickBehavior: 'disclose' | 'link';
  disclosureComponent?: React.ReactNode;
  url?: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'hall-admin',
    text: 'Manage your Hall',
    icon: <BusinessCenterIcon />,
    path: '/hall-admin',
    subItemList: [
      {
        id: 'example-sub-item',
        text: 'Example Sub Item',
        path: '/example-path',
        subItemList: [
          {
            id: 'another',
            text: 'Another Example Sub Item',
            path: '/esdfsgs',
          },
        ],
      },
    ],
  },
];

const utilityItems: UtilityItem[] = [
  {
    id: 'feedback',
    text: 'Give Feedback',
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

// eslint-disable-next-line
export type { NavigationItem, UtilityItem };
export { navigationItems, utilityItems };

