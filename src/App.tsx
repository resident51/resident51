import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import Header from './Components/Layout/Header';
import Routes from './Components/Routes';

// import 'react-dates/lib/css/_datepicker.css';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Styles/App.scss';
// // import "./Styles/R51-Title.scss";

import { EventsProvider } from './Contexts/Events';
import { UserProvider } from './Contexts/User';

const App: React.FC = () => (
  <Router>
    R<span className="d-sm-inline d-none">esident </span>51
    <UserProvider>
      <EventsProvider>
        <Routes />
      </EventsProvider>
    </UserProvider>
  </Router>
);

export default App;
