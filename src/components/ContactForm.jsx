import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactList.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    submitted: false,
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleAddContact = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });

    if (!this.state.name || !this.state.number) {
      alert('Please enter both name and phone number');
      return;
    }

    if (this.props.contacts.some((contact) => contact.name === this.state.name)) {
      alert(`${this.state.name} already exists in contacts and cannot be added.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.onAddContact(newContact);

    this.setState({
      name: '',
      number: '',
      submitted: false,
    });
  };

  render() {
    return (
      <form className={css.form}>
        <label className={css.label}>
          Name
          <input
            id={nanoid()}
            className={`${css.input} ${this.state.submitted && !this.state.name && css.error}`}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          Phone number
          <input
            id={nanoid()}
            className={`${css.input} ${this.state.submitted && !this.state.number && css.error}`}
            type="number"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <button className={css.addBtn} onClick={this.handleAddContact}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
