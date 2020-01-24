import React from "react";

import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();
  history.replace("/events");
  return <div />;
};

export default Home;
