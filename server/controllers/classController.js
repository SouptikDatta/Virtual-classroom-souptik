const Class = require('../models/Class');
const User = require('../models/User');

// Create new class (Instructor only)
const createClass = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log('Received data:', { title, description }); 
    if (!title) {
      return res.status(400).json({ message: 'Class title is required' });
    }
    const newClass = await Class.create({
      title,
      description,
      instructor: req.user._id
    });
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Create class error:', error); // Added logging for debugging
    res.status(500).json({ message: error.message });
  }
};


// Get all classes (Instructor/Student)
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('instructor').populate('enrolledStudents');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a class by ID
const getClassById = async (req, res) => {
  try {
    const classId = req.params.classId;
    const singleClass = await Class.findById(classId).populate('units').populate('enrolledStudents');
    res.json(singleClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enroll a student in a class
const enrollStudent = async (req, res) => {
  try {
    const classId = req.params.classId;
    const student = req.user;

    const classToEnroll = await Class.findById(classId);

    if (classToEnroll.enrolledStudents.includes(student._id)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    classToEnroll.enrolledStudents.push(student._id);
    await classToEnroll.save();

    student.enrolledClasses.push(classId);
    await student.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUnit = async (req, res) => {
  try {
    const classId = req.params.classId;
    const { title } = req.body;
    // Logic to add a unit to the specified class
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { units: { title } } },
      { new: true }
    );
    res.status(201).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createClass, getClasses, getClassById, enrollStudent, addUnit };
