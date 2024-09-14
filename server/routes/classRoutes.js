const express = require('express');
const { createClass, getClasses, getClassById, enrollStudent, addUnit } = require('../controllers/classController');
const { protect, instructorAuth } = require('../middleware/authMiddleware');
const router = express.Router();

// Route definitions
router.route('/').get(protect, getClasses).post(protect, instructorAuth, createClass);
router.route('/:classId').get(protect, getClassById);
router.route('/:classId/enroll').post(protect, enrollStudent);
router.post('/:classId/units', addUnit);

module.exports = router;
