/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  sendMessage: async function (req, res) {
    const { chatRoomId, sender, content } = req.body;

    // Find the chat room by ID
    let chatRoom = await ChatRoom.findOne({ id: chatRoomId });

    // If the chat room does not exist, create it (you need sender and receiver details)
    if (!chatRoom) {
      const { user1, user2 } = req.body; // Assuming user1 and user2 are sent in the request
      chatRoom = await ChatRoom.create({ user1, user2 }).fetch();
    }

    // Create the message in the identified or newly created chat room
    const message = await Message.create({ chatRoomId: chatRoom.id, sender, content }).fetch();

    // Broadcast the message to both users in the chat room
    sails.sockets.broadcast(chatRoom.id, 'messageReceived', message);
    return res.json(message);
  },
};


