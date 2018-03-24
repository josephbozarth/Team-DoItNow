import React from 'react';
import {render} from 'react-dom';
import { Tabs, Tab } from 'react-bootstrap';

import UserView from '../views/UserView.jsx';

export default
class Team extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            users: [
                {
                    id: 1,
                    name: "Test User 1",
                    role: "Product Owner",
                    imageUrl: "https://cursos.iadb.org/sites/all/themes/knlstrap/assets/profile_photo.jpg"
                },
                {
                    id: 2,
                    name: "Test User 2",
                    role: "Developer",
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/Christopher_Fabian_profile.jpg"
                },
                {
                    id: 3,
                    name: "Test User 3",
                    role: "Scrum Master",
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Nemer_Saade_Profile_Picture.jpg"
                },
                {
                    id: 4,
                    name: "Test User 4",
                    role: "Developer",
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Kruse_CNDLS_Profile.png"
                },
            ]
        };
    }

    render () {
        return (<div>
            <h2>Team Members</h2>
            <div>
                {this.state.users.map(u => <UserView item={u} display="tile" />)}
            </div>
        </div>);
    }
}