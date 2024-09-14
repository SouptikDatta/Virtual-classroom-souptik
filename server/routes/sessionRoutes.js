const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Create a new session
router.post('/', async (req, res) => {
  try {
    const newSession = new Session(req.body);
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get session by ID
router.get('/:id', async (req, res) => {
  try {
    const sessionData = await Session.findById(req.params.id)
      .populate('lectures')
      .populate('unit')
      .exec();
    res.json(sessionData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a session
router.put('/:id', async (req, res) => {
  try {
    const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a session
router.delete('/:id', async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
