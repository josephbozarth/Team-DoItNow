import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import UserMenu from './components/UserMenu.jsx';

import Login from './pages/Login.jsx';

import Dashboard from './pages/Dashboard.jsx';
import SprintPlanning from './pages/SprintPlanning.jsx';

const ListItemLink = ({ to, label }) => (
  <Route path={to} children={({ match }) => (
<li className={match ? 'active' : ''}>
    <Link to={to}>{label}</Link>
</li>
)}/>
);

class App extends React.Component
{
    render () {
        return (
            <Router>
                <div>
                    <div className="header">
                        <div className="header-left">
                            <i className="fa fa-gear"></i>&nbsp;
                            <h1>Agility</h1>
                        </div>
                        <div className="header-right">
                            <UserMenu />
                        </div>
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
    }
}

var app = document.getElementById('app');
// render the page
if (app) {
    render(<App/>, document.getElementById('app'));    
}
else {
    render(<Login/>, document.getElementById('login'));
}