import React from 'react';
import {render} from 'react-dom';

import WelcomeWidget from '../widgets/WelcomeWidget.jsx';

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
            <p>Dashboard Page!</p>
            <div>
                <WelcomeWidget user={this.state.user} />
            </div>
        </div>);
    }
}