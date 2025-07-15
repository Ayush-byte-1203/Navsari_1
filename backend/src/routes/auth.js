const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.post('/register', authController.register);
// Login
router.post('/login', authController.login);
// Logout
router.post('/logout', authController.logout);
// Verify user (email/phone)
router.post('/verify', authController.verifyUser);
// Forgot password
router.post('/forgot-password', authController.forgotPassword);
// Reset password
router.post('/reset-password', authController.resetPassword);

module.exports = router; 