import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FixtureList from './components/fixtureList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Predictor</h1>
        </header>
        <br/>
        <FixtureList/>
      </div>
    );
  }
}

export default App;
