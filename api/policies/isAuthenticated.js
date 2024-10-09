const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = async function (req, res, proceed) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    // eslint-disable-next-line no-trailing-spaces
    return proceed();
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
