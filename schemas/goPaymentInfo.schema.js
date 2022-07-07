const Joi = require('joi');

const id = Joi.string().id();
const account = Joi.string().min(3).max(50);
const bank = Joi.string();
const owner = Joi.string();
const goId = Joi.number().id();

const status = Joi.string();

const createGoPaymentInfoSchema = Joi.object({
  account: account.required(),
  bank: bank.required(),
  owner: owner.required(),
  goId: goId.required(),
  status,
});

const updateGoPaymentInfoSchema = Joi.object({
  account,
  bank,
  owner,
  goId,
  status,
});

const getGoPaymentInfoSchema = Joi.object({
  id: id.required()
});

module.exports = { createGoPaymentInfoSchema, updateGoPaymentInfoSchema, getGoPaymentInfoSchema }
