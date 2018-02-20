import React from 'react';
import {render} from 'react-dom';

import WelcomeWidget from '../widgets/WelcomeWidget.jsx';

export default
class Dashboard extends React.Component {
    render () {
        return (<div>
            <p>Dashboard Page!</p>
            <div>
                <WelcomeWidget user="Steven" />
            </div>
        </div>);
    }
}