/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// eslint-disable-next-line linebreak-style

module.exports = {

  joinRoom: async function (req, res) {
    if (!req.isSocket) {
      return res.badRequest({ error: 'Only WebSocket connections are allowed' });
    }

    const roomId = req.param('roomId');
    req.socket.join(roomId); // Join the WebSocket room
    return res.json({ message: 'Joined room ' + roomId });
  },

  sendMessage: async function (req, res) {
    if (!req.isSocket) {
      return res.badRequest({ error: 'Only WebSocket connections are allowed' });
    }

    const { message, roomId } = req.body;
    const user = req.socket.handshake.user;

    // Broadcast the message to everyone in the room
    sails.sockets.broadcast(roomId, 'newMessage', {
      message,
      user: user.userId,
      timestamp: new Date()
    });

    // Optionally, save the message to MongoDB (Chat model)
    await Chat.create({
      message,
      user: user.userId,
      roomId
    });

    return res.ok();
  },

  getMessages: async function (req, res) {
    const roomId = req.param('roomId');
    const messages = await Chat.find({ roomId }).sort('createdAt DESC').limit(50);
    return res.json(messages);
  }


};


