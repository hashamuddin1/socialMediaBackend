const joi = require('joi');

const userSignUpValidate = joi.object({
  email: joi.string().email().required().messages({
    'any.required': 'Email is not allowed to be empty',
    'string.empty': 'Email is not allowed to be empty',
  }),
  first_name: joi.string().required().messages({
    'any.required': 'First Name is not allowed to be empty',
    'string.empty': 'First Name is not allowed to be empty',
  }),
  last_name: joi.string().required().messages({
    'any.required': 'Last Name is not allowed to be empty',
    'string.empty': 'Last Name is not allowed to be empty',
  }),
  password: joi.string().required().messages({
    'any.required': 'Password is not allowed to be empty',
    'string.empty': 'Password is not allowed to be empty',
  }),
});

const userLoginValidate = joi.object({
  email: joi.string().email().required().messages({
    'any.required': 'Email is not allowed to be empty',
    'string.empty': 'Email is not allowed to be empty',
  }),
  password: joi.string().required().messages({
    'any.required': 'Password is not allowed to be empty',
    'string.empty': 'Password is not allowed to be empty',
  }),
});

module.exports = { userSignUpValidate, userLoginValidate };
