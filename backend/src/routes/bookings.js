const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/auth');

// List bookings for user
router.get('/', authMiddleware, bookingController.listUserBookings);
// Create a new booking
router.post('/', authMiddleware, bookingController.createBooking);
// Get booking by ID
router.get('/:id', authMiddleware, bookingController.getBookingById);
// Update booking (e.g., cancel, complete)
router.put('/:id', authMiddleware, bookingController.updateBooking);
// Cancel booking
router.delete('/:id', authMiddleware, bookingController.cancelBooking);

module.exports = router; 