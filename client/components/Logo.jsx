import React from 'react';
import {render} from 'react-dom';

export default
class Logo extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (<span className="logo">
            <i className="fa fa-play-circle-o"></i>&nbsp;
            <h1>Agility</h1>
        </span>);
    }
}