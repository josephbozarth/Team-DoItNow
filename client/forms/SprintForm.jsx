import React from 'react';
import {render} from 'react-dom';
import { Button } from 'react-bootstrap';

import FormBase from './FormBase.jsx';
import {createSprint, updateSprint} from '../api/sprint';
import {getSessionUser} from '../api/session';

export default
class SprintForm extends FormBase {

    constructor(props){
        super(props);
    }

    getName() {
        return "Sprint";
    }

    getInitialState(isEdit) {
        return {
            userId: getSessionUser().id,
            id: isEdit ? this.props.item.id : '',
            name: isEdit ? this.props.item.name : ''
        };
    }

    doSave(isEdit) {
        return isEdit ?
            updateSprint(this.state) :
            createSprint(this.state);
    }

    renderForm() {        
        return (<div>
        <label> Name: &nbsp;</label>
        <input autoFocus size="50" type="text" name="name" placeholder="ex. Sprint 5" value={this.state.name} onChange={this.handleChange}/>
        <hr width="100%"></hr>
        <div className="footer">
            <input type="submit" value={this.state.isEdit ? "Update" : "Create"} className="btn btn-primary" />
            &nbsp;
            <Button onClick={this.closeModal}> Cancel</Button>
        </div>
    </div>);
    }
}