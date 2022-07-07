const express = require('express');
const passport = require('passport');

const UsersService = require('../services/users.service');
//const { checkPermission } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/users.schema');
const { createUserAddressSchema, updateUserAddressSchema, getUserAddressSchema } = require('../schemas/usersAddress.schema');
//const { permissions } = require('../config/config');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
    try {
      const users = await service.find(req.query);
      res.json(users);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    const { body } = req;
    try {
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await service.update(id, body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.DELETE_USERS), Create that permission
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = { isDeleted: true };
    const user = await service.update(id, changes);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/add-address',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.DELETE_USERS), Create that permission
  validatorHandler(createUserAddressSchema, 'body'),
  async (req, res, next) => {
  try {
    const { body, user } = req;
    const userAddress = await service.addAddress(body, user);
    res.status(200).json(userAddress);
  } catch (error) {
    next(error);
  }
});

router.get('/getAddressByUserId/:userId',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.DELETE_USERS), Create that permission
  validatorHandler(getUserAddressSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userAddress = await service.findUserAddress(userId);
      res.status(200).json(userAddress);
  } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
