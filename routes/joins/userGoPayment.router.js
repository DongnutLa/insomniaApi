const express = require('express');
const passport = require('passport');

//const { checkPermission } = require('../middlewares/auth.handler');
const validatorHandler = require('../../middlewares/validator.handler');
const { createUserGoPaymentSchema, updateUserGoPaymentSchema, getUserGoPaymentByParamsSchema, getUserGoPaymentSchema } = require('../../schemas/joins/userGoPayment.schema');
//const { permissions } = require('../config/config');
const { fileHandler } = require('../../middlewares/files.handler');

const UserGoPaymentsService = require('../../services/joins/userGoPayment.service');

const router = express.Router();
const service = new UserGoPaymentsService();
const upload = fileHandler('goPayments');

router.get('/',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.VIEW_GO),
  async (req, res, next) => {
    try {
      const userGoPayments = await service.find(req.query);
      res.json(userGoPayments);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.VIEW_GO),
  validatorHandler(getUserGoPaymentSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const userGoPayment = await service.findOne(id);
    res.status(200).json(userGoPayment);
  } catch (error) {
    next(error);
  }
});

router.get('/findByParams',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserGoPaymentByParamsSchema, 'params'),
  async (req, res, next) => {
    try {
      const userGoPayment = await service.findByParams(req.params);
      res.status(200).json(userGoPayment);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.EDIT_GO),
  upload.single('file'),
  validatorHandler(createUserGoPaymentSchema, 'body'),
  async (req, res, next) => {
    const { body } = req;
    try {
      const userGoPayment = await service.create(body, req);
      res.status(201).json(userGoPayment);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  //checkPermission(permissions.EDIT_GO),
  validatorHandler(getUserGoPaymentSchema, 'params'),
  validatorHandler(updateUserGoPaymentSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const userGoPayment = await service.update(id, body);
    res.status(201).json(userGoPayment);
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
    const userGoPayment = await service.update(id, changes);
    res.status(200).json(userGoPayment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
