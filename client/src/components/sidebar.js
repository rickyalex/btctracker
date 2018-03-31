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
                                <li> <a className="has-arrow  " href="#" aria-expanded="false"><i className="fa fa-tachometer"></i><span className="hide-menu">Main Menu</span></a>
                                    <ul aria-expanded="false" className="collapse">
                                        <li><a href="#"><Link to="/">Dashboard</Link></a></li>
                                        <li><a href="#"><Link to="/search">Search</Link></a></li>
                                        <li><a href="#"><Link to="/check">Check</Link></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
        )
    }

}

export default withRouter(Sidebar);