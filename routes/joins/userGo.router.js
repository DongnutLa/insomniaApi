const express = require('express');
const passport = require('passport');

//const { checkPermission } = require('../middlewares/auth.handler');
const validatorHandler = require('../../middlewares/validator.handler');
const { createUserGoSchema, updateUserGoSchema, getUserGoByParamsSchema, getUserGoSchema } = require('../../schemas/joins/userGo.schema');
//const { permissions } = require('../config/config');

const UserGosService = require('../../services/joins/userGo.service');

const router = express.Router();
const service = new UserGosService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.VIEW_GO),
  async (req, res, next) => {
    try {
      const userGos = await service.find(req.query);
      res.json(userGos);
    } catch (error) {
      next(error);
    }
});

router.get('/findByParams',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserGoByParamsSchema, 'query'),
  async (req, res, next) => {
    try {
      const userGo = await service.findByParams(req.query);
      res.status(200).json(userGo);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.VIEW_GO),
  validatorHandler(getUserGoSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const userGo = await service.findOne(id);
    res.status(200).json(userGo);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.EDIT_GO),
  validatorHandler(createUserGoSchema, 'body'),
  async (req, res, next) => {
    const { body, user } = req;
    try {
      const userGo = await service.create(body, user);
      res.status(201).json(userGo);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.EDIT_GO),
  validatorHandler(getUserGoSchema, 'params'),
  validatorHandler(updateUserGoSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const userGo = await service.update(id, body);
    res.status(201).json(userGo);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.DELETE_GO),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = { isDeleted: true };
    const userGo = await service.update(id, changes);
    res.status(200).json(userGo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
