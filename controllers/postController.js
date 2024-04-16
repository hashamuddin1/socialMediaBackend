/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { Posts } = require('../models/post');
require('dotenv').config();
const {
  addPostValidate,
  updatePostValidate,
} = require('../utils/validations/postValidation');
const logger = require('../utils/logger/index');


const addPost = async (req, res) => {
  try {
    const { error } = await addPostValidate.validateAsync(req.body);
    if (error) {
      logger.error(error.message);
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }

    const insertPost = new Posts({
      description: req.body.description,
      userId: req.user._id,
      postImage: req.body.postImage,
    });

    await insertPost.save();

    logger.info('Post Inserted Successfully');
    return res.status(201).send({
      success: true,
      message: 'Post Inserted Successfully',
      data: insertPost,
    });
  } catch (e) {
    console.log(e);
    logger.error('Something went wrong on inserting post');
    return res.status(400).send({
      success: false,
      message: 'Something went wrong on inserting post',
    });
  }
};

const getMyPost = async (req, res) => {
  try {
    const fetchAllPost = await Posts.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user._id),
        },
      },
    ]);

    logger.info('Fetch All Post By User Successfully');
    return res.status(200).send({
      success: true,
      message: 'Fetch All Post By User Successfully',
      data: fetchAllPost,
    });
  } catch (e) {
    console.log(e);
    logger.error('Something went wrong on inserting post');
    return res.status(400).send({
      success: false,
      message: 'Something went wrong on inserting post',
    });
  }
};

const updateMyPost = async (req, res) => {
  try {
    const { error } = await updatePostValidate.validateAsync(req.body);
    if (error) {
      logger.error(error.message);
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }

    const fetchPost = await Posts
      .findOne({ _id: req.query.postId })
      .select({ _id: 1 });

    if (!fetchPost) {
      logger.error('Post not found');
      return res.status(400).send({
        success: false,
        message: 'Post not found',
      });
    }

    await Posts.updateOne(
      { _id: req.query.postId },
      {
        description: req.body.description,
        postImage: req.body.postImage,
      },
    );

    logger.info('Update Post Successfully');
    return res.status(200).send({
      success: true,
      message: 'Update Post Successfully',
    });
  } catch (e) {
    console.log(e);
    logger.error('Something went wrong on inserting post');
    return res.status(400).send({
      success: false,
      message: 'Something went wrong on inserting post',
    });
  }
};

module.exports = { addPost, getMyPost, updateMyPost };
