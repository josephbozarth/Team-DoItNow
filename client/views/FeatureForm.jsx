import React from 'react';
import {render} from 'react-dom';
import { Button } from 'react-bootstrap';

//import featureAPI from /Users/JacksonWexler/Desktop/Agility/Team-DoItNow/client/api/feature.js;

export default
class FeatureForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            modalActive: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange (evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    openModal(){
        this.setState({ modalActive: true })
      }
    
    closeModal(){
        this.setState({ modalActive: false })
      }

    handleSubmit(evt) {
        this.setState({ modalActive: false})

        evt.preventDefault();
    }

render () {
    return (<div>
        <Button onClick={this.openModal}><i className="fa fa-plus"></i>&nbsp;Add Feature Request</Button>

        {this.state.modalActive && (
            <div className='popup'>
            <div className='popup_inner'>
            <h1>Create Feature Request</h1>
            <hr width="100%"></hr>
            <form onSubmit={this.handleSubmit}> 

                <label> Name: &nbsp;</label>
                <input size="50" type="text" name="name" placeholder="ex. Add Github Integration" value={this.state.name} onChange={this.handleChange}/>
                <br /><br />
                <div>
                <label> Description:&nbsp; <br /><br /><br /><br /><br /></label>
                <textarea name="description" id="desc" cols="30" rows="10"></textarea>
                </div>
                <br />
                <input type="submit" value="Submit Request" className="btn btn-default" />
                &nbsp;
                <Button onClick={this.closeModal}> Cancel</Button>
            </form>
        </div>
    </div>)}
    </div>
    )}
        
}


