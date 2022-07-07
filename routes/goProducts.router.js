const express = require('express');
const passport = require('passport');

const { checkPermission } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const { createGoProductsSchema, updateGoProductsSchema, getGoProductsSchema } = require('../schemas/goProducts.schema');
const { permissions } = require('../config/config');
const { fileHandler } = require('../middlewares/files.handler');

const GoProductsService = require('../services/goProducts.service');

const router = express.Router();
const service = new GoProductsService();
const upload = fileHandler('products');

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.VIEW_GO),
  async (req, res, next) => {
    try {
      const goProducts = await service.find(req.query);
      res.json(goProducts);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.VIEW_GO),
  validatorHandler(getGoProductsSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const goProduct = await service.findOne(id);
    res.status(200).json(goProduct);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  upload.single('file'),
  checkPermission(permissions.EDIT_GO),
  validatorHandler(createGoProductsSchema, 'body'),
  async (req, res, next) => {
    const { body } = req;
    try {
      const goProduct = await service.create(body, req);
      res.status(201).json(goProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkPermission(permissions.EDIT_GO),
  validatorHandler(getGoProductsSchema, 'params'),
  validatorHandler(updateGoProductsSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const goProduct = await service.update(id, body);
    res.status(201).json(goProduct);
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
    const goProduct = await service.update(id, changes);
    res.status(200).json(goProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
