const ProductService = require('../services/productService');
const Joi = require('joi');

// Joi Schema kiểm tra dữ liệu sản phẩm
const productSchema = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  img_url: Joi.string().allow(''),
  category_id: Joi.string().required(),
  sale: Joi.boolean().default(false),
  view: Joi.number().default(0),
  hot: Joi.boolean().default(false),
  coupons_id: Joi.string().allow(''),
  brand_id: Joi.string().required(),
  product_type_id: Joi.string().required(),
});

// ✅ Helpers
const parseBoolean = (value) => value === 'true' || value === true;
const parseNumber = (value) => (value !== undefined ? Number(value) : undefined);

const validateData = (data, res) => {
  const { error, value } = productSchema.validate(data);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return null;
  }
  return value;
};

// ✅ GET: Lấy danh sách sản phẩm có filter + phân trang
exports.getProducts = async (req, res, next) => {
  try {
    const {
      name, category_id, brand_id,
      minPrice, maxPrice, sale, hot,
      sort, page = 1, limit = 10,
    } = req.query;

    const filters = {};
    if (name) filters.name = new RegExp(name, 'i');
    if (category_id) filters.category_id = category_id;
    if (brand_id) filters.brand_id = brand_id;
    if (minPrice || maxPrice) filters.price = {};
    if (minPrice) filters.price.$gte = parseNumber(minPrice);
    if (maxPrice) filters.price.$lte = parseNumber(maxPrice);
    if (sale !== undefined) filters.sale = parseBoolean(sale);
    if (hot !== undefined) filters.hot = parseBoolean(hot);

    const sortOption = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      view_desc: { view: -1 },
    }[sort] || { created_at: -1 };

    const skip = (parseNumber(page) - 1) * parseNumber(limit);

    const [products, total] = await Promise.all([
      ProductService.getAll(filters, parseNumber(limit), sortOption, skip),
      ProductService.count(filters),
    ]);

    res.json({
      products,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

// ✅ GET: Lấy chi tiết sản phẩm theo ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await ProductService.getById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// ✅ POST: Tạo mới sản phẩm
exports.createProduct = async (req, res, next) => {
  try {
    const rawData = {
      ...req.body,
      price: parseNumber(req.body.price),
      stock: parseNumber(req.body.stock),
      sale: parseBoolean(req.body.sale),
      hot: parseBoolean(req.body.hot),
      view: parseNumber(req.body.view) || 0,
    };

    const data = validateData(rawData, res);
    if (!data) return;

    const img_url = req.file ? req.file.filename : '';
    const newProduct = await ProductService.create({ ...data, img_url });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// ✅ PUT: Cập nhật sản phẩm
exports.updateProduct = async (req, res, next) => {
  try {
    const rawData = {
      ...req.body,
      price: parseNumber(req.body.price),
      stock: parseNumber(req.body.stock),
      sale: parseBoolean(req.body.sale),
      hot: parseBoolean(req.body.hot),
      view: parseNumber(req.body.view) || 0,
    };

    const data = validateData(rawData, res);
    if (!data) return;

    const img_url = req.file ? req.file.filename : req.body.img_url;
    const updatedProduct = await ProductService.update(req.params.id, { ...data, img_url });

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// ✅ DELETE: Xóa sản phẩm
exports.deleteProduct = async (req, res, next) => {
  try {
    await ProductService.delete(req.params.id);
    res.json({ message: 'Đã xóa sản phẩm' });
  } catch (error) {
    next(error);
  }
};

// ✅ GET: Tìm kiếm đơn giản (không phân trang)
exports.searchProducts = async (req, res, next) => {
  try {
    const { query, minPrice, maxPrice, sort } = req.query;

    const filters = {};
    if (query) filters.name = new RegExp(query, 'i');
    if (minPrice || maxPrice) filters.price = {};
    if (minPrice) filters.price.$gte = parseNumber(minPrice);
    if (maxPrice) filters.price.$lte = parseNumber(maxPrice);

    const sortOption = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
    }[sort] || {};

    const products = await ProductService.getAll(filters, 0, sortOption);
    res.json(products);
  } catch (error) {
    next(error);
  }
};