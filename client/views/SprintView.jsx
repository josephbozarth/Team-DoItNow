import React from 'react';
import {render} from 'react-dom';
import { ProgressBar, Button, Label } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import {deleteSprint} from '../api/sprint';
import StoryCollectionMetrics from '../components/StoryCollectionMetrics.jsx';

import SprintForm from '../forms/SprintForm.jsx';

export default
class SprintView extends React.Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        this.dialog.show({
            title: 'Confirm Sprint Delete',
            body: 'Are you sure you want to delete the selected sprint? You will lose all information associated with this record.',
            actions: [
                Dialog.OKAction(() => {
                    deleteSprint(this.props.item.id)
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
            return (<div className="widget sprint-tile">
                <div className="title">
                    <Label bsStyle="success">SP-{this.props.item.id}</Label>&nbsp;
                    <b title={this.props.item.name}>{this.props.item.name}</b>
                    </div>
                <StoryCollectionMetrics item={this.props.item} />
                <SprintForm item={this.props.item} onUpdate={this.props.onUpdate} />&nbsp;
                <Button onClick={this.onDelete}><i className="fa fa-trash"></i></Button>
                <Dialog ref={(el) => { this.dialog = el }} />
            </div>);
        }
    }
}