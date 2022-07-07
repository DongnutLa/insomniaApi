const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');

class GoPaymentInfosService {

  constructor(){

  }

  async create(data){
    const goPaymentInfo = await models.GosPaymentInfo.create(data);
    return goPaymentInfo;
  }

  async find(params){
    const options = {
      where: {}
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
    const goPaymentInfos = await models.GosPaymentInfo.findAll(options);
    return goPaymentInfos;
  }

  async findOne(id){
    const goPaymentInfo = await models.GosPaymentInfo.findByPk(id);
    if (!goPaymentInfo) {
      throw boom.notFound('Payment data not found');
    }

    return goPaymentInfo;
  }

  async update(id, changes){
    const goPaymentInfo = await this.findOne(id);
    const rta = await goPaymentInfo.update(changes);
    return rta;
  }
}

module.exports = GoPaymentInfosService;
