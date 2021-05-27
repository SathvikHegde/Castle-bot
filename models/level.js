const mongoose = require("mongoose");

const levelSchema = mongoose.Schema({
  userID: String,
  userName: String,
  serverID: String,
  messages: {type: Number, default: 0}
});

module.exports = mongoose.model("Level", levelSchema)