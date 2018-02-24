import React from 'react';
import {render} from 'react-dom';

export default
class WelcomeWidget extends React.Component {
    render () {
        return (<div className="widget welcome-widget">
            <span>Welcome, {this.props.user.firstName}</span>
        </div>);
    }
}