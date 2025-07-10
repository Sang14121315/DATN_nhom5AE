const ProductService = require('../services/productService');
const Joi = require('joi');

const productSchema = Joi.object({
  slug: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  img_url: Joi.string().allow(''),
  category_id: Joi.string().required(),
  sale: Joi.boolean(),
  view: Joi.number(),
  hot: Joi.boolean(),
  coupons_id: Joi.string().allow(''),
  brand_id: Joi.string().required(),
  product_type_id: Joi.string().required(),
});

// ✅ GET: Lấy danh sách sản phẩm có filter + phân trang
exports.getProducts = async (req, res, next) => {
  try {
    const {
      name, category_id, brand_id,
      minPrice, maxPrice, sale, hot,
      sort, page = 1, limit = 10
    } = req.query;

    const filters = {};
    if (name) filters.name = new RegExp(name, 'i');
    if (category_id) filters.category_id = category_id;
    if (brand_id) filters.brand_id = brand_id;
    if (minPrice || maxPrice) filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);
    if (sale) filters.sale = sale === 'true';
    if (hot) filters.hot = hot === 'true';

    const skip = (Number(page) - 1) * Number(limit);
    const sortOption = sort === 'price_asc' ? { price: 1 }
                     : sort === 'price_desc' ? { price: -1 }
                     : sort === 'view_desc' ? { view: -1 }
                     : { created_at: -1 };

    const [products, total] = await Promise.all([
      ProductService.getAll(filters, Number(limit), sortOption, skip),
      ProductService.count(filters)
    ]);

    res.json({
      products,
      total,
      totalPages: Math.ceil(total / Number(limit))
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
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const img_url = req.file ? req.file.filename : '';
    const newProduct = await ProductService.create({ ...req.body, img_url });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// ✅ PUT: Cập nhật sản phẩm
exports.updateProduct = async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const img_url = req.file ? req.file.filename : req.body.img_url;
    const updated = await ProductService.update(req.params.id, { ...req.body, img_url });
    res.json(updated);
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

// ✅ GET: Tìm kiếm riêng biệt
exports.searchProducts = async (req, res, next) => {
  try {
    const { query, minPrice, maxPrice, sort } = req.query;
    const filters = {};
    if (query) filters.name = new RegExp(query, 'i');
    if (minPrice || maxPrice) filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);

    const sortOption = sort === 'price_asc' ? { price: 1 } : sort === 'price_desc' ? { price: -1 } : {};
    const products = await ProductService.getAll(filters, 0, sortOption);
    res.json(products);
  } catch (error) {
    next(error);
  }
};