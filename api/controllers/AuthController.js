/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword }).fetch();
    res.status(201).json(user);
  },

  login: async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json(info);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  },
};

