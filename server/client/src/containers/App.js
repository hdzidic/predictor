import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Predictor</h1>
        </header>
        <br/>
        <br/>
        <div>
          <Link className='btn btn-primary' to='/fixtures'>Enter Predictions</Link>
        </div>
      </div>
    );
  }
}

export default App;
