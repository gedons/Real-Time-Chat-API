/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  // Remove "Bearer " from the token
  const bearerToken = token.split(' ')[1];

  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user data to the request
    return proceed(); // Allow the request to continue
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
