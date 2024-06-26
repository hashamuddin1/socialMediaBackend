/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Users } = require('../models/user');
const {
  userSignUpValidate,
  userLoginValidate,
} = require('../utils/validations/userValidation');
const logger = require('../utils/logger/index');

const userSignUp = async (req, res) => {
  try {
    const { error } = await userSignUpValidate.validateAsync(req.body);
    if (error) {
      logger.error(error.message);
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
    const checkEmail = await Users.findOne({ email: req.body.email }).select({
      email: 1,
    });
    if (checkEmail) {
      logger.error('This Email is already Exist');
      return res.status(400).send({
        success: false,
        message: 'This Email is already Exist',
      });
    }

    const user = new Users({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    });
    const saltPassword = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(user.password, saltPassword);
    user.password = encryptedPassword;

    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '30d',
      },
    );

    logger.info('User Registered Successfully');
    return res.status(201).send({
      success: true,
      message: 'User Registered Successfully',
      data: user,
      token,
    });
  } catch (e) {
    console.log(e);
    logger.error('Something went wrong on user signup');
    return res.status(400).send({
      success: false,
      message: 'Something went wrong on user signup',
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { error } = await userLoginValidate.validateAsync(req.body);
    if (error) {
      logger.error(error.message);
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }

    const fetchUser = await Users.findOne({
      email: req.body.email,
    });
    if (!fetchUser) {
      logger.error('Email or Password is Incorrect');
      return res.status(400).send({
        status: 400,
        message: 'Email or Password is Incorrect',
      });
    }

    if (
      fetchUser
      && (await bcrypt.compare(req.body.password, fetchUser.password))
    ) {
      const token = jwt.sign(
        { _id: fetchUser._id, email: req.body.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '30d',
        },
      );

      logger.info('User Login Successfully');
      return res.status(200).send({
        success: true,
        message: 'User Login Successfully',
        data: fetchUser,
        token,
      });
    }
    logger.error('Email or Password is Incorrect');
    return res.status(400).send({
      success: false,
      message: 'Email or Password is Incorrect',
    });
  } catch (e) {
    console.log(e);
    logger.error('Something went wrong on user login');
    return res.status(400).send({
      success: false,
      message: 'Something went wrong on user login',
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const fetchUser = await Users.findOne({ _id: req.user._id }).select({
      password: 0,
    });

    logger.info('Fetch User Profile Successfully');
    return res.status(200).send({
      success: true,
      message: 'Fetch User Profile Successfully',
      data: fetchUser,
    });
  } catch (e) {
    console.log(e);
    logger.error('Something went wrong on fetch user profile');
    return res.status(400).send({
      success: false,
      message: 'Something went wrong on fetch user profile',
    });
  }
};

module.exports = { userSignUp, userLogin, getProfile };
