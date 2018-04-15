import React from 'react';
import {render} from 'react-dom';

export default
class StoryView extends React.Component {
    render () {
        if (this.props.display === 'tile') {
            return (<div className="widget story-tile">
                <div className="title"><b>{this.props.item.name}</b></div>
                <div><i className="fa fa-user"></i>&nbsp;{this.props.item.userEmail}</div>
                <div className="title">{this.props.item.description}</div>
            </div>);
        }
    }
}