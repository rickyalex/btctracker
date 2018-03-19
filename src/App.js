import React, { Component } from 'react';
import './App.css';
import Header from './components/header.js';
import Sidebar from './components/sidebar.js';
import PageWrapper from './components/pagewrapper.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <PageWrapper />
      </div>
    );
  }
}

export default App;
