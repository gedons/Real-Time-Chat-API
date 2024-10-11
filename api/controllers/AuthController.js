/* eslint-disable no-unused-vars */
/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = process.env.JWT_SECRET;


module.exports = {
  register: async function (req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      }).fetch();
      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(400).json({ error: 'User registration failed' });
    }
  },

  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Check if the email is provided
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Login failed due to server error' });
    }
  },
};

