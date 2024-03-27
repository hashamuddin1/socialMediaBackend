const joi = require("joi");

const addPostValidate = joi.object({
    description: joi.string().required().messages({
    "any.required": "Description is not allowed to be empty",
    "string.empty": "Description is not allowed to be empty",
  }),
  postImage: joi.string().allow(null).allow("")
});

module.exports = { addPostValidate };
