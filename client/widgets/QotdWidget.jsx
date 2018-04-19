import React from 'react';
import {render} from 'react-dom';

export default
class QotdWidget extends React.Component {
    render () {
        return (<div className="widget welcome-widget">
            <script type="text/javascript" src="https://www.brainyquote.com/link/quotebr.js"></script>
            <small><i><a href="https://www.brainyquote.com/quote_of_the_day" target="_blank" rel="nofollow">more Quotes</a></i></small>
        </div>);
    }
}