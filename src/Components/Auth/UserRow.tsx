import React, { useState, useCallback } from 'react';

import moment from 'moment';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FetchedUser, Permissions } from '../../Types';

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
  user: FetchedUser;
  variant: 'REQUESTS' | 'RESIDENTS';
};
const UserRow: React.FC<UserRowProps> = props => {
  const { user, variant } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRequests = variant === 'REQUESTS';

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

  const verifyButton = (
    <td className="text-center align-middle">
      <Button size="sm" disabled={isSubmitting} variant="primary" onClick={verifyResident}>
        Resident
      </Button>
    </td>
  );

  const moderatorOption = isRequests ? (
    verifyButton
  ) : user.permissions === 3 ? (
    <td className={textStyle} colSpan={3}>
      [Cannot modify administrator]
    </td>
  ) : (
    [
      { permissions: 1, onClick: verifyResident },
      { permissions: 2, onClick: verifyEditor },
      { permissions: 3, onClick: verifyAdmin },
    ].map(permissionsData => {
      const role = toRole(permissionsData.permissions as 1 | 2 | 3);
      const hasRole = permissionsData.permissions === user.permissions;
      console.log(
        `${user.displayName} has role ${toRole(user.permissions)}. This td is for permissions ${
          permissionsData.permissions
        }, and hasRole is ${hasRole}`,
      );
      return (
        <td key={permissionsData.permissions} className={textStyle}>
          <Form.Check
            required
            custom
            disabled={isSubmitting || hasRole}
            type="radio"
            label={role}
            name="permissions"
            id={`permissions-${role}-${user.uid}`}
            checked={hasRole}
            onChange={(): null => null}
            onClick={permissionsData.onClick}
            className="d-inline-block px-2"
          />
        </td>
      );
    })
  );

  return (
    <tr key={user.uid} className="user-table-row">
      {isRequests && <td className={textStyle}>{formatted(user.creationTime)}</td>}
      <td className={textStyle}>{user.displayName}</td>
      <td className={textStyle}>{user.kuEmail}</td>
      {moderatorOption}
    </tr>
  );
};

export default UserRow;
