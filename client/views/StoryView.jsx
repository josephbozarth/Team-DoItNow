import React from 'react';
import {render} from 'react-dom';

export default
class StoryView extends React.Component {
    render () {
        if (this.props.display === 'tile') {
            return (<div className="widget story-tile">
                <b>{this.props.item.name}</b><br /><br />
                {this.props.item.description}
            </div>);
        }
    }
}