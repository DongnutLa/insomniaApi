const Joi = require('joi');

const id = Joi.string().id();
const title = Joi.string().min(3).max(50);
const description = Joi.string();
const deadline = Joi.date();
const status = Joi.string();

const createGoSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  deadline: deadline.required(),
  status,
});

const updateGoSchema = Joi.object({
  title,
  description,
  deadline,
  status,
});

const getGoSchema = Joi.object({
  id: id.required()
});

module.exports = { createGoSchema, updateGoSchema, getGoSchema }
