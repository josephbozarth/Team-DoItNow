import React from 'react';
import {render} from 'react-dom';

import userApi from '../api/user';

const ErrorMessage = () => (<div className="error-message">The specified email/password was not correct.</div>);

export default
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoginError: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    handleSubmit(event) {
        userApi.login(this.state.email, this.state.password)
            .then(login => {
                window.sessionStorage.agilityUser = JSON.stringify(login);
                window.sessionStorage.agilityToken = login.token;
                
                window.location = '/app/dashboard';
            })
            .catch(err => {
                this.setState({ isLoginError: true });
            });
        event.preventDefault();
    }

    render () {
        return (<div>
            <h1>Agility</h1>
            You need to sign in before using the application:
            <br /><br />
            <div className="login-panel">
                <form onSubmit={this.handleSubmit}>
                    Email Address:<br /><input name="email" type="email" value={this.state.email} onChange={this.handleInputChange} /><br /><br />
                    Password:<br /><input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} /><br /><br />
                    <input type="submit" value="Sign-in" />
                    {this.state.isLoginError ? <ErrorMessage /> : null} 
                </form>
            </div>
        </div>);
    }
}