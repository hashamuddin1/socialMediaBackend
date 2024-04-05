/* eslint-disable new-cap */
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
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

const Posts = new mongoose.model('posts', postSchema);

module.exports = { Posts };
