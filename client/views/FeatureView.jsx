import React from 'react';
import {render} from 'react-dom';
import { ProgressBar, Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import {deleteFeature} from '../api/feature';
import StoryCollectionMetrics from '../components/StoryCollectionMetrics.jsx';

import FeatureForm from '../forms/FeatureForm.jsx';

export default
class FeatureView extends React.Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
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
                <StoryCollectionMetrics item={this.props.item} />
                <FeatureForm item={this.props.item} onUpdate={this.props.onUpdate} />&nbsp;
                <Button onClick={this.onDelete}><i className="fa fa-trash"></i></Button>
                <Dialog ref={(el) => { this.dialog = el }} />
            </div>);
        }
    }
}