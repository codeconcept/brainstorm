import React, { Component } from 'react';
import './App.css';
import AddIdea from './components/AddIdea';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Brainstorm app!</h1>
        <AddIdea />
      </div>
    );
  }
}

export default App;
