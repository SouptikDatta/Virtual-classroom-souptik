// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, password }); // Debugging

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found'); // Debugging
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials'); // Debugging
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration
    );

    res.status(200).json({ token, role: user.role }); // Send token and role
  } catch (error) {
    console.error('Login error:', error); // Debugging
    res.status(500).json({ error: 'Server error' });
  }
};


const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Perform user creation logic
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Signup failed' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
};

module.exports = { signup, login, getUserProfile };