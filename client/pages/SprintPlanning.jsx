import React from 'react';
import {render} from 'react-dom';
import { Tabs, Tab, Panel, Label, Button } from 'react-bootstrap';

import FeatureForm from '../forms/FeatureForm.jsx'
import SprintForm from '../forms/SprintForm.jsx'
import StoryForm from '../forms/StoryForm.jsx'

import FeatureView from '../views/FeatureView.jsx'
import SprintView from '../views/SprintView.jsx'
import StoryView from '../views/StoryView.jsx';

import {getFeatures} from '../api/feature';
import {getSprints} from '../api/sprint';
import {getStories, getStoryStatuses} from '../api/story';
import {getUsers} from '../api/user';

export default
class SprintPlanning extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};
        this.refreshViews = this.refreshViews.bind(this);
        this.refreshViews();
    }

    refreshViews() {
        console.log('Refreshing data...');
        Promise.all([
            getFeatures(),
            getSprints(),
            getStories(),
            getUsers(),
            getStoryStatuses()
        ]).then(([ features, sprints, stories, users, storyStatuses ]) => this.setState({ features, sprints, stories, users, storyStatuses }));
    }

    render () {
        return (<div>
            <h2>Sprint Planning</h2>
            <div>
            <Tabs defaultActiveKey={1} id="sprint-planning-tabs">
                <Tab eventKey={1} title="Feature Requests">
                    <div className="tab-container">
                        <div>
                            <FeatureForm bsStyle="primary" onUpdate={this.refreshViews} /> 
                        </div>
                        {(this.state.features || []).map(f => <FeatureView key={f.id} item={f} display="tile" onUpdate={this.refreshViews} />)}
                    </div>   
                </Tab>
                <Tab eventKey={2} title="Sprints">
                    <div className="tab-container">
                        <div>
                            <SprintForm bsStyle="primary" onUpdate={this.refreshViews} /> 
                        </div>
                        {(this.state.sprints || []).map(s => <SprintView key={s.id} item={s} display="tile" onUpdate={this.refreshViews} />)}
                    </div>   
                </Tab>
                <Tab eventKey={3} title="Stories">
                    <div className="tab-container">
                    <Panel defaultExpanded key={0}>
                        <Panel.Heading>
                            <Panel.Title>
                                <Panel.Toggle componentClass="span">No Assigned Sprint</Panel.Toggle>
                                <div className="section-buttons"><StoryForm bsStyle="primary" bsSize="small"
                                 sprint={''} onUpdate={this.refreshViews}
                                 features={this.state.features} 
                                 sprints={this.state.sprints} 
                                 users={this.state.users}
                                 storyStatuses={this.state.storyStatuses}
                                 /></div>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                        {(this.state.stories || []).filter(story => !story.sprintId).map(story =>
                            <StoryView key={story.id} item={story} display="tile" onUpdate={this.refreshViews} 
                            features={this.state.features} 
                            sprints={this.state.sprints} 
                            users={this.state.users}
                            storyStatuses={this.state.storyStatuses}
                         />)}
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>   
                    {(this.state.sprints || []).map(sprint => (
                    <Panel defaultExpanded key={sprint.id}>
                        <Panel.Heading>
                            <Panel.Title>
                                <Panel.Toggle componentClass="span">
                                    <Label bsStyle="success">SP-{sprint.id}</Label>&nbsp;{sprint.name}
                                </Panel.Toggle>
                                <div className="section-buttons"><StoryForm bsStyle="primary" bsSize="small"
                                 sprint={sprint.id} onUpdate={this.refreshViews}
                                 features={this.state.features} 
                                 sprints={this.state.sprints} 
                                 users={this.state.users}
                                 storyStatuses={this.state.storyStatuses}
                                 /></div>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                        {(this.state.stories || []).filter(story => story.sprintId === sprint.id).map(story =>
                            <StoryView key={story.id} item={story} display="tile" onUpdate={this.refreshViews} 
                            features={this.state.features} 
                            sprints={this.state.sprints} 
                            users={this.state.users}
                            storyStatuses={this.state.storyStatuses}
                         />)}
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                    ))}
                    </div>   
                </Tab>
            </Tabs>
            </div>
        </div>);
    }
}