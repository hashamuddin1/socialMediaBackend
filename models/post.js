const mongoose = require("mongoose");

const post_schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
    required: true,
  },
});

//creating collection
const posts = new mongoose.model("posts", post_schema);

//export collection
module.exports = { posts };
