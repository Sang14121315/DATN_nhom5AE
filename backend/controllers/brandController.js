const BrandService = require('../services/brandService');
const Joi = require('joi');

const brandSchema = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().required(),
  logo_url: Joi.string().allow('')
});

exports.getBrands = async (req, res) => {
  try {
    const { name } = req.query;
    const filters = {};
    if (name) filters.name = new RegExp(name, 'i');

    const brands = await BrandService.getAll(filters);
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching brands' });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const brand = await BrandService.getById(req.params.id);
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching brand' });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const { error } = brandSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const brand = await BrandService.create({ ...req.body, logo_url: req.file ? `/uploads/${req.file.filename}` : '' });
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating brand' });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { error } = brandSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const brand = await BrandService.update(req.params.id, { ...req.body, logo_url: req.file ? `/uploads/${req.file.filename}` : req.body.logo_url });
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating brand' });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    await BrandService.delete(req.params.id);
    res.json({ message: 'Brand deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting brand' });
  }
};