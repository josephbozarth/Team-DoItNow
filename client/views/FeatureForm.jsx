import React from 'react';
import {render} from 'react-dom';

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
    }

    handleChange (evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    openModal = () => {
        this.setState({ modalActive: true })
      }
    
    closeModal = () => {
        this.setState({ modalActive: false })
      }

    /*
    handleNameChange(evt) {
        this.setState({name: evt.target.value});
    }

    handleDescriptionChange(evt) {
        this.setState({description: evt.target.value});
    }

    */

    handleSubmit(evt) {
        alert('Feature request submitted');
        evt.preventDefault();
    }

// render () {
//     return (<div className='popup'>
//         <div className='popup_inner'>
//             <h1> Feature Product Request Form</h1>
//             <form onSubmit={this.handleSubmit}> 

//                 <label> Name: </label>
//                 <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>

//                 <label> Description: </label>
//                 <input type="text" name="description" value={this.state.password} onChange={this.handleChange}/>

//                 <input type="submit" value="Submit Request" />

//             </form>
//         </div>
//     </div>);
//     }

render () {
    return (<div>
        <button onClick={this.openModal}> Feature Product Request</button>

        {this.state.modalActive && (
            <div className='popup'>
            <div className='popup_inner'>
            <h1> Feature Product Request Form</h1>
            <form onSubmit={this.handleSubmit}> 

                <label> Name: </label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>

                <label> Description: </label>
                <input type="text" name="description" value={this.state.password} onChange={this.handleChange}/>

                <input type="submit" value="Submit Request" />

            </form>
        </div>
    </div>)}
    </div>
    )}
        
}


