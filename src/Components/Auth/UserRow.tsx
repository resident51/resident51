import React, { useState, useCallback } from 'react';

import moment from 'moment';

import Button from 'react-bootstrap/Button';
import { VisibleUser, Permissions } from '../../Types';

import {
  verifyUserAsResident,
  verifyUserAsEditor,
  verifyUserAsAdmin,
} from '../../Firebase/firebase';

type Role = 'RESIDENT' | 'EDITOR' | 'ADMIN';

const confirmEditorMessage = `
This operation will allow this user to freely create, update, and remove events related to your hall. They will be permitted to see all events, including private events such as meetings from other halls.

Would you like to continue?`;

const confirmAdminMessage = `
This operation will allow this user to freely create, update, and remove events related to your hall. They will be permitted to see all events, including private events such as meetings from other halls.

This user will also be able to verify and designate roles to other users from this hall, giving them the same permissions as you.

Would you like to continue?`;

const formatted = (creationTime: string): string => moment(creationTime).format('MMM Do, YYYY');
const toRole = (permissions: Permissions): string => {
  switch (permissions) {
    case 0:
      return 'Unverified';
    case 1:
      return 'Resident';
    case 2:
      return 'Editor';
    case 3:
      return 'Admin';
  }
};

type UserRowProps = {
  user: VisibleUser;
  variant: 'REQUESTS' | 'RESIDENTS';
};
const UserRow: React.FC<UserRowProps> = props => {
  const { user, variant } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRequests = variant === 'REQUESTS';
  const isResidents = variant === 'RESIDENTS';

  const verifySelected = useCallback(
    async (verifyType: Role) => {
      const { email } = user;
      setIsSubmitting(true);

      switch (verifyType) {
        case 'RESIDENT':
          await verifyUserAsResident({ email });
          break;
        case 'EDITOR':
          if (window.confirm(confirmEditorMessage)) {
            await verifyUserAsEditor({ email });
          }
          break;
        case 'ADMIN':
          if (window.confirm(confirmAdminMessage)) {
            await verifyUserAsAdmin({ email });
          }
          break;
      }

      setIsSubmitting(false);
    },
    [setIsSubmitting, user],
  );

  const verifyResident = (): Promise<void> => verifySelected('RESIDENT');
  const verifyEditor = (): Promise<void> => verifySelected('EDITOR');
  const verifyAdmin = (): Promise<void> => verifySelected('ADMIN');

  const textStyle = `text-center align-middle ${isSubmitting ? 'text-muted' : ''}`;

  return (
    <tr key={user.uid} className="user-table-row">
      {isRequests && <td className={textStyle}>{formatted(user.creationTime)}</td>}
      {isResidents && <td className={textStyle}>{toRole(user.permissions)}</td>}
      <td className={textStyle}>{user.displayName}</td>
      <td className={textStyle}>{user.kuEmail}</td>
      {user.permissions === 3 ? (
        <td className={textStyle} colSpan={3}>
          [Cannot modify administrator]
        </td>
      ) : (
        <>
          <td className="text-center align-middle">
            <Button size="sm" disabled={isSubmitting} variant="primary" onClick={verifyResident}>
              Resident
            </Button>
          </td>
          <td className="text-center align-middle">
            <Button size="sm" disabled={isSubmitting} variant="warning" onClick={verifyEditor}>
              Editor
            </Button>
          </td>
          <td className="text-center align-middle">
            <Button size="sm" disabled={isSubmitting} variant="danger" onClick={verifyAdmin}>
              Admin
            </Button>
          </td>
        </>
      )}
    </tr>
  );
};

export default UserRow;
