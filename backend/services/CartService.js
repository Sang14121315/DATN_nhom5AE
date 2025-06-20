const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CartService {
  static async addItem(userId, { product_id, quantity }) {
    const product = await Product.findById(product_id);
    if (!product) throw new Error('Product not found');
    if (product.stock < quantity) throw new Error('Insufficient stock');

    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      cart = await Cart.create({
        user_id: userId,
        items: [{ product_id, quantity, price: product.price }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product_id, quantity, price: product.price });
      }
      cart.updated_at = Date.now();
      await cart.save();
    }

    return cart;
  }

  static async getCart(userId) {
  try {
    const cart = await Cart.findOne({ user_id: userId }).populate({
      path: 'items.product_id',
      select: '_id name price img_url', // Chỉ lấy các trường cần thiết
    });
    if (!cart) {
      return { user_id: userId, items: [] };
    }
    // Lọc các item có product_id không hợp lệ
    cart.items = cart.items.filter(
      (item) => item.product_id && item.product_id._id && item.product_id.name
    );
    await cart.save(); // Cập nhật giỏ hàng sau khi lọc
    return cart;
  } catch (error) {
    console.error('Error in getCart:', error);
    throw new Error('Lỗi khi lấy giỏ hàng');
  }
}

  static async updateItem(userId, { product_id, quantity }) {
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) throw new Error('Cart not found');

    const product = await Product.findById(product_id);
    if (!product) throw new Error('Product not found');
    if (quantity > product.stock) throw new Error('Insufficient stock');

    const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
    if (itemIndex === -1) throw new Error('Item not found in cart');

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].price = product.price;
    }
    cart.updated_at = Date.now();
    await cart.save();

    return cart;
  }

  static async removeItem(userId, product_id) {
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(item => item.product_id.toString() !== product_id);
    cart.updated_at = Date.now();
    await cart.save();

    return cart;
  }

  static async clearCart(userId) {
    await Cart.deleteOne({ user_id: userId });
    return { user_id: userId, items: [] };
  }
}

module.exports = CartService;