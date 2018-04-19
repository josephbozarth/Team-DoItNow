import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Logo from './components/Logo.jsx';
import UserMenu from './components/UserMenu.jsx';

import Login from './pages/Login.jsx';

import Dashboard from './pages/Dashboard.jsx';
import SprintPlanning from './pages/SprintPlanning.jsx';
import StoryBoard from './pages/StoryBoard.jsx';
import Team from './pages/Team.jsx';

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
                            <Logo />
                        </div>
                        <div className="header-right">
                            <UserMenu />
                        </div>
                    </div>
                    <div className="menu">
                        <Nav bsStyle="pills" activeKey={1}>
                            <LinkContainer to="/app/dashboard">
                                <NavItem eventKey={1}>Dashboard</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/app/sprint-planning">
                                <NavItem eventKey={2}>Sprint Planning</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/app/story-board">
                                <NavItem eventKey={3}>Story Board</NavItem>
                            </LinkContainer>
                        </Nav>
                    </div>
                    <div className="page-container">
                        <Route path="/app/dashboard" component={Dashboard} />
                        <Route path="/app/sprint-planning" component={SprintPlanning} />
                        <Route path="/app/story-board" component={StoryBoard} />
                        <Route path="/app/team" component={Team} />
                    </div>
                </div>
            </Router>
        );
    }
}

/*
                        <ul>
                            <ListItemLink to="/app/dashboard" label="Dashboard" />
                            <ListItemLink to="/app/sprint-planning" label="Sprint Planning" />
                        </ul>
*/

var app = document.getElementById('app');
// render the page
if (app) {
    render(<App/>, document.getElementById('app'));    
}
else {
    render(<Login/>, document.getElementById('login'));
}