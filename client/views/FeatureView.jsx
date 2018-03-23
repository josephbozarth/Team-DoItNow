import React from 'react';
import {render} from 'react-dom';
import { ProgressBar } from 'react-bootstrap';

export default
class FeatureView extends React.Component {

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
            return (<div className="widget feature-tile">
                <span className="left"><b>{this.props.item.name}</b></span>
                <span className="right"><i className="fa fa-user"></i>&nbsp;{this.props.item.owner}</span><br />
                <div className="story-count"><b>{this.props.item.storyCount}</b> stories assigned</div>
                <ProgressBar striped bsStyle={this.getProgressStyle()} now={this.props.item.percent} label={`${this.props.item.percent}%`} />
            </div>);
        }
    }
}