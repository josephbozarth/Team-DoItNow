import React from 'react';
import {render} from 'react-dom';
import { ProgressBar, Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import {deleteFeature} from '../api/feature';

import FeatureForm from './FeatureForm.jsx';

export default
class FeatureView extends React.Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);

        if (props.item && props.item.storyCount) {
            props.item.acceptedPercent = Math.floor((props.item.acceptedStories / props.item.storyCount) * 100);
            props.item.completedPercent = Math.floor((props.item.completedStories / props.item.storyCount) * 100);
            props.item.inWorkPercent = Math.floor((props.item.inWorkStories / props.item.storyCount) * 100);
            props.item.pendingPercent = Math.floor((props.item.pendingStories / props.item.storyCount) * 100);
        }
    }

    getProgressStyle() {
        if (this.props.item.completedPercent >= 100) {
            return "success";
        }
        else if (this.props.item.completedPercent <= 0) {
            return "danger";
        }
        return "warning";
    }

    onDelete() {
        this.dialog.show({
            title: 'Confirm Feature Delete',
            body: 'Are you sure you want to delete the selected feature? You will lose all information associated with this record.',
            actions: [
                Dialog.OKAction(() => {
                    deleteFeature(this.props.item.id)
                        .then(this.props.onUpdate);
                }),
                Dialog.CancelAction()
            ],
            bsSize: 'small',
            onHide: (dialog) => {
                dialog.hide();
            }
        });
    }

    render () {
        if (this.props.display === 'tile') {
            return (<div className="widget feature-tile">
                <div className="title"><b title={this.props.item.name}>{this.props.item.name}</b></div>
                <div><i className="fa fa-user"></i>&nbsp;{this.props.item.userEmail}</div>
                <div className="story-count"><b>{this.props.item.storyCount}</b> stories ({this.props.item.acceptedPercent || 0}% Complete)</div>
                {this.props.item.storyCount > 0 && (<ProgressBar>
                    <ProgressBar title="Pending Stories" bsStyle="warning" now={this.props.item.pendingPercent} label={this.props.item.pendingStories} />
                    <ProgressBar striped title="In Work Stories" bsStyle="warning" now={this.props.item.inWorkPercent} label={this.props.item.inWorkStories} />
                    <ProgressBar title="Completed Stories" bsStyle="info" now={this.props.item.completedPercent} label={this.props.item.completedStories} />
                    <ProgressBar title="Accepted Stories" bsStyle="success" now={this.props.item.acceptedPercent} label={this.props.item.acceptedStories} />
                </ProgressBar>)}
                {this.props.item.storyCount === 0 && (
                    <ProgressBar title="No Stories Assigned!" bsStyle="danger" now={100} label="No Stories Assigned!" />                    
                )}
                <FeatureForm feature={this.props.item} onUpdate={this.props.onUpdate} />&nbsp;
                <Button onClick={this.onDelete}><i className="fa fa-trash"></i></Button>
                <Dialog ref={(el) => { this.dialog = el }} />
            </div>);
        }
    }
}