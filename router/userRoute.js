const express = require('express');

const userRouter = express.Router();
const {
  userSignUp,
  userLogin,
  getProfile,
} = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

userRouter.post('/api/userSignUp', userSignUp);
userRouter.post('/api/userLogin', userLogin);
userRouter.get('/api/getProfile', [verifyToken], getProfile);

module.exports = userRouter;
