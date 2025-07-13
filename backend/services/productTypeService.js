const ProductType = require('../models/ProductType');

exports.getAll = async (filters = {}) => {
  const result = await ProductType.find(filters);
  console.log('Getting all product types, count:', result.length);
  return result;
};

exports.getById = async (id) => {
  return await ProductType.findById(id);
};

exports.create = async (data) => {
  console.log('Creating product type with data:', data);
  
  // Check if name already exists
  const exists = await ProductType.findOne({ name: data.name });
  if (exists) {
    console.log('Name already exists:', data.name);
    throw new Error('Tên loại sản phẩm đã tồn tại');
  }

  // Auto generate slug from name
  const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  const newType = new ProductType({
    ...data,
    slug: slug
  });
  const saved = await newType.save();
  console.log('Created product type:', saved);
  return saved;
};

exports.update = async (id, data) => {
  const updated = await ProductType.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Không tìm thấy loại sản phẩm');
  return updated;
};

exports.delete = async (id) => {
  const deleted = await ProductType.findByIdAndDelete(id);
  if (!deleted) throw new Error('Không tìm thấy loại sản phẩm');
  return deleted;
};
