const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const { authMiddleware } = require('../middleware/auth');

// List all parking spaces (with filters)
router.get('/', parkingController.listParkingSpaces);
// Get parking space by ID
router.get('/:id', parkingController.getParkingSpaceById);
// Create new parking space (admin/owner only)
router.post('/', authMiddleware, parkingController.createParkingSpace);
// Update parking space (admin/owner only)
router.put('/:id', authMiddleware, parkingController.updateParkingSpace);
// Delete parking space (admin/owner only)
router.delete('/:id', authMiddleware, parkingController.deleteParkingSpace);
// Search parking spaces by location
router.get('/search/nearby', parkingController.searchNearbyParkingSpaces);

module.exports = router; 