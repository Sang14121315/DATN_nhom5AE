const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const adminAuth = require('../middleware/adminAuth');
const notificationController = require('../controllers/notificationController');

// Admin routes
router.get('/users', adminAuth, userController.getUsers);
router.put('/users/:id', adminAuth, userController.updateUser);
router.delete('/users/:id', adminAuth, userController.deleteUser);

router.get('/products/manage', adminAuth, productController.getProducts);
router.post('/products/manage', adminAuth, upload.single('image'), productController.createProduct);

router.get('/orders/manage', adminAuth, orderController.getOrders);
router.put('/orders/:id/status', adminAuth, orderController.updateOrder);

router.get('/notifications', notificationController.getNotifications);
router.get('/notifications/:id', adminAuth, notificationController.getNotificationById);
router.post('/notifications', adminAuth, notificationController.createNotification);
router.put('/notifications/:id', adminAuth, notificationController.updateNotification);
router.delete('/notifications/:id', adminAuth, notificationController.deleteNotification)

// Dashboard
router.get('/dashboard',  adminController.getDashboardData);

module.exports = router;