const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// List all users
router.get('/users', authMiddleware, adminMiddleware, adminController.listUsers);
// List all parking spaces
router.get('/parking', authMiddleware, adminMiddleware, adminController.listParkingSpaces);
// List all bookings
router.get('/bookings', authMiddleware, adminMiddleware, adminController.listBookings);
// Analytics
router.get('/analytics', authMiddleware, adminMiddleware, adminController.analytics);

module.exports = router; 