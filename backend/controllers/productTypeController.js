const Joi = require('joi');
const productTypeService = require('../services/productTypeService');

// Joi Schema
const productTypeSchema = Joi.object({
  name: Joi.string().required().min(1).max(100).trim(),
  image_url: Joi.string().allow(''),
});

// ✅ Lấy danh sách product type có hỗ trợ filter
exports.getProductTypes = async (req, res) => {
  try {
    const { name, category_id, startDate, endDate } = req.query;
    const filters = {};

    if (name) filters.name = new RegExp(name, 'i');
    if (category_id) filters.category_id = category_id;

    if (startDate || endDate) {
      filters.created_at = {};
      if (startDate) filters.created_at.$gte = new Date(startDate + 'T00:00:00.000Z');
      if (endDate) filters.created_at.$lte = new Date(endDate + 'T23:59:59.999Z');
    }

    const types = await productTypeService.getAll(filters);
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching product types' });
  }
};

exports.getProductTypeById = async (req, res) => {
  try {
    const type = await productTypeService.getById(req.params.id);
    if (!type) return res.status(404).json({ error: 'Không tìm thấy loại sản phẩm' });
    res.json(type);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching product type' });
  }
};

exports.uploadProductTypeImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filename = req.file.filename;
  const filePath = `/uploads/product-types/${filename}`;

  res.status(200).json({ filename, url: filePath });
};

exports.createProductType = async (req, res) => {
  try {
    console.log('=== CREATE PRODUCT TYPE ===');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    const { error } = productTypeSchema.validate(req.body);
    if (error) {
      console.log('Validation error:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    console.log('Validation passed, calling service...');
    const newType = await productTypeService.create(req.body);
    console.log('Service returned:', newType);
    res.status(201).json(newType);
  } catch (error) {
    console.log('Service error:', error.message);
    console.log('Full error:', error);
    console.log('Error stack:', error.stack);
    res.status(400).json({ error: error.message });
  }
};

exports.updateProductType = async (req, res) => {
  try {
    const { error } = productTypeSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updated = await productTypeService.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProductType = async (req, res) => {
  try {
    await productTypeService.delete(req.params.id);
    res.json({ message: 'Đã xóa loại sản phẩm' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


