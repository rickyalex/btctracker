import React, { Component } from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import App from './App';
import Search from './components/search';
import Check from './components/check';


class Routes extends Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                    <Route exact path="/" component={App}/>
                    <Route path="/home" component={App} />
                    <Route path="/search" component={Search} />
                    <Route path="/check" component={Check} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes;