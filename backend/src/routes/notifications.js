const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/auth');

// List notifications for user
router.get('/', authMiddleware, notificationController.listUserNotifications);
// Mark notification as read
router.put('/:id/read', authMiddleware, notificationController.markAsRead);

module.exports = router; 