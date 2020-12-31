import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: '',
      message: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getNotes = this.getNotes.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const {message} = this.state;
    await axios.post(
      'https://ahidfnv1wk.execute-api.us-west-2.amazonaws.com/prod/SaveNotes/', {
      'note_text': message}
    ).then((response) => {
  console.log(response);
}, (error) => {
  console.log(error);
});
  }

  async getNotes(event) {
    event.preventDefault();
    await axios.get(
      'https://ahidfnv1wk.execute-api.us-west-2.amazonaws.com/prod/SaveNotes/'
    ).then((response) => {
  console.log(response);
  this.setState({['notes'] : JSON.stringify(response.data)});
}, (error) => {
  console.log(error);
});
  }

  render() {
    return (
      <div>
      <h1>Input your note to be saved</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Input note:</label>
          <textarea
            type="text"
            name="message"
            onChange={this.handleChange}
            value={this.state.message}
          />
          <button type="submit">Save Note</button>
        </form>
        <form onSubmit={this.getNotes}>
          <label>notes</label>
          <textarea
            type="text"
            name="savedNotes"
            value={this.state.notes}
          />
          <button type="submit">Show my notes</button>
        </form>
      </div>
    );
  }
}
