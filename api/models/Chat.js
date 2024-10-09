module.exports = {
  attributes: {
    message: { type: 'string', required: true },
    user: { model: 'user', required: true }, // Refers to User model
    roomId: { type: 'string', required: true }
  }
};
