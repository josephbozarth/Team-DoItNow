import React from 'react';
import {render} from 'react-dom';

import StoryView from '../views/StoryView.jsx';

export default
class SprintPlanning extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            stories: [
                {
                    name: "Test Story 1",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                    name: "Test Story 2",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                    name: "Test Story 3",
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
        </div>);
    }
}