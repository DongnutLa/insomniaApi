const express = require('express');
const passport = require('passport');

//const { checkPermission } = require('../middlewares/auth.handler');
const validatorHandler = require('../../middlewares/validator.handler');
const { createPurchaseSchema, updatePurchaseSchema, getPurchaseSchema, getPurchaseByParamsSchema } = require('../../schemas/joins/purchases.schema');
//const { permissions } = require('../config/config');

const PurchaseService = require('../../services/joins/purchases.service');

const router = express.Router();
const service = new PurchaseService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.VIEW_GO),
  async (req, res, next) => {
    try {
      const purchases = await service.find(req.query);
      res.json(purchases);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.VIEW_GO),
  validatorHandler(getPurchaseSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await service.findOne(id);
    res.status(200).json(purchase);
  } catch (error) {
    next(error);
  }
});

router.get('/findByParams',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getPurchaseByParamsSchema, 'params'),
  async (req, res, next) => {
    try {
      const purchases = await service.findByParams(req.params);
      res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.EDIT_GO),
  validatorHandler(createPurchaseSchema, 'body'),
  async (req, res, next) => {
    const { body, user } = req;
    try {
      const purchase = await service.create(body, user);
      res.status(201).json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.EDIT_GO),
  validatorHandler(getPurchaseSchema, 'params'),
  validatorHandler(updatePurchaseSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const purchase = await service.update(id, body);
    res.status(201).json(purchase);
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
    const purchase = await service.update(id, changes);
    res.status(200).json(purchase);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
