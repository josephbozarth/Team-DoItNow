import React from 'react';
import {render} from 'react-dom';

import { Alert, Button, Grid, Row, Col } from 'react-bootstrap';

import {login} from '../api/user';
import {signOn} from '../api/session';

import Logo from '../components/Logo.jsx';

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
        login(this.state.email, this.state.password).then(signOn)
            .catch(err => {
                this.setState({ isLoginError: true });
            });
        event.preventDefault();
    }

    render () {
        return (<div className="login-panel">
            <br /><br /><br /><br />
            <Alert bsStyle="info">
                <div><Logo /></div>
                <br />
                You need to sign in before using the application.
                <br /><br />
                <form onSubmit={this.handleSubmit}>
                <div style={{width: '400px'}}><Grid fluid>
                    <Row>
                        <Col className="form-valign" md={4}>Email Address:</Col>
                        <Col md={8}>
                            <input className="form-control" autoFocus name="email" type="email" value={this.state.email} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>&nbsp;</Col>
                    </Row>
                    <Row>
                        <Col className="form-valign" md={4}>Password:</Col>
                        <Col md={8}>
                            <input className="form-control" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </Grid></div>
                <br /><br />
                <input type="submit" value="Sign-in" className="btn btn-primary" />
                {this.state.isLoginError ? <ErrorMessage /> : null} 
            </form>
        </Alert></div>);
    }
}