import React from 'react';
import {render} from 'react-dom';
import { Tabs, Tab } from 'react-bootstrap';

import FeatureForm from '../forms/FeatureForm.jsx'
import SprintForm from '../forms/SprintForm.jsx'

import FeatureView from '../views/FeatureView.jsx'
import SprintView from '../views/SprintView.jsx'
import StoryView from '../views/StoryView.jsx';

import {getFeatures} from '../api/feature';
import {getSprints} from '../api/sprint';
import {getStories} from '../api/story';

export default
class SprintPlanning extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};
        this.refreshViews();
    }

    refreshViews() {

        Promise.all([
            getFeatures(),
            getSprints(),
            getStories()
        ]).then(([ features, sprints, stories ]) => this.setState({ features, sprints, stories }));
    }

    render () {
        return (<div>
            <h2>Sprint Planning</h2>
            <div>
            <Tabs defaultActiveKey={1} id="sprint-planning-tabs">
                <Tab eventKey={1} title="Feature Requests">
                    <div className="tab-container">
                        <div>
                            <FeatureForm onUpdate={this.refreshViews.bind(this)} /> 
                        </div>
                        {(this.state.features || []).map(f => <FeatureView item={f} display="tile" onUpdate={this.refreshViews.bind(this)} />)}
                    </div>   
                </Tab>
                <Tab eventKey={2} title="Sprints">
                    <div className="tab-container">
                        <div>
                            <SprintForm onUpdate={this.refreshViews.bind(this)} /> 
                        </div>
                        {(this.state.sprints || []).map(s => <SprintView item={s} display="tile" onUpdate={this.refreshViews.bind(this)} />)}
                    </div>   
                </Tab>
                <Tab eventKey={3} title="Stories">
                    <div className="tab-container">
                        {(this.state.stories || []).map(story => <StoryView item={story} display="tile" onUpdate={this.refreshViews.bind(this)} />)}
                    </div>   
                </Tab>
            </Tabs>
            </div>
        </div>);
    }
}