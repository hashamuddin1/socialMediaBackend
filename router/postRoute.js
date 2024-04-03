const express = require("express");
const postRouter = express.Router();
const {
  addPost,
  getMyPost,
  updateMyPost,
} = require("../controllers/postController");
const { verifyToken } = require("../middleware/auth");

postRouter.post("/api/addPost", [verifyToken], addPost);
postRouter.post("/api/getMyPost", [verifyToken], getMyPost);
postRouter.post("/api/updatePost", [verifyToken], updateMyPost);

module.exports = postRouter;
