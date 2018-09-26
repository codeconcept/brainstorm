import React, { Component } from 'react';
import firebase from './../services/firebase';

class AddIdea extends Component {
  state = {
    title: '',
    details: ''
  };

  handleTitleChange = e => {
    const title = e.target.value;
    this.setState({
      title
    });
  };

  handleDetailsChange = e => {
    const details = e.target.value;
    this.setState({
      details
    });
  };

  handleSumbit = e => {
    e.preventDefault();

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    
    const ideaRef = db.collection("ideas").add({
      title: this.state.title,
      details: this.state.details
    })
    .then(docRef => {
      console.log('docRef', docRef);
      this.setState({
        title: '',
        details: ''
      })
    })
    .catch(console.error);

    console.log('ideaRef', ideaRef);

  };

  render() { 
    return (
      <form onSubmit={this.handleSumbit}>
        <input type="text" name="title" id="title" placeholder="titre" value={this.state.title} onChange={this.handleTitleChange} />
        <input type="text" name="details" id="details" placeholder="détails" value={this.state.details} onChange={this.handleDetailsChange} />
        <button type="submit">ajouter</button>
      </form>
    );
  }
}
 
export default AddIdea;