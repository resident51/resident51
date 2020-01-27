import React, { useContext } from "react";
// import { Events, EventR51, Hall, EventFormPublicType } from "../../Types";

import { UserContext } from "../../Contexts/User";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { verifyUser } from "../../Firebase/firebase";

type verifyType = "RESIDENT" | "EDITOR" | "ADMIN";

const confirmEditorMessage = `
This operation will allow this user to freely create, update, and remove events related to your hall. They will be permitted to see all events, including private events such as meetings from other halls.

Would you like to continue?`;

const confirmAdminMessage = `
This operation will allow this user to freely create, update, and remove events related to your hall. They will be permitted to see all events, including private events such as meetings from other halls.

This user will also be able to verify and designate roles to other users from this hall, giving them the same permissions as you.

Would you like to continue?`;

const verifySelected = (email: string | null, verifyType: verifyType) => (): void => {
  if (verifyType === "RESIDENT") {
    verifyUser({ email });
  } else if (verifyType === "EDITOR") {
    if (window.confirm(confirmEditorMessage)) {
      verifyUser({ email });
    }
  } else if (verifyType === "ADMIN") {
    if (window.confirm(confirmAdminMessage)) {
      verifyUser({ email });
    }
  }
};

const VerificationRequests: React.FC = () => {
  const { usersRequestingVerification } = useContext(UserContext);

  const anyToShow = usersRequestingVerification.length > 0;

  return anyToShow ? (
    <Table responsive bordered hover size="sm">
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th className="text-center">Name</th>
          <th className="text-center">KU Email</th>
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
            <td className="text-center">{request.kuEmail}</td>
            <td className="text-center justify-content-center">
              <Button size="sm" onClick={verifySelected(request.email, "RESIDENT")}>
                Resident
              </Button>
            </td>
            <td className="text-center justify-content-center">
              <Button size="sm" variant="warning" onClick={verifySelected(request.email, "EDITOR")}>
                Editor
              </Button>
            </td>
            <td className="text-center justify-content-center">
              <Button size="sm" variant="danger" onClick={verifySelected(request.email, "ADMIN")}>
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
