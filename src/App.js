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
      changes.forEach(change => {
        if (change.type === 'added') {
          let doc = {
            ...change.doc.data(),
            id: change.doc.id
          }
          this.setState({
            ideas: [doc, ...this.state.ideas]
          });
        }
      });
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

  handleIdeaDelete = (idea) => {
    let ideas = [...this.state.ideas];
    ideas = ideas.filter(obj => obj.id !== idea.id);
    this.setState({
      ideas
    });
    this.db.collection('ideas').doc(idea.id).delete().catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Brainstorm app!</h1>
        <AddIdea addIdea={this.handleAddIdea} />
        <IdeaList ideas={this.state.ideas} onDelete={(idea) => this.handleIdeaDelete(idea)} />
      </div>
    );
  }
}

export default App;
