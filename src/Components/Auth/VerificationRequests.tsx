import React, { useContext } from "react";
// import { Events, EventR51, Hall, EventFormPublicType } from "../../Types";

import { UserContext } from "../../Contexts/User";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { verifyUser } from "../../Firebase/firebase";

const VerificationRequests: React.FC = () => {
  const { usersRequestingVerification } = useContext(UserContext);

  const anyToShow = usersRequestingVerification.length > 0;

  const verifySelected = (email: string | null) => (): void => {
    verifyUser({ email });
  };

  return anyToShow ? (
    <Table responsive bordered hover size="sm">
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th className="text-center">Name</th>
          <th className="text-center">Email</th>
          <th className="text-center" colSpan={3}>
            Verify As
          </th>
        </tr>
      </thead>
      <tbody>
        {usersRequestingVerification.map((request, index) => (
          <tr key={request.uid}>
            <td className="text-center">{index + 1}</td>
            <td className="text-center">{request.displayName}</td>
            <td className="text-center">{request.email}</td>
            <td className="text-center justify-content-center">
              <Button size="sm" variant="primary" onClick={verifySelected(request.email)}>
                Resident
              </Button>
            </td>
            <td className="text-center justify-content-center">
              <Button size="sm" variant="warning" onClick={verifySelected(request.email)}>
                Editor
              </Button>
            </td>
            <td className="text-center justify-content-center">
              <Button size="sm" variant="danger" onClick={verifySelected(request.email)}>
                Admin
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <h5>No requests.</h5>
  );
};

export default VerificationRequests;
