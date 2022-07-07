const express = require('express');

const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const gosRouter = require('./gos.router');
const paymentInfoRouter = require('./goPaymentInfos.router');
const productsRouter = require('./goProducts.router');
const purchaseRouter = require('./joins/purchase.router');
const userGoRouter = require('./joins/userGo.router');
const userGoPaymentRouter = require('./joins/userGoPayment.router');

const { checkApiKey } = require('../middlewares/auth.handler');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', checkApiKey, router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/go', gosRouter);
  router.use('/payment-info', paymentInfoRouter);
  router.use('/products', productsRouter);
  router.use('/purchase', purchaseRouter);
  router.use('/user-go', userGoRouter);
  router.use('/user-go-payment', userGoPaymentRouter);
}

module.exports = routerApi;
