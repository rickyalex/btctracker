import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import Header from './components/header.js';
import Sidebar from './components/sidebar.js';
import Dashboard from './components/dashboard.js';
import Footer from './components/footer.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <div className="page-wrapper">
        	<Dashboard />
			<Footer />
		</div>
      </div>
    );
  }
}

export default withRouter(App);