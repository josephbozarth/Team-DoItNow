import React from 'react';
import {render} from 'react-dom';

import {getSessionUser, signOn, signOff} from '../api/session';

export default
class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getSessionUser()
        };
    }

    render () {
        if (this.state.user) {
            return (<div className="user-menu">
                <i className="fa fa-user" />&nbsp;{this.state.user.email}<br />
                <b>{this.state.user.role}</b><br />
                [<a href="#" onClick={signOff}>Sign Out</a>]
            </div>);
        }
        else {
            // redirect to the login page if there is no user.
            window.location = '/';
        }
    }
}