const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const brandController = require('../controllers/brandController');
const couponController = require('../controllers/couponController');
const orderController = require('../controllers/orderController');
const notificationController = require('../controllers/notificationController');
const messageController = require('../controllers/messageController');
const homeController = require('../controllers/homeController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Home
router.get('/home', homeController.getHomeData);

// Search
router.get('/search', auth, productController.searchProducts);

// Auth
router.post('/register', userController.register);
router.post('/login', userController.login);

// Products
router.get('/products',  productController.getProducts);
router.post('/products', auth, upload.single('image'), productController.createProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', auth, upload.single('image'), productController.updateProduct);
router.delete('/products/:id', auth, productController.deleteProduct);

// Categories
router.get('/categories', auth, categoryController.getCategories);
router.get('/categories/:id', auth, categoryController.getCategoryById);
router.post('/categories', auth, categoryController.createCategory);
router.put('/categories/:id', auth, categoryController.updateCategory);
router.delete('/categories/:id', auth, categoryController.deleteCategory);

// Brands
router.get('/brands', auth, brandController.getBrands);
router.get('/brands/:id', auth, brandController.getBrandById);
router.post('/brands', auth, upload.single('logo'), brandController.createBrand);
router.put('/brands/:id', auth, upload.single('logo'), brandController.updateBrand);
router.delete('/brands/:id', auth, brandController.deleteBrand);

//ProductType
router.get('/product-types', auth, productTypeController.getProductTypes);
router.get('/product-types/:id', auth, productTypeController.getProductTypeById);
router.post('/product-types', auth, productTypeController.createProductType);
router.put('/product-types/:id', auth, productTypeController.updateProductType);
router.delete('/product-types/:id', auth, productTypeController.deleteProductType);

// Coupons
router.get('/coupons', auth, couponController.getCoupons);
router.get('/coupons/:id', auth, couponController.getCouponById);
router.post('/coupons', auth, couponController.createCoupon);
router.put('/coupons/:id', auth, couponController.updateCoupon);
router.delete('/coupons/:id', auth, couponController.deleteCoupon);

// Orders
router.get('/orders', auth, orderController.getOrders);
router.get('/orders/:id', auth, orderController.getOrderById);
router.post('/orders', auth, orderController.createOrder);
router.put('/orders/:id', auth, orderController.updateOrder);
router.delete('/orders/:id', auth, orderController.deleteOrder);

// Notifications
router.get('/notifications', auth, notificationController.getNotifications);
router.get('/notifications/:id', auth, notificationController.getNotificationById);
router.post('/notifications', auth, notificationController.createNotification);
router.put('/notifications/:id', auth, notificationController.updateNotification);
router.delete('/notifications/:id', auth, notificationController.deleteNotification);

// Messages
router.get('/messages', auth, messageController.getConversation);
router.post('/messages', auth, messageController.sendMessage);
router.get('/admins', auth, messageController.getAdmins);

module.exports = router;
