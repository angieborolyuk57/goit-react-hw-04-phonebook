import React, { Component } from 'react';
import css from './ContactList.module.css';
import { nanoid } from 'nanoid';

class ContactsList extends Component {
  state = {
    contacts: [],
    name: '',
    telephone: '',
    submitted: false,
    searchName: '',
    displayedContacts: []
  };


  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  };

  handleAddContact = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });

    if (!this.state.name || !this.state.telephone) {
        // Display an error message or handle the empty values as needed
        alert("Please enter both name and phone number");
        return;
      }

      if (this.state.contacts.some((contact) => contact.name === this.state.name)) {
        alert(`${this.state.name} already exists in contacts and cannot be added.`);
        return;
      }

    // Create a new contact object with a unique ID using nanoid
    const newContact = {
      id: nanoid(),
      name: this.state.name,
      telephone:this.state.telephone,
    };

    // Update the contacts array in the state
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      name: '' ,// Clear the input field after adding a contact
      telephone: '',
      submitted: false
    
    }));
  };

  handleDeleteContact = (id) => {
    // Filter out the contact with the specified ID
    const updatedContacts = this.state.contacts.filter((contact) => contact.id !== id);

    // Update the contacts array in the state
    this.setState({
      contacts: updatedContacts,
    });
  };

  handleSearchContact = () => {
    // Filter contacts based on the searchName
    const filteredContacts = this.state.contacts.filter(
      (contact) => contact.name.toLowerCase().includes(this.state.searchName.toLowerCase())
    );

    // Update the contacts array in the state with the filtered contacts
    this.setState({
      contacts: filteredContacts,
    });
  };


  render() {
    return (
      <div>
        <form className={css.form}>
        <label> Name
  <input
    id={nanoid()} // Generate a unique ID for the input field
    className={`${css.input} ${this.state.submitted && !this.state.name && css.error}`}
    type="text"
    name="name"
    value={this.state.name}
    onChange={this.handleInputChange}
    required
  />
</label>
<label> Phone number
<input
  id={nanoid()}
  className={`${css.input} ${this.state.submitted && !this.state.telephone && css.error}`}
  type="number"
  name="telephone"
  value={this.state.telephone}
  onChange={this.handleInputChange}
  required
/>
</label>
        </form>
        <button className={css.addBtn} onClick={this.handleAddContact}>
            Add contact
          </button>

          <div className={css.contactList}>
          <h2>Contact List: </h2>
          <div className={css.searchPanel}>
          <label>
            Find contact by name
            <input
              id={nanoid()}
              className={css.input}
              type="text"
              name="searchName"
              value={this.state.searchName}
              onChange={this.handleInputChange}
            />
          </label>
          <button 
          className={css.addBtn} 
          onClick={this.handleSearchContact}
          >Search</button>
          </div>

          <ul>
            {this.state.contacts.map((contact) => (
              <li className={css.contactItem}
              key={contact.id}>
                {contact.name} {contact.telephone}
                <button className={css.deleteBtn} onClick={() => this.handleDeleteContact(contact.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ContactsList;
