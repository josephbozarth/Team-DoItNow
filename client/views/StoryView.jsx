import React from 'react';
import {render} from 'react-dom';

export default
class StoryView extends React.Component {
    render () {
        if (this.props.display === 'tile') {
            return (<div className="widget story-tile">
                <span className="left"><b>{this.props.item.name}</b></span>
                <span className="right"><i className="fa fa-user"></i>&nbsp;{this.props.item.owner}</span><br /><br />
                {this.props.item.description}
            </div>);
        }
    }
}