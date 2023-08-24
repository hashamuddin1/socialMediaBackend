const { users } = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSignUp = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({
        success: false,
        message: "This Email Is Required",
      });
    }

    if (!req.body.first_name) {
      return res.status(400).send({
        success: false,
        message: "This First Name Is Required",
      });
    }

    if (!req.body.last_name) {
      return res.status(400).send({
        success: false,
        message: "This Last Name Is Required",
      });
    }
    const checkEmail = await users.findOne({ email: req.body.email });
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

    return res.status(200).send({
      success: true,
      message: "User Registered Successfully",
      data: user,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { userSignUp };
