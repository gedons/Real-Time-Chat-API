/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  sendMessage: async (req, res) => {
    const { message, userId } = req.body;

    // Broadcast message to all connected clients
    sails.sockets.broadcast('chat', {
      userId,
      message,
      createdAt: new Date(),
    });

    return res.status(200).json({ message: 'Message sent' });
  },
};


