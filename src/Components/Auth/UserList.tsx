import React from 'react';

import Table from 'react-bootstrap/Table';

import { VisibleUser } from '../../Types';
import UserRow from './UserRow';

type UserTableProps = { userList: VisibleUser[]; variant: 'REQUESTS' | 'RESIDENTS' };
const UserTable: React.FC<UserTableProps> = props => {
  const { userList, variant } = props;

  const anyToShow = userList.length > 0;
  const isRequests = variant === 'REQUESTS';
  const isResidents = variant === 'RESIDENTS';

  if (!anyToShow) {
    return variant === 'REQUESTS' ? <h5>No requests.</h5> : <h5>No residents.</h5>;
  }

  return (
    <Table responsive bordered hover size="sm">
      <thead>
        <tr>
          {isRequests && <th className="text-center">Join Date</th>}
          {isResidents && <th className="text-center">Role</th>}
          <th className="text-center">Name</th>
          <th className="text-center">KU Email</th>
          <th className="text-center" colSpan={3}>
            Verify As
          </th>
        </tr>
      </thead>
      <tbody>
        {userList.map(userRow => (
          <UserRow key={userRow.uid} user={userRow} variant={variant} />
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
