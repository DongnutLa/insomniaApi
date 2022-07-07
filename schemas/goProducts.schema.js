const Joi = require('joi');

const id = Joi.string().id();
const title = Joi.string().min(3).max(50);
const description = Joi.string();
const price = Joi.number();
const includePoster = Joi.boolean();
const posterPrice = Joi.number();
const goId = Joi.number().id();

const status = Joi.string();

const createGoProductsSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  price: price.required(),
  includePoster: includePoster.required(),
  posterPrice: posterPrice.required(),
  goId: goId.required(),
  status,
});

const updateGoProductsSchema = Joi.object({
  title,
  description,
  price,
  includePoster,
  posterPrice,
  status,
});

const getGoProductsSchema = Joi.object({
  id: id.required()
});

module.exports = { createGoProductsSchema, updateGoProductsSchema, getGoProductsSchema }
