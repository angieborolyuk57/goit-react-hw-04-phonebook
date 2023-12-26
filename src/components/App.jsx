import React, { Component } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleAddContact = (newContact) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = (id) => {
    const updatedContacts = this.state.contacts.filter((contact) => contact.id !== id);
    this.setState({
      contacts: updatedContacts,
    });
  };

  render() {
    return (
      <div>
        <ContactForm onAddContact={this.handleAddContact}
        contacts={this.state.contacts}  />
        <Filter
          filter={this.state.filter}
          onInputChange={this.handleInputChange}
        />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
