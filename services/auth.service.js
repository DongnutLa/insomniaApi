const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

const { config } = require('../config/config');
const UsersService = require('./users.service');
const MailService = require('./mail.service');

const service = new UsersService();
const mailService = new MailService();

class AuthService {

  constructor(){

  }

  //Guest permissions
  async getPermissions() {
    const roles = await models.Role.findByPk(4, {
      include: ['permissions']
    });
    if (roles) {
      return roles.permissions.map(x => x.permission);
    }
    return [];
  }

  async getUser(username, password) {
    const user = await service.findByUsername(username);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Username and password did not match');
    }
    delete user.dataValues.password;
    return user
  }

  signToken(user) {
      const payload = {
        userId: user.id,
        permissions: user.role.permissions.map(x => x.permission),
      }
      const token = jwt.sign(payload, config.jwtSecet);
      return{
        user,
        token,
      };
  }

  async sendRecoveryMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecet, {expiresIn: '15min'});
    const link = `http://front.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      to: `${user.email}`, // list of receivers
      subject: "Recupera tu clave ✔", // Subject line
      html: `<b>Ingresa al siguiente link para recuperar tu contraseña:</b> <br> ${link}`, // html body
    }
    const rta = await mailService.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecet);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      await service.update(user.id, {recoveryToken: null, password: newPassword});
      return { message: 'password changed!' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
