/* eslint-disable no-unused-vars */
module.exports = {
  listUsers: async function (req, res) {
    try {
      const users = await User.find({ select: ['id', 'email', 'username'] }); // Exclude sensitive datas
      return res.json(users);
    } catch (err) {
      console.error('Error retrieving user list:', err); // Log the actual error to console
      return res.status(500).json({ error: 'Could not retrieve user list', details: err.message });
    }
  }
};

