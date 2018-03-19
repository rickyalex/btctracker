import React, { Component } from 'react';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
                <div className="header">
                    <nav className="navbar top-navbar navbar-expand-md navbar-light">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="index.html">
                                <b>BTC Tracker</b>
                            </a>
                        </div>
                    </nav>
                </div>
        )
    }

}

export default Header;