const express = require('express');
const passport = require('passport');

const { checkPermission } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const { createGoSchema, updateGoSchema, getGoSchema } = require('../schemas/gos.schema');
const { permissions } = require('../config/config');

const GosService = require('../services/gos.service');

const router = express.Router();
const service = new GosService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.VIEW_GO),
  async (req, res, next) => {
    try {
      const gos = await service.find(req.query);
      res.json(gos);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.VIEW_GO),
  validatorHandler(getGoSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const go = await service.findOne(id);
    res.status(200).json(go);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.EDIT_GO),
  validatorHandler(createGoSchema, 'body'),
  async (req, res, next) => {
    const { body } = req;
    try {
      const go = await service.create(body);
      res.status(201).json(go);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.EDIT_GO),
  validatorHandler(getGoSchema, 'params'),
  validatorHandler(updateGoSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const go = await service.update(id, body);
    res.status(201).json(go);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.DELETE_GO),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = { isDeleted: true };
    const go = await service.update(id, changes);
    res.status(200).json(go);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
