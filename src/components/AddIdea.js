import React, { Component } from 'react';

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

  handleSubmit = e => {
    e.preventDefault();    
    this.props.addIdea(this.state);
    this.setState({
      title: '',
      details: ''
    });
  };

  render() { 
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="title" id="title" placeholder="titre" value={this.state.title} onChange={this.handleTitleChange} />
        <input type="text" name="details" id="details" placeholder="détails" value={this.state.details} onChange={this.handleDetailsChange} />
        <button type="submit">ajouter</button>
      </form>
    );
  }
}
 
export default AddIdea;