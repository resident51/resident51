import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';

import Header from './Components/Layout/Header';
import Routes from './Components/Routes';
import Footer from './Components/Layout/Footer';

import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.scss';
// import "./Styles/R51-Title.scss";

import { EventsProvider } from './Contexts/Events';
import { UserProvider } from './Contexts/User';

const App: React.FC = () => (
  <Router>
    <div id="crown" />
    <div id="app_container">
      <Jumbotron id="r51" className="mb-0">
        <h1 id="title" className="display-1 text-center">
          R<span className="d-sm-inline d-none">esident </span>51
        </h1>
      </Jumbotron>
      <div id="everything-else">
        <UserProvider>
          <Header />
          <EventsProvider>
            <Routes />
          </EventsProvider>
        </UserProvider>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
