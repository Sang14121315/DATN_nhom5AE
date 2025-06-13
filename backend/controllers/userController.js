const UserService = require('../services/userService');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().allow(''),
  address: Joi.string().allow(''),
  role: Joi.string().valid('user', 'admin').default('user')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required()
});

exports.register = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await UserService.create(req.body);
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    const token = await UserService.login(email, password);
    const user = await UserService.getByEmail(email);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error logging in' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { error } = forgotPasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email } = req.body;
    await UserService.forgotPassword(email);
    res.json({ message: 'Đường dẫn đặt lại mật khẩu đã được gửi đến email của bạn' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error sending reset link' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { token, password } = req.body;
    await UserService.resetPassword(token, password);
    res.json({ message: 'Mật khẩu đã được đặt lại thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error resetting password' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { name, email, role } = req.query;
    const filters = {};
    if (name) filters.name = new RegExp(name, 'i');
    if (email) filters.email = new RegExp(email, 'i');
    if (role) filters.role = role;

    const users = await UserService.getAll(filters);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await UserService.update(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserService.delete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting user' });
  }
};
