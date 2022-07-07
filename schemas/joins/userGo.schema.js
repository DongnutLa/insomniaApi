const Joi = require('joi');

const id = Joi.string().id();
const userId = Joi.number().id();
const goId = Joi.number().id();
const total = Joi.number();
const paid = Joi.number();
const guide = Joi.string();

const createUserGoSchema = Joi.object({
  goId: goId.required(),
  total: total.required(),
  paid,
  guide,
});

const updateUserGoSchema = Joi.object({
  goId,
  total,
  paid,
  guide,
});

const getUserGoSchema = Joi.object({
  id: id.required()
});

const getUserGoByParamsSchema = Joi.object({
  userId,
  goId
});

module.exports = { createUserGoSchema, updateUserGoSchema, getUserGoSchema, getUserGoByParamsSchema }
