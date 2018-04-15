import React from 'react';
import {render} from 'react-dom';

import WelcomeWidget from '../widgets/WelcomeWidget.jsx';
import { Button } from 'react-bootstrap';

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
                <Button><i className="fa fa-plus"></i>&nbsp;Add Widget</Button>
            </div>
            <div>
                <WelcomeWidget user={this.state.user} />
            </div>
        </div>);
    }
}