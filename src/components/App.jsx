import React, { Component } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
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
