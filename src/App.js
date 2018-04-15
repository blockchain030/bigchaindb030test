import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import BigchainDB030Test from './BigchainDB030Test';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to BigchainDB testing by Blockchain030</h1>
        </header>
        <p className="App-intro">
          <BigchainDB030Test />
        </p>
      </div>
    );
  }
}

export default App;
