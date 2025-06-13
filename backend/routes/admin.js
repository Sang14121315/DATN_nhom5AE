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
const messageController = require('../controllers/messageController');
const couponController = require('../controllers/couponController');
const contactController = require('../controllers/contactController');

// Admin routes
router.get('/users', adminAuth, userController.getUsers);
router.put('/users/:id', adminAuth, userController.updateUser);
router.delete('/users/:id', adminAuth, userController.deleteUser);

router.get('/products/manage', adminAuth, productController.getProducts);
router.post('/products/manage', adminAuth, upload.single('image'), productController.createProduct);

router.get('/orders/manage', adminAuth, orderController.getOrders);
router.put('/orders/:id/status', adminAuth, orderController.updateOrder);

// Admin routes: Notification Management
router.get('/notifications', auth, adminAuth, notificationController.getNotifications);
router.get('/notifications/:id', auth, adminAuth, notificationController.getNotificationById);
router.post('/notifications', auth, adminAuth, notificationController.createNotification);
router.put('/notifications/:id', auth, adminAuth, notificationController.updateNotification);
router.delete('/notifications/:id', auth, adminAuth, notificationController.deleteNotification);

// Admin Coupons
router.get('/coupons', auth, adminAuth, couponController.getCoupons);
router.get('/coupons/:id', auth, adminAuth, couponController.getCouponById);
router.post('/coupons', auth, adminAuth, couponController.createCoupon);
router.put('/coupons/:id', auth, adminAuth, couponController.updateCoupon);
router.delete('/coupons/:id', auth, adminAuth, couponController.deleteCoupon);

// Admin routes: Chat Management
router.get('/messages', auth, adminAuth, messageController.getConversation); // Lấy lịch sử chat với người dùng
router.post('/messages', auth, adminAuth, messageController.sendMessage); // Gửi tin nhắn đến người dùng
router.get('/users-for-chat', auth, adminAuth, userController.getUsers); // Lấy danh sách người dùng để chat

// Admin routes: Contact Management
router.get('/contacts', auth, adminAuth, contactController.getContacts);
router.put('/contacts/:id', auth, adminAuth, contactController.updateContact);

// Dashboard
router.get('/dashboard',  adminController.getDashboardData);

module.exports = router;