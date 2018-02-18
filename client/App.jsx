import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Dashboard from './pages/Dashboard.jsx';
import SprintPlanning from './pages/SprintPlanning.jsx';

const ListItemLink = ({ to, label }) => (
  <Route path={to} children={({ match }) => (
<li className={match ? 'active' : ''}>
    <Link to={to}>{label}</Link>
</li>
)}/>
);

const App = () => (
    <Router>
        <div>
            <div className="header">
                <i className="fa fa-gear"></i>&nbsp;
                <h1>Agility</h1>
            </div>
            <div className="menu">
                <ul>
                    <ListItemLink to="/app/dashboard" label="Dashboard" />
                    <ListItemLink to="/app/sprint-planning" label="Sprint Planning" />
                </ul>
            </div>
            <div className="page-container">
                <Route path="/app/dashboard" component={Dashboard} />
                <Route path="/app/sprint-planning" component={SprintPlanning} />
            </div>
        </div>
    </Router>
);


// render the page
render(<App/>, document.getElementById('app'));    
