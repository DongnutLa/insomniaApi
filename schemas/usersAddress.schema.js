const Joi = require('joi');

const id = Joi.string().id();
const userId = Joi.number().id();
const city = Joi.string();
const neighborhood = Joi.string();
const address = Joi.string();
const phone = Joi.string();
const socialNetwork = Joi.string();
const additionalData = Joi.string();

const createUserAddressSchema = Joi.object({
  city: city.required(),
  neighborhood: neighborhood.required(),
  address: address.required(),
  phone: phone.required(),
  socialNetwork,
  additionalData
});

const updateUserAddressSchema = Joi.object({
  city,
  neighborhood,
  address,
  phone,
  socialNetwork,
  additionalData
});

const getUserAddressSchema = Joi.object({
  userId: userId.required()
});

module.exports = { createUserAddressSchema, updateUserAddressSchema, getUserAddressSchema }
