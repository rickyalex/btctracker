import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
                <div className="left-sidebar">
                    <div className="scroll-sidebar">
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav">
                                <li className="nav-devider"></li>
                                <li className="nav-label">Home</li>
                                <li><Link to="/">Dashboard</Link></li>
                                <li><Link to="/search">Search</Link></li>
                                <li><Link to="/check">Check</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
        )
    }

}

export default withRouter(Sidebar);