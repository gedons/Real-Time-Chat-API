/**
 * ChatRoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  join: async function (req, res) {
    const { user1, user2 } = req.body;

    // Check if the chat room already exists
    let chatRoom = await ChatRoom.findOne({
      where: {
        or: [
          { user1, user2 },
          { user1: user2, user2: user1 }
        ]
      }
    });

    if (!chatRoom) {
      // Create a new chat room if it doesn't exist
      chatRoom = await ChatRoom.create({ user1, user2 }).fetch();
    }

    return res.json(chatRoom);
  },
};


