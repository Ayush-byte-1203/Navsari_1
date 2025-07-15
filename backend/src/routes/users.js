const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

// Get user profile
router.get('/me', authMiddleware, userController.getProfile);
// Update user profile
router.put('/me', authMiddleware, userController.updateProfile);
// Add vehicle
router.post('/me/vehicles', authMiddleware, userController.addVehicle);
// Remove vehicle
router.delete('/me/vehicles/:vehicleNumber', authMiddleware, userController.removeVehicle);

module.exports = router; 