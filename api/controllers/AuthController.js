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
      const user = await User.findOne({ email });

      // eslint-disable-next-line curly
      if (!user) return res.status(404).json({ error: 'User not found' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {return res.status(401).json({ error: 'Invalid credentials' });}

      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ error: 'Login failed' });
    }
  },
};

