const joi = require("joi");

const addPostValidate = joi.object({
    description: joi.string().required().messages({
    "any.required": "Description is not allowed to be empty",
    "string.empty": "Description is not allowed to be empty",
  }),
  postImage: joi.string().required().messages({
    "any.required": "Post Image is not allowed to be empty",
    "string.empty": "Post Image is not allowed to be empty",
  })
});

module.exports = { addPostValidate };
