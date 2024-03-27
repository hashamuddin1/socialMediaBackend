const express = require("express");
const postRouter = express.Router();
const { addPost } = require("../controllers/postController");
const { verifyToken } = require("../middleware/auth");

postRouter.post("/api/addPost", [verifyToken], addPost);

module.exports = postRouter;
