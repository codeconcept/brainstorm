import React, { Component } from 'react';
import './App.css';
import AddIdea from './components/AddIdea';
import firebase from './services/firebase';
import IdeaList from './components/IdeaList';

class App extends Component {
  state = {
    ideas: []
  }

  constructor (props) {
    super(props);
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true
    });
  }

  componentDidMount() {
    this.db.collection('ideas').onSnapshot(snapshop => {
      let changes = snapshop.docChanges();
      changes.map(change => {
        if (change.type === 'added') {
          let doc = {
            ...change.doc.data(),
            id: change.doc.id
          }
          this.setState({
            ideas: [doc, ...this.state.ideas]
          });
        }
      })
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
        <IdeaList ideas={this.state.ideas} />
      </div>
    );
  }
}

export default App;
