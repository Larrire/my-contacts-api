const ContactsRepository = require('../repositories/ContactsRepository');

const errors = {
  notFound: 'Contact not found',
  params: {
    emailTaken: 'This email has already been taken',
    required: {
      name: 'Name is required',
    },
  },
};

class ContactController {
  async index(_, response) {
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not found
      return response.status(404).json({ error: errors.notFound });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: errors.params.required.name });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: errors.params.emailTaken });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    // name param validation
    if (!name) {
      return response.status(400).json({ error: errors.params.required.name });
    }

    // Checking if the contact exists
    const contactById = await ContactsRepository.findById(id);
    if (!contactById) {
      return response.status(404).json({ error: errors.notFound });
    }

    if (email !== contactById.email) {
      // Checking if the new email is already been used
      const contactByEmail = await ContactsRepository.findByEmail(email);

      if (contactByEmail) {
        return response.status(400).json({ error: errors.params.emailTaken });
      }
    }

    const contact = await ContactsRepository.edit(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not found
      return response.status(404).json({ error: errors.notFound });
    }

    await ContactsRepository.destroy(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();
