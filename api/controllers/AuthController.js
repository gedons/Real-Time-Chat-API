/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  register: async function (req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword }).fetch();
    return res.status(201).json({ id: user.id, username: user.username });
  },

  login: async function (req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, 'wyefuyvevwuevfuwvewueyvfwelos', { expiresIn: '1h' });
    return res.json({ token });
  },
};
