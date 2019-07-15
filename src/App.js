import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";

import './firebase/firebase';

import Header from "./Components/Header/Header";
import Routes from "./Components/Routes";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Jumbotron className="no-margin">
          <h1 className="display-1 text-center">Resident 51</h1>
        </Jumbotron>

        <Header />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
