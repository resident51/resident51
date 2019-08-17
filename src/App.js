import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";

// import './Firebase/firebase';

import Header from "./Components/Header/Header";
import Routes from "./Components/Routes";

import "react-dates/lib/css/_datepicker.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.scss";
import "./Styles/Events.scss";
// import "./Styles/R51-Title.scss";

import { EventTypesProvider } from "./Contexts/EventTypesContext";
import { EventsProvider } from "./Contexts/EventsContext";
import { HallsProvider } from "./Contexts/HallsContext";

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Jumbotron id="r51" className="no-margin">
          <h1 id="title" className="display-1 text-center">
            Resident 51
          </h1>
        </Jumbotron>
        <div id="everything-else">
          <Header />
          <EventTypesProvider>
            <EventsProvider>
              <HallsProvider>
                <Routes />
              </HallsProvider>
            </EventsProvider>
          </EventTypesProvider>
        </div>
      </Router>
    </React.StrictMode>
  );
};

export default App;
