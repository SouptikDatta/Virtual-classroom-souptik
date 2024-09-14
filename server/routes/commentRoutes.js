const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:lectureId').post(protect, addComment).get(protect, getComments);

module.exports = router;