const express = require('express');
const passport = require('passport');

const { checkPermission } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const { createGoPaymentInfoSchema, updateGoPaymentInfoSchema, getGoPaymentInfoSchema } = require('../schemas/goPaymentInfo.schema');
const { permissions } = require('../config/config');

const GoPaymentInfosService = require('../services/goPaymentInfos.service');

const router = express.Router();
const service = new GoPaymentInfosService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.VIEW_GO),
  async (req, res, next) => {
    try {
      const goPaymentInfos = await service.find(req.query);
      res.json(goPaymentInfos);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.VIEW_GO),
  validatorHandler(getGoPaymentInfoSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const goPaymentInfo = await service.findOne(id);
    res.status(200).json(goPaymentInfo);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.EDIT_GO),
  validatorHandler(createGoPaymentInfoSchema, 'body'),
  async (req, res, next) => {
    const { body } = req;
    try {
      const goPaymentInfo = await service.create(body);
      res.status(201).json(goPaymentInfo);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.EDIT_GO),
  validatorHandler(getGoPaymentInfoSchema, 'params'),
  validatorHandler(updateGoPaymentInfoSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const goPaymentInfo = await service.update(id, body);
    res.status(201).json(goPaymentInfo);
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
    const goPaymentInfo = await service.update(id, changes);
    res.status(200).json(goPaymentInfo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
