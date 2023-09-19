const { v4 } = require('uuid');
const db = require('../../database');

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
  async findAll({ orderBy = 'ASC' }) {
    const fields = 'id, name, email, phone, category_id';
    const orderDirection = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT ${fields} FROM contacts ORDER BY name ${orderDirection};
    `);

    return rows;
  }

  async findById(id) {
    const fields = 'id, name, email, phone, category_id';
    const [row] = await db.query(`
      SELECT ${fields} FROM contacts
      WHERE id = $1
    `, [id]);

    return row;
  }

  async findByEmail(email) {
    const fields = 'id, name, email, phone, category_id';
    const [contact] = await db.query(`
      SELECT ${fields} FROM contacts
      WHERE email = $1
    `, [email]);

    return contact;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts (name, email, phone, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [name, email, phone, category_id]);

    return row;
  }

  async edit(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts SET
      name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *;
    `, [name, email, phone, category_id, id]);

    return row;
  }

  destroy(id) {
    const newContacts = contacts.filter((current) => current.id !== id);
    contacts = newContacts;

    return new Promise((resolve) => { resolve(); });
  }
}

module.exports = new ContactsReposory();
