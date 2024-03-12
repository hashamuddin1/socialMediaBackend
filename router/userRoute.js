const express = require("express");
const userRouter = express.Router();

const { userSignUp, userLogin } = require("../controllers/userController");

userRouter.post("/api/userSignUp", userSignUp);
userRouter.post("/api/userLogin", userLogin);

module.exports = userRouter;
