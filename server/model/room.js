const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_code: {
    type: String,
    required: true,
    unique: true,
  },
  creatorEmail: {
    type: String,
    required: true,
  },
  joinedUserEmail: {
    type: String,
  }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = { Room };
