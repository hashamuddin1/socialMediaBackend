const express = require("express");
const userRouter = express.Router();

const { userSignUp } = require("../controllers/userController");

userRouter.post("/api/userSignUp", userSignUp);

module.exports = userRouter;
