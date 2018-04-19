import React from 'react';
import {render} from 'react-dom';
import { Tabs, Tab, Panel, Label, Button, Grid, Row, Col, Alert } from 'react-bootstrap';

import StoryForm from '../forms/StoryForm.jsx'
import StoryView from '../views/StoryView.jsx';

import {getFeatures} from '../api/feature';
import {getSprints} from '../api/sprint';
import {getStories, getStoryStatuses, getStoryStatusColors} from '../api/story';
import {getUsers} from '../api/user';

export default
class StoryBoard extends React.Component {

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
        return (<div className="story-board">
            <h2>Story Board</h2>
            <Grid fluid>
                <Row>
                    {(this.state.storyStatuses || []).map(status => (<Col sm={24/this.state.storyStatuses.length} md={12/this.state.storyStatuses.length}>
                        <Label style={{display: 'block'}} bsStyle={getStoryStatusColors()[status.id]}>{status.name}</Label>
                    </Col>))}
                </Row>
                <Row>
                    {(this.state.storyStatuses || []).map(status => (<Col sm={24/this.state.storyStatuses.length} md={12/this.state.storyStatuses.length}>
                        {(this.state.stories || []).filter(story => story.storyStatusId === status.id).map(story =>
                            <StoryView key={story.id} item={story} display="tile" onUpdate={this.refreshViews} 
                            features={this.state.features} 
                            sprints={this.state.sprints} 
                            users={this.state.users}
                            storyStatuses={this.state.storyStatuses}
                            />)}
                    </Col>))}
                </Row>
            </Grid>
            ))}
        </div>);
    }
}