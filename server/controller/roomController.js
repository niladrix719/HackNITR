const jwt = require("jsonwebtoken");
const { Room } = require("../model/room");

const createRoom = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const room_code = Math.random().toString(36).substring(7);
    const room = await new Room({
      room_code,
      creatorEmail: user.email,
    }).save();

    res.status(201).send({ room });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const joinRoom = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const room = await Room.findOne({ room_code: req.body.room_code });

    if (!room) {
      return res.status(404).send({ message: "Room not found" });
    }

    room.joinedUserEmail = user.email;
    await room.save();

    res.status(200).send({ room });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  createRoom,
  joinRoom,
};
