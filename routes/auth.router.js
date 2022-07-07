const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.get('/permissions',
  async (req, res, next) => {
    try {
      const permissions = await service.getPermissions();
      res.status(200).json(permissions)
    } catch (error) {
      next(error);
    }
  }
)

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecoveryMail(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error)
    }
})


module.exports = router;
