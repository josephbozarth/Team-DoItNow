import React from 'react';
import {render} from 'react-dom';
import { ProgressBar, Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';

export default
class StoryCollectionMetrics extends React.Component {

    constructor(props) {
        super(props);
        if (props.item && props.item.storyCount) {
            props.item.acceptedPercent = Math.floor((props.item.acceptedStories / props.item.storyCount) * 100);
            props.item.completedPercent = Math.floor((props.item.completedStories / props.item.storyCount) * 100);
            props.item.inWorkPercent = Math.floor((props.item.inWorkStories / props.item.storyCount) * 100);
            props.item.pendingPercent = Math.floor((props.item.pendingStories / props.item.storyCount) * 100);
        }
    }

    render () {
        return (<div>
                <div className="story-count"><b>{this.props.item.storyCount}</b> stories ({(this.props.item.acceptedPercent || 0)}% Complete)</div>
                {this.props.item.storyCount > 0 && (<ProgressBar>
                    <ProgressBar title="Pending Stories" bsStyle="warning" now={this.props.item.pendingPercent} label={this.props.item.pendingStories} />
                    <ProgressBar striped title="In Work Stories" bsStyle="warning" now={this.props.item.inWorkPercent} label={this.props.item.inWorkStories} />
                    <ProgressBar title="Completed Stories" bsStyle="info" now={this.props.item.completedPercent} label={this.props.item.completedStories} />
                    <ProgressBar title="Accepted Stories" bsStyle="success" now={this.props.item.acceptedPercent} label={this.props.item.acceptedStories} />
                </ProgressBar>)}
                {this.props.item.storyCount === 0 && (
                    <ProgressBar title="No Stories Assigned!" bsStyle="danger" now={100} label="No Stories Assigned!" />                    
                )}
            </div>);
    }
}