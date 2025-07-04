const CategoryService = require('../services/categoryService');
const Joi = require('joi');

const categorySchema = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  parent: Joi.string().allow(null, '') 
});

const CategoryService = require('../services/categoryService');

exports.getCategories = async (req, res) => {
  try {
    const { name, parent, startDate, endDate } = req.query;
    const filters = {};

    if (name) filters.name = new RegExp(name, 'i');
    if (parent) {
      filters.parent = parent === 'null' ? null : parent; // Xử lý parent=null
    }
    if (startDate || endDate) filters.created_at = {};
    if (startDate) filters.created_at.$gte = new Date(startDate + 'T00:00:00.000Z'); // Thêm múi giờ
    if (endDate) filters.created_at.$lte = new Date(endDate + 'T23:59:59.999Z'); // Bao gồm cả ngày cuối

    console.log('Filters:', filters); // Debug bộ lọc
    const categories = await CategoryService.getAll(filters);
    console.log('Categories:', categories); // Debug danh mục trả về
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: error.message || 'Error fetching categories' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await CategoryService.getById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching category' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const category = await CategoryService.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating category' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const category = await CategoryService.update(req.params.id, req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating category' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await CategoryService.delete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting category' });
  }
};
