const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(_, response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(404).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName({ name });
    if (categoryExists) {
      return response.status(404).json({ error: 'This category already exists' });
    }

    const category = await CategoriesRepository.create({ name });

    response.send(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(404).json({ error: 'Name is required' });
    }

    const categoryById = await CategoriesRepository.findById(id);
    if (!categoryById) {
      return response.status(404).json({ error: 'Category not found' });
    }

    const category = await CategoriesRepository.update(id, { name });
    response.send(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.destroy(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
