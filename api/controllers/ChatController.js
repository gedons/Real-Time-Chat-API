/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  sendMessage: async (req, res) => {
    const { sender, receiver, content } = req.body;
    const message = await Message.create({ sender, receiver, content }).fetch();

    // Broadcast message to the recipient
    sails.sockets.broadcast(receiver, 'messageReceived', message);
    return res.json(message);
  },
};


