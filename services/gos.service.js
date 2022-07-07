const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');

class GosService {

  constructor(){

  }

  async create(data){
    const go = await models.Go.create(data);
    return go;
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
    const gos = await models.Go.findAll(options);
    return gos;
  }

  async findOne(id){
    const go = await models.Go.findByPk(id, {
      include: ['GoPaymentInfo', 'GoProducts']
    });
    if (!go) {
      throw boom.notFound('Entry not found');
    }

    return go;
  }

  async update(id, changes){
    const go = await this.findOne(id);
    const rta = await go.update(changes);
    return rta;
  }
}

module.exports = GosService;
