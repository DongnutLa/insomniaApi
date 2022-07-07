const boom = require('@hapi/boom');

const MailService = require('../mail.service');
const { models } = require('../../libs/sequelize');
const { mails } = require('../../config/config');
const UsersService = require('../users.service')

const mailService = new MailService();
const userService = new UsersService();

class UserGosService {

  constructor(){

  }

  async create(data, user){
    data.userId = user.userId;
    const userGo = await models.UserGo.create(data);

    const userData = await userService.findOne(user.userId);
    mailService.sendMail(userData.email, mails.USER_GO_CREATED);

    return userGo;
  }

  async find(){
    const userGos = await models.UserGo.findAll();
    return userGos;
  }

  async findOne(id){
    const userGo = await models.UserGo.findByPk(id);
    if (!userGo) {
      throw boom.notFound('userGo not found');
    }
    return userGo;
  }

  async findByParams(params) {
    let where = {}
    if(params.userId) {
      where = {...where, userId: params.userId};
    }
    if(params.goId) {
      where = {...where, goId: params.goId};
    }

    const userGo = await models.UserGo.findAll({
      include: ['userPurchase', 'userGoPayment'],
      where
    })
    return userGo;
  }

  async update(id, changes){
    const go = await this.findOne(id);
    const rta = await go.update(changes);
    return rta;
  }
}

module.exports = UserGosService;
