const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Mateus',
    email: 'mateus@mail.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: 'fixedIdForJoao',
    name: 'João',
    email: 'joao@mail.com',
    phone: '456456456',
    category_id: v4(),
  },
];

class ContactsReposory {
  findAll() {
    return new Promise((resolve) => { resolve(contacts); });
  }

  findById(id) {
    const contact = contacts.find((current) => current.id === id);

    return new Promise((resolve) => { resolve(contact); });
  }

  findByEmail(email) {
    const contact = contacts.find((current) => current.email === email);

    return new Promise((resolve) => { resolve(contact); });
  }

  destroy(id) {
    const newContacts = contacts.filter((current) => current.id !== id);
    contacts = newContacts;

    return new Promise((resolve) => { resolve(); });
  }

  create({
    name, email, phone, category_id,
  }) {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
      category_id,
    };

    contacts.push(newContact);

    return new Promise((resolve) => { resolve(newContact); });
  }

  async edit(id, {
    name, email, phone, category_id,
  }) {
    const contact = await this.findById(id);
    const updatedContact = {
      ...contact, name, email, phone, category_id,
    };

    contacts = contacts.map((current) => (
      current.id === id ? updatedContact : current
    ));

    return new Promise((resolve) => { resolve(updatedContact); });
  }
}

module.exports = new ContactsReposory();
