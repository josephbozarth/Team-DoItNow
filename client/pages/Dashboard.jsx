import React from 'react';
import {render} from 'react-dom';
import { Button } from 'react-bootstrap';

import WelcomeWidget from '../widgets/WelcomeWidget.jsx';
import QotdWidget from '../widgets/QotdWidget.jsx';

export default
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: window.sessionStorage.agilityToken,
            user: JSON.parse(window.sessionStorage.agilityUser)
        };
    }

    render () {
        return (<div>
            <h2>Dashboard</h2>
            <div>
                <WelcomeWidget user={this.state.user} />
                <QotdWidget user={this.state.user} />
            </div>
        </div>);
    }
}