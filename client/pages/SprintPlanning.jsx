import React from 'react';
import {render} from 'react-dom';
import { Tabs, Tab } from 'react-bootstrap';

import FeatureForm from '../views/FeatureForm.jsx'
import FeatureView from '../views/FeatureView.jsx'
import SprintView from '../views/SprintView.jsx'
import StoryView from '../views/StoryView.jsx';

export default
class SprintPlanning extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            features: [
                {
                    name: "Feature 1",
                    owner: "Test Owner 1",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                    name: "Feature 2",
                    owner: "Test Owner 2",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                    name: "Feature 3",
                    owner: "Test Owner 3",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
            ],
            sprints: [
                {
                    name: "Sprint 1",
                    owner: "Test Owner 1",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                    name: "Sprint 2",
                    owner: "Test Owner 2",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                    name: "Sprint 3",
                    owner: "Test Owner 3",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
            ],
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
            <h2>Sprint Planning</h2>
            <div>
            <Tabs defaultActiveKey={1} id="sprint-planning-tabs">
                <Tab eventKey={1} title="Feature Requests">
                    <div className="tab-container">
                        <FeatureForm /> 
                        {this.state.features.map(story => <FeatureView item={story} display="tile" />)}
                    </div>   
                </Tab>
                <Tab eventKey={2} title="Sprints">
                    <div className="tab-container">
                        {this.state.sprints.map(story => <SprintView item={story} display="tile" />)}
                    </div>   
                </Tab>
                <Tab eventKey={3} title="Stories">
                    <div className="tab-container">
                        {this.state.stories.map(story => <StoryView item={story} display="tile" />)}
                    </div>   
                </Tab>
            </Tabs>
            </div>
        </div>);
    }
}