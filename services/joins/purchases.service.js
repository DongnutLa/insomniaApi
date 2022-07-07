const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class PurchasesService {

  constructor(){

  }

  async create(data, user){
    data.userId = user.userId;
    const purchase = await models.UserPurchase.create(data);
    return purchase;
  }

  async find(){
    const purchases = await models.UserPurchase.findAll();
    return purchases;
  }

  async findOne(id){
    const purchase = await models.UserPurchase.findByPk(id);
    if (!purchase) {
      throw boom.notFound('Purchase not found');
    }
    return purchase;
  }

  async findByParams(params) {
    let where = {}
    if(params.userId) {
      where = {...where, userId: params.userId};
    }
    if(params.goId) {
      where = {...where, goId: params.goId};
    }
    if(params.productId) {
      where = {...where, productId: params.productId};
    }
    if(params.userGoId) {
      where = {...where, userGoId: params.userGoId};
    }

    const purchase = await models.UserPurchase.findAll({
      where
    })
    return purchase;
  }

  async update(id, changes){
    const go = await this.findOne(id);
    const rta = await go.update(changes);
    return rta;
  }
}

module.exports = PurchasesService;
