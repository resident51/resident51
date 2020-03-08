import React, { useState, useCallback, useRef } from 'react';

import moment from 'moment';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { FetchedUser, Permissions } from '../../Types';

import {
  verifyUserAsResident,
  verifyUserAsEditor,
  verifyUserAsAdmin,
} from '../../Firebase/firebase';

type Role = 'Unverified' | 'Resident' | 'Editor' | 'Admin';

const confirmEditorMessage = `
This operation will allow this user to freely create, update, and remove events related to your hall. They will be permitted to see all events, including private events such as meetings from other halls.

Would you like to continue?`;

const confirmAdminMessage = `
This operation will allow this user to freely create, update, and remove events related to your hall. They will be permitted to see all events, including private events such as meetings from other halls.

This user will also be able to verify and designate roles to other users from this hall, giving them the same permissions as you.

Would you like to continue?`;

const formatted = (creationTime: string): string => moment(creationTime).format('MMM Do, YYYY');
const toRole = (permissions: Permissions): Role => {
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
  const roleSelectRef = useRef<HTMLSelectElement & FormControl<'select'>>(null);

  const isRequests = variant === 'REQUESTS';
  const userRole = toRole(user.permissions);

  const verifySelected = useCallback(
    async (verifyType: Role) => {
      const { email } = user;
      setIsSubmitting(true);

      switch (verifyType) {
        case 'Resident':
          await verifyUserAsResident({ email });
          break;
        case 'Editor':
          if (window.confirm(confirmEditorMessage)) {
            await verifyUserAsEditor({ email });
          }
          break;
        case 'Admin':
          if (window.confirm(confirmAdminMessage)) {
            await verifyUserAsAdmin({ email });
          }
          break;
      }

      setIsSubmitting(false);
    },
    [user],
  );

  const verifyResident = (): Promise<void> => verifySelected('Resident');
  const verifyAsValue = useCallback((): void => {
    const selectedRole = roleSelectRef.current?.value;
    if (selectedRole) {
      verifySelected(selectedRole as Role);
    }
  }, [verifySelected]);

  const textStyle = `text-center align-middle ${isSubmitting ? 'text-muted' : ''}`;
  const moderatorOptions =
    userRole === 'Admin' ? (
      <span className="text-muted">Admin</span>
    ) : (
      <Form.Control
        ref={roleSelectRef}
        onChange={verifyAsValue}
        disabled={isSubmitting}
        as="select"
        className={textStyle}
        value={userRole}
      >
        {[toRole(1), toRole(2), toRole(3)].map(role => (
          <option key={role} className={textStyle} disabled={role === userRole} value={`${role}`}>
            {role}
          </option>
        ))}
      </Form.Control>
    );

  return (
    <tr key={user.uid} className="user-table-row">
      {isRequests && <td className={textStyle}>{formatted(user.creationTime)}</td>}
      <td className={textStyle}>{user.displayName}</td>
      <td className={textStyle}>{user.kuEmail}</td>
      <td className={textStyle}>
        {isRequests ? (
          <Button size="sm" disabled={isSubmitting} variant="primary" onClick={verifyResident}>
            Resident
          </Button>
        ) : (
          moderatorOptions
        )}
      </td>
    </tr>
  );
};

export default UserRow;
