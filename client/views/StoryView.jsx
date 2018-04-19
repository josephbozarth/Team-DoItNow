import React from 'react';
import { Button, Label } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import {render} from 'react-dom';
import {deleteStory, getStoryStatusColors} from '../api/story';

import StoryForm from '../forms/StoryForm.jsx';

export default
class StoryView extends React.Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        this.dialog.show({
            title: 'Confirm Story Delete',
            body: 'Are you sure you want to delete the selected story? You will lose all information associated with this record.',
            actions: [
                Dialog.OKAction(() => {
                    deleteStory(this.props.item.id)
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
            return (<div className="widget story-tile">
                <div className="title">
                    <Label bsStyle="info">S-{this.props.item.id}</Label>&nbsp;
                    <b>{this.props.item.name}</b>
                </div>
                <div><i className="fa fa-user"></i>&nbsp;{this.props.item.userEmail}</div>
                <div className="title">{this.props.item.description}</div>
                <div className="related-objects float-container">
                    <div className="left">
                    { this.props.item.featureId && (<span><Label bsStyle="warning">FR-{this.props.item.featureId}</Label>&nbsp;</span>)}
                    { this.props.item.sprintId && (<span><Label bsStyle="success">SP-{this.props.item.sprintId}</Label></span>)}
                    </div>
                    <div className="right">
                    <Label bsStyle={getStoryStatusColors()[this.props.item.storyStatusId]}>{this.props.item.storyStatusName}</Label>
                    </div>
                </div>
                <StoryForm item={this.props.item} onUpdate={this.props.onUpdate} 
                    features={this.props.features} 
                    sprints={this.props.sprints} 
                    users={this.props.users} 
                    storyStatuses={this.props.storyStatuses}
                    />&nbsp;
                <Button onClick={this.onDelete}><i className="fa fa-trash"></i></Button>
                <Dialog ref={(el) => { this.dialog = el }} />
            </div>);
        }
    }
}