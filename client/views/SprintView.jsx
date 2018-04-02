import React from 'react';
import {render} from 'react-dom';
import { ProgressBar } from 'react-bootstrap';

export default
class SprintView extends React.Component {

    getProgressStyle() {
        if (this.props.item.percent >= 100) {
            return "success";
        }
        else if (this.props.item.percent <= 0) {
            return "danger";
        }
        return "warning";
    }

    render () {
        if (this.props.display === 'tile') {
            return (<div className="widget sprint-tile">
                <span className="left"><b>{this.props.item.name}</b></span><br />
                <div className="story-count"><b>{this.props.item.storyCount}</b> stories assigned</div>
                <ProgressBar striped bsStyle={this.getProgressStyle()} now={this.props.item.percent} label={`${this.props.item.percent}%`} />
            </div>);
        }
    }
}