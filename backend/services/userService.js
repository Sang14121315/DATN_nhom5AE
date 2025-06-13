const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

  static async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email not found');

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Đặt lại mật khẩu',
      text: `Nhấn vào liên kết để đặt lại mật khẩu: ${resetLink}`
    });

    return { message: 'Đường dẫn đặt lại mật khẩu đã được gửi' };
  }

  static async resetPassword(token, newPassword) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('User not found');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Mật khẩu đã được đặt lại thành công' };
  }
}

module.exports = UserService;