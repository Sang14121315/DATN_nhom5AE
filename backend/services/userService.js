const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  static async getAll(filters = {}) {
    return await User.find(filters);
  }

  static async getById(id) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  static async getByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    return user;
  }

  static async create({ name, email, password, phone, address, role }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return await User.create({ name, email, password: hashedPassword, phone, address, role });
  }

  static async update(id, data) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) throw new Error('User not found');
    return user;
  }

  static async delete(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    return true;
  }

  static async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}

module.exports = UserService;