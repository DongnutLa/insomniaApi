const Joi = require('joi');

const id = Joi.string().id();
const userGoId = Joi.number().id();
const payment = Joi.string();
const attachment = Joi.string();

const createUserGoPaymentSchema = Joi.object({
  userGoId: userGoId.required(),
  payment: payment.required(),
  attachment,
});

const updateUserGoPaymentSchema = Joi.object({
  userGoId,
  payment,
  attachment
});

const getUserGoPaymentSchema = Joi.object({
  id: id.required()
});

const getUserGoPaymentByParamsSchema = Joi.object({
  userGoId
});

module.exports = { createUserGoPaymentSchema, updateUserGoPaymentSchema, getUserGoPaymentSchema, getUserGoPaymentByParamsSchema }
