import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
                <ul >
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/check">Check</Link></li>
                </ul>
        )
    }

}

export default withRouter(Sidebar);