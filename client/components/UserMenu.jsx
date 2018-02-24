import React from 'react';
import {render} from 'react-dom';

export default
class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(window.sessionStorage.agilityUser)
        };
    }

    doSignOut() {
        window.sessionStorage.agilityUser = null;
        window.sessionStorage.agilityToken = null;
        window.location = '/';
    }

    render () {
        if (this.state.user) {
            return (<div className="user-menu">
                <i className="fa fa-user" />&nbsp;{this.state.user.email}<br />
                <b>{this.state.user.role}</b><br />
                [<a href="#" onClick={this.doSignOut}>Sign Out</a>]
            </div>);
        }
        else {
            // redirect to the login page if there is no user.
            window.location = '/';
        }
    }
}