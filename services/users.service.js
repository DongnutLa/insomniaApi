const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');
const MailService = require('./mail.service');

const { mails } = require('../config/config');

const mailService = new MailService();

class UsersService {

  constructor(){

  }

  async create(data){
    const user = await this.findByUsername(data.username) || await this.findByEmail(data.email);
    if (user) {
      throw boom.unauthorized('User already exists');
    }
    const newUser = await models.User.create(data);

    mailService.sendMail(newUser.email, mails.USER_CREATED);

    delete newUser.dataValues.password;
    return newUser;
  }

  async find(params){
    const options = {
      include: [
        {
          association: 'role',
          attributes: {
            exclude: ['description']
          },
          include: ['permissions']
        }
      ],
      where: {},
      attributes: {
        exclude: ['password', 'recoveryToken']
      }
    }
    params.includeDeleted = params.includeDeleted == 'true' ? true : false;

    if (!params.includeDeleted) {
      var isDeleted = {
        isDeleted: false
      }
    }
    options.where = {
      [Op.and]: [
        isDeleted,
      ]
    }
    const users = await models.User.findAll(options);
    users.forEach(user => {
      user.dataValues.permissions = user.dataValues.role.permissions.map(x => x.permission);
      delete user.dataValues.role;
    })
    return users;
  }

  async findByUsername(username){
    let rta = await models.User.findOne({
      where: { username },
      include: [
        {
          association: 'role',
          include: ['permissions']
        }
      ],
      attributes: {exclude: ['recoveryToken']}
    });
    if (rta) {
      const userPermissions = rta.dataValues.role.permissions.map(x => x.permission);
      rta.dataValues.permissions = userPermissions;
      delete rta.dataValues.role;
      delete rta.dataValues.roleId;
    }
    return rta;
  }

  async findByEmail(email){
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async findOne(id){
    const user = await models.User.findByPk(id, {
      include: [
        {
          association: 'role',
          include: ['permissions']
        },
      ],
      attributes: {
        exclude: ['password', 'recoveryToken']
      }
    });
    if (!user) {
      throw boom.notFound('User not found');
    }

    user.dataValues.permissions = user.dataValues.role.permissions.map(x => x.permission);
    delete user.dataValues.role;
    return user;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async addAddress(data, user) {
    await this.findOne(user.userId); //verify if user exists
    data.userId = user.userId
    const userAddress = await models.UserAddress.create(data);
    return userAddress;
  }

  async findUserAddress(userId) {
    await this.findOne(userId); //verify if user exists
    const userAddress = await models.UserAddress.findAll({
      /* include: [
        {
          association: 'user',
        },
      ], */
      where: { userId }
    });
    return userAddress;
  }
}

module.exports = UsersService;
