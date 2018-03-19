import React, { Component } from 'react';
import Container from './container.js';

class PageWrapper extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        
        return (
                <div className="page-wrapper">
                  <div className="row page-titles">
                    <div className="col-md-5 align-self-center">
                      <h3 className="text-primary">Dashboard</h3>
                    </div>
                  </div>
                  <Container />
                  <footer className="footer"> © 2018 All rights reserved. Template designed by <a href="https://colorlib.com">Colorlib</a></footer>
                </div>  
        )
    }

}

export default PageWrapper;
