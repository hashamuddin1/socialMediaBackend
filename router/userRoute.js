const express = require("express");
const userRouter = express.Router();

const {
  userSignUp,
  userLogin,
  getProfile,
} = require("../controllers/userController");

userRouter.post("/api/userSignUp", userSignUp);
userRouter.post("/api/userLogin", userLogin);
userRouter.get("/api/getProfile", getProfile);

module.exports = userRouter;
