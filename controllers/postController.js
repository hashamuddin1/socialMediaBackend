const { posts } = require("../models/post");
require("dotenv").config();
const { addPostValidate } = require("../utils/validations/userValidation");

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
      postImage: file.filename,
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

module.exports = { addPost };
