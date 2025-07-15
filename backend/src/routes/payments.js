const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/auth');

// List payments for user
router.get('/', authMiddleware, paymentController.listUserPayments);
// Initiate payment
router.post('/initiate', authMiddleware, paymentController.initiatePayment);
// Verify payment
router.post('/verify', authMiddleware, paymentController.verifyPayment);
// Get payment by ID
router.get('/:id', authMiddleware, paymentController.getPaymentById);

module.exports = router; 