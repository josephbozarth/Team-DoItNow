import React from 'react';
import {render} from 'react-dom';
import { ProgressBar } from 'react-bootstrap';

export default
class UserView extends React.Component {

    render () {
        if (this.props.display === 'tile') {
            return (<div className="widget user-tile">
                <div className="left">
                    <img className="profile" src={this.props.item.imageUrl} alt="profile image" />
                </div>
                <div className="right">
                    <div><b>{this.props.item.name}</b></div><br />
                    <div>{this.props.item.role}</div>
                </div>
            </div>);
        }
    }
}