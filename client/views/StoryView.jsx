import React from 'react';
import {render} from 'react-dom';

export default
class StoryView extends React.Component {
    render () {
        if (this.props.display === 'tile') {
            return (<div className="widget story-tile">
                <span class="left"><b>{this.props.item.name}</b></span>
                <span class="right">{this.props.item.owner}</span><br /><br />
                {this.props.item.description}
            </div>);
        }
    }
}