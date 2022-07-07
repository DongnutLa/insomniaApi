const Joi = require('joi');

const id = Joi.string().id();
const userId = Joi.number().id();
const goId = Joi.number().id();
const productId = Joi.number().id();
const userGoId = Joi.number().id();
const amount = Joi.number();

const createPurchaseSchema = Joi.object({
  goId: goId.required(),
  productId: productId.required(),
  userGoId: userGoId.required(),
  amount: amount.required(),
});

const updatePurchaseSchema = Joi.object({
  goId,
  productId,
  amount,
  userGoId,
});

const getPurchaseSchema = Joi.object({
  id: id.required()
});

const getPurchaseByParamsSchema = Joi.object({
  userId,
  goId,
  productId,
  userGoId,
});

module.exports = { createPurchaseSchema, updatePurchaseSchema, getPurchaseSchema, getPurchaseByParamsSchema }
