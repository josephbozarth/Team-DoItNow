import React from 'react';
import {render} from 'react-dom';
import { Button } from 'react-bootstrap';

import FormBase from './FormBase.jsx';
import {createFeature, updateFeature} from '../api/feature';
import {getSessionUser} from '../api/session';

export default
class FeatureForm extends FormBase {

    constructor(props){
        super(props);
    }

    getName() {
        return "Feature Request";
    }

    getInitialState(isEdit) {
        return {
            userId: getSessionUser().id,
            id: isEdit ? this.props.item.id : '',
            name: isEdit ? this.props.item.name : '',
            description: isEdit ? this.props.item.description : ''
        };
    }

    doSave(isEdit) {
        return isEdit ?
            updateFeature(this.state) :
            createFeature(this.state);
    }

    renderForm() {        
        return (<div>
        <label> Name: &nbsp;</label>
        <input className="form-control" autoFocus size="50" type="text" name="name" placeholder="ex. Add Github Integration" value={this.state.name} onChange={this.handleChange}/>
        <br />
        <div>
            <label> Description:&nbsp;</label>
            <textarea className="form-control" name="description" id="desc" rows="10" value={this.state.description} onChange={this.handleChange}></textarea>
        </div>
        <hr width="100%"></hr>
        <div className="footer">
            <input type="submit" value={this.state.isEdit ? "Update" : "Create"} className="btn btn-primary" />
            &nbsp;
            <Button onClick={this.closeModal}> Cancel</Button>
        </div>
    </div>);
    }
}