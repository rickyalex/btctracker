import React, { Component } from 'react';

class Sidebar extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
                <div className="left-sidebar">
                    <div className="scroll-sidebar">
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav">
                                <li className="nav-devider"></li>
                                <li className="nav-label">Home</li>
                                <li> <a className="has-arrow  " href="#" aria-expanded="false"><i className="fa fa-tachometer"></i><span className="hide-menu">Main Menu <span className="label label-rouded label-primary pull-right">2</span></span></a>
                                    <ul aria-expanded="false" className="collapse">
                                        <li><a href="index.html">Ticker </a></li>
                                        <li><a href="index1.html">Check </a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
        )
    }

}

export default Sidebar;