import React from 'react';
import {render} from 'react-dom';
import { Button } from 'react-bootstrap';

export default
class FormBase extends React.Component {

    constructor(props){
        super(props);
        let isEdit = props.item && props.item.id;

        this.state = this.getInitialState(isEdit);
        this.state.modalActive = false;
        this.state.dialogActive = false;
        this.state.isEdit = isEdit;

        this.onUpdate = props.onUpdate;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    getName() {
        throw new Error('This method is intended to be overridden!');
    }

    getInitialState() {
        throw new Error('This method is intended to be overridden!');
    }

    doSave() {
        throw new Error('This method is intended to be overridden!');
    }

    renderForm() {        
        throw new Error('This method is intended to be overridden!');
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
        this.doSave(this.state.isEdit)
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
            <Button onClick={this.openModal}><i className="fa fa-plus"></i>&nbsp;Add {this.getName()}</Button>            
        )}
        {this.state.modalActive && (
        <div className='popup'>
        {this.state.dialogActive && (
            <div className='popup_inner'>
            <h3>{this.state.isEdit ? "Update": "Create"} {this.getName()}</h3>
            <hr width="100%"></hr>
            <form onSubmit={this.handleSubmit}> 
            {this.renderForm()}
            </form>
        </div>)}
        </div>)}
    </span>);
    }
}