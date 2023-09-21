const db = require('../../database');

class ContactsReposory {
  async findAll({ orderBy = 'ASC' }) {
    const orderDirection = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT
        contacts.id, contacts.name, email, phone, category_id,
        categories.name AS category_name
      FROM
        contacts
      LEFT JOIN
        categories
      ON
        contacts.category_id = categories.id
      ORDER BY
        contacts.name ${orderDirection};
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT
        contacts.id, contacts.name, email, phone, category_id,
        categories.name AS category_name
      FROM
        contacts
      LEFT JOIN
        categories
      ON
        contacts.category_id = categories.id
      WHERE contacts.id = $1
    `, [id]);

    return row;
  }

  async findByEmail(email) {
    const [contact] = await db.query(`
      SELECT id, name, email FROM contacts
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

  async destroy(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ContactsReposory();
