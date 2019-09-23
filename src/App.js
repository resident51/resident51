import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";

import Header from "./Components/Header/Header";
import Routes from "./Components/Routes";

import "react-dates/lib/css/_datepicker.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.scss";
import "./Styles/Events.scss";
// import "./Styles/R51-Title.scss";

import { EventsProvider } from "./Contexts/EventsContext";
import { HallsProvider } from "./Contexts/HallsContext";
import { EventTypesProvider } from "./Contexts/EventTypesContext";

const App = () => {
  return (
    <Router>
      <Jumbotron id="r51" className="no-margin">
        <h1 id="title" className="display-1 text-center">
          Resident 51
        </h1>
      </Jumbotron>
      <div id="everything-else">
        <Header />
        <EventsProvider>
          <HallsProvider>
            <EventTypesProvider>
              <Routes />
            </EventTypesProvider>
          </HallsProvider>
        </EventsProvider>
      </div>
    </Router>
  );
};

export default App;
