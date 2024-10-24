const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Sign Up
const signup = async (req, res) => {
  const { username, email, password } = req.body; 
  
  // Check if user or email already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  
  const existingEmail = await User.findOne({ email }); // Check email uniqueness
  if (existingEmail) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  
  res.status(201).json({ message: 'User created' });
};

// Sign In
const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully!', token, thresholds: user.thresholds });
};

module.exports = { signin, signup };