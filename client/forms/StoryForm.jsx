import React from 'react';
import {render} from 'react-dom';
import { Button, Label } from 'react-bootstrap';

import FormBase from './FormBase.jsx';
import {createStory, updateStory} from '../api/story';
import {getSessionUser} from '../api/session';

export default
class StoryForm extends FormBase {

    constructor(props){
        super(props);
    }

    getName() {
        return "Story";
    }

    getInitialState(isEdit) {
        return {
            id: isEdit ? this.props.item.id : '',
            name: isEdit ? this.props.item.name : '',
            description: isEdit ? this.props.item.description : '',
            userId: isEdit ? this.props.item.userId : getSessionUser().id,
            featureId: isEdit ? this.props.item.featureId : '',
            sprintId: isEdit ? this.props.item.sprintId : (this.props.sprint ? this.props.sprint : ''),
            storyStatusId: isEdit ? this.props.item.storyStatusId : 'P'
        };
    }

    doSave(isEdit) {
        return isEdit ?
            updateStory(this.state) :
            createStory(this.state);
    }

    renderForm() {        
        return (<div>
        <label> Name: &nbsp;</label>
        <input className="form-control" autoFocus size="50" type="text" name="name" placeholder="ex. Add Github Integration" value={this.state.name} onChange={this.handleChange}/>
        <br />
        <div>
            <label> Description:&nbsp;</label>
            <textarea className="form-control" name="description" id="desc" rows="5" value={this.state.description} onChange={this.handleChange}></textarea>
        </div>
        <br />
        <div>
            <label> Assigned User:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <select className="form-control" name="userId"
                value={this.state.userId} 
                onChange={this.handleChange} 
            >
            {this.props.users.map(user => <option key={user.id} value={user.id}>{user.email}</option>)}
            </select>
        </div>
        <br />
        <div>
            <label> Feature:&nbsp;</label>
            <select className="form-control" name="featureId"
                value={this.state.featureId} 
                onChange={this.handleChange} 
            >
            <option key={0} value={''}>(Unassigned)</option>
            {this.props.features.map(f => <option key={f.id} value={f.id}>[FR-{f.id}]&nbsp;{f.name}</option>)}
            </select>
        </div>
        <br />
        <div>
            <label> Sprint:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <select className="form-control" name="sprintId"
                value={this.state.sprintId} 
                onChange={this.handleChange} 
            >
            <option key={0} value={''}>(Unassigned)</option>
            {this.props.sprints.map(sp => <option key={sp.id} value={sp.id}>[SP-{sp.id}]&nbsp;{sp.name}</option>)}
            </select>
        </div>
        <br />
        <div>
            <label> Story Status:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <select className="form-control" name="storyStatusId"
                value={this.state.storyStatusId} 
                onChange={this.handleChange} 
            >
            {this.props.storyStatuses.map(ss => <option key={ss.id} value={ss.id}>{ss.name}</option>)}
            </select>
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