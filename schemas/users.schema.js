const Joi = require('joi');

const id = Joi.string().id();
const name = Joi.string().min(3).max(50);
const email = Joi.string().email();
const username = Joi.string().hostname();
const password = Joi.string();
const roleId = Joi.string().id();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  username: username.required(),
  password: password.required(),
  roleId,
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  username: username,
  password: password,
  roleId: roleId,
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
