import React, { Component } from 'react';
import './App.css';
import AddIdea from './components/AddIdea';
import firebase from './services/firebase';

class App extends Component {

  constructor (props) {
    super(props);
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true
    });
  }

  handleAddIdea = (idea) => {
    const ideaRef = this.db.collection("ideas").add({
      title: idea.title,
      details: idea.details
    })
    .then(docRef => {
      console.log('docRef', docRef);
    })
    .catch(console.error);

    console.log('ideaRef', ideaRef);
  };

  render() {
    return (
      <div className="App">
        <h1>Brainstorm app!</h1>
        <AddIdea addIdea={this.handleAddIdea} />
      </div>
    );
  }
}

export default App;
