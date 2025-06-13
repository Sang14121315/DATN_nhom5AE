const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  static async getAll(filters = {}) {
    return await User.find(filters).select('-password');
  }

  static async getById(id) {
    const user = await User.findById(id).select('-password');
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

    const newUser = await User.create({
      name, email, password: hashedPassword, phone, address, role
    });

    const userObj = newUser.toObject();
    delete userObj.password;
    return userObj;
  }

  static async update(id, data) {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  }

  static async delete(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    return true;
  }

  static async login(email, password) {
    if (!process.env.JWT_SECRET) throw new Error('Missing JWT_SECRET');

    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}

module.exports = UserService;
