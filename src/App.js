import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";

// import './Firebase/firebase';

import Header from "./Components/Header/Header";
import Routes from "./Components/Routes";

import 'react-dates/lib/css/_datepicker.css';
import "./Styles/App.scss";
import "./Styles/Events.scss"
// import "./Styles/R51-Title.scss";

const App = () => {
  return (
    <Router>
      <Jumbotron id="r51" className="no-margin">
        <h1 id="title" className="display-1 text-center">Resident 51</h1>
      </Jumbotron>
      <div id="everything-else">
        <Header />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
