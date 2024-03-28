const { posts } = require("../models/post");
require("dotenv").config();
const { addPostValidate } = require("../utils/validations/userValidation");
const mongoose = require("mongoose");

const addPost = async (req, res) => {
  try {
    const { error } = await addPostValidate.validateAsync(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }

    const insertPost = new posts({
      description: req.body.description,
      userId: req.user._id,
      postImage: req.body.postImage,
    });

    await insertPost.save();

    return res.status(201).send({
      success: true,
      message: "Post Inserted Successfully",
      data: insertPost,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong on inserting post",
    });
  }
};

const getMyPost = async (req, res) => {
  try {
    const fetchAllPost = await posts.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user._id),
        },
      },
    ]);

    return res.status(200).send({
      success: true,
      message: "Fetch All Post By User Successfully",
      data: fetchAllPost,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong on inserting post",
    });
  }
};

module.exports = { addPost, getMyPost };
