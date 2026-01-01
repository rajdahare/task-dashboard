const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

// Validation middleware
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

// Routes
router.get('/', protect, getProfile);
router.put('/', protect, updateProfileValidation, updateProfile);

module.exports = router;

