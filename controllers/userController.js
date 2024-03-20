const { users } = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  userSignUpValidate,
  userLoginValidate,
} = require("../utils/validations/userValidation");

const userSignUp = async (req, res) => {
  try {
    const { error } = await userSignUpValidate.validateAsync(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
    const checkEmail = await users
      .findOne({ email: req.body.email })
      .select({ email: 1 });
    if (checkEmail) {
      return res.status(400).send({
        success: false,
        message: "This Email is already Exist",
      });
    }

    const user = new users({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    });
    let saltPassword = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(user.password, saltPassword);
    user.password = encryptedPassword;

    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    );

    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      data: user,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong on user signup",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { error } = await userLoginValidate.validateAsync(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }

    const fetchUser = await users.findOne({
      email: req.body.email,
    });
    if (!fetchUser) {
      return res.status(400).send({
        status: 400,
        message: "Email or Password is Incorrect",
      });
    }

    if (
      fetchUser &&
      (await bcrypt.compare(req.body.password, fetchUser.password))
    ) {
      const token = jwt.sign(
        { _id: fetchUser._id, email: req.body.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30d",
        }
      );
      return res.status(200).send({
        success: true,
        message: "User Login Successfully",
        data: fetchUser,
        token,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Email or Password is Incorrect",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong on user login",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const fetchUser = await users
      .findOne({ _id: req.user._id })
      .select({ password: 0 });

    return res.status(200).send({
      success: true,
      message: "Fetch User Profile Successfully",
      data: fetchUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong on fetch user profile",
    });
  }
};

module.exports = { userSignUp, userLogin, getProfile };
