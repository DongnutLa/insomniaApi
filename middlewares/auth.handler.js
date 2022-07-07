const boom = require('@hapi/boom');

const {config} = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized("You don't have permissions to do this"));
  }
}

function checkPermission(permission) {
  return async (req, res, next) => {
    try {
      if(req.user && req.user.permissions) {
        if (req.user.permissions.includes(permission)) {
          next();
        } else {
          next(boom.unauthorized("You don't have permissions to do this"));
        }
      } else {
        next(boom.unauthorized("You don't have permissions to do this"));
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { checkApiKey, checkPermission };
