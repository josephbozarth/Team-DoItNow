import React from 'react';
import {render} from 'react-dom';
import { Button } from 'react-bootstrap';

import {createFeature, updateFeature} from '../api/feature';
import {getSessionUser} from '../api/session';

export default
class FeatureForm extends React.Component {
    constructor(props){
        super(props);
        let userId = getSessionUser().id;
        if (props.feature && props.feature.id) {
            this.state = {
                userId,
                id: props.feature.id,
                name: props.feature.name,
                description: props.feature.description,
                modalActive: false,
                dialogActive: false,
                isEdit: true
            };
        }
        else {
            this.state = {
                userId,
                name: '',
                description: '',
                modalActive: false,
                dialogActive: false,
                isEdit: false
            };
        }
        this.onUpdate = props.onUpdate;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange (evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    openModal(){
        this.setState({ modalActive: true, dialogActive: true });
      }
    
    closeModal(){
        this.setState({ modalActive: false, dialogActive: false });
      }

    handleSubmit(evt) {
        this.setState({ dialogActive: false });
        evt.preventDefault();
        (this.state.isEdit ?
            updateFeature(this.state) :
            createFeature(this.state))
            .then(() => {
            this.setState({ modalActive: false });
            if (this.onUpdate) {
                this.onUpdate();
            }
        });
    }

render () {
    return (<span>
        {this.state.isEdit && (
            <Button onClick={this.openModal}><i className="fa fa-edit"></i></Button>            
        )}
        {!this.state.isEdit && (
            <Button onClick={this.openModal}><i className="fa fa-plus"></i>&nbsp;Add Feature Request</Button>            
        )}
        {this.state.modalActive && (
        <div className='popup'>
        {this.state.dialogActive && (
            <div className='popup_inner'>
            <h3>{this.state.isEdit ? "Update": "Create"} Feature Request</h3>
            <hr width="100%"></hr>
            <form onSubmit={this.handleSubmit}> 

                <label> Name: &nbsp;</label>
                <input size="50" type="text" name="name" placeholder="ex. Add Github Integration" value={this.state.name} onChange={this.handleChange}/>
                <br /><br />
                <div>
                <label> Description:&nbsp; <br /><br /><br /><br /><br /></label>
                <textarea name="description" id="desc" cols="30" rows="10" value={this.state.description} onChange={this.handleChange}></textarea>
                </div>
            <hr width="100%"></hr>
                <div className="footer">
                <input type="submit" value={this.state.isEdit ? "Update" : "Create"} className="btn btn-primary" />
                &nbsp;
                <Button onClick={this.closeModal}> Cancel</Button>
                </div>
            </form>
        </div>)}
        </div>)}
    </span>);
    }
}