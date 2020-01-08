import React, { useContext, useEffect } from "react";

import { UserContext } from "../Contexts/User";

import { useHistory } from "react-router-dom";

const Logout: React.FC = () => {
  const { user, userDispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user && user.uid) {
      userDispatch({ type: "LOGOUT" });
      history.push("/events", { update: "Logged out successfully." });
    } else if (user !== null) {
      history.replace("/login");
    }
  }, [user, userDispatch, history]);

  return <div />;
};

export default Logout;
