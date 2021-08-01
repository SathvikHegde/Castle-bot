const mongoose = require("mongoose");

const emojiSchema = mongoose.Schema({
  emojiname: String,
  serverID: String,
  emojiID: String,
  displaystring: String,
  usage: {type: Number, default: 0}
});

module.exports = mongoose.model("Emoji", emojiSchema)