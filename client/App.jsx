import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './pages/Home.jsx';

const App = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/app">Home</Link>
                </li>
                <li>
                    <Link to="/app/about">About</Link>
                </li>
                <li>
                    <Link to="/app/topics">Topics</Link>
                </li>
            </ul>
            <hr />
            <Route exact path="/app" component={Home} />
            <Route path="/app/about" component={Home} />
            <Route path="/app/topics" component={Home} />
        </div>
    </Router>
);


// render the page
render(<App/>, document.getElementById('app'));    
