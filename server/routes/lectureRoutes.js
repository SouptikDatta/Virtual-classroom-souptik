const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');

// Create a new lecture
router.post('/', async (req, res) => {
  try {
    const newLecture = new Lecture(req.body);
    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get lecture by ID
router.get('/:id', async (req, res) => {
  try {
    const lectureData = await Lecture.findById(req.params.id)
      .populate('session')
      .exec();
    res.json(lectureData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a lecture
router.put('/:id', async (req, res) => {
  try {
    const updatedLecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLecture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a lecture
router.delete('/:id', async (req, res) => {
  try {
    await Lecture.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
