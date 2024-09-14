const express = require('express');
const router = express.Router();
const Unit = require('../models/Unit');

// Create a new unit
router.post('/:classId/units', async (req, res) => {
  try {
    const { title } = req.body;  // Expecting a title, adjust if needed
    const classId = req.params.classId;  // Get the classId from URL parameters

    // Validate the classId if necessary
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: 'Invalid class ID' });
    }

    const newUnit = new Unit({
      title,
      class: classId,  // Assuming each unit belongs to a class
    });

    await newUnit.save();
    res.status(201).json(newUnit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get unit by ID
router.get('/:id', async (req, res) => {
  try {
    const unitData = await Unit.findById(req.params.id)
      .populate('sessions')
      .populate('class')
      .exec();
    res.json(unitData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a unit
router.put('/:id', async (req, res) => {
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUnit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a unit
router.delete('/:id', async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
