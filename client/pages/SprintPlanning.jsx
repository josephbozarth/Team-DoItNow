import React from 'react';
import {render} from 'react-dom';

import StoryView from '../views/StoryView.jsx';
import FeatureForm from '../views/FeatureForm.jsx'

export default
class SprintPlanning extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            stories: [
                {
                    name: "Test Story 1",
                    owner: "Test Owner 1",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                    name: "Test Story 2",
                    owner: "Test Owner 2",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                    name: "Test Story 3",
                    owner: "Test Owner 3",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
            ]
        };
    }

    render () {
        return (<div>
            <p>Sprint Planning Page!</p>
            <div>
                {this.state.stories.map(story => <StoryView item={story} display="tile" />)}
            </div>   
            <FeatureForm /> 
        </div>);
    }
}